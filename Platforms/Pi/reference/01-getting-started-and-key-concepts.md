# 01. [초급] Pi 시작하기

Pi는 터미널에서 사용하는 코딩 에이전트 하네스다.

단순히 답변만 받는 채팅 도구가 아니라, 현재 프로젝트 안에서 파일을 읽고, 수정하고, 명령을 실행하며 작업을 이어가는 도구로 보면 된다.

이 문서는 Pi `0.80.6`을 기준으로 한다.

## 1. 설치

Pi는 Node.js `22.19.0` 이상에서 npm 패키지로 설치한다.

먼저 버전을 확인한다.

```bash
node --version
npm --version
```

Pi를 설치한다.

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

`--ignore-scripts`는 설치 중 의존성 lifecycle script 실행을 막는다. Pi의 일반 npm 설치에는 install script가 필요하지 않다.

설치 결과를 확인한다.

```bash
pi --version
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

## 6. Project Trust

Project Trust는 프로젝트가 Pi의 로컬 설정과 리소스를 불러오도록 승인하는 기준이다.

아래 프로젝트 리소스가 있으면 신뢰 결정이 필요하다.

- `.pi/settings.json`
- `.pi/extensions`, `.pi/skills`, `.pi/prompts`, `.pi/themes`
- `.pi/SYSTEM.md`, `.pi/APPEND_SYSTEM.md`
- 현재 디렉토리 또는 상위 디렉토리의 `.agents/skills`

대화형 실행에서는 현재 디렉토리나 상위 디렉토리에 저장된 결정이 없으면 신뢰 여부를 묻는다. 신뢰하면 프로젝트 설정과 리소스를 불러오고, 프로젝트 설정에 지정된 누락 package를 설치하며, 프로젝트 Extension을 실행할 수 있다.

신뢰하지 않으면 보호 대상 리소스를 건너뛴다. `AGENTS.md`와 `CLAUDE.md`는 컨텍스트 파일 로드를 끄지 않은 경우 Project Trust와 관계없이 불러온다.

현재 프로젝트의 신뢰 결정을 저장하려면 아래 명령을 사용한다.

```text
/trust
```

결정은 `~/.pi/agent/trust.json`에 저장된다. 현재 세션은 자동으로 다시 로드되지 않으므로 Pi를 재시작해야 적용된다.

비대화형 모드인 `-p`, `--mode json`, `--mode rpc`는 신뢰 확인 창을 표시하지 않는다. 한 번의 실행에만 결정을 지정하려면 아래 옵션을 사용한다.

```bash
pi --approve -p "이 프로젝트를 요약해줘."
pi --no-approve -p "프로젝트 로컬 리소스를 제외하고 구조를 요약해줘."
```

- `--approve`, `-a`: 이번 실행에서 프로젝트 로컬 리소스를 신뢰한다.
- `--no-approve`, `-na`: 이번 실행에서 프로젝트 로컬 리소스를 제외한다.

Project Trust는 프로젝트 입력 리소스의 로드를 제어하며 sandbox를 제공하지 않는다. Pi와 Extension은 Pi를 실행한 사용자 계정의 권한으로 파일과 명령에 접근한다.

## 7. 문서 읽는 순서

처음 사용하는 경우 아래 순서로 보면 된다.

| 상황 | 볼 문서 |
|---|---|
| 설치와 첫 실행 | [Pi 시작하기](./01-getting-started-and-key-concepts.md) |
| 화면 구조와 핵심 개념 이해 | [Pi 기본 개념](./02-understanding-core-concepts.md) |
| 자주 쓰는 명령 확인 | [Pi 기본 명령](./06-basic-commands.md) |
| 새 프로젝트에 적용 | [프로젝트 시작](./04-starting-a-project.md) |
| 실제 코딩 작업 | [프로젝트 코딩](./05-project-cooking.md) |
| Spring/Java 분석과 테스트 | [Spring/Java 프로젝트 분석과 테스트](./07-analysis-and-testing.md) |
| 확장, package, SDK/RPC 실습 | [Pi 확장과 자동화](./03-applying-core-concepts.md) |

## 8. 기본 사용 흐름

```text
1. 프로젝트 폴더에서 pi 실행
2. Project Trust 결정
3. /login 또는 API 키로 인증
4. /model로 모델 선택
5. AGENTS.md로 프로젝트 규칙 정리
6. 자연어로 작업 요청
7. 변경 내용을 확인하고 테스트 실행
8. 필요하면 /compact 또는 /new로 세션 관리
```

