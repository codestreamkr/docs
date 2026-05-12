# 02. [초급]핵심개념 이해

Pi를 사용할 때 먼저 알아야 할 기본 개념을 정리한다.

1차 문서에서는 커스텀 확장 제작이 아니라 Pi 기본 기능만 다룬다.

## 1. Interactive Mode

Pi를 인자 없이 실행하면 대화형 모드로 열린다.

```bash
pi
```

화면은 크게 네 영역으로 나뉜다.

| 영역 | 설명 |
|---|---|
| Startup header | 단축키, 로드된 지침 파일, 리소스 정보 표시 |
| Messages | 사용자 메시지, assistant 응답, 도구 실행 결과 표시 |
| Editor | 사용자가 입력하는 영역 |
| Footer | 현재 경로, 세션명, 토큰/비용, 컨텍스트 사용량, 모델 표시 |

Footer의 컨텍스트 사용량은 현재 모델의 context window 기준으로 표시된다.

실제 입력 단축키와 slash command는 `06-basic-commands.md`에서 확인한다.

## 2. Editor

Editor는 Pi에 요청을 입력하는 곳이다.

| 기능 | 사용법 |
|---|---|
| 입력 제출 | Enter |
| 여러 줄 입력 | Shift+Enter, Windows Terminal에서는 설정에 따라 Ctrl+Enter 가능 |
| 파일 참조 | `@` 입력 후 파일 검색 |
| 경로 자동완성 | Tab |
| 이미지 붙여넣기 | Ctrl+V, Windows에서는 Alt+V |
| 외부 편집기 | Ctrl+G |

파일을 직접 지정해서 실행할 수도 있다.

```bash
pi @README.md "이 파일을 요약해줘"
pi @src/app.ts @src/app.test.ts "두 파일을 함께 리뷰해줘"
```

## 3. Shell command

Pi 안에서 `!`로 셸 명령을 실행할 수 있다.

```text
!npm test
```

이 경우 명령 출력이 모델 컨텍스트에 전달된다.

출력을 모델에게 보내고 싶지 않으면 `!!`를 쓴다.

```text
!!git status
```

## 4. Model

Pi는 여러 제공자와 모델을 지원한다.

모델은 아래 방식으로 바꾼다.

```text
/model
```

또는 단축키를 쓴다.

| 단축키 | 동작 |
|---|---|
| Ctrl+L | 모델 선택 |
| Ctrl+P | scoped model 다음 모델로 전환 |
| Shift+Ctrl+P | scoped model 이전 모델로 전환 |
| Shift+Tab | thinking level 순환 |

CLI에서 모델을 지정할 수도 있다.

```bash
pi --provider openai --model gpt-4o
pi --model openai/gpt-4o
pi --model sonnet:high
```

## 5. Thinking level

Thinking level은 모델의 추론 강도를 조절하는 설정이다.

Pi에서 사용하는 값은 아래와 같다.

- `off`
- `minimal`
- `low`
- `medium`
- `high`
- `xhigh`

모든 모델이 모든 thinking level을 지원하는 것은 아니다.

## 6. Session

Pi의 대화는 자동으로 세션에 저장된다.

기본 저장 위치는 아래와 같다.

```text
~/.pi/agent/sessions/
```

세션은 단순한 로그가 아니라 트리 구조다.

그래서 이전 지점으로 이동해 다른 방향으로 이어가거나, 새 세션 파일로 분기할 수 있다.

주요 명령은 아래와 같다.

| 명령어 | 설명 |
|---|---|
| `/resume` | 이전 세션 선택 |
| `/new` | 새 세션 시작 |
| `/session` | 현재 세션 정보 확인 |
| `/tree` | 현재 세션 트리 탐색 |
| `/fork` | 이전 사용자 메시지에서 새 세션 생성 |
| `/clone` | 현재 활성 브랜치를 새 세션으로 복제 |

세션을 실제 작업에서 쓰는 흐름은 `05-project-cooking.md`의 긴 작업 관리 항목을 따른다.

