# Claude Code 명령 확인

Claude Code는 세션 입력창의 명령과 터미널에서 세션을 여는 명령을 구분해요.  
목록은 버전, 계정과 실행 환경에 따라 달라지므로 현재 세션과 설치된 CLI를 우선해요.

## 입력창에서 사용

세션을 연 뒤 입력창에 자연어 요청을 보내요.  
`/`로 현재 사용할 수 있는 내장 명령과 Skill을 찾아 선택할 수 있어요.

`/` 목록에는 세 종류가 함께 보여요.

| 구분 | 관리 주체 | 예 |
| --- | --- | --- |
| 내장 명령 | Claude Code | `/context`, `/permissions`, `/clear` |
| 번들 Skill | Claude Code | `/code-review`, `/security-review` |
| 사용자 Skill | CodeStream 또는 프로젝트 | `/ct-plan`, `/ct-apply` |

내장 명령이 없거나 이름이 달라 보이면 목록에 표시된 항목을 사용해요.  
번들 Skill과 CodeStream Skill의 선택은 [사용자 Skill](./skills.md)을 봐요.

### 작업 준비와 설정

| 명령 | 용도 |
| --- | --- |
| `/help` | 현재 명령과 사용법 확인 |
| `/status`, `/context` | 현재 상태와 적용 지침 확인 |
| `/permissions` | 권한 확인·조정 |
| `/plan` | 변경 전 계획 모드로 전환 |
| `/model`, `/effort`, `/fast` | 모델과 응답 방식 조정 |
| `/mcp`, `/plugin` | 외부 연결과 Plugin 관리 |
| `/init`, `/memory` | 프로젝트 지침 생성·확인 |
| `/config`, `/doctor` | 설정 확인과 진단 |

### 변경 확인과 검토

| 입력 | 용도 |
| --- | --- |
| `/diff` | 변경 내용 확인 |
| `/code-review` | 번들 Skill로 코드 검토 |
| `현재 변경에서 동작 문제와 누락된 테스트를 검토해줘` | 대상과 기준을 지정해 자연어 검토 요청 |

변경 확인과 문제 검토는 다른 단계예요.  
검토 후 수정·재검증은 [작업 흐름](./workflows.md#변경-확인과-검토)으로 이어가요.

### 세션과 병렬 작업

| 명령 | 용도 |
| --- | --- |
| `/compact`, `/clear` | 맥락 요약 또는 새 작업 시작 |
| `/resume`, `/branch`, `/rewind` | 이전 대화 재개·분기·되돌리기 |
| `/background`, `/tasks` | 백그라운드 작업과 Subagent 상태 확인 |
| `/usage` | 사용량 확인 |

사용자 Skill은 `/ct-plan`, `/ct-apply`처럼 입력해요.  
반복 실행은 [세션·예약·비대화형 실행](./extensions.md#반복-실행)을 구분해 사용해요.

## 터미널에서 실행

터미널 명령은 세션을 시작·복원·관리하거나 비대화형 자동화에 사용해요.  
일상 작업마다 새 명령을 실행할 필요는 없어요.

```bash
# 프로젝트에서 대화형 세션 열기
claude

# 이전 세션 계속하기
claude --continue

# 단일 요청을 자동화나 스크립트에서 실행하기
claude --print "현재 변경 내용을 검토해줘"

# 현재 설치에서 지원하는 명령과 옵션 확인하기
claude --help
```

| 용도 | 명령 또는 옵션 |
| --- | --- |
| 특정 세션 다시 열기 | `claude --resume <session-id>` |
| 별도 Git worktree에서 세션 열기 | `claude --worktree` |
| 백그라운드 세션 관리 | `claude --background`, `claude agents`, `claude attach <id>` |
| 설치와 설정 진단 | `claude doctor` |
| MCP와 Plugin 관리 | `claude mcp`, `claude plugin` |
| 버전 확인 | `claude --version` |

Git 명령은 터미널에서 직접 실행해요.  
`git diff` 같은 명령을 입력창에 붙여 실행하지 않아요.  
AI에게 Git 상태나 변경 내용을 자연어로 조회·검토해 달라고 요청할 수 있지만, 그 요청은 Git 명령 자체가 아니에요.

## 확인 기준

1. 입력창에서 `/`를 입력해 현재 명령과 Skill을 확인해요.
2. 터미널에서 `claude --help`와 `claude --version`을 실행해 설치 버전을 확인해요.
3. 제품 동작은 현재 설치된 도움말과 공식 문서를 대조해요.

이 문서는 2026-10-01에 Claude Code 2.1.283으로 확인했어요.

## 공식 문서

- [명령 참조](https://code.claude.com/docs/ko/commands)
- [CLI 참조](https://code.claude.com/docs/ko/cli-reference)
- [Skills](https://code.claude.com/docs/ko/skills)
