# Grok Build 명령 확인

Grok Build 명령은 버전과 실행 환경에 따라 달라질 수 있다. 전체 목록을 문서에 복제하지 않고 현재 입력창과 설치된 문서를 기준으로 확인한다.

## 현재 명령 찾기

입력창에 `/`를 입력해 현재 환경에서 제공하는 명령과 Skill을 확인한다.

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
| `/rewind` | 이전 요청 지점으로 대화를 되돌리기. 디스크의 파일은 그대로 둔다 |
| `/always-approve` | 자동 승인 모드 전환 |

사용자 Skill은 `/ct-*`로 호출한다. 명령이 보이지 않으면 현재 설치 버전에서 제공되는 목록을 따른다.

## CLI에서 확인

설치된 CLI의 기본 명령과 옵션을 확인한다.

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

자동 승인과 권한 우회 옵션은 격리된 실행 환경에서만 사용한다.

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령과 Skill을 찾는다.
2. CLI 옵션은 설치된 `grok --help`에서 확인한다.
3. 현재 디렉터리에 적용된 구성은 `grok inspect`에서 확인한다.
4. 동작과 지원 범위는 `~/.grok/README.md`, `~/.grok/docs/user-guide/`와 xAI 공식 자료에서 확인한다.

TUI의 `/hooks`, `/plugins`, `/skills`, `/mcps`는 같은 확장 모달의 탭을 연다. 프로젝트 Hook을 실행하려면 `/hooks-trust`로 폴더를 신뢰한다.

## 공식 문서

- 설치된 전체 문서: `~/.grok/README.md`
- 슬래시 명령: `~/.grok/docs/user-guide/04-slash-commands.md`
- [Grok Build 소개](https://x.ai/news/grok-build-cli)
