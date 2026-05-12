# 01. [초급]PI요?

Pi는 터미널에서 사용하는 코딩 에이전트 하네스다.

단순히 답변만 받는 채팅 도구가 아니라, 현재 프로젝트 안에서 파일을 읽고, 수정하고, 명령을 실행하며 작업을 이어가는 도구로 보면 된다.

## 1. 설치

Pi는 npm 패키지로 설치한다.

```bash
npm install -g @earendil-works/pi-coding-agent
```

설치 후 작업할 프로젝트 디렉토리에서 실행한다.

```bash
cd /path/to/project
pi
```

Windows에서는 bash 셸이 필요하다. 보통 Git for Windows를 설치하면 충분하다.

Pi가 Windows에서 bash를 찾는 순서는 아래와 같다.

1. `~/.pi/agent/settings.json`의 `shellPath`
2. `C:\Program Files\Git\bin\bash.exe`
3. PATH에 있는 `bash.exe`

## 2. 로그인

Pi는 구독 로그인과 API 키 방식을 모두 지원한다.

### 구독 로그인

Pi 실행 후 아래 명령을 입력한다.

```text
/login
```

선택 가능한 구독 로그인 예시는 아래와 같다.

- Claude Pro/Max
- ChatGPT Plus/Pro(Codex)
- GitHub Copilot

로그인 정보는 `~/.pi/agent/auth.json`에 저장된다.

> Claude Pro/Max 구독 인증은 Claude 플랜 한도와 별개로 Anthropic extra usage 과금이 발생할 수 있다.

### API 키

환경 변수로 API 키를 지정한 뒤 실행할 수 있다.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
pi
```

또는 `/login`에서 API 키 제공자를 선택해 `auth.json`에 저장할 수 있다.

## 3. 첫 요청

Pi가 실행되면 바로 요청을 입력하고 Enter를 누른다.

```text
이 저장소 구조를 요약하고, 테스트 실행 방법을 알려줘.
```

Pi는 기본적으로 아래 도구를 모델에 제공한다.

| 도구 | 역할 |
|---|---|
| `read` | 파일 읽기 |
| `write` | 파일 생성 또는 전체 덮어쓰기 |
| `edit` | 기존 파일 일부 수정 |
| `bash` | 셸 명령 실행 |

추가로 읽기 전용 도구인 `grep`, `find`, `ls`도 사용할 수 있다.

## 4. Pi 주요 개념

- 현재 작업 디렉토리를 기준으로 동작한다.
- 프로젝트 파일을 읽고 수정할 수 있다.
- 터미널 명령을 실행할 수 있다.
- 대화는 세션으로 자동 저장된다.
- 이전 세션을 다시 열거나, 중간 지점에서 분기할 수 있다.
- 컨텍스트가 길어지면 요약(compaction)으로 이어갈 수 있다.
- 모델과 thinking level을 작업 중에 바꿀 수 있다.

Pi는 기본 기능을 작게 유지하는 도구다. MCP, 웹 검색, sub-agent, plan mode, todo 같은 기능은 기본 탑재가 아니며, 필요하면 외부 도구나 확장으로 구성한다.

> 처음에는 "Pi가 답한다"보다 "Pi가 프로젝트 안에서 작업한다"로 이해하면 빠르다.

## 5. 프로젝트 지침 파일

Pi는 시작 시 프로젝트 지침 파일을 읽는다.

대표 파일은 `AGENTS.md`다.

```markdown
# Project Instructions

- 변경 후 `npm test`를 실행한다.
- 운영 DB 마이그레이션은 로컬에서 실행하지 않는다.
- 답변은 간결하게 한다.
```

Pi는 시작 시 `~/.pi/agent/AGENTS.md`를 전역 지침으로 읽고, 현재 작업 디렉토리에서 상위 디렉토리 방향으로 올라가며 발견되는 `AGENTS.md` 또는 `CLAUDE.md`를 컨텍스트 파일로 자동 로드한다.

지침 파일을 수정했다면 Pi를 재시작하거나 아래 명령으로 다시 읽는다.

```text
/reload
```

## 6. 기본 사용 흐름

```text
1. 프로젝트 폴더에서 pi 실행
2. /login 또는 API 키로 인증
3. /model로 모델 선택
4. AGENTS.md로 프로젝트 규칙 정리
5. 자연어로 작업 요청
6. 변경 내용을 확인하고 테스트 실행
7. 필요하면 /compact 또는 /new로 세션 관리
```

## 이력관리

- 2026-05-11: 최초 생성
