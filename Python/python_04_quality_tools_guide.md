# 코드 품질 도구

이 문서는 Python 프로젝트에서 사용하는 포맷, 린트, 타입 검사, 테스트 도구의 역할과 적용 기준을 안내한다.

Python은 컴파일 단계가 없으므로 실행 전에 문제를 잡는 일을 도구가 담당한다. 각 도구가 잡는 문제를 구분해야 실패 원인을 빠르게 판단할 수 있다.

## 도구 구성

네 가지 검사를 항상 같은 순서로 실행한다.

| 순서 | 도구 | 잡는 문제 | 실패 시 판단 |
| --- | --- | --- | --- |
| 1 | Ruff format | 코드 형식 불일치 | 자동 수정으로 해결 |
| 2 | Ruff check | 미사용 임포트, 위험한 패턴, 스타일 위반 | 대부분 자동 수정, 일부 코드 변경 |
| 3 | mypy 또는 Pyright | 타입 불일치, 잘못된 인자, None 처리 누락 | 코드 또는 타입 선언 수정 |
| 4 | pytest | 동작 결함 | 구현 또는 테스트 수정 |

## Ruff

포맷과 린트를 하나의 도구로 처리한다. 기존 프로젝트의 Black, isort, Flake8 조합을 대체한다.

```bash
uv run ruff format .          # 포맷 적용
uv run ruff format --check .  # CI에서 형식 검사만 수행
uv run ruff check .           # 린트 검사
uv run ruff check . --fix     # 자동 수정 가능한 항목 적용
```

설정은 `pyproject.toml`에 둔다.

```toml
[tool.ruff]
line-length = 100
target-version = "py313"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM"]
ignore = ["E501"]

[tool.ruff.lint.per-file-ignores]
"tests/*" = ["S101"]
```

- `select`: 적용할 규칙군을 명시한다. `E`·`F`는 기본 오류, `I`는 임포트 정렬, `UP`은 최신 문법 전환, `B`는 버그 유발 패턴, `SIM`은 단순화 제안이다.
- `ignore`: 팀이 합의한 예외만 남긴다.
- 개별 예외는 `# noqa: <규칙코드>` 형태로 사유와 함께 남긴다.

## 타입 검사

타입 힌트는 선택 사항이지만, 웹 백엔드 프로젝트에서는 경계 코드에 반드시 적용한다.

적용 우선순위는 다음과 같다.

- 필수: 함수 시그니처(인자와 반환 타입), API 요청·응답 모델, 외부 연동 클라이언트
- 권장: 서비스 계층의 공개 함수, 도메인 데이터 구조
- 선택: 지역 변수, 짧은 내부 헬퍼

```bash
uv run mypy src
```

```toml
[tool.mypy]
python_version = "3.13"
strict = true
warn_unused_ignores = true

[[tool.mypy.overrides]]
module = ["legacy.*"]
ignore_errors = true
```

- 새 프로젝트는 `strict = true`로 시작한다.
- 기존 프로젝트는 검사 대상 경로를 좁게 잡고 모듈 단위로 넓힌다.
- 타입 무시는 `# type: ignore[<오류코드>]`처럼 코드를 명시한다.
- mypy 대신 Pyright를 쓰는 팀은 하나만 CI에 연결한다.

## pytest

테스트는 함수 단위로 작성하고 파일 이름은 `test_`로 시작한다.

```python
import pytest

from order_api.services import calculate_total


def test_할인이_적용된_총액을_계산한다() -> None:
    assert calculate_total(price=10000, discount_rate=0.1) == 9000


@pytest.mark.parametrize(
    ("discount_rate", "expected"),
    [(0.0, 10000), (0.5, 5000), (1.0, 0)],
)
def test_할인율에_따라_총액이_바뀐다(discount_rate: float, expected: int) -> None:
    assert calculate_total(price=10000, discount_rate=discount_rate) == expected
```

구성 요소는 다음과 같다.

- `assert`: 별도 단언 API 없이 파이썬 기본 문을 쓴다. 실패 시 값이 자동으로 출력된다.
- `fixture`: 테스트 준비와 정리를 담당한다. 공용 fixture는 `conftest.py`에 둔다.
- `parametrize`: 입력만 다른 케이스를 한 함수로 묶는다.
- `marker`: 테스트 계층을 구분한다. 예: `@pytest.mark.integration`

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-q --strict-markers"
markers = ["integration: 외부 자원이 필요한 테스트"]
```

실행 예시는 다음과 같다.

```bash
uv run pytest                          # 전체
uv run pytest tests/test_orders.py     # 파일 단위
uv run pytest -k "할인"                 # 이름으로 선택
uv run pytest -m "not integration"     # 마커 제외
uv run pytest --cov=src --cov-report=term-missing
```

웹 애플리케이션 테스트 작성 기준은 [실행과 운영](./python_08_web_runtime_operations_guide.md)에서 다룬다.

## pre-commit

커밋 시점에 형식과 린트를 자동으로 적용한다.

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.6.9
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format
```

```bash
uv run pre-commit install         # 훅 설치
uv run pre-commit run --all-files # 전체 파일에 적용
```

- 커밋 훅에는 빠른 검사만 넣는다. 타입 검사와 테스트는 CI에서 실행한다.
- 도구 버전은 `rev`로 고정하고 정기적으로 갱신한다.

## CI 검증 순서

파이프라인은 빠르게 실패하는 순서로 구성한다.

```bash
uv sync --frozen
uv run ruff format --check .
uv run ruff check .
uv run mypy src
uv run pytest
```

## 기존 프로젝트에 도입하기

한 번에 전체를 고치지 않고 단계적으로 적용한다.

1. Ruff format을 전체 적용하고 형식 변경만 담은 커밋을 따로 만든다.
2. Ruff check를 최소 규칙군으로 켜고 자동 수정을 적용한다.
3. 타입 검사를 신규 코드 경로에만 적용한다.
4. 회귀 위험이 큰 기능부터 테스트를 추가한다.
5. CI에 검사를 연결하고 실패를 차단 조건으로 바꾼다.

## 다음 단계

- 웹 프레임워크와 프로젝트 구조를 정한다: [웹 백엔드 구조 선택](./python_05_web_backend_structure_guide.md)

## 이력관리

- 2026-08-09: Ruff, 타입 검사, pytest, pre-commit의 역할과 설정 기준, CI 검증 순서와 기존 프로젝트 도입 절차 작성
