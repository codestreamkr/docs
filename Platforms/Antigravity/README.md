# Antigravity 가이드

프로젝트에서 할 일을 고르고 필요한 사용자 Skill을 직접 호출해요.

문제 유형별 작업 흐름은 [Playbook](../../Playbooks/README.md)에서 관리해요.  
이 가이드는 Antigravity CLI(`agy`)의 설정, Skill 호출과 확장 기능만 다뤄요.

## 바로 시작

1. 프로젝트 루트에서 `agy`를 실행해요.
2. 입력창에 `/` 또는 `/skills`를 입력해 사용할 수 있는 Skill을 확인해요.
3. Skill만 호출해 역할, 필요한 입력과 예제를 확인해요.
4. 원하는 결과와 대상을 자연어로 이어서 실행해요.

```text
/ct-plan-work
/ct-plan-work 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 제품·설계·구현·구조 전환·개선 계획 | `ct-plan-work` | `/ct-plan-work` |
| Spring 구현과 검토 | `ct-code-spring` | `/ct-code-spring` |
| 호출과 데이터 흐름 분석 | `ct-code-tree` | `/ct-code-tree` |
| 호출 흐름 기반 테스트 | `ct-code-tree-test` | `/ct-code-tree-test` |
| QA와 회귀 검증 | `ct-qa-flow` | `/ct-qa-flow` |
| SQL 성능 분석 | `ct-data-query` | `/ct-data-query` |
| 외부 서비스 연동과 이관 설계 | `ct-plan-ext` | `/ct-plan-ext` |
| 실행 스크립트 생성과 검증 | `ct-run-script` | `/ct-run-script` |
| 코드 정본의 구현 문서 작성과 갱신 | `ct-docs-impl` | `/ct-docs-impl` |
| Markdown 문서의 형식만 정리 | `ct-docs-md-format` | `/ct-docs-md-format` |
| Confluence REST API 작업 | `ct-wiki-api` | `/ct-wiki-api` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` | `/ct-wiki-ops` |

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, Skill 위치와 `GEMINI.md`·`AGENTS.md`·Settings의 책임 | [환경 설정](./setup.md) |
| 12개 Skill의 입력과 결과 | [Skill 안내](./skills.md) |
| 여러 Skill을 연결하는 실제 예제 | [작업 흐름](./workflows.md) |
| Rules, Skill, Subagent, Plugin, Hook과 MCP의 차이 | [확장 기능](./extensions.md) |
| 현재 환경에서 명령을 찾는 방법 | [명령 확인](./commands.md) |

## 사용 기준

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요. 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.
- 사용자 Skill은 `/ct-*` 이름으로 직접 호출해요.
- Skill은 현재 프로젝트의 `GEMINI.md`, `AGENTS.md`, 코드와 설정에서 필요한 근거를 모아요.
- 작업별 입력과 결과는 실제 Skill 안내를 기준으로 해요.
- 제품 기능과 명령은 현재 환경과 [Antigravity 공식 문서](https://antigravity.google/docs)에서 확인해요.

## 심화 학습 자료

샌드박스, 서브에이전트와 아티팩트를 자세히 다룰 때는 `reference/` 문서를 사용해요.

| 주제 | 문서 |
| --- | --- |
| 터미널 샌드박스와 권한 정책 | [샌드박스와 권한](./reference/01-sandbox-and-permissions.md) |
| 서브에이전트와 백그라운드 태스크 | [서브에이전트와 백그라운드 태스크](./reference/02-subagents-and-background-tasks.md) |
| 아티팩트 기반 작업과 피드백 | [아티팩트 작업 흐름](./reference/03-artifacts-workflow.md) |
