# 실행과 운영

이 문서는 Python 웹 애플리케이션의 실행 모델, 테스트, 로깅과 배포 구성을 안내한다.

Python 웹 서버는 실행 방식에 따라 성능과 장애 양상이 크게 달라진다. 동기·비동기 구분과 워커 구성을 먼저 정하고 나머지를 맞춘다.

## 실행 모델

애플리케이션과 서버는 WSGI 또는 ASGI 규격으로 연결된다.

| 규격 | 처리 방식 | 대표 서버 | 사용 프레임워크 |
| --- | --- | --- | --- |
| WSGI | 요청 하나를 워커 하나가 동기 처리 | Gunicorn, uWSGI | Django(동기), Flask |
| ASGI | 이벤트 루프에서 동시 처리, WebSocket 지원 | Uvicorn, Hypercorn | FastAPI, Django(비동기) |

판단 기준은 다음과 같다.

- 외부 API 호출과 DB 대기가 처리 시간의 대부분이면 ASGI + 비동기 코드가 처리량에서 유리하다.
- CPU 연산이 중심이면 실행 모델보다 워커 프로세스 수가 성능을 결정한다.
- 기존 동기 라이브러리를 그대로 쓰는 프로젝트는 WSGI 또는 동기 엔드포인트를 유지한다.

## 동기와 비동기 혼용 규칙

FastAPI는 엔드포인트 선언 방식에 따라 실행 위치가 달라진다.

- `async def`: 이벤트 루프에서 직접 실행된다. 내부에서 블로킹 호출을 하면 전체 요청 처리가 멈춘다.
- `def`: 별도 스레드 풀에서 실행된다. 동기 라이브러리를 그대로 쓸 수 있다.
- 판단 기준: 함수 안에서 사용하는 I/O 라이브러리가 비동기를 지원하면 `async def`, 아니면 `def`로 선언한다.
- 비동기 함수 안에서 불가피하게 동기 호출이 필요하면 `anyio.to_thread.run_sync`로 스레드에 위임한다.
- 블로킹 대상: DB 동기 드라이버, `requests`, 파일 I/O, `time.sleep`, 무거운 연산

```python
import anyio
import httpx


async def fetch_price(product_id: int) -> int:
    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.get(f"https://api.example.com/products/{product_id}")
        response.raise_for_status()
        return response.json()["price"]


async def render_report(rows: list[dict]) -> bytes:
    return await anyio.to_thread.run_sync(build_report_bytes, rows)
```

외부 호출에는 항상 타임아웃을 지정한다. 타임아웃 없는 호출은 워커를 점유해 장애로 이어진다.

## 서버 실행

로컬과 운영의 실행 명령을 분리한다.

```bash
# 로컬 개발
uv run uvicorn order_api.main:app --reload

# 운영: ASGI
uv run uvicorn order_api.main:app --host 0.0.0.0 --port 8000 --workers 4

# 운영: WSGI
uv run gunicorn order_api.wsgi:application --workers 4 --timeout 30
```

구성 기준은 다음과 같다.

- `--reload`는 개발에서만 사용한다.
- 워커 수는 CPU 코어 수를 기준으로 시작하고 실제 부하로 조정한다.
- 워커 수와 DB 커넥션 풀 크기의 곱이 DB 최대 연결 수를 넘지 않게 한다.
- 요청 타임아웃과 우아한 종료 대기 시간을 지정한다.
- 프로세스 관리와 재시작은 컨테이너 오케스트레이터 또는 프로세스 관리자에 맡긴다.

## 테스트

웹 계층 테스트는 실제 앱 객체를 사용하되 외부 자원은 제어한다.

```python
# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from order_api.api.deps import get_db
from order_api.main import create_app
from order_api.models.order import Base


@pytest.fixture
def db_session():
    engine = create_engine("sqlite+pysqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def client(db_session):
    app = create_app()
    app.dependency_overrides[get_db] = lambda: db_session
    with TestClient(app) as test_client:
        yield test_client
```

```python
# tests/test_orders.py
def test_주문_생성시_201과_주문번호를_반환한다(client, auth_headers):
    response = client.post(
        "/api/v1/orders",
        json={"customer_id": 1, "items": [{"product_id": 10, "quantity": 2}]},
        headers=auth_headers,
    )

    assert response.status_code == 201
    assert response.json()["status"] == "CREATED"


def test_수량이_0이면_검증에_실패한다(client, auth_headers):
    response = client.post(
        "/api/v1/orders",
        json={"customer_id": 1, "items": [{"product_id": 10, "quantity": 0}]},
        headers=auth_headers,
    )

    assert response.status_code == 422
```

