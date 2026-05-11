# 07. [중급] 프로젝트 분석/테스트 (spring+java)

spring+java 코드를 분석하거나 테스트를 작성하거나 전환 계획을 잡아야 할 때 사용하는 스킬 가이드다.

아래 예시는 관련 Skill이 설치된 상태에서 실행한다.

## 목차

- [07. \[중급\] 프로젝트 분석/테스트 (spring+java)](#07-중급-프로젝트-분석테스트-springjava)
  - [목차](#목차)
  - [사전작업](#사전작업)
    - [준비가 필요한 기능](#준비가-필요한-기능)
  - [스킬 소개](#스킬-소개)
  - [$ct-calltree 활용](#ct-calltree-활용)
  - [$ct-calltree-test 활용](#ct-calltree-test-활용)
  - [$ct-tran-plan 활용](#ct-tran-plan-활용)
  - [이어서 쓰는 흐름](#이어서-쓰는-흐름)
    - [분석 -\> 테스트](#분석---테스트)
    - [분석 -\> 전환 계획](#분석---전환-계획)
  - [알아두면 좋은 것](#알아두면-좋은-것)
    - [분석 깊이는 기본 3depth다](#분석-깊이는-기본-3depth다)
    - [트리에 포함되지 않는 것](#트리에-포함되지-않는-것)
    - [`[TC:✅]`는 테스트 작성을 위한 옵션이다](#tc는-테스트-작성을-위한-옵션이다)
    - [대용량 파일은 범위를 좁혀서 요청한다](#대용량-파일은-범위를-좁혀서-요청한다)
  - [이력관리](#이력관리)

---

## 사전작업

이 문서의 `$ct-*` 호출은 Codex 기본 제공 명령이 아니라 Skill 기준이다.

### 준비가 필요한 기능

| 기능 | 구분 | 준비 기준 |
|------|------|-----------|
| `$ct-calltree` | Skill | Java 호출 관계 분석 Skill이 설치되어 있어야 한다 |
| `$ct-calltree-test` | Skill | calltree 기반 테스트 생성 Skill이 설치되어 있어야 한다 |
| `$ct-tran-plan` | Skill | 전환 계획 작성 Skill이 설치되어 있어야 한다 |

Skill이 설치되어 있으면 스킬명을 직접 언급하거나 `$스킬명` 형태로 호출한다.

---

## 스킬 소개

세 가지 스킬이 있다. 역할이 다르기 때문에 상황에 따라 하나만 쓰거나 순서에 맞게 이어서 쓴다.

| 스킬 | 하는 일 | 결과물 저장 위치 |
|------|---------|-----------------|
| `$ct-calltree` | Java 파일의 메서드 호출 관계를 분석해 트리 구조로 정리한다 | `.0_my/call-trees/` |
| `$ct-calltree-test` | calltree 문서를 기반으로 단위 테스트를 생성한다 | `.0_my/call-trees/` |
| `$ct-tran-plan` | 특정 진입점의 AS-IS/TO-BE 호출 구조와 전환 계획을 작성한다 | `.0_my/tran-plans/` |

선택 기준:

- 코드 흐름을 모르면: `$ct-calltree`
- 테스트를 써야 하면: `$ct-calltree` -> `$ct-calltree-test`
- calltree 문서가 이미 있으면: `$ct-calltree-test`
- 전환/리팩토링 계획이 필요하면: `$ct-tran-plan`

---

## $ct-calltree 활용

호출 관계를 파악할 때 쓴다. 코드를 바꾸지 않고 분석 문서만 만든다.

파일 전체 분석:

```text
$ct-calltree PaymentService.java
```

특정 메서드만:

```text
$ct-calltree OrderService.java reqOrder,cancelOrder
```

컨트롤러의 특정 버전 엔드포인트만:

```text
$ct-calltree OrderTrxController.java /v4/
```

자연어 지시를 함께 넘길 수 있다.

```text
$ct-calltree OrderService.java reqOrder,cancelOrder
알림 발송 쪽은 제외하고, 외부 API 호출이 있는 지점은 별도로 표시해줘.
```

기대 결과:

- 진입점 메서드부터 하위 호출이 트리 형태로 정리된다.
- 외부 의존이 어느 지점에서 연결되는지 표시된다.
- `[TC:✅]` 판정으로 테스트 대상 노드를 확인할 수 있다.

---

## $ct-calltree-test 활용

calltree 문서를 기반으로 단위 테스트를 생성한다.

같은 대화에서 `$ct-calltree`를 바로 실행했다면 문서 경로 없이 호출한다.

```text
$ct-calltree-test
```

특정 calltree 문서를 지정할 수도 있다.

```text
$ct-calltree-test callTree-OrderService.md
```

특정 노드와 제약 조건을 함께 넘길 수 있다.

```text
$ct-calltree-test callTree-OrderService.md orderService.reqOrder()
기존 테스트 파일 패턴 유지해줘.
```

기대 결과:

- `[TC:✅]` 노드를 실제 소스 코드와 대조한다.
- UnitTest, MainTest, 보조 문서가 함께 생성된다.
- 외부 의존은 Mock으로 처리한다.

---

## $ct-tran-plan 활용

특정 메서드, Controller API, Service, 배치 진입점의 AS-IS/TO-BE 호출 구조와 전환 계획 문서를 작성한다.

```text
$ct-tran-plan OrderService.java reqOrder
레거시 PaymentGateway 의존을 제거하고 신규 PaymentClient로 교체하는 방향으로 계획 잡아줘.
```

Controller API 단위:

```text
$ct-tran-plan OrderTrxController.java /v4/
```

배치 진입점 전체:

```text
$ct-tran-plan PaymentBatchJob.java
```

---

## 이어서 쓰는 흐름

### 분석 -> 테스트

```text
$ct-calltree OrderService.java reqOrder,cancelOrder
```

이어서:

```text
$ct-calltree-test
reqOrder 쪽만 우선 작성하고, Mockito 사용해줘.
```

### 분석 -> 전환 계획

```text
$ct-calltree PaymentService.java charge
```

이어서:

```text
$ct-tran-plan
레거시 PGClient 의존을 제거하고 신규 PaymentClient로 교체하는 방향으로 계획 잡아줘.
```

---

## 알아두면 좋은 것

### 분석 깊이는 기본 3depth다

`$ct-calltree`는 무한정 파고들지 않는다.

```text
depth1  reqOrder()
depth2  ├─ [TC:✅] paymentService.charge()
depth2  ├─ orderDao.insertOrder()
depth3  │   ├─ [TC:✅] limitService.check()
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

분기, 검증, 데이터 가공, 외부 연동이 있는 메서드가 대상이 된다.

### 대용량 파일은 범위를 좁혀서 요청한다

2000줄이 넘는 파일은 메서드 필터를 써서 범위를 좁히는 것이 좋다.

## 이력관리

- 2026-05-11: Codex 스킬 호출 방식에 맞춘 분석·테스트 가이드 추가
