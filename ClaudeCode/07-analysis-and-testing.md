# 07. [중급]프로젝트 분석/테스트(spring+java)

## 이 문서는 언제 보나

spring+java 코드를 분석하거나 단위 테스트를 작성해야 할 때 본다.

처음 보는 코드의 흐름을 파악해야 하는 경우도 있고, 기존 코드에 테스트가 없어서 커버리지를 쌓아야 하는 경우도 있다.

이 문서는 그런 상황에서 `ct:calltree`와 `ct:calltreeTest`를 어떻게 이어서 쓰면 되는지 정리한 가이드다.

## 미리 알아야 할 것

### 분석 깊이는 기본 3depth다

`ct:calltree`는 무한정 파고들지 않는다.

```
depth1  reqOrder()                         ← 진입점 (요청한 메서드)
depth2  ├─ [TC:✅] paymentService.charge()  ← depth1의 직접 호출
depth2  ├─ orderDao.insertOrder()
depth3  │   ├─ [TC:✅] limitService.check() ← depth2의 collaborator
depth3  │   └─ auditService.log()
```

- depth2는 진입점에서 직접 호출하는 service/dao/mapper/helper/external이다.
- depth3은 depth2 메서드 본문 안에서 의미 있는 collaborator를 펼친 것이다.
- depth3에서 흐름 이해가 되면 거기서 멈춘다.

### 트리에 포함되지 않는 것

- getter/setter, logging
- 단순 컬렉션 add/filter
- DTO 필드 세팅만 있는 구문
- JDK, commons, gson 같은 범용 라이브러리 호출

### `[TC:✅]`는 테스트 작성을 위한 옵션이다

calltree 분석 결과에는 `[TC:✅]` 판정이 함께 표시된다.  
테스트를 쓸 계획이라면 이 마킹을 기준으로 대상을 바로 추릴 수 있다.  
분기/검증/데이터 가공/외부 연동이 있는 메서드가 대상이 되고,  
단순 위임(조건 없이 dao/service 호출 후 바로 반환)은 표기하지 않는다.

### 결과물 저장 위치

분석 결과는 `.0_my/call-trees/` 아래에 저장된다.

- 기본: `callTree-OrderService.md`
- 메서드 필터 적용 시: `callTree-OrderService-reqOrder.md`

### 대용량 파일 주의

2000줄이 넘는 파일은 메서드 필터를 써서 범위를 좁히는 것이 좋다.  
파일 전체를 한 번에 분석하면 결과가 길어지고 정밀도가 떨어진다.

---

## 먼저 감을 잡자

### 코드 흐름을 파악해야 할 때

- 추천 흐름: `ct:calltree`
- 이유: 호출 관계를 시각적으로 정리하면 코드 전체 구조가 한눈에 들어온다.

### 테스트를 새로 써야 할 때

- 추천 흐름: `ct:calltree` → `ct:calltreeTest`
- 이유: 호출 관계를 먼저 파악한 뒤 테스트를 쓰면, 검증 대상과 범위가 명확해진다.

### 이미 calltree 문서가 있는 경우

- 추천 흐름: `ct:calltreeTest`
- 이유: 분석 단계는 끝났으니 바로 테스트 생성으로 들어간다.

## 각 스킬은 무슨 일을 하나

### `ct:calltree`

- 하는 일: Java 파일의 메서드 호출 관계를 분석해 트리 구조로 정리한다.
- 결과물: calltree 문서 (호출 노드, 의존 관계, 진입점 정리)

### `ct:calltreeTest`

- 하는 일: calltree 문서를 기반으로 `[TC:✅]` 노드를 실제 소스 코드와 대조해 단위 테스트를 생성한다.
- 결과물: UnitTest 파일, MainTest 파일, 보조 문서 (`.0_my/call-trees/` 저장)

핵심은 순서다.

- `ct:calltree`는 분석 단계다. 코드를 바꾸지 않고 호출 구조를 문서화한다.
- `ct:calltreeTest`는 생성 단계다. 분석 문서를 기준으로 실제 소스를 다시 확인하며 테스트를 만든다.

## 흐름. 분석하고 테스트까지 이어간다

### Step 1. `ct:calltree`로 호출 관계를 파악한다

입력 단위는 파일명이고, 메서드를 좁히려면 쉼표로 구분해서 지정한다.

예시 — 파일 전체:

```text
/ct:calltree OrderService.java
```

예시 — 특정 메서드만:

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
```

예시 — 엔드포인트 경로 필터:

```text
/ct:calltree OrderTrxController.java /v4/
```

이 단계에서 기대하는 결과는 아래와 같다.

- 진입점 메서드부터 하위 호출이 트리 형태로 정리된다.
- 외부 의존(Repository, 외부 서비스 등)이 어느 지점에서 연결되는지 표시된다.
- `[TC:✅]` 판정이 함께 나와 테스트 대상 노드를 바로 확인할 수 있다.

### Step 2. `ct:calltreeTest`로 테스트를 생성한다

Step 1에서 생성된 calltree 문서를 입력으로 넘긴다.  
`[TC:✅]` 노드 전체를 대상으로 하거나, 특정 노드만 지정할 수 있다.

예시 — 전체 노드 처리:

```text
/ct:calltreeTest callTree-OrderService.md
```

예시 — 특정 노드만 처리:

```text
/ct:calltreeTest callTree-OrderService.md orderService.reqOrder()
```

이 단계에서 기대하는 결과는 아래와 같다.

- `[TC:✅]` 노드를 실제 소스 코드와 대조해서 테스트 로직을 추출한다.
- UnitTest, MainTest, 보조 문서가 함께 생성된다.
- 외부 의존이 있는 지점은 Mock으로 처리한다.

## 요청을 이렇게 쓰면 결과가 좋아진다

기본 형식은 `파일명` 이고, 메서드를 좁히려면 쉼표로 구분해서 지정한다.

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
```

제약 조건이 있으면 뒤에 붙인다.

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
알림 발송 쪽은 제외해줘.
```

테스트는 calltree 문서를 입력으로 넘긴다.

```text
/ct:calltreeTest callTree-OrderService.md
Mockito 사용하고 기존 테스트 파일 패턴 유지해줘.
```

## 실무에서 많이 쓰는 조합

### 1. 처음 보는 코드 파악할 때

```text
/ct:calltree PaymentService.java
```

### 2. 특정 메서드 흐름만 볼 때

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
```

### 3. 컨트롤러 특정 버전 엔드포인트만 볼 때

```text
/ct:calltree OrderTrxController.java /v4/
```

### 4. 분석하고 바로 테스트까지 이어갈 때

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
```

calltree 문서가 생성되면 (`callTree-OrderService.md`) 이어서 실행한다.

```text
/ct:calltreeTest callTree-OrderService.md
```

## 헷갈리기 쉬운 점

- `ct:calltree`는 코드를 바꾸지 않는다. 분석 문서만 만든다.
- `ct:calltreeTest`는 calltree 문서를 기반으로 실제 소스를 다시 확인한다. 문서만 보고 테스트를 만들지 않는다.
- 파일이 크거나 의존이 복잡할수록 범위를 좁혀서 요청하는 편이 결과가 깔끔하다.

## 빠르게 고르는 기준

1. 코드 흐름을 모르면 `ct:calltree`
2. 테스트를 쓰려면 `ct:calltree` → `ct:calltreeTest`
3. calltree 문서가 이미 있으면 바로 `ct:calltreeTest`

## 이력관리

- 2026-04-10: `ct:calltree`, `ct:calltreeTest` 활용 흐름을 설명하는 분석·테스트 가이드 문서 추가
