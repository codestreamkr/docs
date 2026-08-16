# Claude Code 명령 확인

Claude Code 명령은 버전과 실행 환경에 따라 달라질 수 있다. 전체 목록을 문서에 복제하지 않고 현재 입력창과 공식 문서를 기준으로 확인한다.

## 현재 명령 찾기

입력창에 `/`를 입력해 현재 환경에서 제공하는 명령과 Skill을 확인한다.

작업을 시작할 때 자주 확인하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/help` | 현재 사용할 수 있는 명령 확인 |
| `/context` | 컨텍스트 사용량과 적용된 지침 파일 확인 |
| `/permissions` | 도구 권한 확인과 조정 |
| `/mcp` | 연결된 MCP 서버와 도구 확인 |
| `/diff` | 현재 변경 내용 확인 |

세션을 관리할 때 사용하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/compact` | 대화를 요약해 컨텍스트 확보 |
| `/clear` | 새 대화 시작 |
| `/resume` | 이전 대화로 돌아가기 |
| `/rewind` | 코드와 대화를 이전 지점으로 되돌리기 |
| `/model` | 사용할 모델 선택 |

프로젝트를 준비할 때 사용하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/init` | 프로젝트 `CLAUDE.md` 초안 생성 |
| `/memory` | 지침 파일과 자동 메모리 확인·편집 |
| `/config` | 설정 확인과 변경 |
| `/doctor` | 설치와 설정 상태 진단 |

사용자 Skill은 `/ct-*`로 호출한다. 명령이 보이지 않으면 현재 설치 버전과 실행 환경에서 제공되는 목록을 따른다.

## CLI에서 확인

설치된 CLI의 기본 명령과 옵션을 확인한다.

```bash
claude --help
```

| 명령 | 용도 |
| --- | --- |
| `claude` | 대화형 세션 시작 |
| `claude "요청"` | 첫 요청과 함께 세션 시작 |
| `claude -p "요청"` | 비대화형 결과 출력 |
| `claude -c` | 최근 대화 계속하기 |
| `claude -r <session>` | 특정 세션 다시 열기 |
| `claude update` | Claude Code 업데이트 |
| `claude doctor` | 설치와 설정 상태 진단 |
| `claude mcp` | MCP 서버 설정 관리 |

자주 사용하는 실행 옵션:

| 옵션 | 용도 |
| --- | --- |
| `--add-dir` | 추가 작업 디렉터리 허용 |
| `--model` | 세션 모델 지정 |
| `--permission-mode` | 권한 모드 지정 |
| `--output-format` | 비대화형 출력 형식 지정 |
| `--append-system-prompt` | 시스템 프롬프트에 지침 추가 |

권한 확인을 건너뛰는 옵션은 격리된 실행 환경에서만 사용한다.

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령과 Skill을 찾는다.
2. CLI 옵션은 설치된 `claude --help`에서 확인한다.
3. 동작과 지원 범위는 Claude Code 공식 문서에서 확인한다.

## 공식 문서

- [Slash commands](https://code.claude.com/docs/en/commands)
- [CLI reference](https://code.claude.com/docs/en/cli-reference)
- [Skills](https://code.claude.com/docs/en/skills)

