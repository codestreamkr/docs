# 07. [중급] Spring/Java 프로젝트 분석과 테스트

Pi 1.x 공식 문서의 채팅창·파일 참조·셸 입력으로 Spring/Java 코드를 분석하고 테스트해요.

## 1. 빌드와 테스트 기준 확인

```text
README, build.gradle, pom.xml과 wrapper 파일을 읽어줘.
실제 빌드·테스트 명령과 기존 실패를 확인해줘.
파일은 수정하지 마.
```

Gradle과 Maven 중 프로젝트가 사용하는 명령만 실행하세요.

## 2. 호출 흐름 분석

```text
OrderController의 주문 취소 API부터 Service, Repository, 외부 연동까지 추적해줘.
트랜잭션 경계와 예외 처리를 근거 파일과 함께 정리해줘.
파일은 수정하지 마.
```

주요 계층의 책임과 외부 의존성을 확인하세요.

## 3. 테스트 후보 정하기

```text
OrderService.cancelOrder의 정상·예외·경계 테스트 후보를 정리해줘.
필요한 Mock과 given/when/then을 적고 회귀 위험 순서로 정렬해줘.
아직 코드는 작성하지 마.
```

후보를 확인한 뒤 기존 테스트 스타일을 적용하세요.

```text
기존 JUnit·Mockito·AssertJ 사용 방식과 이름 규칙을 확인해줘.
확정한 중복 취소 테스트만 추가해줘.
```

## 4. 테스트 실행과 실패 분석

Gradle 프로젝트의 실제 테스트 경로로 바꿔 실행하세요.

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
```

Maven 프로젝트는 다음 명령을 사용하세요.

```text
!./mvnw -Dtest=OrderServiceTest test
```

실패 로그를 코드와 대조하세요.

```text
실패 원인을 테스트 코드와 운영 코드 문제로 구분해줘.
필요한 수정 범위를 먼저 알려줘.
```

수정 후 같은 테스트를 다시 실행하고 통과 여부를 확인하세요.

## 5. 긴 로그와 세션 정리

```text
실패 테스트명, 핵심 예외와 관련 파일을 정리해줘.
원본 로그에서 확인한 위치를 함께 알려줘.
```

반복되는 로그 가공은 [Extension](https://pi.dev/docs/latest/extensions)의 `tool_result` 처리를 사용해요.  
여러 프로젝트에 배포할 때는 [예제 Package](../examples/basic-pi-package/)의 구성을 확인하세요.

대화가 길어지면 남은 테스트를 중심으로 요약하세요.

```text
/compact 호출 흐름, 추가한 테스트와 남은 실패를 중심으로 요약해줘.
```

## 공식 문서

- [셸 입력과 파일 참조](https://pi.dev/docs/latest/usage)
- [세션 관리](https://pi.dev/docs/latest/sessions)
- [Extension](https://pi.dev/docs/latest/extensions)
- [Package](https://pi.dev/docs/latest/packages)
