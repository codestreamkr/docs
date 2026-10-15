# 02. 세션과 Subagent

긴 대화를 관리하고 독립 작업을 나누는 방법을 설명해요.  
기준은 2026-10-16 공식 문서예요.

## 세션 관리

| 필요한 작업 | CLI 채팅창 명령 |
| --- | --- |
| 대화 압축 | `/compact` |
| 컨텍스트 사용량 확인 | `/context` |
| 이전 대화 지점으로 이동 | `/rewind` |
| 현재 기록에서 세션 분기 | `/fork` |
| 이전 세션 열기 | `/resume` |
| 세션과 Subagent 확인 | `/dashboard` |

`/rewind`는 수정 파일을 복원하지 않아요.  
파일 복원이 필요하면 Git 변경을 확인하고 대상 파일을 지정하세요.

대화를 압축할 때는 확정된 요구사항과 결과 파일 경로를 남기세요.  
요청 예제는 [세션과 맥락 관리](../workflows.md#3-세션과-맥락-관리)를 확인하세요.

## 원격 세션과 코드 복원

원격 세션은 기본적으로 대화만 복원해요.  
코드 스냅샷도 필요하면 터미널에서 새 worktree로 복원하세요.

```bash
grok --resume <session-id> --worktree --restore-code
```

복원된 변경을 검토한 뒤 원래 브랜치에 반영하세요.

## 컨텍스트 창 선택

모델이 여러 크기를 지원하면 CLI 채팅창에서 컨텍스트 창을 선택하세요.

```text
/context-window
```

`/context`에서 사용량을 확인하세요.  
모델 변경은 [환경 설정](../setup.md#3-모델과-권한-선택)을 확인하세요.

## Subagent 역할

Subagent는 별도 컨텍스트에서 작업하고 부모 세션에 결과를 돌려줘요.

| 타입 | 역할 |
| --- | --- |
| `explore` | 파일 읽기와 검색을 수행해요. |
| `plan` | 파일을 수정하지 않고 계획을 작성해요. |
| `general-purpose` | 구현과 검증을 수행해요. |

분담 요청 예제는 [병렬 조사](../workflows.md#4-병렬-조사)를 확인하세요.  
서로 같은 파일을 수정하면 작업을 순서대로 진행하거나 worktree로 분리하세요.

## Subagent 설정

CLI 채팅창에서 역할과 Persona를 확인하세요.

```text
/config-agents
```

Persona는 행동과 초점을 보완해요.  
프로젝트 정의는 `.grok/agents/`, 개인 정의는 `~/.grok/agents/`에 둬요.

부모 모델을 상속하려면 `/settings`에서 선택한 뒤 새 세션에서 확인하세요.  
Subagent 없이 실행하려면 터미널에서 다음 명령을 사용하세요.

```bash
grok --no-subagents
```

## 공식 문서

- [세션 관리와 복원](https://docs.x.ai/build/features/sessions)
- [Subagent 역할](https://docs.x.ai/build/features/subagents)
- [Agent Dashboard](https://docs.x.ai/build/features/dashboard)
- [설정](https://docs.x.ai/build/settings)
- [주요 변경사항](https://x.ai/changelog/build)