## 7. Context

모델은 무한히 긴 대화를 볼 수 없다.

각 모델에는 context window가 있고, Pi footer에는 현재 사용량이 표시된다.

예:

```text
0.0%/272k (auto)
```

의미는 아래와 같다.

- `0.0%`: 현재 컨텍스트 사용률
- `272k`: 현재 모델의 context window
- `(auto)`: 자동 compaction 활성화

## 8. Compaction

대화가 길어지면 Pi는 오래된 내용을 요약해 컨텍스트를 확보한다.

자동 compaction 조건은 개념적으로 아래와 같다.

```text
contextTokens > contextWindow - reserveTokens
```

수동으로 실행할 수도 있다.

```text
/compact
/compact 테스트 실패 원인과 수정 내역 중심으로 요약해줘
```

기본 설정은 아래와 같다.

| 설정 | 기본값 | 설명 |
|---|---:|---|
| `compaction.enabled` | `true` | 자동 compaction 사용 |
| `compaction.reserveTokens` | `16384` | 응답을 위해 남겨둘 토큰 |
| `compaction.keepRecentTokens` | `20000` | 요약하지 않고 유지할 최근 토큰 |

긴 작업 중 compaction 실행 예시는 `05-project-cooking.md`, `07-analysis-and-testing.md`에서 확인한다.

## 9. Settings

Pi 설정은 JSON 파일로 관리된다.

| 위치 | 범위 |
|---|---|
| `~/.pi/agent/settings.json` | 전역 |
| `.pi/settings.json` | 프로젝트 |

프로젝트 설정은 전역 설정을 덮어쓴다.

자주 보는 항목은 아래와 같다.

- `defaultProvider`
- `defaultModel`
- `defaultThinkingLevel`
- `theme`
- `compaction`
- `retry`
- `enabledModels`
- `shellPath`

프로젝트 설정 생성 기준은 `04-starting-a-project.md`에서 확인한다.

## 10. Customization 구성 요소

Pi는 기능을 목적별 리소스로 나눠 확장한다.

Customization은 단순 설정이 아니라, 모델이 일하는 방식과 실행 환경을 조정하는 구조다. 기능별 역할을 구분하면 어떤 작업을 어디에 넣을지 빠르게 정할 수 있다.

| 구성 요소 | 역할 | 활용 예 |
|---|---|---|
| Extensions | Pi 실행 흐름과 도구를 TypeScript로 확장 | Jira, Wiki, 배포 API, 로그 조회 도구 |
| Skills | 특정 작업 절차와 판단 기준 제공 | 장애 분석 절차, 코드 리뷰 기준, 문서 작성 규칙 |
| Prompt Templates | 반복 프롬프트를 명령처럼 재사용 | PR 설명 작성, 릴리스 노트 초안, 이슈 요약 |
| Themes | TUI 색상과 표시 스타일 조정 | 다크/라이트 테마, diff 색상, 오류 강조 |
| Pi Packages | extension, skill, prompt, theme를 묶어 배포 | 팀 공통 개발 도구 패키지 |
| Custom Models | 로컬 또는 사내 모델을 설정 파일로 추가 | Ollama, LM Studio, vLLM, 사내 OpenAI 호환 서버 |
| Custom Providers | 모델 제공자 연결 방식을 코드로 등록 | 사내 LLM Gateway, 프록시, SSO/OAuth, 비표준 API |

### 10.1 Extensions

Extensions는 Pi 기능을 코드로 확장한다.

- 실행 흐름 이벤트에 개입한다.
- 모델이 호출할 custom tool을 등록한다.
- slash command, shortcut, provider를 추가한다.
- 외부 API 인증과 호출을 내부에 숨긴다.

적합한 작업은 아래와 같다.

- Jira 이슈 CRUD
- Confluence 문서 CRUD
- 사내 API 조회
- 위험 명령 실행 전 확인
- 긴 로그 요약 후 모델 전달

전역 위치는 아래와 같다.

