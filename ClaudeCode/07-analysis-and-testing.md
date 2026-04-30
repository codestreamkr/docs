# 07. [중급] 프로젝트 분석/테스트 (spring+java)

spring+java 코드를 분석하거나 테스트를 작성하거나 전환 계획을 잡아야 할 때 사용하는 스킬 가이드다.

## 목차

1. [스킬 소개](#스킬-소개)
2. [ct:calltree 활용](#ctcalltree-활용)
3. [ct:calltreeTest 활용](#ctcalltreetest-활용)
4. [ct:tran-plan 활용](#cttran-plan-활용)
5. [이어서 쓰는 흐름](#이어서-쓰는-흐름)
6. [알아두면 좋은 것](#알아두면-좋은-것)

---

## 스킬 소개

세 가지 스킬이 있다. 역할이 다르기 때문에 상황에 따라 하나만 쓰거나 순서에 맞게 이어서 쓴다.

| 스킬 | 하는 일 | 결과물 저장 위치 |
|------|---------|-----------------|
| `ct:calltree` | Java 파일의 메서드 호출 관계를 분석해 트리 구조로 정리한다 | `.0_my/call-trees/` |
| `ct:calltreeTest` | calltree 문서를 기반으로 단위 테스트를 생성한다 | `.0_my/call-trees/` |
| `ct:tran-plan` | 특정 진입점의 AS-IS/TO-BE 호출 구조와 전환 계획을 작성한다 | `.0_my/tran-plans/` |

어떤 스킬을 쓸지 모르겠으면 아래 기준으로 고른다.

- 코드 흐름을 모르면 → `ct:calltree`
- 테스트를 써야 하면 → `ct:calltree` → `ct:calltreeTest`
- calltree 문서가 이미 있으면 → `ct:calltreeTest`
- 전환/리팩토링 계획이 필요하면 → `ct:tran-plan`

---

## ct:calltree 활용

호출 관계를 파악할 때 쓴다. 코드를 바꾸지 않고 분석 문서만 만든다.

입력 단위는 파일명이고, 메서드를 좁히려면 쉼표로 구분해서 지정한다.

파일 전체 분석:

```text
/ct:calltree PaymentService.java
```

특정 메서드만:

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
```

컨트롤러의 특정 버전 엔드포인트만:

```text
/ct:calltree OrderTrxController.java /v4/
```

자연어 지시를 함께 넘기면 분석 범위나 방향을 바로 조정할 수 있다.

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
알림 발송 쪽은 제외하고, 외부 API 호출이 있는 지점은 별도로 표시해줘.
```

실행하면 아래 결과를 기대할 수 있다.

- 진입점 메서드부터 하위 호출이 트리 형태로 정리된다.
- 외부 의존(Repository, 외부 서비스 등)이 어느 지점에서 연결되는지 표시된다.
- `[TC:✅]` 판정이 함께 나와 테스트 대상 노드를 바로 확인할 수 있다.

---

## ct:calltreeTest 활용

calltree 문서를 기반으로 단위 테스트를 생성한다.

같은 대화에서 `ct:calltree`를 바로 실행했다면 문서 경로 없이 호출한다.

```text
/ct:calltreeTest
```

이전 대화와 독립적으로 실행하거나 특정 calltree 문서를 지정할 때는 파일명을 넘긴다.

```text
/ct:calltreeTest callTree-OrderService.md
```

특정 노드만 처리하거나 제약 조건을 함께 넘길 수 있다.

```text
/ct:calltreeTest
reqOrder 쪽만 우선 작성하고, Mockito 사용해줘.
```

```text
/ct:calltreeTest callTree-OrderService.md orderService.reqOrder()
기존 테스트 파일 패턴 유지해줘.
```

실행하면 아래 결과를 기대할 수 있다.

- `[TC:✅]` 노드를 실제 소스 코드와 대조해서 테스트 로직을 추출한다.
- UnitTest, MainTest, 보조 문서가 함께 생성된다.
- 외부 의존이 있는 지점은 Mock으로 처리한다.

---

## ct:tran-plan 활용

특정 메서드, Controller API, Service, 배치 진입점의 AS-IS/TO-BE 호출 구조와 전환 계획 문서를 작성한다.

같은 대화에서 `ct:calltree`를 먼저 실행했다면 전환 방향만 넘긴다.

```text
/ct:tran-plan
레거시 PaymentGateway 의존을 제거하고 신규 PaymentClient로 교체하는 방향으로 계획 잡아줘.
```

대상 파일을 직접 지정해서 독립적으로 실행할 수도 있다.

특정 메서드 단위:

```text
/ct:tran-plan OrderService.java reqOrder
레거시 PaymentGateway 의존을 제거하고 신규 PaymentClient로 교체하는 방향으로 계획 잡아줘.
```

Controller API 단위:

```text
/ct:tran-plan OrderTrxController.java /v4/
```

배치 진입점 전체:

```text
/ct:tran-plan PaymentBatchJob.java
```

---

## 이어서 쓰는 흐름

### 분석 → 테스트

```text
/ct:calltree OrderService.java reqOrder,cancelOrder
```

calltree가 끝나면 이어서:

```text
/ct:calltreeTest
reqOrder 쪽만 우선 작성하고, Mockito 사용해줘.
```

### 분석 → 전환 계획

```text
/ct:calltree PaymentService.java charge
```

분석 결과를 보고 전환 방향을 결정한 뒤:

```text
/ct:tran-plan
레거시 PGClient 의존을 제거하고 신규 PaymentClient로 교체하는 방향으로 계획 잡아줘.
```

---

## 알아두면 좋은 것

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

분기/검증/데이터 가공/외부 연동이 있는 메서드가 대상이 되고, 단순 위임(조건 없이 dao/service 호출 후 바로 반환)은 표기하지 않는다.

### 대용량 파일은 범위를 좁혀서 요청한다

2000줄이 넘는 파일은 메서드 필터를 써서 범위를 좁히는 것이 좋다. 파일 전체를 한 번에 분석하면 결과가 길어지고 정밀도가 떨어진다.

### calltreeTest는 문서만 보고 테스트를 만들지 않는다

calltree 문서를 기반으로 실제 소스를 다시 확인한다. 소스와 문서가 크게 다르면 결과가 부정확해질 수 있다.

## 이력관리

- 2026-04-10: `ct:calltree`, `ct:calltreeTest` 활용 흐름을 설명하는 분석·테스트 가이드 문서 추가
- 2026-04-28: `ct:tran-plan` 스킬 설명 및 예제 추가
- 2026-04-30: 목차 추가, 스킬 소개 구조 재편
