# Claude Code 명령 확인

Claude Code 명령은 버전과 실행 환경에 따라 달라질 수 있어요.  
전체 목록을 문서에 복제하지 않고 현재 입력창과 공식 문서를 기준으로 확인해요.

## 세 가지가 같은 목록에 보여요

입력창에 `/`를 입력하면 성격이 다른 셋이 한 목록에 섞여 나와요.

| 구분 | 누가 관리 | 예 |
| --- | --- | --- |
| 내장 명령 | 제품이 고정 동작으로 제공 | `/context`, `/permissions`, `/clear` |
| 번들 Skill | 제품이 제공하지만 Claude가 도구로 수행 | `/code-review`, `/security-review`, `/verify` |
| 사용자 Skill | CodeStream이 관리 | `/ct-plan-work`, `/ct-code-spring` |

역할이 겹칠 때 무엇을 고를지는 [사용자 Skill](./skills.md)의 번들 Skill 비교를 봐요.

## 현재 명령 찾기

아래는 `ct-*` 작업 중에 자주 쓰는 것만 추렸어요.  
전체 목록은 공식 문서를 봐요.

작업을 시작할 때:

| 명령 | 용도 |
| --- | --- |
| `/help` | 현재 사용할 수 있는 명령 확인 |
| `/status` | 현재 세션 상태 확인 |
| `/context` | 컨텍스트 사용량과 적용된 지침 파일 확인 |
| `/permissions` | 도구 권한 확인과 조정 |
| `/mcp` | 연결된 MCP 서버와 도구 확인 |
| `/diff` | 현재 변경 내용 확인 |

세션을 관리할 때:

| 명령 | 용도 |
| --- | --- |
| `/compact` | 대화를 요약해 컨텍스트 확보 |
| `/clear` | 새 대화 시작 |
| `/resume` | 이전 대화로 돌아가기 |
| `/rewind` | 코드와 대화를 이전 지점으로 되돌리기 |
| `/model` | 사용할 모델 선택 |
| `/effort` | 추론 수준 조정 |
| `/fast` | 같은 모델로 더 빠르게 응답 |
| `/usage` | 토큰 사용량 확인 |

작업을 나눠 진행할 때:

| 명령 | 용도 |
| --- | --- |
| `/plan` | 변경 전 탐색만 하는 계획 모드로 전환 |
| `/branch` | 현재 대화를 분기해 다른 방향 시도 |
| `/background` | 현재 세션을 백그라운드로 내리고 계속 실행 |
| `/tasks` | 백그라운드 작업과 Subagent 상태 확인 |

프로젝트를 준비할 때:

| 명령 | 용도 |
| --- | --- |
| `/init` | 프로젝트 `CLAUDE.md` 초안 생성 |
| `/memory` | 지침 파일 확인과 편집 |
| `/config` | 설정 확인과 변경 |
| `/doctor` | 설치와 설정 진단, 수정 제안 |
| `/plugin` | Plugin 설치와 관리 |

명령이 보이지 않으면 현재 설치 버전과 실행 환경에서 제공되는 목록을 따라요.  
계정 플랜과 조직 설정에 따라 일부 기능은 보이지 않을 수 있어요.

## CLI에서 확인

설치된 CLI의 기본 명령과 옵션을 확인해요.

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
| `claude agents` | 백그라운드 세션 목록 확인 |
| `claude attach <id>` | 백그라운드 세션을 현재 터미널에서 열기 |
| `claude stop <id>` | 백그라운드 세션 중지 |
| `claude mcp` | MCP 서버 설정 관리 |
| `claude plugin` | Plugin 설치와 관리 |
| `claude update` | Claude Code 업데이트 |
| `claude doctor` | 설치와 설정 상태 진단 |

자주 사용하는 실행 옵션:

| 옵션 | 용도 |
| --- | --- |
| `--add-dir` | 추가 작업 디렉터리 허용 |
| `--model` | 세션 모델 지정 |
| `--fallback-model` | 기본 모델이 막혔을 때 쓸 모델 지정 |
| `--effort` | 추론 수준 지정 |
| `--permission-mode` | 권한 모드 지정 |
| `-w, --worktree` | 새 git worktree에서 세션 시작 |
| `--bg` | 백그라운드 세션으로 시작 |
| `--safe-mode` | 커스터마이징을 끄고 시작 |
| `--output-format` | 비대화형 출력 형식 지정 |
| `--append-system-prompt` | 시스템 프롬프트에 지침 추가 |

권한 확인을 건너뛰는 옵션은 격리된 실행 환경에서만 사용해요.  
권한 모드별 범위는 [환경 설정](./setup.md)을 봐요.

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령과 Skill을 찾아요.
2. CLI 옵션은 설치된 `claude --help`에서 확인해요.
3. 동작과 지원 범위는 Claude Code 공식 문서에서 확인해요.

## 확인 기준

2026-09-23에 Claude Code 2.1.280으로 확인했어요.  
명령과 옵션은 버전마다 달라지므로 이 문서보다 현재 환경의 출력을 우선해요.

## 공식 문서

- [명령 참조](https://code.claude.com/docs/ko/commands)
- [CLI 참조](https://code.claude.com/docs/ko/cli-reference)
- [Skills](https://code.claude.com/docs/ko/skills)