계층별 기준은 다음과 같다.

- 단위 테스트: 서비스 함수의 규칙을 검증한다. DB와 네트워크를 쓰지 않는다.
- 통합 테스트: 라우터부터 DB까지 연결해 검증한다. 실제 DB와 동일한 엔진을 쓰는 편이 정확하다.
- 외부 호출: HTTP 클라이언트를 대체하거나 응답을 고정한다. 실제 외부 API를 호출하지 않는다.
- 비동기 테스트: `pytest-asyncio`와 `httpx.AsyncClient`를 사용한다.
- 데이터 준비: 테스트마다 독립적으로 만들고 실행 순서에 의존하지 않는다.

테스트 설계 범위와 회귀 검증 절차는 [루신](../Masters/lucin/quality-assurance.md)과 [분석하고 테스트하기](../Playbooks/analysis-and-testing.md)를 연결한다.

## 로깅

로그는 구조화 형식으로 남기고 요청 단위로 추적 가능하게 만든다.

```python
# core/logging.py
import logging
import sys
from logging.config import dictConfig


def configure_logging(level: str = "INFO") -> None:
    dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "default": {
                    "format": '{"time":"%(asctime)s","level":"%(levelname)s",'
                    '"logger":"%(name)s","message":"%(message)s"}'
                }
            },
            "handlers": {
                "stdout": {
                    "class": "logging.StreamHandler",
                    "stream": sys.stdout,
                    "formatter": "default",
                }
            },
            "root": {"handlers": ["stdout"], "level": level},
        }
    )


logger = logging.getLogger(__name__)
```

적용 기준은 다음과 같다.

- 출력 대상은 표준 출력으로 통일한다. 파일 회전은 실행 환경이 담당한다.
- 요청 식별자를 생성해 로그와 오류 응답에 함께 남긴다.
- `print()`를 로그로 사용하지 않는다.
- 예외는 `logger.exception()`으로 남겨 스택 트레이스를 포함한다.
- 개인정보, 토큰, 비밀번호는 기록하지 않는다.
- 로그 수준: 정상 흐름은 INFO, 처리 가능한 실패는 WARNING, 대응이 필요한 실패는 ERROR로 구분한다.

## 상태 점검과 관측

운영 판단에 필요한 최소 항목을 노출한다.

- 라이브니스: 프로세스 생존만 확인한다. 외부 의존을 호출하지 않는다.
- 레디니스: DB 등 필수 의존 연결을 확인한다. 실패 시 트래픽을 받지 않는다.
- 지표: 요청 수, 상태 코드 분포, 응답 시간 분위값, 진행 중 요청 수를 수집한다.
- 추적: 요청 식별자를 외부 호출 헤더로 전달해 흐름을 이어 붙인다.

## 컨테이너 실행

이미지는 의존성 설치와 애플리케이션 복사를 분리해 캐시를 활용한다.

```dockerfile
FROM python:3.13-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY src/ ./src/

EXPOSE 8000
CMD ["uv", "run", "uvicorn", "order_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- lock 파일 기준으로 설치해 이미지와 로컬의 의존성을 일치시킨다.
- 개발 의존성은 운영 이미지에서 제외한다.
- `PYTHONUNBUFFERED=1`로 로그가 즉시 출력되게 한다.
- 비밀 값은 이미지에 넣지 않고 실행 시점에 주입한다.

## 배포 점검 항목

배포 전에 다음을 확인한다.

- lock 파일과 설치 의존성이 일치한다.
- 필수 환경 변수가 모두 주입됐고 누락 시 기동이 실패한다.
- 마이그레이션 적용 순서와 롤백 경로가 정해져 있다.
- 워커 수와 DB 커넥션 풀 크기가 DB 한도 안에 있다.
- 외부 호출에 타임아웃과 재시도 기준이 있다.
- 로그가 표준 출력으로 수집되고 민감정보가 제외됐다.
- 상태 점검 경로가 오케스트레이터에 연결됐다.
- 디버그 모드와 API 문서 노출 설정이 운영 기준에 맞다.

