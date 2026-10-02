# Grok Build 명령 확인

Grok Build는 세션 입력창에서 쓰는 명령과 터미널에서 세션을 여는 명령을 구분해요.  
목록은 버전과 실행 환경에 따라 달라지므로 현재 세션과 설치된 CLI를 우선해요.

## 입력창에서 사용

세션을 연 뒤 자연어 요청을 보내고, `/` 또는 `/skills`로 현재 명령과 Skill을 확인해요.

### 작업 준비와 설정

| 명령 | 용도 |
| --- | --- |
| `/skills` | 사용자 Skill 확인 |
| `/model`, `/effort` | 모델과 추론 수준 조정 |
| `/plugins`, `/hooks`, `/mcps` | 확장 연결 확인 |
| `/plan`, `/view-plan` | 계획 모드 전환과 계획 확인 |
| `/auto`, `/always-approve` | 세션 권한 동작 변경 |

`/auto`와 `/always-approve`는 세션 권한 동작을 바꿔요.  
권한과 Plan 모드의 선택은 [권한과 Plan 모드](./reference/01-permissions-and-plan-mode.md)를 봐요.

### 변경 확인과 검토

검토할 대상과 판단 기준을 입력창에 자연어로 지정해요.

```text
현재 변경에서 동작 문제, 빠진 테스트와 요청 밖 변경을 검토해줘.
파일은 수정하지 말고 근거와 함께 알려줘.
```

수정과 재검증은 [작업 흐름](./workflows.md#변경-확인과-검토)으로 이어가요.

### 세션과 병렬 작업

| 명령 | 용도 |
| --- | --- |
| `/compact`, `/new` | 맥락 요약 또는 새 작업 시작 |
| `/resume`, `/fork`, `/rewind`, `/dashboard` | 이전 세션과 분기 관리 |
| `/goal`, `/workflow` | 목표와 저장된 Workflow 관리 |

사용자 Skill은 `/ct-plan`처럼 호출해요.  
Subagent는 [세션과 Subagent](./reference/02-sessions-and-subagents.md)에 따라 분담 범위를 지정해 요청해요.

## 터미널에서 실행

터미널 명령은 세션을 시작·복원·관리하거나 자동화에서 한 번 실행할 때 사용해요.  
일상 작업마다 새 명령을 실행할 필요는 없어요.

```bash
# 프로젝트에서 대화형 세션 열기
grok

# 이전 세션 계속하기
grok --continue

# 스크립트나 자동화에서 단일 요청 실행하기
grok --single "현재 변경 내용을 검토해줘"

# 현재 설치에서 지원하는 명령과 옵션 확인하기
grok --help
```

| 용도 | 명령 또는 옵션 |
| --- | --- |
| 특정 세션 다시 열기 | `grok --resume <session-id-or-title>` |
| 현재 디렉터리에서 인식한 구성 확인 | `grok inspect` |
| 모델 목록 확인 | `grok models` |
| 새 Git worktree 세션 열기 | `grok --worktree` |
| 설정·터미널 진단 | `grok doctor` |
| MCP와 Plugin 관리 | `grok mcp`, `grok plugin` |
| 버전 확인 | `grok --version` |

Git 명령은 터미널에서 직접 실행해요.  
`git diff` 같은 명령을 입력창에 붙여 실행하지 않아요.  
AI에게 Git 상태나 변경 내용을 자연어로 조회·검토해 달라고 요청할 수 있지만, 그 요청은 Git 명령 자체가 아니에요.

## 확인 기준

1. 입력창에서 `/` 또는 `/skills`로 현재 명령과 Skill을 확인해요.
2. 터미널에서 `grok --help`, `grok --version`, `grok inspect`를 실행해 환경을 확인해요.
3. 기능 동작은 설치된 도움말과 공식 문서를 대조해요.

이 문서는 2026-10-01에 Grok Build 1.0.41로 확인했어요.

## 공식 문서

- [Grok Build 개요](https://docs.x.ai/build/overview)
- [Settings](https://docs.x.ai/build/settings)
- [Grok Build 소개](https://x.ai/news/grok-build-cli)