```text
~/.pi/agent/extensions/
```

### 10.2 Skills

Skills는 작업 절차를 필요할 때 불러오는 지침 묶음이다.

- 특정 업무의 순서와 기준을 제공한다.
- 참고 문서와 스크립트를 함께 둘 수 있다.
- 모델이 필요한 경우에만 전체 내용을 읽는다.

적합한 작업은 아래와 같다.

- 신규 프로젝트 분석 절차
- 장애 원인 분석 절차
- API 설계 검토 기준
- 사내 문서 작성 기준

전역 위치는 아래와 같다.

```text
~/.pi/agent/skills/
```

### 10.3 Prompt Templates

Prompt Templates는 자주 쓰는 요청을 짧은 명령으로 실행한다.

- 파일명으로 slash command가 만들어진다.
- 인자를 받아 프롬프트에 넣을 수 있다.
- 실행 코드는 없고 요청 문장만 재사용한다.

적합한 작업은 아래와 같다.

- PR 설명 작성
- 커밋 메시지 초안
- Jira 이슈 요약
- Wiki 문서 초안

전역 위치는 아래와 같다.

```text
~/.pi/agent/prompts/
```

### 10.4 Themes

Themes는 Pi TUI 색상을 조정한다.

- 메시지, 도구 결과, diff, markdown 색상을 바꾼다.
- 터미널 배경이나 개인 시인성에 맞춘다.
- 기능 동작에는 영향을 주지 않는다.

전역 위치는 아래와 같다.

```text
~/.pi/agent/themes/
```

### 10.5 Pi Packages

Pi Packages는 여러 리소스를 묶어 설치하는 배포 단위다.

- extensions, skills, prompts, themes를 함께 배포한다.
- npm, git, 로컬 경로에서 설치할 수 있다.
- 팀 공통 환경을 맞출 때 사용한다.

적합한 작업은 아래와 같다.

- 사내 개발 도구 묶음
- 프로젝트 표준 리뷰 흐름
- 팀 공통 프롬프트와 스킬 배포
- 여러 프로젝트에서 같은 custom tool 사용

### 10.6 Custom Models

Custom Models는 모델 목록을 설정 파일로 추가한다.

- OpenAI 호환 로컬 서버를 붙인다.
- 사내 모델 endpoint를 등록한다.
- 모델별 context window, max token, 비용 정보를 지정한다.

설정 위치는 아래와 같다.

```text
~/.pi/agent/models.json
```

### 10.7 Custom Providers

Custom Providers는 모델 제공자 연결을 Extension 코드로 등록한다.

- 기존 provider의 base URL을 proxy로 바꾼다.
- 커스텀 헤더나 인증 흐름을 추가한다.
- 동적으로 모델 목록을 가져온다.
- 비표준 스트리밍 API를 직접 구현한다.

단순 모델 추가는 Custom Models를 우선한다. 인증, 라우팅, API 변환이 필요하면 Custom Providers를 사용한다.

## 11. Pi가 잘하는 작업 방식

Pi는 AI가 일하는 실행 흐름을 조정하기 좋은 코딩 에이전트 하네스다.

Pi의 강점은 요청 문장을 잘 쓰는 데서 끝나지 않는다. Extension, custom tool, custom provider, SDK/RPC를 사용하면 AI가 작업하기 전후의 흐름을 코드로 조정할 수 있다.

### 11.1 실행 흐름 앞단에 개입

Extension은 사용자 입력, 모델 호출, 도구 실행 전후에 들어갈 수 있다.

- 사용자 입력을 LLM에 보내기 전에 변환
- 모델 호출 전에 필요한 컨텍스트 주입
- 도구 실행 전에 인자 검사
- 도구 실행 후 결과 가공
- 특정 요청을 LLM 없이 Extension에서 직접 처리
- 긴 테스트 로그를 요약해서 모델에 전달

핵심은 AI에게 설명해서 따르게 하는 것이 아니라, AI 앞단과 중간 단계에서 코드가 먼저 처리한다는 점이다.

