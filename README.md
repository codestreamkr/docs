# CodeStream 기술문서

새로운 기능을 만들고 어려운 문제를 푸는 공통 작업 방식과,  
AI별 실행 방법을 안내해요.

먼저 필요한 결과에 맞는 Playbook을 골라요.  
플랫폼 문서는 같은 작업을 각 도구에서 실행하는 설정, Skill과 명령만 다뤄요.

## 처음 시작하기

지금 목적에 맞는 경로를 골라요.

1. 필요한 결과에 맞는 흐름을 골라요: [Playbook](./Playbooks/README.md)
2. CodeStream 사용자 Skill(`ct-*`)은  
   [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
   clone과 배치 절차는 해당 저장소를 따라요.
3. 지금 쓰는 AI의 실행 방법을 확인해요:  
   [Codex](./Platforms/Codex/README.md), [Claude Code](./Platforms/ClaudeCode/README.md),  
   [Grok Build](./Platforms/GrokBuild/README.md) 또는 [Pi](./Platforms/Pi/README.md)
4. 코드 변경과 협업이 필요하면 [Git 필수 가이드](./Git/README.md)를 연결해요.
5. Python 프로젝트를 맡으면  
   [Python 개발 가이드](./Python/README.md)에서 환경과 구현 기준을 확인해요.
6. 개발용 Mac의 상주 프로세스와 저장공간을 정리하려면  
   [macOS 개발 머신 관리 가이드](./Macos/README.md)를 사용해요.

웹 목차에서 전체 문서를 찾으려면  
[CodeStream 기술문서 목록](./index.md)을 사용해요.

## 문서 구성

각 영역은 하나의 책임만 담당해요.

| 영역 | 책임 | 시작 문서 |
| --- | --- | --- |
| Playbooks | 문제 유형별로 어떤 결과를<br>어떤 순서로 만들지 | [Playbook](./Playbooks/README.md) |
| Codex | 환경 설정, 사용자 Skill,<br>작업 흐름과 명령 확인 | [Codex 가이드](./Platforms/Codex/README.md) |
| Claude Code | 환경 설정, 사용자 Skill,<br>작업 흐름과 명령 확인 | [Claude Code 가이드](./Platforms/ClaudeCode/README.md) |
| Grok Build | 환경 설정, 사용자 Skill,<br>모델 연결과 확장 기능 | [Grok Build 가이드](./Platforms/GrokBuild/README.md) |
| Pi | 환경 설정, 사용자 Skill,<br>Extension과 모델 연결 | [Pi 가이드](./Platforms/Pi/README.md) |
| Git | 변경 확인, 커밋, 복구,<br>브랜치와 충돌 해결 | [Git 필수 가이드](./Git/README.md) |
| Python | Python 생태계 이해와<br>웹 백엔드 구현 기준 | [Python 개발 가이드](./Python/README.md) |
| Macos | 개발용 Mac의 상주 프로세스와<br>저장공간 관리 | [macOS 개발 머신 관리 가이드](./Macos/README.md) |

## 지금 필요한 일

문제 상황에서 바로 시작해요.

| 필요한 일 | Playbook |
| --- | --- |
| 아이디어를 기능 범위와 완료 조건으로 구체화해요 | [01 무엇을 만들지 정하기](./Playbooks/01-define-scope.md) |
| 확정된 계획을 코드로 반영하고 검증해요 | [02 기능 구현하고 검증하기](./Playbooks/02-implement-and-verify.md) |
| 낯선 코드의 실제 동작을 파악해요 | [03 낯선 코드 파악하기](./Playbooks/03-understand-code.md) |
| 느린 SQL의 원인을 찾고 개선해요 | [04 느린 SQL 개선하기](./Playbooks/04-tune-sql.md) |
| 레거시 구조를 안전한 순서로 바꿔요 | [05 구조 전환하기](./Playbooks/05-transition-structure.md) |
| 결제·인증·메시징을 연동하거나 공급자를 바꿔요 | [06 외부 서비스 연동하기](./Playbooks/06-integrate-external.md) |
| 기능의 결함과 위험을 검증해요 | [08 오픈 전 품질 검증하기](./Playbooks/08-verify-before-release.md) |

## AI별 구현 기준

같은 Skill을 어느 플랫폼에서 호출해도  
필수 입력과 결과 기준은 같아요.  
다른 건 호출 표기와 실행 방법뿐이에요.  
Codex는 `$ct-*`, Claude Code와 Grok Build은 `/ct-*`, Pi는 `/skill:ct-*`를 사용해요.

## Git 문서 활용

Git 과정은 공통 학습 가이드에서 시작하고,  
필요한 작업 문서로 이동해요.

- 전체 학습 순서와 완료 기준: [개발자를 위한 Git 필수 가이드](./Git/README.md)
- 작업 상태와 변경 범위 확인: [Git 상태와 변경 확인](./Git/git_01_worktree_guide.md)
- 안전한 커밋 작성: [Git 변경 확인과 커밋](./Git/git_02_apply_guide.md)
- 브랜치 생성과 원격 동기화: [Git 브랜치와 원격 협업](./Git/git_04_branch_remote_guide.md)
- merge, rebase와 충돌 처리: [Git 변경 통합과 충돌 해결](./Git/git_05_integration_conflict_guide.md)
- 로컬 변경과 공유 커밋 복구: [Git 되돌리기와 복구](./Git/git_03_reset_rebase_revert_guide.md)

## Python 문서 활용

Python 과정은 생태계 기반 문서를 먼저 읽고,  
웹 백엔드 문서로 이어가요.

- 전체 학습 순서와 완료 기준: [Python 개발 가이드](./Python/README.md)
- 구성 요소와 버전 정책 이해: [Python 생태계 지도](./Python/python_01_ecosystem_overview.md)
- 실행 환경 고정과 격리: [실행 환경과 가상환경](./Python/python_02_runtime_environment_guide.md)
- 의존성 선언과 재현: [패키징과 의존성 관리](./Python/python_03_packaging_dependency_guide.md)
- 린트·타입·테스트 기준: [코드 품질 도구](./Python/python_04_quality_tools_guide.md)
- 프레임워크 선택과 계층 구조: [웹 백엔드 구조 선택](./Python/python_05_web_backend_structure_guide.md)
- ORM 세션과 스키마 변경: [데이터 접근과 마이그레이션](./Python/python_06_web_data_access_guide.md)
- 요청 검증, 예외와 인증: [API 계약과 인증](./Python/python_07_web_api_contract_guide.md)
- 실행 모델, 테스트와 배포: [실행과 운영](./Python/python_08_web_runtime_operations_guide.md)

## macOS 문서 활용

개발 머신을 대상으로 하는 작업은  
되돌릴 수 있는 순서로 진행해요.

- 전체 원칙과 상태 확인 명령: [macOS 개발 머신 관리 가이드](./Macos/README.md)
- 자동 실행 항목 정리와 캐시 비우기: [백그라운드 프로세스와 캐시 정리](./Macos/macos_01_background_cleanup_guide.md)

프로젝트의 빌드·실행 절차는  
[09 실행 환경 준비하기](./Playbooks/09-prepare-runtime.md)에서 다뤄요.

## 문서 사용 기준

제품 기능과 명령은 공식 자료와 지금 설치 환경으로 확인한 내용만 적어요.  
확인되지 않은 내용은 `확인 필요`로 표시해요.

문서를 수정할 때는 아래 기준을 따라요.

- 본문은 해요체로 작성해요.  
  짧고 명확한 문장만 남기고, 없어도 의미가 같은 단어는 빼요.
- 마침표 뒤에는 줄을 바꿔요.  
  긴 문장은 글자 수가 아니라 의미 단위로 나눠요.  
  화면에도 줄이 바뀌도록 줄 끝에 공백 두 개를 넣어요.
- 같은 내용은 한곳에만 적고 나머지는 링크해요.
- Playbook에는 Skill 호출 표기를 쓰지 않아요.  
  호출 표기는 플랫폼 문서가 관리해요.
- 새 제품을 추가해도 작업 흐름은 복사하지 않고 Playbook을 링크해요.
- `Platforms/<제품>`은 `README.md`, `setup.md`, `skills.md`, `commands.md`, `workflows.md`, `extensions.md`로 고정해요.  
  제품 전용 학습 자료는 `reference/`에 둬요.
- 본문은 한국어로 작성해요.  
  코드명, 파일명, 명령, API명과 제품명은 원문 표기를 유지해요.
- 문서에 이력관리 섹션을 두지 않아요.
- 내부 링크는 저장소 기준 상대 경로를 사용해요.
- 문서를 추가, 이동하거나 이름을 바꾸면  
  `README.md`, `index.md`와 해당 영역 `README.md`의 링크를 함께 갱신해요.
- 코드 블록 안의 에이전트 지침 예제(`AGENTS.md`, `CLAUDE.md`, Skill 본문)는 한다체를 유지해요.

## 라이선스와 고지

저장소에서 직접 작성한 문서와 예제는 [MIT License](./LICENSE)를 따라요.

외부 서비스명, 상표, 브랜드 자산에는 각 권리자의 정책이 적용돼요.  
상세 범위는 [NOTICE.md](./NOTICE.md)를 확인해요.
