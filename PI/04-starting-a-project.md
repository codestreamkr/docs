# 04. [중급]프로젝트 시작

새 프로젝트에서 Pi를 처음 적용할 때의 기본 흐름이다.

프로젝트 시작 단계에서는 지침 파일, 프로젝트 설정, 로컬 Extension, Pi package 기준을 먼저 정한다.

## 사전작업

아래 항목을 먼저 확인한다.

| 항목 | 확인 방법 |
|---|---|
| Pi 설치 | `pi --version` |
| 인증 | `/login` 또는 API 키 환경 변수 |
| Git 상태 | `git status` |
| 프로젝트 실행 명령 | README, build 파일, package.json, gradle/maven 설정 확인 |
| 터미널 키 입력 | Shift+Enter, Alt+Enter 동작 확인 |
| 프로젝트 Pi 설정 | `.pi/settings.json` 사용 여부 확인 |
| 프로젝트 Extension | `.pi/extensions` 사용 여부 확인 |
| 공통 package | 설치할 Pi package 목록 확인 |

Windows에서는 Git Bash 또는 다른 bash가 필요하다.

## Step 1. 프로젝트 루트에서 실행

```bash
cd /path/to/project
pi
```

처음 요청은 분석형으로 시작한다.

```text
이 프로젝트를 처음 인수인계 받는다고 가정하고 구조를 분석해줘.
기술 스택, 주요 디렉토리, 실행/테스트 명령, 주의할 파일을 정리해줘.
```

Pi가 바로 수정하지 않게 하려면 명시한다.

```text
아직 파일은 수정하지 말고 읽기와 분석만 해줘.
```

## Step 2. 프로젝트 지침 작성

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
방금 분석한 내용을 바탕으로 AGENTS.md 초안을 만들어줘.
단, 실제 파일을 쓰기 전에 내용을 먼저 보여줘.
```

확인 후 파일 생성을 요청한다.

```text
좋아. 프로젝트 루트에 AGENTS.md로 저장해줘.
```

## Step 3. 프로젝트 Pi 설정 만들기

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

## Step 4. 프로젝트 Extension 위치 만들기

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

## Step 5. 필요한 Pi package 설치

이미 만들어진 하네스 리소스가 있으면 package로 설치한다.

프로젝트에만 설치하려면 `-l`을 사용한다.

```bash
pi install -l npm:@scope/pi-package
pi install -l git:github.com/user/pi-package
pi install -l ./PI/examples/basic-pi-package
```

설치 상태를 확인한다.

```bash
pi list
```

설치 기준은 아래와 같다.

- 이미 있는 기능은 package 설치를 우선 검토한다.
- 프로젝트 고유 절차는 `.pi/extensions`에서 시작한다.
- 여러 프로젝트에서 반복되면 package로 묶는다.
- 외부 package는 소스와 동작 범위를 확인한 뒤 설치한다.

## Step 6. 세션 이름 지정

작업 목적에 맞게 세션 이름을 붙인다.

```text
/name 프로젝트 초기 분석
```

이름을 붙이면 `/resume`에서 찾기 쉽다.

## Step 7. 모델과 thinking level 정하기

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

## Step 8. 기준 명령 확인

프로젝트의 실제 확인 명령을 Pi와 함께 검증한다.

예시:

```text
이 프로젝트에서 변경 후 실행해야 하는 최소 검증 명령을 찾아줘.
README, package.json, build.gradle, pom.xml을 기준으로 확인해줘.
```

명령을 실행할 때는 `!`를 사용한다.

```text
!./gradlew test
```

실패하면 출력이 모델에 전달되므로 바로 분석을 이어갈 수 있다.

```text
방금 테스트 실패 원인을 분석하고, 수정 후보를 제안해줘.
아직 파일은 수정하지 마.
```

## Step 9. 작업 전 Git 상태 확인

Pi는 파일을 직접 수정할 수 있으므로 작업 전 상태를 확인한다.

```text
!!git status
```

작업 전 커밋 또는 별도 브랜치를 권장한다.

```bash
git switch -c feature/pi-initial-work
```

## Step 10. 첫 작업은 작게 시작

처음부터 큰 변경을 맡기기보다 작은 단위로 시작한다.

좋은 요청 예시:

```text
README의 실행 방법이 실제 Gradle 명령과 맞는지 확인해줘.
불일치가 있으면 수정안을 먼저 제안해줘.
```

```text
OrderService의 cancelOrder 흐름을 읽고, 외부 연동과 트랜잭션 경계를 정리해줘.
아직 코드는 수정하지 마.
```

## 실행 순서 요약

```text
pi
/login
/model
프로젝트 분석 요청
AGENTS.md 초안 작성
.pi/settings.json 작성
.pi/extensions 생성
필요한 Pi package 설치
/name 프로젝트 초기 분석
검증 명령 확인
작은 작업부터 시작
```

## 이력관리

- 2026-05-11: 프로젝트 설정, Extension, Pi package 적용 기준 추가
- 2026-05-11: 최초 생성
