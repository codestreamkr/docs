# 05. [중급]프로젝트 코딩

Pi로 실제 프로젝트 코딩을 진행할 때의 기본 흐름이다.

코딩 작업은 기본 흐름으로 시작하고, 반복되는 절차는 Extension, custom tool, Pi package로 옮긴다.

## 이 문서는 언제 보나

아래 상황에서 본다.

- 기능을 하나 추가해야 할 때
- 버그를 수정해야 할 때
- 테스트 실패를 분석해야 할 때
- 리팩토링 범위를 먼저 판단해야 할 때
- 변경 후 검증 명령을 실행해야 할 때

## 기본 원칙

Pi는 파일을 직접 수정할 수 있다.

따라서 큰 작업은 아래 순서로 나누는 것이 안전하다.

```text
분석 → 계획 → 수정 → 검증 → 요약
```

처음부터 바로 수정시키기보다, 먼저 읽고 판단하게 한다.

## 흐름 1. 분석 먼저 시키기

```text
OrderService의 cancelOrder 흐름을 분석해줘.
관련 Controller, Service, Repository, 테스트 파일을 찾아서 함께 봐줘.
아직 파일은 수정하지 마.
```

분석 결과에서 확인할 내용은 아래와 같다.

- 어떤 파일을 읽었는지
- 진입점이 어디인지
- 핵심 로직이 어디 있는지
- 외부 의존성이 무엇인지
- 테스트가 있는지
- 수정 영향 범위가 어디까지인지

## 흐름 2. 계획을 먼저 받기

```text
수정 계획을 단계별로 제안해줘.
각 단계마다 변경 파일, 변경 이유, 테스트 방법을 같이 적어줘.
아직 수정하지 마.
```

계획이 마음에 들면 승인한다.

```text
좋아. 1단계와 2단계만 먼저 반영해줘.
```

범위를 줄여서 지시하는 것이 좋다.

## 흐름 3. 파일 수정

Pi는 `edit`, `write` 도구를 사용해 파일을 수정한다.

수정 요청 예시:

```text
방금 계획대로 OrderService의 검증 로직을 분리해줘.
기존 public 메서드 시그니처는 바꾸지 마.
```

수정 후에는 변경 요약을 요구한다.

```text
변경한 파일 목록과 변경 이유를 요약해줘.
```

## 흐름 4. 테스트 실행

테스트 명령은 `!`로 실행한다.

```text
!./gradlew test
```

