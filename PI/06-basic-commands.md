# 06. Pi 기본 명령

Pi에서 자주 쓰는 기본 슬래시 명령어와 단축키를 정리한다.

검증 기준은 Pi `0.80.6`이다.

전체 명령어와 단축키는 Pi 안에서 아래 명령으로 확인할 수 있다.

```text
/hotkeys
```

## 입력 단축키

| 단축키 | 설명 | 용도 |
|---|---|---|
| Enter | 입력 제출 | 요청 실행 |
| Shift+Enter | 줄바꿈 | 여러 줄 프롬프트 작성 |
| Ctrl+Enter | Windows Terminal 등에서 줄바꿈으로 설정 가능 | 터미널 설정에 따라 사용 |
| Ctrl+G | 외부 편집기 열기 | 긴 프롬프트 작성 |
| Ctrl+C | 에디터 비우기 또는 선택 복사 | 입력 초기화 |
| Ctrl+D | 빈 에디터에서 종료 | Pi 종료 |
| Escape | 실행 중단 또는 선택 취소 | 응답 중단 |
| Ctrl+O | 도구 출력 접기/펼치기 | 긴 tool output 정리 |
| Alt+Enter | follow-up message queue | 현재 작업 뒤에 이어질 메시지 예약 |
| Alt+Up | queued message를 에디터로 복원 | 예약 메시지 수정 |

Windows Terminal에서는 Alt+Enter가 기본적으로 전체화면 전환에 묶여 있으므로 별도 설정이 필요할 수 있다.

## 모델·설정

| 명령어 | 설명 | 용도 |
|---|---|---|
| `/login` | OAuth 또는 API 키 로그인 | 인증 설정 |
| `/logout` | 로그인 정보 제거 | 계정 전환 또는 인증 초기화 |
| `/model` | 모델 선택 | 작업에 맞는 모델 선택 |
| `/scoped-models` | Ctrl+P 순환 모델 선택 | 자주 쓰는 모델 목록 제한 |
| `/settings` | 주요 설정 UI | thinking, theme, message delivery 등 변경 |
| `/reload` | 실행 리소스 다시 로드 | keybindings, extensions, skills, prompts, themes, context files 수정 후 반영 |

모델 선택 단축키:

| 단축키 | 설명 |
|---|---|
| Ctrl+L | 모델 선택 |
| Ctrl+P | 다음 scoped model |
| Shift+Ctrl+P | 이전 scoped model |
| Shift+Tab | thinking level 순환 |
| Ctrl+T | thinking block 접기/펼치기 |
| Ctrl+X | 마지막 assistant 메시지 복사, `/tree`에서는 선택한 메시지 복사 |

Thinking level은 `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`를 사용한다. `max`는 지원 모델에서만 선택할 수 있다.

CLI에서 직접 지정할 수도 있다.

```bash
pi --thinking max "복잡한 문제를 분석해줘"
```

## 프로젝트 신뢰

Project Trust는 프로젝트 설정과 리소스를 불러올지 결정한다.

| 명령어·옵션 | 설명 | 적용 기준 |
|---|---|---|
| `/trust` | 현재 프로젝트의 신뢰 결정을 저장 | 다음 Pi 실행부터 적용 |
| `--approve`, `-a` | 이번 실행에서 프로젝트를 신뢰 | 비대화형 모드와 package 명령에 사용 |
| `--no-approve`, `-na` | 이번 실행에서 프로젝트 리소스를 무시 | 비대화형 모드와 package 명령에 사용 |

`/trust`는 `~/.pi/agent/trust.json`에 결정을 저장하며 현재 세션을 다시 불러오지 않는다. 저장 후 Pi를 재시작한다.

## 세션 관리

| 명령어 | 설명 | 용도 |
|---|---|---|
| `/resume` | 이전 세션 선택 | 중단한 작업 이어가기 |
| `/new` | 새 세션 시작 | 새 주제 시작 |
| `/name <name>` | 현재 세션 이름 지정 | 세션 찾기 쉽게 만들기 |
| `/session` | 현재 세션 정보 표시 | 파일 경로, ID, 토큰, 비용 확인 |
| `/tree` | 현재 세션 트리 탐색 | 이전 지점으로 이동해 다른 방향 시도 |
| `/fork` | 이전 사용자 메시지에서 새 세션 생성 | 과거 지점에서 새 파일로 분기 |
| `/clone` | 현재 활성 브랜치를 새 세션으로 복제 | 안전하게 복사본 생성 |
| `/compact [prompt]` | 오래된 대화 요약 | 컨텍스트 확보 |

CLI에서도 세션을 다룰 수 있다.

```bash
pi -c                  # 최근 세션 계속
pi -r                  # 세션 선택
pi --no-session        # 저장하지 않는 임시 세션
pi --name "작업명"     # 시작할 때 세션 표시 이름 지정
pi --session <path|id> # 특정 세션 파일 또는 부분 ID 열기
pi --session-id <id>   # 프로젝트의 정확한 세션 ID 사용, 없으면 생성
pi --fork <path|id>    # 특정 세션에서 분기
```

`--name`은 사람이 찾기 쉬운 표시 이름을 정한다. `--session-id`는 자동화에서 정확한 프로젝트 세션을 다시 사용해야 할 때 지정한다.

## 정보 확인·내보내기

| 명령어 | 설명 | 용도 |
|---|---|---|
| `/copy` | 마지막 assistant 메시지 복사 | 답변 재사용 |
| `/export [file]` | 세션을 HTML로 내보내기 | 공유/보관 |
| `/share` | private GitHub gist로 공유 링크 생성 | 세션 공유 |
| `/changelog` | 버전 변경 내역 표시 | 업데이트 내용 확인 |
| `/quit` | Pi 종료 | 종료 |

