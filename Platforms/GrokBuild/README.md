# Grok Build 가이드

할 일을 고르고, 필요한 Skill을 직접 호출하면 돼요.

어떤 순서로 진행할지는 [Playbook](../../Playbooks/README.md)을 봐요.  
여기선 Grok Build에서 어떻게 실행하는지만 다뤄요.

## 바로 시작

프로젝트 폴더에서 이렇게 실행해요.  
필요할 때만 승인을 물어요.

```bash
grok --permission-mode auto
```

매번 옵션을 붙이기 번거로우면 [환경 설정](./setup.md)에서 기본값으로 저장해요.

켜지면 Skill을 확인하고 바로 불러요.

```text
/skills
/ct-plan-work
/ct-plan-work 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

- Skill은 `/ct-*`로 불러요. 원하는 결과와 대상을 자연어로 이어서 적어요.
- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요. 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.
- 잘 붙었는지는 `grok inspect`로 확인해요.
- 권한을 전부 건너뛰는 `--dangerously-skip-permissions`는 쓰지 않아요.

설치와 로그인은 [환경 설정](./setup.md)을 봐요.

## 무엇을 하려나요?

지금 필요한 결과만 만들면 돼요.  
처음부터 끝까지 다 돌릴 필요는 없어요.

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

일이 이어지면, 앞에서 정한 범위와 문서 경로를 다음 호출에 넘겨요.

```text
/ct-plan-work 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
/ct-code-spring 확정된 계획을 기준으로 구현하고 관련 테스트를 실행해줘
/ct-qa-flow 주문 취소의 정상·중복·외부 실패 흐름을 검증해줘
```

입력과 결과는 [Skill 안내](./skills.md), 이어 붙이는 방법은 [작업 흐름](./workflows.md)에 있어요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, Skill 위치, `AGENTS.md`와 Config | [환경 설정](./setup.md) |
| 12개 Skill의 입력과 결과 | [Skill 안내](./skills.md) |
| 여러 Skill을 이어 붙이는 예제 | [작업 흐름](./workflows.md) |
| Subagent, 모델 연결, MCP와 Plugin | [확장 기능](./extensions.md) |
| 현재 환경에서 명령을 찾는 방법 | [명령 확인](./commands.md) |

프로젝트에 계속 남길 기준은 `AGENTS.md`에, 실행 설정은 `~/.grok/config.toml`에 둬요.  
Agent Profile, Subagent, MCP, Hook, Plugin의 선택은 [확장 기능](./extensions.md)을 봐요.  
권한, 세션 분리, Workflow 실행은 [심화 학습 자료](#심화-학습-자료)를 봐요.

## 사용 기준

- Skill은 `/ct-*`로 직접 불러요.
- Skill은 지금 프로젝트의 `AGENTS.md`, 코드와 설정에서 근거를 모아요.
- 입력과 결과는 [Skill 안내](./skills.md)를 따라요.
- 제품 기능과 명령은 지금 환경과 `~/.grok/README.md`, `~/.grok/docs/user-guide/`, [xAI 공식 자료](https://x.ai/news/grok-build-cli)에서 확인해요.

## 심화 학습 자료

권한, 세션과 Workflow를 자세히 다룰 때는 `reference/` 문서를 사용해요.

| 주제 | 문서 |
| --- | --- |
| 권한 모드, Plan 모드, Sandbox | [권한과 Plan 모드](./reference/01-permissions-and-plan-mode.md) |
| 세션, Subagent, Dashboard | [세션과 Subagent](./reference/02-sessions-and-subagents.md) |
| Workflow, Goal, Agent Profile | [Workflow와 Agent Profile](./reference/03-workflows-and-profiles.md) |