### 11.2 도구 호출 전후 제어

Pi는 모델이 `read`, `bash`, `edit`, `write` 같은 도구를 호출할 때 전후 이벤트에 개입할 수 있다.

- `bash` 실행 전 명령 검사
- `read` 전에 파일 경로 검사
- `edit`, `write` 전에 변경 대상 확인
- `bash` 결과를 모델에 전달하기 전에 요약
- 실패한 테스트 로그에서 핵심 정보 추출

예를 들어 테스트 로그가 길면 Extension이 실패 테스트명, 에러 메시지, 관련 파일만 추려서 모델에 전달할 수 있다.

### 11.3 모델이 쓸 도구 추가

Extension으로 모델이 호출할 수 있는 custom tool을 붙일 수 있다.

- Jira 이슈 조회
- 사내 문서 검색
- API 명세 조회
- 로그 검색
- 배포 상태 확인
- 로컬 스크립트 실행
- 테스트 결과 파싱
- 보안 점검 실행

이 방식은 도구 사용법을 프롬프트로 설명하는 것이 아니라, 모델이 호출 가능한 도구로 하네스에 등록하는 방식이다.

### 11.4 모델 연결 방식 조정

Custom Provider로 모델 실행 계층을 프로젝트 환경에 맞출 수 있다.

- 사내 LLM Gateway 연결
- 회사 프록시 경유
- SSO/OAuth 로그인 연결
- 자체 모델 서버 연결
- OpenAI 호환 로컬 서버 연결
- 비표준 스트리밍 API 구현
- 모델별 thinking level 매핑

모델 선택뿐 아니라 인증, 라우팅, endpoint, 스트리밍 방식까지 조정할 수 있다.

### 11.5 다른 시스템에 내장

Pi는 CLI뿐 아니라 SDK와 RPC 모드를 제공한다.

- CI 자동 리뷰
- PR 점검 봇
- 내부 개발자 포털
- 배포 점검 도구
- 운영 콘솔
- 개인 자동화 스크립트
- 자체 UI를 가진 에이전트 앱

이 경우 Pi는 대화형 도구가 아니라 에이전트 런타임 부품으로 동작한다.

### 11.6 만들어진 하네스 리소스 설치

Pi는 직접 Extension이나 Skill을 만들지 않고, 이미 만들어진 Pi package를 설치해서 쓸 수 있다.

Pi package는 extension, skill, prompt template, theme를 묶어 배포하는 단위다. npm, git, 로컬 경로에서 설치할 수 있다.

```bash
pi install npm:@scope/pi-package
pi install git:github.com/user/pi-package
pi install ./local-pi-package
```

프로젝트에만 적용하려면 `-l`을 붙인다.

```bash
pi install -l npm:@scope/pi-package
```

설치한 package는 Pi 하네스에 리소스를 추가한다.

- extension: 실행 흐름 개입, custom tool, custom command 추가
- skill: 작업 절차와 참고 문서 제공
- prompt template: 반복 프롬프트 재사용
- theme: 터미널 UI 스타일 적용

이 방식은 하네스 조정을 직접 구현하지 않고, 검증된 리소스를 가져와 현재 작업 환경에 붙이는 방법이다.

### 11.7 트리 구조 세션 활용

Pi 세션은 선형 기록이 아니라 트리 구조로 저장된다.

- `/tree`로 이전 지점 이동
- 같은 세션 파일 안에서 다른 분기로 이어가기
- `/fork`로 특정 시점에서 새 세션 만들기
- `/clone`으로 현재 분기 복제
- JSONL 세션 파일을 외부 도구에서 분석
- SDK에서 세션, 분기, compaction 제어

이 구조는 긴 작업에서 여러 해결 방식을 비교하거나, 세션 로그를 평가 데이터로 다룰 때 유리하다.

## 이력관리

- 2026-05-12: Customization 구성 요소와 활용 기준 추가
- 2026-05-11: 최초 생성