## 파일·명령 입력

### 파일 참조

Editor에서 `@`를 입력하면 파일을 검색해 참조할 수 있다.

```text
@README.md 실행 방법을 요약해줘.
```

CLI에서도 가능하다.

```bash
pi @README.md "요약해줘"
pi @src/app.ts @src/app.test.ts "같이 리뷰해줘"
```

### Shell 명령

| 입력 | 설명 |
|---|---|
| `!command` | 명령 실행 후 출력을 모델 컨텍스트에 포함 |
| `!!command` | 명령 실행 후 출력을 모델 컨텍스트에 포함하지 않음 |

예시:

```text
!npm test
!!git status
```

## Package 명령

Pi package는 extension, skill, prompt template, theme를 묶어 설치하는 단위다.

| 명령어 | 설명 | 용도 |
|---|---|---|
| `pi install <source>` | package 설치 | 전역 하네스 리소스 추가 |
| `pi install -l <source>` | 프로젝트 로컬 package 설치 | 현재 프로젝트에만 리소스 추가 |
| `pi list` | 설치된 package 확인 | 설치 상태 점검 |
| `pi remove <source>` | package 제거 | 사용하지 않는 리소스 제거 |
| `pi update` | Pi만 업데이트 | CLI 갱신 |
| `pi update --all` | Pi와 package 업데이트 | 전체 갱신 |
| `pi update --extensions` | package만 업데이트 | 설치 리소스 갱신 |
| `pi update <source>` | 지정한 package 업데이트 | package 하나만 갱신 |
| `pi config` | package 리소스 활성화 상태 관리 | 전역 설정 화면에서 시작 |
| `pi config -l` | 프로젝트 package 리소스 활성화 상태 관리 | `.pi/settings.json` 화면에서 시작 |
| `pi -e <source>` | 설치 없이 현재 실행에만 package 사용 | 임시 테스트 |

`pi config` 화면에서는 Tab으로 전역 설정과 프로젝트 설정을 전환한다. `pi config -l`로 시작하면 전역에서 상속한 리소스는 흐리게 표시된다.

프로젝트 package를 다루는 `install`, `remove`, `list`, `update`, `config`에는 `--approve` 또는 `--no-approve`를 사용할 수 있다. 승인은 소스 검토 결과에 따라 명령 단위로 적용한다.

설치 source는 npm, git, 로컬 경로를 사용할 수 있다.

```bash
pi install npm:@scope/pi-package
pi install git:github.com/user/pi-package
pi install ./local-pi-package
```

프로젝트에만 적용하려면 `-l`을 붙인다. 아래 로컬 경로는 이 문서 저장소 루트에서 실행하는 예시다.

```bash
pi install -l ./PI/examples/basic-pi-package --approve
```

`--approve`는 소스를 검토한 뒤 현재 명령에만 사용한다. 설치 상태는 `pi list --approve`로 확인하며, 출력의 `Project packages`에는 package 이름이 아니라 등록한 source 경로가 표시된다.

설치하지 않고 한 번만 확인하려면 `-e`를 사용한다.

```bash
pi -e ./PI/examples/basic-pi-package
```

설치 후 Pi에서 `/trust`로 신뢰 결정을 저장하고 재시작하면 예시 package의 prompt template과 skill을 읽는다.

```text
/reload
```

## Print mode

한 번만 실행하고 종료하려면 `-p` 또는 `--print`를 쓴다.

```bash
pi -p "이 저장소를 요약해줘"
cat README.md | pi -p "이 내용을 요약해줘"
pi -p @screenshot.png "이 이미지에 뭐가 있어?"
```

사용 도구를 허용 목록으로 제한하거나 특정 도구만 제외할 수 있다.

```bash
pi --tools read,grep,find,ls -p "코드를 리뷰해줘"
pi --exclude-tools bash,write,edit -p "코드를 리뷰해줘"
```

`--tools`, `-t`는 built-in, extension, custom tool 전체에 허용 목록을 적용한다. `--exclude-tools`, `-xt`는 같은 범위에서 지정한 도구만 비활성화한다.

## JSON/RPC 모드

자동화나 외부 시스템 연동이 필요하면 아래 모드를 사용한다.

| 모드 | 용도 |
|---|---|
| `--mode json` | 단일 실행의 이벤트를 JSON Lines로 출력 |
| `--mode rpc` | 외부 프로그램이 stdin/stdout JSONL로 Pi를 제어 |

자세한 활용 예시는 [Pi 확장과 자동화](./03-applying-core-concepts.md)에서 확인한다.

## 자주 쓰는 조합

### 새 작업 시작

```text
/new
/name 주문 취소 버그 수정
```

### 모델 변경

```text
/model
```

### 컨텍스트 정리

```text
/compact 현재 목표, 변경 파일, 남은 이슈 중심으로 요약해줘.
```

### 이전 세션 복귀

```text
/resume
```

### 세션 HTML 저장

```text
/export order-cancel-session.html
```

### 예시 package 설치

이 문서 저장소 루트에서 예시 package를 프로젝트 로컬로 설치한다.

```bash
pi install -l ./PI/examples/basic-pi-package --approve
pi list --approve
```

Pi 안에서 신뢰 결정을 저장한다.

```text
/trust
```

Pi를 종료하고 저장소 루트에서 다시 시작한 뒤 prompt template과 skill을 각각 실행한다.

```text
/ready-pr
/skill:project-check
```

## 이력관리

- 2026-07-13: 제목을 명령 참조 역할에 맞게 정리하고 Pi 0.80.6 기준 Project Trust, package 승인·source 출력, max thinking level, 세션·도구 옵션, config와 update 명령 반영
- 2026-05-12: JSON/RPC 모드 요약 추가
- 2026-05-11: 최초 생성
