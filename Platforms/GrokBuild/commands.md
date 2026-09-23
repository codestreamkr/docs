# Grok Build 명령 확인

Grok Build 명령은 버전과 실행 환경에 따라 달라질 수 있어요.  
전체 목록을 문서에 복제하지 않고 현재 입력창과 설치된 문서를 기준으로 확인해요.

## 현재 명령 찾기

입력창에 `/`를 입력해 현재 환경에서 제공하는 명령과 Skill을 확인해요.

작업을 시작할 때 자주 확인하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/skills` | 사용할 수 있는 Skill 확인 |
| `/model` | 사용할 모델 선택 |
| `/plugins` | 연결된 Plugin 확인 |
| `/hooks` | 현재 세션에 적용된 Hook 확인 |
| `/mcps` | 연결된 MCP 서버 확인 |

세션을 관리할 때 사용하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/compact` | 대화를 요약해 컨텍스트 확보 |
| `/new` | 새 세션 시작 |
| `/resume` | 이전 세션 다시 열기 |
| `/rewind` | 이전 요청 지점으로 대화를 되돌리기. 디스크의 파일은 그대로 둬요 |
| `/always-approve` | 자동 승인 모드 전환 |

Grok에서 실행 방식이 달라지는 명령:

| 명령 | 용도 |
| --- | --- |
| `Shift+Tab` | Normal, Plan, Auto, Always-approve 순환이에요. Auto가 꺼져 있으면 그 단계는 빠져요. |
| `/auto` | 안전 분류를 통과한 도구를 자동 승인. 이미 켜져 있으면 `ask`로 돌아와요. |
| `/plan`, `/view-plan` | 코드 수정 전 계획 모드, 저장된 계획 다시 보기 |
| `/effort` | 현재 모델의 reasoning 수준 |
| `/context` | 컨텍스트 사용량 |
| `/dashboard` | 이 터미널의 세션 목록. minimal 모드에서는 숨겨져요. |
| `/fork` | 현재 시점까지의 세션 분기 |
| `/config-agents` | Agent와 Persona 관리 |
| `/workflow`, `/goal` | 저장된 워크플로와 목표 실행 |

동작은 [권한과 Plan 모드](./reference/01-permissions-and-plan-mode.md), [세션과 Subagent](./reference/02-sessions-and-subagents.md), [Workflow와 Agent Profile](./reference/03-workflows-and-profiles.md)을 봐요.

사용자 Skill은 `/ct-*`로 호출해요.  
명령이 보이지 않으면 현재 설치 버전에서 제공되는 목록을 따라요.

## CLI에서 확인

설치된 CLI의 기본 명령과 옵션을 확인해요.

```bash
grok --help
grok <command> --help
```

| 명령 | 용도 |
| --- | --- |
| `grok` | 대화형 세션 시작 |
| `grok "요청"` | 첫 요청과 함께 세션 시작 |
| `grok -p "요청"` | 단일 요청 결과 출력 |
| `grok -c` | 현재 폴더의 최근 세션 계속하기 |
| `grok sessions` | 세션 조회와 복원 |
| `grok inspect` | 현재 디렉터리에서 인식된 구성 확인 |
| `grok models` | 사용할 수 있는 모델 확인 |
| `grok mcp` | MCP 서버 설정 관리 |
| `grok update` | 업데이트 확인과 설치 |

자주 사용하는 실행 옵션:

| 옵션 | 용도 |
| --- | --- |
| `--model` | 세션 모델 지정 |
| `--permission-mode` | 권한 모드 지정 |
| `--allow`, `--deny` | 도구 실행 허용과 차단 규칙 |
| `--rules` | 세션에만 적용할 기준 추가 |
| `--output-format` | 헤드리스 출력 형식 지정 |
| `--no-subagents` | Subagent 실행 차단 |

일상 작업은 `--permission-mode auto`예요.  
`always-approve`와 `--dangerously-skip-permissions`는 격리된 실행 환경에서만 사용해요.  
비대화형 `auto`에서 안전 분류를 통과하지 못한 호출은 다시 묻지 않고 실패로 보고돼요.

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령과 Skill을 찾아요.
2. CLI 옵션은 설치된 `grok --help`에서 확인해요.
3. 현재 디렉터리에 적용된 구성은 `grok inspect`에서 확인해요.
4. 동작과 지원 범위는 `~/.grok/README.md`, `~/.grok/docs/user-guide/`와 xAI 공식 자료에서 확인해요.

TUI의 `/hooks`, `/plugins`, `/skills`, `/mcps`는 같은 확장 모달의 탭을 열어요.  
프로젝트 Hook을 실행하려면 `/hooks-trust`로 폴더를 신뢰해요.

## 공식 문서

- 설치된 전체 문서: `~/.grok/README.md`
- 슬래시 명령: `~/.grok/docs/user-guide/04-slash-commands.md`
- [Grok Build 소개](https://x.ai/news/grok-build-cli)
