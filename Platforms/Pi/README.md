# Pi 가이드

프로젝트에서 할 일을 고르고 필요한 사용자 Skill을 직접 호출해요.

문제 유형별 작업 흐름은 [Playbook](../../Playbooks/README.md)에서 관리해요.  
이 가이드는 Pi의 설정, Skill 호출과 확장 기능만 다뤄요.

## 바로 시작

1. 프로젝트 루트에서 `pi`를 실행해요.
2. 시작 화면에서 불러온 Skill과 지침 파일을 확인해요.
3. Skill만 호출해 역할, 필요한 입력과 예제를 확인해요.
4. 원하는 결과와 대상을 자연어로 이어서 실행해요.

```text
/skill:ct-plan-work
/skill:ct-plan-work 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 제품·설계·구현·구조 전환·개선 계획 | `ct-plan-work` | `/skill:ct-plan-work` |
| Spring 구현과 검토 | `ct-code-spring` | `/skill:ct-code-spring` |
| 호출과 데이터 흐름 분석 | `ct-code-tree` | `/skill:ct-code-tree` |
| 호출 흐름 기반 테스트 | `ct-code-tree-test` | `/skill:ct-code-tree-test` |
| QA와 회귀 검증 | `ct-qa-flow` | `/skill:ct-qa-flow` |
| SQL 성능 분석 | `ct-data-query` | `/skill:ct-data-query` |
| 외부 서비스 연동과 이관 설계 | `ct-plan-ext` | `/skill:ct-plan-ext` |
| 실행 스크립트 생성과 검증 | `ct-run-script` | `/skill:ct-run-script` |
| 코드 정본의 구현 문서 작성과 갱신 | `ct-docs-impl` | `/skill:ct-docs-impl` |
| Markdown 문서의 형식만 정리 | `ct-docs-md-format` | `/skill:ct-docs-md-format` |
| Confluence REST API 작업 | `ct-wiki-api` | `/skill:ct-wiki-api` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` | `/skill:ct-wiki-ops` |

## 기능 찾기

이름이 달라 못 찾는 경우가 있어요.  
하려는 것부터 찾아요.

| 하려는 것 | 가장 빠른 조작 | 자세히 |
| --- | --- | --- |
| 추론 수준 바꾸기 | `/thinking` 또는 `Shift+Tab` | [추론 수준](./setup.md#추론-수준) |
| 모델 바꾸기 | `/model`, `/scoped-models`, `Ctrl+P` | [모델 연결](./setup.md#모델-연결) |
| 로컬 모델 쓰기 | `/llama` | [모델 연결](./setup.md#모델-연결) |
| 자격증명 점검 | `pi auth check --provider <이름>` | [인증](./setup.md#인증) |
| 읽기만 시키기 | `--tools read,grep,find,ls` | [도구 범위](./setup.md#도구-범위) |
| 전체 화면으로 보기 | `--tui-mode fullscreen` | [화면 모드](./setup.md#화면-모드) |
| 낯선 저장소 안전하게 열기 | `--no-approve` | [프로젝트 신뢰](./setup.md#프로젝트-신뢰) |
| 비용과 컨텍스트 보기 | `/session` | [컨텍스트와 비용](./setup.md#컨텍스트와-비용) |
| 안을 갈라서 비교하기 | `/fork`, `/tree` | [작업 흐름](./workflows.md) |
| 스크립트에서 돌리기 | `pi -p "요청"` | [확장 기능](./extensions.md) |
| 변경 검토 | 요청으로 해요 | [작업 흐름](./workflows.md#구현한-변경-검토하기) |

## Pi에서 먼저 정할 것

다른 도구와 달리 Pi는 실행 조건을 직접 고르는 구조예요.  
처음 쓸 때 아래 넷을 정해요.

| 정할 것 | 방법 | 자세히 |
| --- | --- | --- |
| 어떤 모델로 돌릴지 | `/login`으로 제공자를 붙이고 `/model`로 선택 | [환경 설정](./setup.md) |
| 이 프로젝트의 `.pi/` 자원을 믿을지 | 첫 실행 때 묻고 `/trust`로 저장 | [환경 설정](./setup.md) |
| 어디까지 건드리게 할지 | `--tools`로 도구 제한, 필요하면 격리 실행 | [확장 기능](./extensions.md) |
| 사람이 볼지 프로그램이 받을지 | 대화형, `--print`, `--mode json`, `--mode rpc` | [확장 기능](./extensions.md) |

모델 제공자를 직접 붙이고 필요한 기능을 TypeScript Extension으로 만들어 넣을 수 있어요.  
에이전트 자체를 확장하거나 다른 프로그램에 내장하는 방법은 [확장 기능](./extensions.md)에서 다뤄요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, 인증, 프로젝트 신뢰와 `AGENTS.md`·Settings의 책임 | [환경 설정](./setup.md) |
| 12개 Skill의 입력과 결과 | [Skill 안내](./skills.md) |
| 여러 Skill을 연결하는 실제 예제 | [작업 흐름](./workflows.md) |
| Extension, Prompt Template, Provider, Package와 격리 실행의 차이 | [확장 기능](./extensions.md) |
| 현재 환경에서 명령을 찾는 방법 | [명령 확인](./commands.md) |

## 사용 기준

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요. 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.
- 사용자 Skill은 `/skill:ct-*` 이름으로 직접 호출해요.
- Skill은 현재 프로젝트의 `AGENTS.md`, 코드와 설정에서 필요한 근거를 수집해요.
- 작업별 입력과 결과는 실제 Skill 안내를 기준으로 해요.
- 제품 기능과 명령은 현재 환경과 [Pi 공식 문서](https://pi.dev/docs/latest)에서 확인해요.

## 심화 학습 자료

Extension, package, SDK와 RPC를 직접 만들어 볼 때는 `reference/`의 실습 문서를 사용해요.

| 주제 | 문서 |
| --- | --- |
| 설치, 인증과 첫 요청 | [시작하기](./reference/01-getting-started-and-key-concepts.md) |
| 화면, 모델, 세션과 컨텍스트 | [기본 개념](./reference/02-understanding-core-concepts.md) |
| Extension·package·SDK·RPC 실습 | [핵심 개념 활용](./reference/03-applying-core-concepts.md) |
| 프로젝트 최초 준비 | [프로젝트 시작](./reference/04-starting-a-project.md) |
| 반복하는 개발 흐름 | [프로젝트 코딩](./reference/05-project-cooking.md) |
| 명령과 단축키 상세 | [기본 명령](./reference/06-basic-commands.md) |
| Spring·Java 분석과 테스트 | [분석과 테스트](./reference/07-analysis-and-testing.md) |

예제 package는 [`examples/basic-pi-package`](./examples/basic-pi-package/)에 있어요.  
실습 문서는 Pi `0.80.6` 기준으로 작성했고, 이 가이드 본문은 2026-09-23에 공식 문서와 설치본 `0.87.1`로 확인했어요.
