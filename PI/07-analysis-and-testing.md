# 07. [중급]프로젝트 분석/테스트(spring+java)

Spring + Java 프로젝트에서 Pi로 분석과 테스트를 진행하는 방법을 정리한다.

기본 흐름은 자연어 요청, 파일 참조, bash 실행, 세션 기능을 사용한다. 반복되는 테스트 로그 처리는 Extension이나 Pi package로 하네스에 옮길 수 있다.

## 목차

- [07. \[중급\]프로젝트 분석/테스트(spring+java)](#07-중급프로젝트-분석테스트springjava)
  - [목차](#목차)
  - [사전작업](#사전작업)
  - [프로젝트 구조 분석](#프로젝트-구조-분석)
  - [호출 흐름 분석](#호출-흐름-분석)
  - [테스트 후보 찾기](#테스트-후보-찾기)
  - [테스트 작성](#테스트-작성)
  - [테스트 실행과 실패 분석](#테스트-실행과-실패-분석)
  - [테스트 로그 처리 자동화](#테스트-로그-처리-자동화)
    - [적용 기준](#적용-기준)
    - [Extension 예시](#extension-예시)
    - [실행](#실행)
    - [확인할 결과](#확인할-결과)
    - [package로 옮기기](#package로-옮기기)
  - [긴 작업 관리](#긴-작업-관리)
  - [알아두면 좋은 것](#알아두면-좋은-것)
  - [이력관리](#이력관리)

---

## 사전작업

작업 전 아래를 확인한다.

```text
!!git status
```

프로젝트의 빌드 도구를 확인한다.

| 빌드 도구 | 대표 명령 |
|---|---|
| Gradle | `./gradlew test` |
| Maven | `./mvnw test` 또는 `mvn test` |

Pi에게 먼저 확인시킬 수 있다.

```text
이 Spring Java 프로젝트의 빌드 도구와 테스트 실행 명령을 찾아줘.
README, build.gradle, pom.xml, gradlew/mvnw 파일을 기준으로 확인해줘.
아직 파일은 수정하지 마.
```

---

## 프로젝트 구조 분석

처음에는 전체 구조를 요약시킨다.

```text
이 프로젝트의 패키지 구조를 분석해줘.
Controller, Service, Repository, DTO, Entity, Config 위치를 구분해서 정리해줘.
아직 파일은 수정하지 마.
```

추가로 확인할 내용:

```text
테스트 디렉토리 구조도 함께 분석해줘.
단위 테스트와 통합 테스트가 어떻게 나뉘는지 알려줘.
```

기대 결과:

- 주요 패키지 구조
- 계층별 책임
- 테스트 위치
- 실행 명령
- 주의해야 할 설정 파일

---

## 호출 흐름 분석

특정 기능을 분석할 때는 진입점을 지정한다.

```text
OrderController의 주문 취소 API에서 시작해서 Service, Repository, 외부 연동까지 호출 흐름을 추적해줘.
관련 파일을 읽고 트리 형태로 정리해줘.
아직 파일은 수정하지 마.
```

메서드를 좁혀서 요청할 수도 있다.

```text
OrderService.cancelOrder 메서드 기준으로 내부 호출 흐름을 분석해줘.
트랜잭션 경계, 예외 처리, 외부 API 호출 여부를 표시해줘.
```

파일을 직접 지정할 수도 있다.

```text
@src/main/java/com/example/order/OrderService.java
이 파일의 public 메서드별 책임과 테스트 필요 지점을 정리해줘.
```

---

## 테스트 후보 찾기

테스트를 바로 작성시키기 전에 후보를 먼저 찾게 한다.

```text
OrderService.cancelOrder에 대해 테스트해야 할 케이스를 정리해줘.
정상 케이스, 예외 케이스, 경계값, 외부 의존 mocking 필요 여부를 구분해줘.
아직 테스트 코드는 작성하지 마.
```

테스트 우선순위를 요청한다.

```text
위 테스트 후보 중 회귀 위험이 큰 순서대로 우선순위를 정해줘.
각 케이스마다 필요한 given/when/then을 써줘.
```

기대 결과:

| 항목 | 내용 |
|---|---|
| 정상 케이스 | 기본 성공 흐름 |
| 예외 케이스 | 잘못된 상태, 권한 없음, 데이터 없음 |
| 경계 케이스 | 수량 0, 빈 값, 날짜 경계 등 |
| Mock 대상 | Repository, 외부 API Client, Clock 등 |
| 검증 대상 | 반환값, 상태 변경, 예외, 호출 여부 |

---

## 테스트 작성

기존 테스트 스타일을 먼저 확인하게 한다.

```text
OrderService 관련 기존 테스트를 찾아서 스타일을 분석해줘.
JUnit 버전, Mockito 사용 방식, AssertJ 사용 여부, 네이밍 규칙을 정리해줘.
아직 새 테스트는 작성하지 마.
```

그 다음 범위를 좁혀 작성시킨다.

```text
OrderService.cancelOrder의 "이미 취소된 주문이면 예외" 케이스 테스트만 먼저 추가해줘.
기존 테스트 스타일을 유지해줘.
```

한 번에 너무 많은 테스트를 만들지 않는 것이 좋다.

좋은 요청:

```text
우선순위 1~2번 테스트만 추가해줘.
```

나쁜 요청:

```text
모든 테스트를 다 만들어줘.
```

---

## 테스트 실행과 실패 분석

테스트 실행은 `!`를 사용한다.

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
```

Maven 프로젝트라면:

```text
!./mvnw -Dtest=OrderServiceTest test
```

실패하면 로그가 모델에 전달된다.

```text
방금 테스트 실패 로그를 분석해줘.
원인이 테스트 코드 문제인지, 운영 코드 문제인지 구분해줘.
수정안을 제안하고 아직 파일은 수정하지 마.
```

수정 승인 후 반영한다.

```text
좋아. 테스트 코드 문제로 보이는 부분만 수정해줘.
운영 코드는 건드리지 마.
```

수정 후 다시 실행한다.

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
```

---

## 테스트 로그 처리 자동화

테스트 로그가 길면 모델이 핵심 원인을 찾기 전에 컨텍스트를 많이 사용한다.

반복해서 긴 로그를 분석한다면 `tool_result` Extension으로 bash 결과를 모델에 전달하기 전에 줄인다.

### 적용 기준

- 테스트 로그가 수천 줄 이상 나온다.
- 실패 원인보다 환경 로그가 많다.
- 매번 실패 테스트명, 에러 메시지, 관련 파일만 필요하다.
- 같은 로그 정리 요청을 반복한다.

### Extension 예시

`.pi/extensions/test-log-summary.ts`를 만든다.

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { isBashToolResult } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("tool_result", async (event) => {
    if (!isBashToolResult(event)) return;

    const command = event.input.command ?? "";
    if (!/gradlew|mvnw|mvn|test/i.test(command)) return;

    const text = event.content
      .map((item) => item.type === "text" ? item.text : "")
      .join("\n");

    if (text.length < 3000) return;

    const lines = text.split("\n");
    const focused = lines.filter((line) =>
      /FAILED|FAILURE|ERROR|Exception|expected:|but was:|Caused by:/i.test(line)
    );

    return {
      content: [
        {
          type: "text",
          text: [
            "테스트 로그가 길어 핵심 라인만 전달합니다.",
            "",
            ...focused.slice(0, 120),
            "",
            `원본 라인 수: ${lines.length}`,
            `실행 명령: ${command}`,
          ].join("\n"),
        },
      ],
    };
  });
}
```

Pi에서 다시 로드한다.

```text
/reload
```

### 실행

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
```

또는 Maven 프로젝트에서 실행한다.

```text
!./mvnw -Dtest=OrderServiceTest test
```

### 확인할 결과

- bash 결과가 모델에 전달되기 전에 핵심 라인으로 줄어든다.
- 모델은 실패 테스트명, 예외, assertion 차이를 중심으로 분석한다.
- 같은 로그 요약 요청을 매번 입력하지 않아도 된다.

### package로 옮기기

여러 프로젝트에서 같은 로그 처리를 쓰면 Pi package로 묶는다.

```text
my-test-tools/
├── package.json
└── extensions/
    └── test-log-summary.ts
```

프로젝트에 설치한다.

```bash
pi install -l ./my-test-tools
```

---

## 긴 작업 관리

분석과 테스트 작성은 컨텍스트가 길어지기 쉽다.

세션 이름을 붙인다.

```text
/name OrderService cancelOrder 테스트 작성
```

중간 요약을 남긴다.

```text
/compact 현재 분석한 호출 흐름, 추가한 테스트, 남은 실패만 중심으로 요약해줘.
```

다른 테스트 전략을 시도하려면 `/clone`이나 `/tree`를 사용한다.

테스트 전략을 바꿔 비교할 때는 새 세션을 만들기보다 먼저 `/clone`으로 현재 흐름을 복제한다.

| 상황 | 명령어 |
|---|---|
| 현재 상태를 복제해 다른 테스트 전략 시도 | `/clone` |
| 이전 지점으로 돌아가 다른 방향 시도 | `/tree` |
| 과거 사용자 요청에서 새 세션 생성 | `/fork` |

---

## 알아두면 좋은 것

- 로그 분석이 필요하면 `!`로 실행한다.
- 단순 상태 확인은 `!!`로 실행해 컨텍스트 낭비를 줄인다.
- 테스트를 만들기 전 기존 테스트 스타일을 먼저 읽게 한다.
- 운영 코드와 테스트 코드 중 무엇을 수정할지 명확히 지시한다.
- 큰 테스트 묶음보다 작은 케이스를 순서대로 추가하는 편이 안전하다.
- 반복되는 로그 요약은 Extension이나 Pi package로 옮긴다.

## 이력관리

- 2026-05-12: 목차를 주요 섹션 중심으로 정리
- 2026-05-12: 테스트 전략 비교 시 `/clone` 사용 기준 추가
- 2026-05-11: 최초 생성
