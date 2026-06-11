# 04. [초급]기본명령어 이해

Codex CLI에서 자주 쓰는 명령어 모음이다.

전체 명령어와 옵션은 [공식 문서](https://developers.openai.com/codex/cli/slash-commands/)와 [CLI reference](https://developers.openai.com/codex/cli/reference/)에서 확인한다.

## 입력 단축키

슬래시 명령어가 아닌 키 조작으로 동작하는 기능이다.

| 단축키 | 설명 | 용도 |
|---|---|---|
| `Ctrl+C` | 세션 종료 또는 중단 | CLI를 닫거나 실행을 멈출 때 |
| `Ctrl+L` | 화면 지우기 | 대화는 유지하고 터미널 화면만 정리할 때 |
| `Ctrl+O` | 최신 완료 응답 복사 | 답변이나 계획을 빠르게 복사할 때 |
| `Ctrl+R` | 프롬프트 히스토리 검색 | 이전 입력을 다시 쓸 때 |
| `Tab` | 실행 중 후속 입력 대기열 추가 | 현재 작업이 끝난 뒤 이어서 실행할 내용을 넣을 때 |
| `Up`/`Down` | 작성 중인 입력 이력 이동 | 이전 초안을 다시 쓸 때 |

## 세션 관리

| 명령어 | 설명 | 용도 |
|---|---|---|
| `/clear` | 터미널과 대화를 새로 시작 | 새 주제 시작 |
| `/compact` | 긴 대화를 요약해 토큰 확보 | 흐름은 유지하고 컨텍스트를 줄일 때 |
| `/copy` | 최신 완료 응답 복사 | 답변이나 계획 공유 |
| `/fork` | 현재 대화를 새 스레드로 분기 | 다른 접근법을 실험할 때 |
| `/side` | 임시 사이드 대화 시작 | 메인 흐름을 흐리지 않고 질문할 때 |
| `/resume` | 저장된 대화 재개 | 이전 세션을 이어갈 때 |
| `/archive` | 완료한 대화 보관 | 끝난 작업을 정리할 때 |
| `/new` | 같은 CLI 세션에서 새 대화 시작 | 터미널은 유지하고 새 맥락으로 바꿀 때 |
| `/exit` | CLI 종료 | 작업 종료 |
| `/quit` | CLI 종료 | `/exit`와 같은 종료 명령 |

## 설정·환경

| 명령어 | 설명 | 용도 |
|---|---|---|
| `/model` | 모델과 reasoning effort 선택 | 작업 성격에 맞게 모델 변경 |
| `/fast` | Fast mode 전환 | 지원 모델에서 빠른 응답이 필요할 때 |
| `/personality` | 응답 스타일 선택 | 더 간결하거나 설명적인 응답으로 조정 |
| `/permissions` | 승인과 권한 조정 | Auto, Read Only 같은 실행 수준 변경 |
| `/sandbox-add-read-dir` | Windows에서 추가 읽기 경로 허용 | 샌드박스 밖 절대 경로를 읽어야 할 때 |
| `/experimental` | 실험 기능 토글 | 선택 기능을 CLI에서 켜거나 끌 때 |
| `/goal` | 실험적 장기 목표 설정 | `features.goals`가 켜진 세션에서 목표를 유지할 때 |
| `/keymap` | TUI 단축키 설정 | 단축키를 확인하거나 `config.toml`에 저장할 때 |
| `/statusline` | TUI 하단 상태줄 설정 | 모델, 토큰, Git 정보 표시를 조정할 때 |
| `/title` | 터미널 제목 항목 설정 | 창 제목에 표시할 항목을 조정할 때 |

## 정보 확인

| 명령어 | 설명 | 용도 |
|---|---|---|
| `/status` | 현재 세션과 계정 상태 확인 | 환경 확인 |
| `/debug-config` | 설정 레이어와 정책 진단 출력 | 설정 우선순위나 정책 적용을 확인할 때 |
| `/diff` | Git diff와 미추적 파일 확인 | 수정사항 리뷰 전 확인 |
| `/mcp` | MCP 서버와 도구 확인 | 외부 도구 연결 점검 |
| `/plugins` | Plugins 목록과 설치 상태 확인 | plugin 설치·활성화 관리 |
| `/apps` | 연결된 앱 확인 | 외부 앱을 프롬프트에 붙일 때 |
| `/ps` | 실험적 백그라운드 터미널 상태 확인 | 장기 실행 명령 확인 |

## 코드 작업

| 명령어 | 설명 | 용도 |
|---|---|---|
| `/init` | `AGENTS.md` 초안 생성 | 새 프로젝트 첫 설정 |
| `/mention` | 파일이나 폴더를 대화에 첨부 | 특정 파일을 보라고 지정 |
| `/plan` | 계획 모드로 전환 | 구현 전 계획을 먼저 받을 때 |
| `/agent` | 활성 Subagent 스레드 전환 | 병렬 에이전트 상태 확인 |
| `/stop` | 백그라운드 터미널 중단 | 장기 실행 작업 취소 |
| `/review` | 현재 작업트리 리뷰 요청 | 수정 후 결함과 누락 테스트를 확인할 때 |
| `/feedback` | 진단 로그를 포함한 피드백 전송 | Codex 문제를 보고할 때 |
| `/logout` | Codex 로그아웃 | 공유 장비에서 인증 정보를 제거할 때 |

## CLI 실행 옵션

세션 시작 시 자주 쓰는 옵션이다.

| 옵션 | 설명 | 예시 |
|---|---|---|
| `--cd`, `-C` | 작업 디렉토리 지정 | `codex -C ./service` |
| `--model`, `-m` | 모델 지정 | `codex -m <model-name>` |
| `--ask-for-approval`, `-a` | 승인 정책 지정 | `codex -a on-request` |
| `--sandbox`, `-s` | 샌드박스 수준 지정 | `codex -s workspace-write` |
| `--config`, `-c` | 설정값 일회성 덮어쓰기 | `codex -c model=\"<model-name>\"` |
| `--profile`, `-p` | 설정 프로필 사용 | `codex -p work` |
| `--add-dir` | 추가 디렉토리 쓰기 접근 허용 | `codex --add-dir ../shared` |
| `--image`, `-i` | 이미지 입력 첨부 | `codex -i screen.png` |
| `--search` | live web search 사용 | `codex --search` |
| `--oss` | 로컬 오픈소스 모델 provider 사용 | `codex --oss` |
| `--enable` | 기능 플래그 일회성 활성화 | `codex --enable codex_hooks` |
| `--disable` | 기능 플래그 일회성 비활성화 | `codex --disable codex_hooks` |

## 시나리오별 활용

**대화가 너무 길어졌을 때**

- 흐름을 유지하려면: `/compact`
- 새 주제로 바꾸려면: `/clear`
- 이어서 할 작업을 미리 넣으려면: `Tab`으로 대기열 추가

**구현 전 계획이 필요할 때**

- `/plan`으로 전환한다.
- 범위, 제외 항목, 검증 기준을 먼저 정한다.

**변경사항을 확인할 때**

- `/diff`로 수정 파일과 내용을 확인한다.
- 필요한 테스트를 실행한 뒤 결과를 정리한다.
- `/review`로 실제 결함, 회귀, 테스트 누락을 먼저 확인한다.

**외부 도구가 필요할 때**

- `/mcp`로 연결 상태를 확인한다.
- `/plugins`로 Plugins 설치와 활성 상태를 확인한다.
- Browser 계열 도구가 준비되어 있으면 로컬 웹 확인에 사용한다.

**다른 접근을 실험할 때**

- `/fork`로 현재 대화를 분기한다.
- 작은 질문은 `/side`로 분리한다.

**최신 정보가 필요할 때**

- 한 번 실행할 때만 검색이 필요하면 `--search`를 붙인다.
- 공식 문서, 라이브러리 버전, 릴리즈 노트, API 변경처럼 시간이 지나면 바뀌는 정보에 사용한다.
- 검색 결과는 출처와 날짜를 확인한다.

**이미지나 화면 정보가 필요할 때**

- 이미지 입력은 `--image` 또는 `-i`로 첨부한다.
- 여러 이미지는 쉼표로 구분하거나 `--image`를 반복해서 첨부한다.
- 스크린샷, 오류 화면, 디자인 시안, 다이어그램처럼 시각 정보가 판단에 필요한 경우에 사용한다.
- 이미지 생성이나 수정이 필요하면 image generation 기능 또는 관련 Skill을 사용한다.
- 로컬 웹 화면 확인은 Codex App의 in-app browser나 Browser use를 사용한다.
- 데스크톱 앱이나 OS UI를 조작해야 하면 Computer Use를 사용한다.

**Skill을 호출할 때**

- 준비된 Skill은 명시 호출이 가장 안정적이다.
- 예: `$ct-implement`, `$ct-design-review`, `$ct-calltree`, `qa-lucin`, `spring`

## 공식 문서 기준

- <https://developers.openai.com/codex/cli/slash-commands/>
- <https://developers.openai.com/codex/cli/reference/>
- <https://developers.openai.com/codex/cli/features/>
- <https://developers.openai.com/codex/app/features/>

## 이력관리

- 2026-06-11: Web search, 이미지 입력, 이미지 생성, 화면 확인 기능 기준 보강
- 2026-06-10: Browser, 리뷰, 검색, Skill 호출 기준 반영
- 2026-05-11: Codex CLI 기본 명령어 문서 추가
