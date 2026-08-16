# 패키징과 의존성 관리

이 문서는 프로젝트 메타데이터와 의존성을 선언하고 동일한 환경을 재현하는 기준을 안내한다.

Python은 의존성 관리 도구가 여러 개이므로 프로젝트마다 하나를 정해 끝까지 사용한다. 도구가 달라도 선언 파일과 lock 파일의 역할은 같다.

## pyproject.toml

프로젝트의 메타데이터, 의존성, 도구 설정을 모두 담는 표준 파일이다.

```toml
[project]
name = "order-api"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    "fastapi>=0.115",
    "sqlalchemy>=2.0",
    "pydantic-settings>=2.0",
]

[dependency-groups]
dev = [
    "pytest>=8.0",
    "ruff>=0.6",
    "mypy>=1.11",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.ruff]
line-length = 100
```

각 섹션의 책임은 다음과 같다.

- `[project]`: 이름, 버전, 지원 Python 범위, 런타임 의존성
- `[dependency-groups]`: 개발·테스트 전용 의존성. 배포 산출물에 포함하지 않는다.
- `[build-system]`: 패키지를 빌드할 백엔드. 애플리케이션만 배포하면 생략할 수 있다.
- `[tool.*]`: Ruff, mypy, pytest 등 도구 설정. 별도 설정 파일 대신 여기에 모은다.

## 버전 범위 지정

운영 안정성과 보안 업데이트를 함께 고려해 범위를 정한다.

- 하한만 지정(`>=2.0`): 기본 선택. lock 파일이 실제 버전을 고정한다.
- 상한 추가(`>=2.0,<3.0`): 다음 메이저에서 호환이 깨지는 라이브러리에만 적용한다.
- 정확한 고정(`==2.0.1`): 선언 파일에는 쓰지 않는다. 고정은 lock 파일의 역할이다.
- 선택 의존성: 대괄호 표기로 추가한다. 예: `uvicorn[standard]`

## lock 파일

lock 파일은 전이 의존성까지 포함한 실제 설치 버전을 기록한다.

- 목적: 로컬, CI, 운영에서 같은 패키지 집합을 설치한다.
- 커밋 대상: 애플리케이션 프로젝트는 반드시 커밋한다. 배포용 라이브러리는 커밋하지 않는다.
- 갱신 시점: 의존성을 추가·삭제하거나 정기 업데이트를 적용할 때 갱신하고 선언 파일과 함께 커밋한다.
- 리뷰 기준: lock 파일 변경만 있는 PR은 어떤 패키지가 왜 바뀌었는지 설명을 남긴다.

## 도구별 명령 대응

프로젝트가 쓰는 도구에 맞는 열을 사용한다.

| 작업 | uv | pip + venv | Poetry |
| --- | --- | --- | --- |
| 환경 동기화 | `uv sync` | `pip install -r requirements.txt` | `poetry install` |
| 의존성 추가 | `uv add fastapi` | `pip install fastapi` 후 파일 수정 | `poetry add fastapi` |
| 개발 의존성 추가 | `uv add --dev pytest` | 별도 파일에 기록 | `poetry add --group dev pytest` |
| 의존성 제거 | `uv remove fastapi` | `pip uninstall` 후 파일 수정 | `poetry remove fastapi` |
| lock 갱신 | `uv lock` | `pip-compile`(pip-tools) | `poetry lock` |
| 명령 실행 | `uv run pytest` | 활성화 후 `pytest` | `poetry run pytest` |
| 설치 목록 확인 | `uv pip list` | `pip list` | `poetry show` |

선택 기준은 다음과 같다.

- 새 프로젝트: uv를 기본으로 한다. 설치 속도가 빠르고 인터프리터·가상환경·lock을 한 도구로 처리한다.
- pip만 쓰는 기존 프로젝트: pip-tools로 lock 파일을 도입한 뒤 단계적으로 전환한다.
- Poetry 사용 프로젝트: 그대로 유지한다. 도구를 섞어 쓰지 않는다.

## 소스 레이아웃

임포트 경로 혼선을 줄이려면 `src/` 레이아웃을 사용한다.

```
order-api/
├── pyproject.toml
├── uv.lock
├── .python-version
├── src/
│   └── order_api/
│       ├── __init__.py
│       └── main.py
└── tests/
    └── test_orders.py
```

- 패키지 이름은 소문자와 밑줄만 사용한다.
- 테스트 디렉터리는 패키지 밖에 둔다.
- 로컬 개발 중에는 편집 가능 설치로 소스 변경이 즉시 반영된다. `uv sync`는 이 설치를 자동으로 처리한다.

## 의존성 추가 기준

패키지를 추가하기 전에 다음을 확인한다.

- 표준 라이브러리로 해결되는지 먼저 확인한다.
- 최근 릴리스 이력과 지원 Python 버전을 확인한다.
- 라이선스가 프로젝트 정책과 맞는지 확인한다.
- 전이 의존성이 기존 패키지와 충돌하지 않는지 설치 결과로 확인한다.
- 이름이 유사한 패키지를 잘못 설치하지 않도록 공식 저장소 주소를 확인한다.

## 재현성 확인

CI에서는 lock 파일과 실제 설치가 일치하는지 검증한다.

```bash
uv sync --frozen              # lock 파일을 갱신하지 않고 설치
uv lock --check               # lock 파일이 최신인지 확인
```

pip 기반 프로젝트는 해시가 포함된 요구사항 파일로 설치한다.

```bash
pip install --require-hashes -r requirements.lock
```

## 다음 단계

- 코드 품질 검사 기준을 정한다: [코드 품질 도구](./python_04_quality_tools_guide.md)

