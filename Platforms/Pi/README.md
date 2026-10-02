# Pi 가이드

Pi는 터미널에서 여는 대화형 코딩 에이전트예요.  
프로젝트 폴더에서 세션을 연 뒤 입력창에 자연어 요청이나 `/skill:` 명령을 입력해 작업해요.

문제 유형별 작업 순서는 [Playbook](../../Playbooks/README.md)에서 관리해요.  
이 가이드는 Pi에서 세션을 열고, 사용자 Skill과 확장 기능을 사용하는 방법을 다뤄요.

## 바로 시작

1. 프로젝트 루트의 터미널에서 Pi 세션을 열어요.

```bash
pi
```

2. 시작 화면에서 로드된 지침 파일과 Skill을 확인해요.
3. Pi 입력창에서 필요한 Skill을 호출하거나 작업을 자연어로 요청해요.
4. 결과와 변경 내용을 확인한 뒤 다음 요청을 이어서 입력해요.

```text
/skill:ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 현재 코드의 동작과 영향 범위 분석 | `ct-analyze` | `/skill:ct-analyze` |
| 개발 문제 탐색과 작업 계획 | `ct-plan` | `/skill:ct-plan` |
| 확정된 작업의 실행·검증과 완료 기록 | `ct-apply` | `/skill:ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` | `/skill:ct-verify` |
| Markdown 문서 생성과 형식 정리 | `ct-docs-md-format` | `/skill:ct-docs-md-format` |
| Git 이력의 월별·주차별 업무 보고 | `ct-docs-weekly-report` | `/skill:ct-docs-weekly-report` |
| 원격 Confluence API 작업 | `ct-wiki-api` | `/skill:ct-wiki-api` |
| 저장소 안의 Markdown 위키 운영 | `ct-wiki-ops` | `/skill:ct-wiki-ops` |

## Pi의 작업 방식

Pi는 가벼운 기본 기능에 Skill, Prompt Template, Extension, Theme, Package를 더하는 구조예요.  
기본 세션에서 모델을 고르고 요청을 이어 가며, 반복되는 절차와 도구 연결만 필요한 범위로 확장해요.

| 하려는 것 | 세션에서 하는 일 | 자세히 |
| --- | --- | --- |
| 모델과 추론 수준 변경 | `/model`, `/thinking` 입력 | [환경 설정](./setup.md#모델과-추론-수준) |
| 이전 작업 계속하기 | `/resume` 입력 | [명령 확인](./commands.md#입력창에서-사용) |
| 현재 변경 검토 | 입력창에 검토 기준을 요청 | [작업 흐름](./workflows.md#변경-확인과-검토) |
| 반복 절차 호출 | `/skill:이름` 입력 | [사용자 Skill](./skills.md) |
| 프롬프트·도구·이벤트 확장 | 필요한 자원을 설치·설정 | [확장 기능](./extensions.md) |
| 스크립트에서 실행 | 터미널에서 `pi -p` 실행 | [확장 기능](./extensions.md#실행-모드와-내장) |

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, 인증, 지침, 권한과 설정 | [환경 설정](./setup.md) |
| 입력창 명령과 터미널 명령의 구분 | [명령 확인](./commands.md) |
| 사용자 Skill의 입력과 결과 | [사용자 Skill](./skills.md) |
| 세션에서 작업을 연결하고 검토하는 방법 | [작업 흐름](./workflows.md) |
| Extension, Prompt Template, Package와 자동화 | [확장 기능](./extensions.md) |

## 사용 기준

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.
- 일상 작업은 새 `pi` 명령을 반복 실행하지 않고 이미 열린 세션의 입력창에서 요청을 이어 가요.
- 터미널 명령은 Pi 설치·시작·관리, Git 상태 확인, 비대화형 자동화처럼 셸이 필요한 경우에만 써요.
- Git 상태와 변경 내용은 터미널에서 직접 확인하거나 Pi 세션에 자연어로 확인을 요청해요.
- 프로젝트의 `.pi/` 자원과 `.agents/skills/`는 내용을 확인한 뒤 신뢰해요.
- 현재 설치본과 [Pi 공식 문서](https://pi.dev/docs/latest)를 기준으로 기능과 명령을 확인해요.

## 심화 학습 자료

| 주제 | 문서 |
| --- | --- |
| 설치, 인증과 첫 세션 | [01. Pi 시작하기](./reference/01-getting-started-and-key-concepts.md) |
| 화면, 모델, 세션과 자원 | [02. Pi 기본 개념](./reference/02-understanding-core-concepts.md) |
| Extension, Package, SDK와 RPC | [03. Pi 확장과 자동화](./reference/03-applying-core-concepts.md) |
| 프로젝트 최초 준비 | [04. 프로젝트 시작](./reference/04-starting-a-project.md) |
| 반복 개발 흐름 | [05. 프로젝트 코딩](./reference/05-project-cooking.md) |
| 명령과 단축키 상세 | [06. Pi 기본 명령](./reference/06-basic-commands.md) |
| Spring·Java 분석과 테스트 | [07. Spring/Java 프로젝트 분석과 테스트](./reference/07-analysis-and-testing.md) |

예제 Package는 [`examples/basic-pi-package`](./examples/basic-pi-package/)에 있어요.  
이 문서는 설치본 Pi `0.87.1`과 공식 문서를 기준으로 확인했어요.
