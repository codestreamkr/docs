# 04. [중급]프로젝트 시작

새 프로젝트에서 Pi를 처음 적용할 때의 기본 흐름이다.

프로젝트 시작 단계에서는 작업 기준을 확인한 뒤 지침 파일, 프로젝트 설정, 로컬 Extension, Pi package를 구성한다.

이 문서는 Pi `0.80.6`을 기준으로 한다.

## 사전작업

아래 항목을 순서대로 확인한다.

| 순서 | 항목 | 확인 방법 |
|---|---|---|
| 1 | 프로젝트 루트 | `pwd`, `git rev-parse --show-toplevel` |
| 2 | Git 기준 상태 | `git status --short --branch` |
| 3 | 기준 검증 명령 | README, build 파일, `package.json`, Gradle/Maven 설정 확인 |
| 4 | Pi 설치 | `pi --version` |
| 5 | Project Trust 대상 | `.pi/settings.json`, `.pi` 리소스, `.agents/skills`과 package 소스 확인 |
| 6 | 인증 | `/login` 또는 API 키 환경 변수 |
| 7 | 기본 모델 | `/model` 또는 `~/.pi/agent/settings.json` 확인 |
| 8 | 터미널 키 입력 | Shift+Enter, Alt+Enter 동작 확인 |
| 9 | 프로젝트 Pi 설정 | `.pi/settings.json` 사용 여부 확인 |
| 10 | 프로젝트 설정 우선순위 | `.pi/settings.json`이 전역 설정을 덮어쓰는지 확인 |
| 11 | 세션 저장 기준 | 기본 저장 또는 `--no-session`, `sessionDir` 사용 여부 확인 |
| 12 | 프로젝트 Extension | `.pi/extensions` 사용 여부 확인 |
| 13 | 공통 package | 설치할 Pi package 목록 확인 |

Windows에서는 Git Bash 또는 다른 bash가 필요하다.

## Step 1. 프로젝트 루트 확인

먼저 작업할 프로젝트 루트를 확정한다.

```bash
cd /path/to/project
pwd
git rev-parse --show-toplevel
```

- `pwd`와 Git 루트가 다르면 의도한 Pi 실행 위치인지 확인한다.
- 모노레포는 작업 대상 모듈과 Pi 실행 위치를 함께 정한다.
- 이후 명령은 확정한 프로젝트 루트에서 실행한다.

## Step 2. 작업 전 Git 상태 확인

기존 변경 사항을 작업 기준으로 기록한다.

```bash
git status --short --branch
```

확인 항목은 아래와 같다.

- 현재 브랜치
- 수정된 파일
- 새로 생성된 파일
- staged 상태

Git 저장소가 아니면 현재 파일 목록과 별도 백업 또는 snapshot을 기준 상태로 남긴다.

별도 브랜치가 필요한 작업은 프로젝트 기준에 맞게 생성한다.

```bash
git switch -c feature/pi-initial-work
```

## Step 3. 기준 검증 명령 확인

Pi 설정을 추가하기 전에 프로젝트의 현재 검증 기준을 확인한다.

- README의 로컬 실행 절차
- `package.json`의 test, lint, build script
- `build.gradle`, `settings.gradle`, `pom.xml`의 빌드 구성
- CI workflow가 실행하는 검증 명령

아래 예시 중 프로젝트 build 설정에 실제로 정의된 최소 명령만 선택해 실행하고 결과를 기록한다.

```bash
npm test
```

```bash
./gradlew test
```

```bash
./mvnw test
```

- 기준: 변경 전 실행 결과와 실패 항목을 남긴다.
- 결과: 이후 Pi 작업으로 새로 발생한 실패와 기존 실패를 구분한다.

## Step 4. Project Trust 결정 후 Pi 실행

프로젝트 로컬 리소스의 소스와 동작 범위를 확인한 뒤 Pi를 실행한다.

확인 대상은 아래와 같다.

- `.pi/settings.json`
- `.pi/extensions`, `.pi/skills`, `.pi/prompts`, `.pi/themes`
- `.pi/SYSTEM.md`, `.pi/APPEND_SYSTEM.md`
- 현재 디렉토리 또는 상위 디렉토리의 `.agents/skills`
- 프로젝트 설정에 등록된 Pi package

