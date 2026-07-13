# Codex CLI 명령 참조

이 문서는 공통 Playbook을 Codex CLI에서 실행할 때 필요한 명령을 다시 찾는 참조 문서다.

## 사용 기준

명령 제공 여부는 Codex 버전과 실행 환경에 따라 달라질 수 있다.

- 현재 환경에서는 입력창에 `/`를 입력해 실제 목록을 확인한다.
- 실험 기능은 `/experimental`과 공식 문서에서 상태를 확인한다.
- ChatGPT web, desktop app, Codex CLI의 명령 목록은 서로 다를 수 있다.
- 위험한 실행 옵션은 격리된 환경에서만 사용한다.

## 작업과 검토

| 명령 | 설명 |
| --- | --- |
| `/plan` | 계획 모드로 전환한다 |
| `/diff` | Git 변경사항과 미추적 파일을 확인한다 |
| `/review` | 현재 작업트리를 검토한다 |
| `/mention` | 파일이나 폴더를 대화에 포함한다 |
| `/init` | 현재 폴더에 `AGENTS.md` 초안을 만든다 |
| `/goal` | 장기 작업 목표를 설정하고 관리한다 |

## 권한과 설정

| 명령 | 설명 |
| --- | --- |
| `/permissions` | 승인과 권한 수준을 조정한다 |
| `/approve` | 자동 검토가 거부한 최근 작업의 한 번 재시도를 승인한다 |
| `/model` | 현재 모델과 지원되는 reasoning 수준을 선택한다 |
| `/fast` | 지원되는 모델의 Fast tier를 전환한다 |
| `/personality` | 응답 스타일을 선택한다 |
| `/experimental` | 실험 기능을 확인하고 전환한다 |
| `/keymap` | TUI 단축키를 설정한다 |
| `/vim` | 입력창의 Vim 모드를 전환한다 |
| `/statusline` | TUI 상태줄 항목을 설정한다 |
| `/title` | 터미널 제목 항목을 설정한다 |
| `/theme` | 구문 강조 테마를 선택한다 |

## 확장 기능

| 명령 | 설명 |
| --- | --- |
| `/skills` | Skill을 찾아 요청에 포함한다 |
| `/mcp` | MCP 서버와 도구 상태를 확인한다 |
| `/apps` | 연결된 App을 찾아 요청에 포함한다 |
| `/plugins` | Plugin 설치와 활성 상태를 관리한다 |
| `/hooks` | Hook 설정과 신뢰 상태를 확인한다 |
| `/memories` | Memories 사용과 생성을 설정한다 |
| `/agent`, `/subagents` | Subagent 스레드를 확인하고 전환한다 |

## 세션 관리

| 명령 | 설명 |
| --- | --- |
| `/clear` | 화면과 작업 컨텍스트를 함께 초기화한다 |
| `/compact` | 대화를 요약해 컨텍스트를 정리한다 |
| `/copy` | 최신 완료 응답을 복사한다 |
| `/new` | 같은 CLI에서 새 작업을 시작한다 |
| `/resume` | 저장된 작업을 다시 연다 |
| `/fork` | 현재 작업을 새 작업으로 분기한다 |
| `/side`, `/btw` | 임시 사이드 대화를 연다 |
| `/rename` | 현재 작업 이름을 바꾼다 |
| `/archive` | 현재 세션을 보관하고 종료한다 |
| `/delete` | 현재 세션과 하위 세션을 삭제한다 |
| `/exit`, `/quit` | CLI를 종료한다 |

## 실행 상태와 진단

| 명령 | 설명 |
| --- | --- |
| `/status` | 모델, 권한, 컨텍스트와 세션 상태를 확인한다 |
| `/usage` | 토큰 사용량과 제한을 확인한다 |
| `/ps` | 백그라운드 터미널과 최근 출력을 확인한다 |
| `/stop` | 현재 세션의 백그라운드 터미널을 중단한다 |
| `/debug-config` | Config 레이어와 정책 적용 상태를 진단한다 |
| `/feedback` | 로그와 진단 정보를 포함해 피드백을 보낸다 |
| `/logout` | 현재 인증 정보를 제거한다 |

## 환경별 명령

| 명령 | 적용 환경 |
| --- | --- |
| `/ide` | IDE 컨텍스트가 연결된 환경 |
| `/app` | CLI 세션을 desktop app에서 이어갈 수 있는 환경 |
| `/setup-default-sandbox` | Windows |
| `/sandbox-add-read-dir` | Windows |
| `/raw` | CLI raw scrollback |
| `/import` | 지원되는 외부 에이전트 설정 가져오기 |

## 주요 CLI 실행 옵션

| 옵션 | 설명 |
| --- | --- |
| `--cd`, `-C` | 작업 디렉터리 지정 |
| `--model`, `-m` | 모델 지정 |
| `--ask-for-approval`, `-a` | 승인 정책 지정 |
| `--sandbox`, `-s` | 샌드박스 수준 지정 |
| `--config`, `-c` | Config 값을 이번 실행에 덮어쓰기 |
| `--profile`, `-p` | 사용자 Config 프로필 적용 |
| `--add-dir` | 추가 쓰기 경로 허용 |
| `--image`, `-i` | 이미지 입력 첨부 |
| `--search` | live web search 사용 |
| `--oss` | 로컬 오픈소스 모델 provider 사용 |
| `--enable`, `--disable` | 기능 플래그 전환 |
| `--strict-config` | 알 수 없는 Config 필드를 오류로 처리 |

## 단축키

| 단축키 | 설명 |
| --- | --- |
| `Ctrl+R` | 프롬프트 이력 검색 |
| `Ctrl+O` | 최신 완료 응답 복사 |
| `Tab` | 실행 중인 작업 뒤에 후속 입력 예약 |
| `Enter` | 실행 중인 작업에 지시 전달 |
| `Esc` 두 번 | 이전 사용자 메시지를 편집해 분기 |
| `Ctrl+C` | 세션 종료 |

## 공식 문서 기준

- 확인일: 2026-07-13
- <https://developers.openai.com/codex/cli/slash-commands/>
- <https://developers.openai.com/codex/cli/reference/>

## 이력관리

- 2026-07-13: Codex CLI 명령과 실행 옵션을 공통 Playbook에서 분리한 플랫폼 참조 문서로 정리
