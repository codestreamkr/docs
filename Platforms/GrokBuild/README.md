# Grok Build 가이드

Grok Build 세션의 입력창에서 요청과 Skill을 보내는 방법을 안내해요.  
문제 유형별 작업 순서는 [Playbook](../../Playbooks/README.md)에서 관리해요.

## 바로 시작

프로젝트 폴더에서 대화형 세션을 한 번 열어요.

```bash
grok
```

세션이 열리면 입력창에서 작업과 Skill을 함께 보내요.

```text
/ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

`/skills` 또는 `/`로 현재 세션에서 사용할 수 있는 Skill과 명령을 확인해요.  
설치, 로그인과 기본 권한은 [환경 설정](./setup.md)을 봐요.

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 현재 코드의 동작과 영향 범위 분석 | `ct-analyze` | `/ct-analyze` |
| 개발 문제 탐색과 작업 계획 | `ct-plan` | `/ct-plan` |
| 확정된 작업의 실행·검증과 완료 기록 | `ct-apply` | `/ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` | `/ct-verify` |
| Markdown 문서 생성과 형식 정리 | `ct-docs-md-format` | `/ct-docs-md-format` |
| Git 이력의 월별·주차별 업무 보고 | `ct-docs-weekly-report` | `/ct-docs-weekly-report` |
| 원격 Confluence API 작업 | `ct-wiki-api` | `/ct-wiki-api` |
| 저장소 안의 Markdown 위키 운영 | `ct-wiki-ops` | `/ct-wiki-ops` |

## Grok Build의 작업 방식

Grok Build는 대화형 TUI에서 프로젝트 지침, Skill, Hook, Plugin과 MCP를 발견해 작업해요.  
Plan 모드에서 계획을 검토하고 승인한 뒤 실행할 수 있어요.  
독립 작업은 Subagent나 worktree로 나누고, 반복 실행은 headless 모드와 워크플로를 검토해요.  
권한, 세션과 Workflow의 상세 내용은 [심화 학습 자료](#심화-학습-자료)를 봐요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, 인증, Skill 위치, `AGENTS.md`와 Config | [환경 설정](./setup.md) |
| 사용자 Skill의 역할과 선택 | [사용자 Skill](./skills.md) |
| 세션에서 Skill을 연결하고 검토하는 방법 | [작업 흐름](./workflows.md) |
| Subagent, 모델, MCP와 Plugin의 선택 | [확장 기능](./extensions.md) |
| 입력창 명령과 터미널 명령의 구분 | [명령 확인](./commands.md) |

## 사용 기준

- 일상 작업은 열린 세션의 입력창에서 자연어 요청과 `/ct-*`를 사용해요.
- `grok`, `grok -p`, Git 명령은 세션을 열거나 자동화·저장소를 관리하는 터미널 명령이에요.
- Git 명령을 직접 실행할 때와 AI에게 검토·작업을 요청할 때의 역할을 구분해요.
- `grok inspect`와 `/skills`로 현재 디렉터리에서 인식된 구성을 확인해요.
- 현재 기능은 설치된 도움말과 [Grok Build 공식 문서](https://docs.x.ai/build/overview)를 함께 확인해요.

## 심화 학습 자료

| 주제 | 문서 |
| --- | --- |
| 권한 모드, Plan 모드, Sandbox | [권한과 Plan 모드](./reference/01-permissions-and-plan-mode.md) |
| 세션, Subagent, Dashboard | [세션과 Subagent](./reference/02-sessions-and-subagents.md) |
| Workflow, Goal, Agent Profile | [Workflow와 Agent Profile](./reference/03-workflows-and-profiles.md) |