```bash
pi
```

저장된 결정이 없고 신뢰 대상 리소스가 있으면 대화형 시작 화면에서 신뢰 여부를 묻는다.

- 신뢰: 프로젝트 설정과 리소스를 불러오고 프로젝트 Extension을 실행한다.
- 신뢰하지 않음: 보호 대상 프로젝트 리소스를 제외한다.
- `AGENTS.md`, `CLAUDE.md`: 컨텍스트 파일 로드를 끄지 않은 경우 신뢰 결정과 관계없이 불러온다.

결정을 변경하거나 이후 세션에 사용할 결정을 저장하려면 아래 명령을 사용한다.

```text
/trust
```

`/trust`는 `~/.pi/agent/trust.json`을 갱신한다. 현재 세션은 다시 로드되지 않으므로 Pi를 재시작한다.

비대화형 실행은 확인 창을 표시하지 않는다. 한 번의 실행에만 신뢰 결정을 적용한다.

```bash
pi --approve -p "프로젝트 구조를 분석해줘."
pi --no-approve -p "프로젝트 로컬 리소스를 제외하고 구조를 분석해줘."
```

- `--approve`, `-a`: 이번 실행에서 프로젝트 로컬 리소스를 신뢰한다.
- `--no-approve`, `-na`: 이번 실행에서 프로젝트 로컬 리소스를 제외한다.

Project Trust는 프로젝트 입력 리소스의 로드를 제어하며 sandbox를 제공하지 않는다. 격리가 필요한 저장소는 container, VM 또는 별도 sandbox에서 실행한다.

## Step 5. 프로젝트 분석

첫 요청은 분석형으로 시작한다.

```text
이 프로젝트를 처음 인수인계 받는다고 가정하고 구조를 분석해줘.
기술 스택, 주요 디렉토리, 실행/테스트 명령, 주의할 파일을 정리해줘.
아직 파일은 수정하지 마.
```

Step 3에서 확인한 명령과 Pi 분석 결과가 다르면 실제 build 파일과 CI 설정을 기준으로 다시 확인한다.

## Step 6. 프로젝트 지침 작성

분석 결과를 바탕으로 `AGENTS.md`를 만든다.

권장 구성은 아래와 같다.

```markdown
# Project Instructions

## Overview
- 프로젝트 목적
- 주요 기술 스택

## Commands
- 빌드:
- 테스트:
- 린트:
- 로컬 실행:

## Architecture
- 주요 모듈
- 계층 구조
- 외부 연동

## Coding Rules
- 네이밍 규칙
- 예외 처리 기준
- 로깅 기준
- 테스트 기준

## Safety Rules
- 수정 전 확인이 필요한 파일
- 실행 금지 명령
- 운영 데이터 주의사항
```

Pi에게 초안을 요청할 수 있다.

```text
방금 분석한 내용과 확인한 검증 명령을 바탕으로 AGENTS.md 초안을 만들어줘.
실제 파일을 쓰기 전에 내용을 먼저 보여줘.
```

확인 후 파일 생성을 요청한다.

```text
프로젝트 루트에 AGENTS.md로 저장해줘.
```

## Step 7. 프로젝트 Pi 설정 만들기

프로젝트별 설정은 `.pi/settings.json`에 둔다.

```bash
mkdir -p .pi
```

예시:

```json
{
  "defaultThinkingLevel": "medium",
  "compaction": {
    "enabled": true,
    "reserveTokens": 16384,
    "keepRecentTokens": 20000
  }
}
```

설정 기준은 아래와 같다.

- 프로젝트에만 적용할 값은 `.pi/settings.json`에 둔다.
- 개인 취향은 `~/.pi/agent/settings.json`에 둔다.
- 팀과 공유할 package는 프로젝트 설정에 둔다.
- 민감한 키나 개인 인증 정보는 프로젝트 설정에 넣지 않는다.

처음으로 신뢰 대상 리소스를 만들었다면 `/trust`로 현재 프로젝트의 결정을 저장하고 Pi를 재시작한다.

