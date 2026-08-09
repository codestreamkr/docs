# 웹 백엔드 구조 선택

이 문서는 Python 웹 백엔드 프레임워크를 고르고 프로젝트 구조와 설정 체계를 잡는 기준을 안내한다.

Python에는 Spring Boot 같은 단일 표준이 없다. 프레임워크가 제공하는 범위가 서로 다르므로, 무엇을 직접 만들어야 하는지 먼저 확인한다.

## 프레임워크 선택

세 가지 선택지가 실무의 대부분을 차지한다.

| 프레임워크 | 제공 범위 | 선택 기준 |
| --- | --- | --- |
| FastAPI | 라우팅, 요청·응답 검증, 의존성 주입, OpenAPI 문서 자동 생성 | JSON API 중심 서비스, 비동기 I/O 비중이 큰 서비스 |
| Django | ORM, 마이그레이션, 인증, 권한, 관리자 화면, 폼, 템플릿 | 관리 기능과 도메인 모델이 많은 서비스, 팀이 규약 기반 구조를 원할 때 |
| Flask | 라우팅과 요청 처리만 제공 | 소규모 서비스, 기존 자산 유지, 구조를 직접 정의해야 할 때 |

판단 순서는 다음과 같다.

- 관리자 화면, 사용자 인증, 권한 관리가 요구사항에 있으면 Django를 먼저 검토한다.
- 외부에 공개하는 REST API가 중심이고 문서와 스키마 자동화가 중요하면 FastAPI를 선택한다.
- 외부 API 호출과 대기 시간이 처리 시간의 대부분이면 FastAPI의 비동기 모델이 유리하다.
- CPU 연산이 중심이면 프레임워크 선택보다 워커 구성이 성능을 좌우한다. [실행과 운영](./python_08_web_runtime_operations_guide.md)에서 다룬다.

Django에서 API를 제공할 때는 Django REST Framework 또는 Django Ninja를 함께 사용한다.

## Spring 대응 관계

기존 구조 경험을 매핑해 역할을 파악한다.

| Spring | FastAPI | Django |
| --- | --- | --- |
| `@RestController` | `APIRouter` | `views.py` + DRF `ViewSet` |
| `@Service` | 일반 함수·클래스 | `services.py` 관례 |
| `@Repository` | SQLAlchemy 세션 사용 코드 | Django ORM `Manager` |
| DTO·`@Valid` | Pydantic 모델 | DRF Serializer |
| `@ControllerAdvice` | 예외 핸들러 등록 | 예외 핸들러 설정 |
| `application.yml` | Pydantic Settings | `settings.py` |
| DI 컨테이너 | `Depends` | 프레임워크 규약과 직접 생성 |
| Filter·Interceptor | 미들웨어, 의존성 | 미들웨어 |

## 프로젝트 구조

기능이 늘어나도 경계가 유지되도록 계층을 나눈다.

```
src/order_api/
├── main.py              # 앱 생성과 라우터 등록
├── config.py            # 설정 정의와 로딩
├── api/
│   ├── deps.py          # 공통 의존성
│   └── v1/
│       ├── orders.py    # 라우터: 요청 수신과 응답 반환
│       └── schemas.py   # 요청·응답 모델
├── services/
│   └── order_service.py # 비즈니스 규칙과 트랜잭션 경계
├── repositories/
│   └── order_repo.py    # 데이터 접근 질의
├── models/
│   └── order.py         # ORM 매핑
└── core/
    ├── exceptions.py    # 도메인 예외 정의
    └── logging.py       # 로깅 설정
```

계층별 책임은 다음과 같다.

- 라우터: 입력 검증 결과를 받아 서비스를 호출하고 응답 모델로 변환한다. 비즈니스 판단을 두지 않는다.
- 서비스: 도메인 규칙을 수행하고 트랜잭션 경계를 정한다. 프레임워크 객체(Request, Response)를 참조하지 않는다.
- 리포지토리: 질의와 저장만 담당한다. 도메인 규칙을 두지 않는다.
- 모델: 테이블 매핑과 제약을 정의한다.

Django 프로젝트는 앱 단위 구조를 따르되 같은 원칙을 적용한다.

```
src/order_api/
├── settings/
│   ├── base.py
│   ├── local.py
│   └── prod.py
└── orders/
    ├── models.py
    ├── serializers.py
    ├── services.py
    ├── selectors.py     # 조회 전용 질의
    ├── views.py
    └── urls.py
```

## 애플리케이션 초기화

앱 생성과 라우터 등록은 한 곳에 모은다.

```python
# main.py
from contextlib import asynccontextmanager

from fastapi import FastAPI

from order_api.api.v1 import orders
from order_api.config import get_settings
from order_api.core.exceptions import register_exception_handlers


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    # 시작 시 연결 준비
    yield
    # 종료 시 자원 정리


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name, lifespan=lifespan)
    app.include_router(orders.router, prefix="/api/v1")
    register_exception_handlers(app)
    return app


app = create_app()
```

- 앱 객체를 만드는 함수를 두면 테스트에서 설정을 바꿔 생성할 수 있다.
- 커넥션 풀, 클라이언트 등 수명이 긴 자원은 `lifespan`에서 준비하고 정리한다.
- 임포트 시점에 실행되는 부수효과를 만들지 않는다.

## 설정 관리

설정은 타입이 있는 객체 하나로 모으고 환경 변수에서 읽는다.

```python
# config.py
from functools import lru_cache

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "order-api"
    debug: bool = False
    database_url: PostgresDsn
    jwt_secret: str
    request_timeout_seconds: float = 5.0


@lru_cache
def get_settings() -> Settings:
    return Settings()
```

적용 기준은 다음과 같다.

- 값의 출처는 환경 변수 하나로 통일한다.
- 필수 값은 기본값을 두지 않는다. 누락 시 기동 단계에서 실패해야 한다.
- 비밀 값은 로그와 예외 메시지에 출력하지 않는다.
- 환경별 차이는 값으로만 표현하고 코드 분기를 만들지 않는다.
- Django는 `settings/` 패키지를 환경별로 나누고 공통은 `base.py`에 둔다.

## 의존성 주입

FastAPI는 `Depends`로 요청 범위 자원을 주입한다.

```python
# api/deps.py
from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from order_api.config import Settings, get_settings
from order_api.db import session_scope


def get_db() -> Session:
    with session_scope() as session:
        yield session


DbSession = Annotated[Session, Depends(get_db)]
SettingsDep = Annotated[Settings, Depends(get_settings)]
```

```python
# api/v1/orders.py
from fastapi import APIRouter

from order_api.api.deps import DbSession
from order_api.services import order_service

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: DbSession) -> OrderResponse:
    order = order_service.get_order(db, order_id)
    return OrderResponse.model_validate(order)
```

- 공통 의존성은 `Annotated` 별칭으로 정의해 시그니처를 짧게 유지한다.
- 세션, 인증 사용자, 요청 컨텍스트처럼 요청마다 달라지는 값만 주입한다.
- 서비스 함수는 세션을 인자로 받고 프레임워크에 의존하지 않게 유지한다.

## 다음 단계

- 데이터 접근과 스키마 변경 기준을 정한다: [데이터 접근과 마이그레이션](./python_06_web_data_access_guide.md)

## 이력관리

- 2026-08-09: 프레임워크 선택 기준, Spring 대응 관계, 계층 구조, 앱 초기화와 설정·의존성 주입 기준 작성
