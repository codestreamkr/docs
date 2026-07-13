# Claude Code CLI 명령 참조

이 문서는 공통 Playbook을 Claude Code에서 실행할 때 필요한 기본 명령을 찾는 참조 문서다.

## 사용 기준

명령과 Skill 제공 여부는 Claude Code 버전과 설치된 구성에 따라 달라질 수 있다.

- 대화 입력창에서 `/`를 입력해 현재 목록을 확인한다.
- 내장 명령, Bundled Skill과 사용자 Skill을 구분한다.
- 기존 `.claude/commands/`와 신규 `.claude/skills/`가 같은 호출 이름을 만들 수 있다.
- 권한을 우회하는 실행 옵션은 격리 환경에서만 사용한다.

## CLI 실행

| 명령 | 용도 |
| --- | --- |
| `claude` | 대화형 세션 시작 |
| `claude "요청"` | 첫 요청과 함께 세션 시작 |
| `claude -p "요청"` | 비대화형 결과 출력 |
| `claude -c` | 현재 폴더의 최근 대화 계속하기 |
| `claude -r <session-id>` | 특정 세션 다시 열기 |
| `claude update` | Claude Code 업데이트 |
| `claude doctor` | 설치와 설정 상태 진단 |
| `claude mcp` | MCP 서버 설정 관리 |

## 대화형 기본 명령

| 명령 | 용도 |
| --- | --- |
| `/help` | 현재 사용 가능한 명령 확인 |
| `/init` | 프로젝트 `CLAUDE.md` 초안 생성 |
| `/compact` | 대화 맥락 요약 |
| `/clear` | 현재 대화 맥락 초기화 |
| `/model` | 사용할 모델 선택 |
| `/permissions` | 도구 권한 확인과 조정 |
| `/mcp` | MCP 연결과 인증 상태 확인 |

Skill은 `/skill-name`으로 직접 호출한다. 기존 `.claude/commands/name.md`도 `/name`으로 호출할 수 있다.

## 주요 실행 옵션

| 옵션 | 용도 |
| --- | --- |
| `--add-dir` | 추가 작업 디렉터리 허용 |
| `--allowedTools` | 추가 도구를 승인 없이 허용 |
| `--disallowedTools` | 사용할 수 없는 도구 지정 |
| `--model` | 세션 모델 지정 |
| `--permission-mode` | 권한 모드 지정 |
| `--output-format` | 비대화형 출력 형식 지정 |

## 공식 문서 기준

- 확인일: 2026-07-13
- [Claude Code CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-usage)
- [Claude Code commands](https://code.claude.com/docs/en/commands)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)

## 이력관리

- 2026-07-13: 기존 명령 목록을 현재 CLI, Skill과 권한 확인 중심의 플랫폼 참조로 재구성