## Step 8. 프로젝트 Extension 위치 만들기

프로젝트 전용 하네스 조정은 `.pi/extensions`에 둔다.

```bash
mkdir -p .pi/extensions
```

처음에는 작은 Extension부터 둔다.

- 입력 변환
- 프로젝트 컨텍스트 주입
- 검증 명령 검사
- 긴 로그 요약
- 로컬 스크립트 custom tool 등록

Extension을 추가한 뒤에는 Pi에서 다시 로드한다.

```text
/reload
```

## Step 9. 필요한 Pi package 설치

이미 만들어진 하네스 리소스가 있으면 package로 설치한다.

프로젝트에만 설치하려면 `-l`을 사용한다.

```bash
pi install -l npm:@scope/pi-package
pi install -l git:github.com/user/pi-package
```

이 문서 저장소 자체에서 예제 리소스를 확인할 때만 아래 로컬 경로를 사용한다.

```bash
pi install -l ./Platforms/Pi/examples/basic-pi-package
```

로컬 예제 구성은 [basic-pi-package](../examples/basic-pi-package/)를 참고한다.

설치 상태를 확인한다.

```bash
pi list
```

설치 기준은 아래와 같다.

- 이미 있는 기능은 package 설치를 우선 검토한다.
- 프로젝트 고유 절차는 `.pi/extensions`에서 시작한다.
- 여러 프로젝트에서 반복되면 package로 묶는다.
- 외부 package는 소스와 동작 범위를 확인한 뒤 설치한다.

## Step 10. 세션 이름 지정

작업 목적에 맞게 세션 이름을 붙인다.

```text
/name 프로젝트 초기 분석
```

이름을 붙이면 `/resume`에서 찾기 쉽다.

## Step 11. 모델과 thinking level 정하기

모델 선택은 아래 명령을 사용한다.

```text
/model
```

작업 성격별 기준은 아래와 같다.

| 작업 | 권장 방향 |
|---|---|
| 단순 문서 요약 | 빠른 모델, thinking 낮음 |
| 코드 구조 분석 | 성능 좋은 모델, thinking medium 이상 |
| 복잡한 리팩토링 계획 | reasoning 지원 모델, thinking high 이상 |
| 테스트 실패 로그 분석 | 로그 이해가 좋은 모델, thinking medium 이상 |

thinking level은 `Shift+Tab`으로 순환할 수 있다.

## Step 12. 첫 작업은 작게 시작

처음부터 큰 변경을 맡기보다 작은 단위로 시작한다.

좋은 요청 예시:

```text
README의 실행 방법이 실제 Gradle 명령과 맞는지 확인해줘.
불일치가 있으면 수정안을 먼저 제안해줘.
```

```text
OrderService의 cancelOrder 흐름을 읽고, 외부 연동과 트랜잭션 경계를 정리해줘.
아직 코드는 수정하지 마.
```

작업 후 Step 2의 Git 상태와 Step 3의 검증 결과를 기준으로 변경 영향을 확인한다.

## 실행 순서 요약

```text
프로젝트 루트 확인
git status로 기준 상태 기록
변경 전 검증 명령 확인과 실행
Project Trust 결정
pi 실행과 프로젝트 분석
AGENTS.md 작성
.pi/settings.json 작성
.pi/extensions 생성
필요한 Pi package 설치
/name 프로젝트 초기 분석
/model
작은 작업부터 시작
변경 후 diff와 검증 결과 확인
```

## 완료 조건

프로젝트 시작 준비는 아래 상태에서 완료한다.

- 프로젝트 루트와 작업 대상이 확정됐다.
- 변경 전 Git 상태와 검증 결과를 기록했다.
- Project Trust 결정을 소스 검토 결과에 맞게 저장했다.
- `AGENTS.md`에 실제 실행 명령과 프로젝트 규칙이 있다.
- `.pi/settings.json`과 Extension은 프로젝트에 필요한 항목만 포함한다.
- 설치한 package의 출처와 동작 범위를 확인했다.
- 작은 첫 작업 후 diff와 검증 결과를 확인했다.

