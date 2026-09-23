# 02. 세션과 Subagent

긴 작업에서 대화를 유지하는 방법과, 조사·검증을 자식 세션으로 나누는 방법을 다뤄요.  
기준 버전은 grok 1.0.41이에요.

## 같은 세션과 자식 세션

앞 Skill의 확정 결과를 다음 `/ct-*`에 넘기는 흐름은 [작업 흐름](../workflows.md)이에요.  
호출 흐름 조사나 넓은 검색은 Subagent로 나누면 메인 세션에 파일 내용이 쌓이지 않아요.  
Subagent는 기본으로 켜져 있어요.  

| Agent Type | 하는 일 | 맞는 작업 |
| --- | --- | --- |
| `explore` | 검색, 읽기, 셸 명령을 해요. 파일은 수정하지 않아요. | `ct-code-tree`, 낯선 코드 파악 |
| `plan` | 코드를 수정하지 않고 구현 계획을 만들어요. | 수정 전 계획. 세션 Plan 모드는 [권한과 Plan 모드](./01-permissions-and-plan-mode.md)를 봐요. |
| `general-purpose` | 구현과 검증을 포함한 일반 작업을 해요. | `ct-code-spring`, `ct-qa-flow` |

Persona는 서브에이전트 프롬프트 위의 행동 레이어예요.  
`model`과 `reasoning_effort`를 덮어쓸 수 있어요.  
도구 구성은 Agent Type이 정해요.  
관리는 `/config-agents`에서 해요.

## 설정

타입을 끄려면 `~/.grok/config.toml`에 둬요.  

```toml
[subagents.toggle]
plan = false
```

특정 타입의 모델은 `[subagents.models]` 아래 키에 `grok models`로 확인한 ID를 적어요.

```toml
[subagents.models]
explore = "grok-4.6"
```

전체를 끄려면 `[subagents] enabled = false` 또는 `--no-subagents`를 써요.

## 세션 조작

| 명령 | 효과 |
| --- | --- |
| `/compact 메모` | 메모에 적은 내용을 남기고 대화를 줄여요. |
| `/context` | 시스템 프롬프트, 메시지, 남은 창을 보여줘요. |
| `/rewind` | 이전 요청으로 대화만 되돌려요. 디스크의 파일은 그대로예요. |
| `/fork` | 현재까지의 기록으로 새 세션을 열어요. |
| `/dashboard` | 이 터미널의 세션을 보고 붙어요. minimal 모드에서는 숨겨져요. |
| `/resume` | 이전 세션을 다시 열어요. |

`/compact` 다음에는 다음 Skill에 문서 경로를 다시 지정해요.  
