# CodeStream 기술문서

문제에 맞는 Master와 Playbook을 먼저 고르고 현재 AI 플랫폼의 실행 방법을 연결한다.

## 바로 시작하기

| 영역 | 용도 | 링크 |
| --- | --- | --- |
| Masters | 함께 문제를 해결할 전문가 선택 | [열기](./Masters/) |
| Playbooks | 기능 개발, 분석, 테스트와 전환 순서 선택 | [열기](./Playbooks/) |
| Codex | Codex 설정, Skill과 명령 확인 | [열기](./Platforms/Codex/) |
| Claude Code | Claude Code 설정, Skill·Agent와 명령 확인 | [열기](./Platforms/ClaudeCode/) |
| Pi | Pi 설치와 프로젝트 활용 | [열기](./PI/) |
| Git | 코드 변경과 협업 절차 | [열기](./Git/) |
| Python | Python 생태계와 웹 백엔드 구현 기준 | [열기](./Python/) |

저장소의 문서 역할과 사용 순서는 [README](https://github.com/codestreamkr/docs/blob/main/README.md)에서 확인한다.

## 문제에서 시작하기

현재 해결할 문제를 기준으로 Master와 Playbook을 함께 선택한다.

| 현재 상황 | 먼저 찾을 Master | 함께 볼 Playbook |
| --- | --- | --- |
| 아이디어는 있지만 사용자와 기능 범위가 불명확하다 | [잡스형](./Masters/jobs/product-planning.html) | [새로운 기능 만들기](./Playbooks/feature-development.html) |
| SQL이 느리거나 DB 부하 원인을 찾아야 한다 | [대부님](./Masters/godfather/query-tuning.html) | [어려운 문제 풀기](./Playbooks/difficult-problem-solving.html) |
| Spring 기능을 설계하거나 실제 코드로 구현해야 한다 | [로드형](./Masters/rod/) | [계획하고 구현하기](./Playbooks/planning-and-implementation.html) |
| 외부 API, 웹훅 또는 벤더 전환 구조가 필요하다 | [호페형](./Masters/hoppe/external-integration.html) | [구조 전환하기](./Playbooks/architecture-transition.html) |
| 기능의 위험을 찾고 회귀 테스트로 남겨야 한다 | [루신](./Masters/lucin/quality-assurance.html) | [분석하고 테스트하기](./Playbooks/analysis-and-testing.html) |
| Python 프로젝트의 환경, 구조와 운영 기준을 잡아야 한다 | [Python 개발 가이드](./Python/) | [계획하고 구현하기](./Playbooks/planning-and-implementation.html) |

실행할 AI를 정한 뒤 [Codex](./Platforms/Codex/) 또는 [Claude Code](./Platforms/ClaudeCode/) 연결 문서에서 Skill과 명령을 확인한다.

## Masters

Masters는 AI 제품과 관계없이 같은 이름과 역할로 사용한다.

| Master | 전문 분야 | 문서 |
| --- | --- | --- |
| 잡스형 | 서비스·제품 기획 | [열기](./Masters/jobs/product-planning.html) |
| 대부님 | 쿼리 튜닝 | [열기](./Masters/godfather/query-tuning.html) |
| 로드형 | Spring 개발 | [열기](./Masters/rod/) |
| 로드형 | Spring Data JPA | [열기](./Masters/rod/jpa.html) |
| 로드형 | Spring Security | [열기](./Masters/rod/security.html) |
| 로드형 | Spring MVC·REST API | [열기](./Masters/rod/mvc-rest-api.html) |
| 로드형 | Spring MyBatis | [열기](./Masters/rod/mybatis.html) |
| 호페형 | 외부 연동 설계 | [열기](./Masters/hoppe/external-integration.html) |
| 루신 | QA와 회귀 검증 | [열기](./Masters/lucin/quality-assurance.html) |

## 문제 해결 Playbooks

Playbook은 Codex와 Claude Code에서 공통으로 사용하는 작업 순서다.

| 목적 | 문서 |
| --- | --- |
| 안전하게 조사하고 수정한다 | [안전한 작업 흐름](./Playbooks/safe-work-cycle.html) |
| 프로젝트 작업 기준을 준비한다 | [프로젝트 준비하기](./Playbooks/project-setup.html) |
| 복잡한 문제의 담당과 결과를 정한다 | [어려운 문제 풀기](./Playbooks/difficult-problem-solving.html) |
| 아이디어를 기능으로 구현하고 검증한다 | [새로운 기능 만들기](./Playbooks/feature-development.html) |
| 개선 우선순위부터 실제 구현까지 연결한다 | [계획하고 구현하기](./Playbooks/planning-and-implementation.html) |
| 호출 흐름을 테스트로 연결한다 | [분석하고 테스트하기](./Playbooks/analysis-and-testing.html) |
| 레거시와 외부 의존을 단계적으로 바꾼다 | [구조 전환하기](./Playbooks/architecture-transition.html) |
| 반복 작업을 AI별 Skill·Agent로 구현한다 | [작업 방식 자동화하기](./Playbooks/workflow-automation.html) |

## Codex

Codex 문서는 현재 작업에 필요한 사용자 Skill과 실행 환경을 안내한다.

| 문서 | 링크 |
| --- | --- |
| Codex 가이드 | [열기](./Platforms/Codex/) |
| 환경 설정 | [열기](./Platforms/Codex/setup.html) |
| 사용자 Skill | [열기](./Platforms/Codex/skills.html) |
| 작업 흐름 | [열기](./Platforms/Codex/workflows.html) |
| 확장 기능 | [열기](./Platforms/Codex/extensions.html) |
| 명령 확인 | [열기](./Platforms/Codex/commands.html) |

## Claude Code

Claude Code 문서는 현재 적용된 Command와 앞으로 적용할 Skill을 구분한다.

| 문서 | 링크 |
| --- | --- |
| Claude Code 사용 안내 | [열기](./Platforms/ClaudeCode/) |
| Claude Code 시작하기 | [열기](./Platforms/ClaudeCode/getting-started.html) |
| 프로젝트 설정 | [열기](./Platforms/ClaudeCode/project-configuration.html) |
| Master 연결표와 적용 상태 | [열기](./Platforms/ClaudeCode/master-bindings.html) |
| Skill·Command 연결 | [열기](./Platforms/ClaudeCode/skill-usage.html) |
| 확장 기능 | [열기](./Platforms/ClaudeCode/extensions.html) |
| CLI 명령 참조 | [열기](./Platforms/ClaudeCode/cli-reference.html) |

## Pi

Pi는 기존 학습 과정을 유지한다.

| 번호 | 문서 | 링크 |
| --- | --- | --- |
| 안내 | Pi 학습 가이드 | [열기](./PI/) |
| 01 | Pi 시작하기 | [열기](./PI/01-getting-started-and-key-concepts.html) |
| 02 | Pi 기본 개념 | [열기](./PI/02-understanding-core-concepts.html) |
| 03 | Pi 확장과 자동화 | [열기](./PI/03-applying-core-concepts.html) |
| 04 | 프로젝트 시작 | [열기](./PI/04-starting-a-project.html) |
| 05 | 프로젝트 코딩 | [열기](./PI/05-project-cooking.html) |
| 06 | Pi 기본 명령 | [열기](./PI/06-basic-commands.html) |
| 07 | Spring·Java 분석과 테스트 | [열기](./PI/07-analysis-and-testing.html) |

## Git

Git 문서는 플랫폼과 관계없이 코드 변경과 협업에 사용한다.

| 번호 | 문서 | 링크 |
| --- | --- | --- |
| 안내 | 개발자를 위한 Git 필수 가이드 | [열기](./Git/) |
| 01 | 상태와 변경 확인 | [열기](./Git/git_01_worktree_guide.html) |
| 02 | 변경 확인과 커밋 | [열기](./Git/git_02_apply_guide.html) |
| 03 | 되돌리기와 복구 | [열기](./Git/git_03_reset_rebase_revert_guide.html) |
| 04 | 브랜치와 원격 협업 | [열기](./Git/git_04_branch_remote_guide.html) |
| 05 | 변경 통합과 충돌 해결 | [열기](./Git/git_05_integration_conflict_guide.html) |

## Python

Python 문서는 생태계 기반을 먼저 다루고 웹 백엔드 구현으로 이어진다.

| 번호 | 문서 | 링크 |
| --- | --- | --- |
| 안내 | 개발자를 위한 Python 개발 가이드 | [열기](./Python/) |
| 01 | Python 생태계 지도 | [열기](./Python/python_01_ecosystem_overview.html) |
| 02 | 실행 환경과 가상환경 | [열기](./Python/python_02_runtime_environment_guide.html) |
| 03 | 패키징과 의존성 관리 | [열기](./Python/python_03_packaging_dependency_guide.html) |
| 04 | 코드 품질 도구 | [열기](./Python/python_04_quality_tools_guide.html) |
| 05 | 웹 백엔드 구조 선택 | [열기](./Python/python_05_web_backend_structure_guide.html) |
| 06 | 데이터 접근과 마이그레이션 | [열기](./Python/python_06_web_data_access_guide.html) |
| 07 | API 계약과 인증 | [열기](./Python/python_07_web_api_contract_guide.html) |
| 08 | 실행과 운영 | [열기](./Python/python_08_web_runtime_operations_guide.html) |

## 공통 안내

- [저장소 사용 안내](https://github.com/codestreamkr/docs/blob/main/README.md)
- [라이선스 원문](./LICENSE)
- [제3자 권리와 브랜드 자산 고지](./NOTICE.html)