특정 테스트만 실행할 수도 있다.

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
```

실패하면 바로 이어서 분석한다.

```text
테스트 실패 원인을 로그 기준으로 분석하고 수정해줘.
수정 후 같은 테스트를 다시 실행해줘.
```

## 흐름 5. 변경 검토

Git diff를 확인한다.

```text
!git diff
```

모델에게 리뷰를 요청한다.

```text
방금 diff를 기준으로 코드 리뷰해줘.
버그 가능성, 테스트 누락, 불필요한 변경을 중심으로 봐줘.
```

단순 상태 확인만 할 때는 `!!`를 쓴다.

```text
!!git status
```

## 흐름 6. 긴 작업에서 세션 관리

작업이 길어지면 세션 이름을 붙인다.

```text
/name 주문 취소 테스트 보강
```

컨텍스트가 많아지면 수동으로 요약한다.

```text
/compact 현재 목표, 변경 파일, 남은 테스트 실패만 중심으로 요약해줘.
```

다른 접근을 실험하거나 컨텍스트를 줄일 때는 아래 기준으로 선택한다.

| 상황 | 우선 선택 |
|---|---|
| 같은 세션 안에서 다른 방향을 시도 | `/tree` |
| 과거 요청에서 독립 세션 시작 | `/fork` |
| 현재 상태를 보존하고 별도 실험 | `/clone` |
| 오래된 대화가 많아 context가 부족 | `/compact` |

## 상황별 요청 예시

### 버그 수정

```text
주문 취소 시 재고 복구가 누락되는 버그를 찾아줘.
관련 테스트가 있으면 먼저 확인하고, 없으면 어떤 테스트가 필요한지 제안해줘.
아직 수정하지 마.
```

### 작은 기능 추가

```text
회원 상태가 BLOCKED이면 로그인할 수 없도록 처리해줘.
기존 예외 처리 패턴을 찾아서 동일한 방식으로 반영해줘.
수정 후 관련 테스트를 실행해줘.
```

### 리팩토링

```text
PaymentService가 너무 커졌는지 분석해줘.
분리 후보를 제안하되, public API 변경이 필요한 안과 필요 없는 안을 구분해줘.
```

### 문서 수정

```text
README의 로컬 실행 방법이 현재 프로젝트와 맞는지 확인하고 수정해줘.
실제 명령은 package.json과 gradle 설정을 기준으로 해줘.
```

## 흐름 7. 반복 작업을 하네스로 옮기기

같은 요청을 반복하면 프롬프트가 아니라 하네스 기능으로 옮긴다.

| 반복되는 작업 | 옮길 위치 |
|---|---|
| 매번 붙이는 응답 형식 | prompt template |
| 작업 절차와 참고 문서 | skill |
| 명령 실행 전 검사 | Extension `tool_call` |
| 긴 로그 요약 | Extension `tool_result` |
| 로컬 스크립트 실행 | custom tool |
| 외부 서비스 조회 | custom tool 또는 Pi package |
| 여러 프로젝트 공통 기능 | Pi package |

작업 중 반복 패턴이 보이면 먼저 후보를 정리한다.

```text
이번 작업에서 반복된 요청과 절차를 prompt template, skill, extension, custom tool 후보로 분류해줘.
```

## 흐름 8. package로 설치해서 쓰기

필요한 기능이 이미 만들어져 있으면 Pi package로 설치한다.

프로젝트 전용으로 설치한다.

```bash
pi install -l npm:@scope/pi-package
pi install -l git:github.com/user/pi-package
pi install -l ./PI/examples/basic-pi-package
```

설치된 package를 확인한다.

```bash
pi list
```

예시 package를 설치했다면 PR 준비 템플릿을 실행할 수 있다.

```text
/ready-pr
```

또는 프로젝트 점검 skill을 직접 호출한다.

```text
/skill:project-check
```

package 사용 기준은 아래와 같다.

- 이미 있는 기능은 설치해서 사용한다.
- 프로젝트에만 필요한 기능은 `-l`로 프로젝트 설정에 둔다.
- 개인 실험은 전역 설치보다 `pi -e`로 먼저 확인한다.
- 여러 프로젝트에서 반복되면 직접 package로 묶는다.

## 흐름 9. package로 묶을 후보 정리하기

하나의 프로젝트에서 검증된 Extension, prompt, skill은 package 후보가 된다.

권장 구조는 아래와 같다.

```text
my-pi-package/
├── package.json
├── extensions/
├── prompts/
├── skills/
└── themes/
```

`package.json`에는 `pi` 항목을 둔다.

```json
{
  "name": "my-pi-package",
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./extensions"],
    "prompts": ["./prompts"],
    "skills": ["./skills"],
    "themes": ["./themes"]
  }
}
```

로컬 package는 바로 설치해 확인한다.

```bash
pi install -l ./my-pi-package
```

## 주의할 점

- 운영 설정, 마이그레이션, 보안 관련 파일은 수정 전 확인을 요구한다.
- 테스트 실패 로그는 `!`로 실행해 모델에게 전달한다.
- 단순 확인 명령은 `!!`를 사용해 컨텍스트 낭비를 줄인다.
- 큰 변경은 한 번에 맡기지 말고 단계별로 승인한다.
- 외부 package는 소스와 동작 범위를 확인한 뒤 설치한다.

## 이력관리

- 2026-05-12: 긴 작업에서 세션 분기와 compaction 선택 기준 보강
- 2026-05-11: 최초 생성
