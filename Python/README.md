# 개발자를 위한 Python 개발 가이드

이 문서는 Python 생태계의 구성 요소를 이해하고 웹 백엔드 프로젝트를 실제로 운영할 수 있는 기준을 안내한다.

Java·Spring 경험이 있는 개발자가 Python 프로젝트에 투입될 때 필요한 판단 기준을 중심으로 정리했다. 언어 문법은 다루지 않고, 무엇을 선택하고 어떤 기준으로 유지할지에 집중한다.

## 학습 순서

앞 문서에서 정한 기준을 다음 문서에서 그대로 사용한다.

| 순서 | 문서 | 익혀야 할 내용 |
| --- | --- | --- |
| 1 | [Python 생태계 지도](./python_01_ecosystem_overview.md) | 인터프리터, 표준 라이브러리, PyPI, PEP, 버전 정책 |
| 2 | [실행 환경과 가상환경](./python_02_runtime_environment_guide.md) | 버전 고정, 가상환경, 인터프리터 분리 |
| 3 | [패키징과 의존성 관리](./python_03_packaging_dependency_guide.md) | `pyproject.toml`, uv·pip·Poetry, lock 파일, 재현성 |
| 4 | [코드 품질 도구](./python_04_quality_tools_guide.md) | Ruff, 타입 검사, pytest, pre-commit |
| 5 | [웹 백엔드 구조 선택](./python_05_web_backend_structure_guide.md) | FastAPI·Django·Flask 선택 기준, 계층 구조, 설정 |
| 6 | [데이터 접근과 마이그레이션](./python_06_web_data_access_guide.md) | SQLAlchemy, Django ORM, 세션·트랜잭션, 스키마 변경 |
| 7 | [API 계약과 인증](./python_07_web_api_contract_guide.md) | 요청 검증, 응답 형식, 예외 처리, 인증·인가 |
| 8 | [실행과 운영](./python_08_web_runtime_operations_guide.md) | 동기·비동기 실행 모델, 테스트, 로깅, 배포 |

## 매일 사용하는 작업 흐름

프로젝트를 열고 변경하고 검증할 때 같은 순서를 사용한다.

```bash
# 환경 준비
uv sync                      # lock 파일 기준으로 가상환경 동기화
source .venv/bin/activate    # Windows: .venv\Scripts\activate

# 변경 전후 검증
uv run ruff format .
uv run ruff check . --fix
uv run mypy src
uv run pytest

# 실행
uv run uvicorn app.main:app --reload
```

`uv`를 쓰지 않는 프로젝트는 3번 문서의 pip·Poetry 대응 명령을 사용한다. 실행 명령, 대상 경로와 검증 범위는 프로젝트 규칙을 따른다.

## 개발자 필수 완료 기준

다음 항목을 설명하고 직접 수행할 수 있어야 한다.

- 프로젝트가 요구하는 Python 버전을 확인하고 같은 버전으로 실행 환경을 만든다.
- 가상환경을 만들고 활성화 여부를 확인한다.
- `pyproject.toml`에서 의존성, 개발 의존성과 도구 설정을 읽는다.
- lock 파일 기준으로 동일한 의존성 집합을 재현한다.
- 새 의존성을 추가하고 lock 파일까지 함께 커밋한다.
- 포맷, 린트, 타입 검사, 테스트를 각각 실행하고 실패 원인을 구분한다.
- 프로젝트가 사용하는 웹 프레임워크의 요청 처리 흐름을 설명한다.
- 요청 모델과 응답 모델을 정의하고 검증 실패 응답을 확인한다.
- ORM 세션과 트랜잭션 경계가 어디서 열리고 닫히는지 설명한다.
- 스키마 변경을 마이그레이션 파일로 남기고 적용·롤백한다.
- 동기 처리와 비동기 처리 중 어느 경로에서 실행되는 코드인지 구분한다.
- 로컬 실행 명령과 배포 실행 명령의 차이를 설명한다.

## 팀에서 별도로 정할 기준

프로젝트마다 다음 항목을 명시한다.

- 지원 Python 버전과 업그레이드 주기
- 의존성 관리 도구와 lock 파일 갱신 절차
- 소스 레이아웃(`src/` 사용 여부)과 패키지 이름 규칙
- 린트·타입 검사 적용 범위와 예외 허용 기준
- 테스트 계층 구분과 필수 통과 대상
- 마이그레이션 검토·적용 담당과 배포 순서
- 로그 형식, 민감정보 제외 항목과 관측 도구

## 함께 사용하는 문서

작업 단계는 공통 Playbook을 따른다.

- [안전한 작업 흐름](../Playbooks/safe-work-cycle.md)
- [프로젝트 준비하기](../Playbooks/project-setup.md)
- [계획하고 구현하기](../Playbooks/planning-and-implementation.md)
- [분석하고 테스트하기](../Playbooks/analysis-and-testing.md)
- [Git 필수 가이드](../Git/README.md)

## 앞으로 추가할 문서

현재 문서는 공통 생태계와 웹 백엔드만 다룬다. 다음 영역은 이후에 작성한다.

- TODO: 데이터·AI 영역(pandas, NumPy, Jupyter, 학습·추론 라이브러리, 데이터 파이프라인)
- TODO: 컨테이너·배포 심화(Docker 이미지 구성, 멀티스테이지 빌드, CI 파이프라인)
- TODO: 비동기 작업 처리(Celery, 스케줄러, 메시지 큐 연동)
- TODO: 라이브러리 배포(PyPI 배포, 버전 정책, 사내 인덱스 운영)

## 이력관리

- 2026-08-09: Python 생태계 이해와 웹 백엔드 실무 기준을 담은 학습 순서, 작업 흐름, 완료 기준을 작성하고 미작성 영역을 TODO로 정리
