# 02. 세션과 Subagent

긴 작업에서 세션 맥락을 관리하고 독립 작업을 Subagent로 나누는 방법을 설명해요.  
기준 버전은 Grok Build 1.0.41이에요.

## 같은 세션에서 이어가기

앞 Skill의 확정 결과를 다음 `/ct-*` 요청에 넘기는 흐름은 [작업 흐름](../workflows.md)을 봐요.  
호출 흐름 조사나 넓은 검색은 Subagent로 나누면 메인 세션의 맥락을 줄일 수 있어요.

## 세션 관리

| 명령 | 효과 |
| --- | --- |
| `/compact 메모` | 메모에 적은 내용을 남기고 대화를 줄여요 |
| `/context` | 시스템 프롬프트, 메시지와 남은 창을 보여줘요 |
| `/rewind` | 이전 요청으로 대화를 되돌려요 |
| `/fork` | 현재까지의 기록으로 새 세션을 열어요 |
| `/dashboard` | 이 터미널의 세션과 Subagent를 봐요 |
| `/resume` | 이전 세션을 다시 열어요 |

`/rewind`를 사용해도 디스크의 파일은 그대로일 수 있으므로 변경 상태를 따로 확인해요.  
`/compact` 뒤에는 다음 Skill 요청에 계획과 결과 파일 경로를 다시 적어요.

## Subagent 역할

Subagent는 역할별 도구와 별도 컨텍스트에서 작업해요.

| Agent Type | 하는 일 | 맞는 작업 |
| --- | --- | --- |
| `explore` | 검색, 읽기와 셸 명령을 수행해요 | `ct-analyze`, 낯선 코드 파악 |
| `plan` | 코드를 수정하지 않고 구현 계획을 만들어요 | 수정 전 계획 |
| `general-purpose` | 구현과 검증을 포함한 일반 작업을 해요 | `ct-apply`, `ct-verify` |

Persona는 Subagent 행동을 보완하고, `model`과 `reasoning_effort`는 역할별로 덮어쓸 수 있어요.  
Agent Type과 Persona의 설정은 `/config-agents`에서 확인해요.

## Subagent 설정

특정 타입을 끄거나 모델을 지정하는 설정은 사용자 `config.toml`에 둬요.

```toml
[subagents.toggle]
plan = false

[subagents.models]
explore = "grok-4.6"
```

전체 Subagent를 끄려면 `[subagents] enabled = false` 또는 `--no-subagents`를 사용해요.  
현재 모델 ID는 `grok models`에서 확인해요.

## 확인 기준

독립 작업만 Subagent로 나누고, 결과와 파일 경로를 메인 세션의 다음 요청에 전달해요.  
세션과 Subagent 상태는 `/dashboard`에서 확인해요.

## 공식 문서

- [Grok Build 개요](https://docs.x.ai/build/overview)
- [Settings](https://docs.x.ai/build/settings)
