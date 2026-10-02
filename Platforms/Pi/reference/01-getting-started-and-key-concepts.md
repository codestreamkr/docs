# 01. [초급] Pi 시작하기

Pi를 처음 설치한 뒤 프로젝트에서 대화형 세션을 열고 작업하는 흐름을 실습해요.  
설치·인증·Skill·지침의 정본 절차는 [Pi 환경 설정](../setup.md)을 봐요.  
이 문서는 설치본 Pi `0.87.1`과 공식 문서를 기준으로 확인했어요.

## 1. 설치와 세션 열기

Node.js 버전과 Pi 설치 상태를 확인해요.

```bash
node --version
pi --version
```

Pi가 없다면 [환경 설정의 설치 절차](../setup.md#설치와-첫-실행)를 따라 설치해요.  
프로젝트 루트의 터미널에서 세션을 열어요.

```bash
cd /path/to/project
pi
```

Windows에서는 Pi가 실행할 bash가 필요해요.  
`shellPath`, Git for Windows의 `bash.exe`, PATH의 `bash.exe` 순으로 찾는지 현재 Settings와 설치 환경에서 확인해요.

## 2. 입력창에서 첫 분석하기

Pi가 열리면 입력창에서 프로젝트의 구조와 검증 방법을 먼저 확인해요.

```text
이 저장소 구조를 요약하고, 테스트 실행 방법을 근거 파일과 함께 알려줘.
아직 파일은 수정하지 마.
```

Pi는 기본적으로 `read`, `write`, `edit`, `bash` 도구를 제공하고 `grep`, `find`, `ls`도 필요할 때 사용할 수 있어요.  
권한과 도구 제한은 [도구 범위와 프로젝트 신뢰](../setup.md#권한과-실행-범위)를 봐요.

## 3. 로그인과 모델 선택

처음 인증할 때는 Pi 입력창에서 `/login`을 입력해요.  
API 키를 환경 변수로 쓰거나 모델과 thinking을 바꾸는 기준은 [인증](../setup.md#인증)과 [모델과 실행 설정](../setup.md#모델과-실행-설정)을 봐요.

```text
/login
/model
/thinking
```

## 4. Project Trust 실습

Pi는 프로젝트의 `.pi/` 자원과 `.agents/skills/`를 읽기 전에 신뢰 여부를 확인해요.  
신뢰할 대상의 소스와 동작 범위를 먼저 보고, Pi 입력창에서 `/trust`로 결정을 저장해요.

```text
/trust
```

신뢰하지 않으면 프로젝트 설정, Extension, Prompt와 Skill을 건너뛰어요.  
`AGENTS.md`와 `CLAUDE.md`는 컨텍스트 파일 설정에 따라 별도로 읽어요.  
이번 실행에서만 신뢰 동작을 바꾸는 `--approve`, `--no-approve`는 자동화와 관리용 터미널 옵션이에요.

## 5. 지침 파일 실습

프로젝트의 계속 적용할 기준은 `AGENTS.md`에 적어요.

```markdown
# Project Instructions

- 변경 후 `npm test`를 실행한다.
- 운영 DB 마이그레이션은 로컬에서 실행하지 않는다.
- 답변은 간결하게 한다.
```

지침을 바꾼 뒤에는 새 Pi 세션을 열거나 입력창에서 `/reload`를 실행해 반영을 확인해요.

## 6. 다음 단계

| 상황 | 문서 |
| --- | --- |
| 화면, 모델, 세션과 자원 이해 | [02. Pi 기본 개념](./02-understanding-core-concepts.md) |
| 입력창 명령과 단축키 | [06. Pi 기본 명령](./06-basic-commands.md) |
| 새 프로젝트에 Pi 적용 | [04. 프로젝트 시작](./04-starting-a-project.md) |
| 실제 구현과 검증 | [05. 프로젝트 코딩](./05-project-cooking.md) |
| Extension, Package, SDK와 RPC | [03. Pi 확장과 자동화](./03-applying-core-concepts.md) |

## 공식 문서

- [Quickstart](https://pi.dev/docs/latest/quickstart)
- [Usage](https://pi.dev/docs/latest/usage)
- [Security](https://pi.dev/docs/latest/security)
