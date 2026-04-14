# 로드형 첫번째 특집 - Spring Data JPA 전문가

`spring-jpa` 스킬이 다루는 쿼리 패턴, Entity 설계 판단, N+1 해결, 페이징, Projection을 실전 활용법과 함께 정리한다.

## 1. spring-jpa 스킬은 무엇을 다루나

로드형이 JPA 관련 작업에 들어가면 `spring-jpa` 스킬이 자동으로 로드된다.  
이 스킬이 다루는 범위는 다음과 같다.

| 영역 | 내용 |
|---|---|
| Entity 기본 | ID 전략, 연관관계 원칙, Auditing, Soft Delete |
| Query Methods | 단순 조회 메서드 네이밍 규칙과 한계선 |
| QueryDSL | 동적·복잡 쿼리 구조, BooleanExpression 패턴 |
| @Query | 벌크 연산, 네이티브 쿼리, 정적 복잡 쿼리 |
| N+1 해결 | fetch join, @EntityGraph, batch_fetch_size 우선순위 |
| 페이징 | Page vs Slice 선택, 카운트 쿼리 최적화 |
| Projection | Interface Projection, DTO Projection, QueryDSL Projection 선택 기준 |
| 안티패턴 | OSIV, save() 오용, findAll() 필터링, 순환 참조 |

연관관계 상세 설계, 상속 전략, Embeddable, 낙관적/비관적 락은 이 스킬 범위 밖이다.  
필요하면 별도 요청하면 된다.

## 2. 쿼리 패턴 우선순위 — 가장 중요한 원칙

로드형은 쿼리를 짤 때 항상 이 순서를 따른다.

```
1. Query Methods  →  단순 조회 (조건 2~3개 이하)
2. QueryDSL       →  동적 조건 또는 복잡 쿼리 (의존성이 있을 때만)
3. @Query (JPQL)  →  벌크 연산, 네이티브 쿼리, 복잡한 정적 쿼리
```

단순한 걸 복잡한 방법으로 풀지 않는다.  
QueryDSL이 프로젝트에 있더라도, Query Methods로 충분하면 그걸 쓴다.

이걸 무시하고 요청하면 로드형이 짚는다.

> "그 정도 조건이면 Query Method로 충분하네. 굳이 QueryDSL을 꺼낼 이유가 있는가?"

## 3. Entity 설계 — 판단 기준

### ID 전략

| 전략 | 언제 쓰는가 |
|---|---|
| IDENTITY | MySQL/MariaDB 기본. 단순하고 검증됨 |
| SEQUENCE | PostgreSQL/Oracle 기본. 배치 INSERT에 유리 |
| TABLE | 쓰지 않는다 |
| UUID | 분산 환경, URL에 ID가 노출될 때 |

프로젝트에 기존 전략이 있으면 그대로 따른다.

### 연관관계 기본 원칙

- 양방향보다 단방향을 먼저 고려한다
- `@ManyToOne`이 기본. `@OneToMany`는 진짜 필요할 때만
- 양방향이면 연관관계 편의 메서드를 반드시 작성한다
- `CascadeType.ALL`은 부모-자식 생명주기가 완전히 같을 때만

### Auditing

- 프로젝트에 BaseEntity가 있으면 상속한다
- 없으면 `createdAt`, `updatedAt` 정도만 `@CreatedDate`, `@LastModifiedDate`로 추가한다

### Soft Delete

- 프로젝트에 기존 패턴이 있으면 따른다
- 없으면 별도로 제안하지 않는다. 필요하면 명시적으로 요청해야 한다

### 잘 묻는 방법

```text
로드형, Order 엔티티 만들어줘.
Member, OrderItem이랑 연관관계 필요하고 BaseEntity는 이미 있어.
soft delete는 없고, ID 전략은 IDENTITY야.
```

```text
로드형, Product 엔티티에 카테고리 연관관계 추가해야 해.
Category는 이미 있고, 다대다 관계야.
지금 패턴 보고 방향 잡아줘.
```

로드형은 기존 엔티티를 먼저 찾아본다. 프로젝트 패턴이 확인되면 그 방식을 따른다.

## 4. Query Methods — 단순 조회

### 네이밍 규칙

| 목적 | 패턴 | 예시 |
|---|---|---|
| 단건 조회 | findBy... | `findByEmail(String email)` |
| 목록 조회 | findAllBy... | `findAllByStatus(Status status)` |
| 존재 확인 | existsBy... | `existsByEmail(String email)` |
| 건수 | countBy... | `countByStatus(Status status)` |
| 삭제 | deleteBy... | `deleteByExpiredAtBefore(LocalDateTime date)` |

### 한계선

조건이 3개를 넘으면 메서드 이름이 너무 길어진다.  
OR 조건이 복잡하거나 동적 조건이 필요하면 QueryDSL 또는 @Query로 넘어간다.

### 잘 묻는 방법

```text
로드형, 이메일로 회원 단건 조회, 상태별 목록 조회 두 개 짜줘.
```

```text
로드형, 만료일이 특정 날짜 이전인 토큰 삭제 메서드 필요해.
```

## 5. QueryDSL — 동적·복잡 쿼리

QueryDSL 의존성이 없는 프로젝트에서는 쓰지 않는다.  
의존성 추가 여부를 먼저 결정하고 요청해야 한다.

### 기본 구조

```java
public interface OrderRepositoryCustom {
    Page<OrderDto> searchOrders(OrderSearchCondition condition, Pageable pageable);
}

public class OrderRepositoryImpl implements OrderRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<OrderDto> searchOrders(OrderSearchCondition condition, Pageable pageable) {
        List<OrderDto> content = queryFactory
            .select(new QOrderDto(
                order.id,
                order.orderNumber,
                order.status,
                order.createdAt
            ))
            .from(order)
            .where(
                statusEq(condition.getStatus()),
                createdAtBetween(condition.getStartDate(), condition.getEndDate())
            )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(order.createdAt.desc())
            .fetch();

        JPAQuery<Long> countQuery = queryFactory
            .select(order.count())
            .from(order)
            .where(
                statusEq(condition.getStatus()),
                createdAtBetween(condition.getStartDate(), condition.getEndDate())
            );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private BooleanExpression statusEq(OrderStatus status) {
        return status != null ? order.status.eq(status) : null;
    }

    private BooleanExpression createdAtBetween(LocalDate start, LocalDate end) {
        if (start == null && end == null) return null;
        if (start != null && end != null) {
            return order.createdAt.between(
                start.atStartOfDay(), end.plusDays(1).atStartOfDay());
        }
        if (start != null) return order.createdAt.goe(start.atStartOfDay());
        return order.createdAt.lt(end.plusDays(1).atStartOfDay());
    }
}
```

핵심 패턴은 두 가지다.
- `BooleanExpression` 메서드로 조건을 분리한다. null을 반환하면 where절에서 자동으로 무시된다.
- 페이징 시 count 쿼리를 분리하고 `PageableExecutionUtils.getPage()`를 쓴다.

### Projection 선택

- `@QueryProjection` + DTO 생성자 — 컴파일 타임 체크 가능, DTO에 QueryDSL 의존성 생김
- `Projections.constructor()` — QueryDSL 의존성을 DTO에서 제거할 때

### 잘 묻는 방법

```text
로드형, 주문 목록 검색 짜줘.
상태, 날짜 범위, 회원 이름으로 동적 조건 걸어야 해.
QueryDSL 있고 페이징도 필요해.
```

```text
로드형, 상품 조회 QueryDSL로 짜야 해.
카테고리, 가격대, 판매 상태 조건이 선택적으로 들어와.
결과는 ProductDto로 받아야 해.
```

## 6. @Query — 벌크 연산과 네이티브 쿼리

### 벌크 연산

```java
@Modifying(clearAutomatically = true)
@Query("UPDATE Order o SET o.status = :status WHERE o.createdAt < :date")
int bulkUpdateStatus(@Param("status") OrderStatus status,
                     @Param("date") LocalDateTime date);
```

`clearAutomatically = true`가 핵심이다.  
벌크 연산은 영속성 컨텍스트를 무시하고 DB에 직접 실행하므로, 이후 조회 시 1차 캐시와 DB가 불일치한다.  
이 옵션이 없으면 벌크 연산 직후 조회 결과가 오래된 값을 반환할 수 있다.

### 네이티브 쿼리

```java
@Query(value = "SELECT * FROM orders WHERE MATCH(description) AGAINST(:keyword)",
       nativeQuery = true)
List<Order> fullTextSearch(@Param("keyword") String keyword);
```

DB 종속성을 만든다. 전문 검색, 함수 호출 등 JPQL로 표현 불가능한 경우에만 쓴다.

### 잘 묻는 방법

```text
로드형, 특정 날짜 이전 주문을 일괄로 CANCELLED 처리하는 쿼리 짜줘.
대량이라서 벌크 연산으로 해야 해.
```

```text
로드형, 특정 회원의 최근 주문 N건만 가져오는 쿼리 필요해.
ROW_NUMBER() 써야 하는데 JPQL로 안 되는 것 같아.
```

## 7. N+1 — 감지와 해결

### 발생 상황

- `@OneToMany`, `@ManyToMany`의 LAZY 컬렉션을 루프에서 접근할 때
- `@ManyToOne`도 여러 엔티티를 조회하면서 연관 엔티티를 각각 로딩할 때

SQL 로깅을 켜두면 쿼리 수로 바로 감지된다.

```yaml
logging:
  level:
    org.hibernate.SQL: debug
    org.hibernate.orm.jdbc.bind: trace
```

### 해결 우선순위

**1순위 — fetch join** (가장 직접적)

```java
@Query("SELECT o FROM Order o JOIN FETCH o.orderItems WHERE o.id = :id")
Optional<Order> findByIdWithItems(@Param("id") Long id);
```

**2순위 — @EntityGraph** (선언적, 재사용 가능)

```java
@EntityGraph(attributePaths = {"orderItems", "orderItems.product"})
Optional<Order> findById(Long id);
```

**3순위 — default_batch_fetch_size** (전역 설정, 페이징과 함께 쓸 때)

```yaml
spring:
  jpa:
    properties:
      hibernate:
        default_batch_fetch_size: 100
```

### 주의사항

| 상황 | 문제 |
|---|---|
| 컬렉션 fetch join + 페이징 | 메모리 페이징 경고 (`HHH000104`) — 하면 안 됨 |
| 컬렉션 fetch join 2개 이상 | `MultipleBagFetchException` |
| 위 두 경우의 해결책 | `batch_fetch_size` 또는 쿼리 분리 |

### 잘 묻는 방법

```text
로드형, 주문 목록 조회에서 N+1 터지는 것 같아.
Order 하나당 OrderItem이랑 Product 쿼리가 따로 나가는 것 같은데 확인해줘.
```

```text
로드형, 주문 목록에 N+1 생겼는데 페이징도 써야 해.
fetch join 쓰면 안 된다는 거 알고 있어서 다른 방법 알고 싶어.
```

## 8. 페이징 — Page vs Slice

| 항목 | Page | Slice |
|---|---|---|
| 전체 건수 조회 | O (COUNT 쿼리 실행) | X |
| 다음 페이지 존재 여부 | O | O |
| 적합한 UI | 페이지 번호 네비게이션 | 더보기 / 무한 스크롤 |

전체 건수가 필요 없는 무한 스크롤이라면 `Slice`가 COUNT 쿼리 비용을 아낄 수 있다.

### 카운트 쿼리 최적화

복잡한 조인이 들어간 쿼리에서 COUNT 쿼리도 같은 조인을 타면 느려진다.  
불필요한 JOIN을 제거한 별도 COUNT 쿼리를 분리한다.

```java
@Query(value = "SELECT o FROM Order o JOIN o.member m WHERE m.status = :status",
       countQuery = "SELECT COUNT(o) FROM Order o JOIN o.member m WHERE m.status = :status")
Page<Order> findByMemberStatus(@Param("status") MemberStatus status, Pageable pageable);
```

### 정렬

- 단순 정렬: `Pageable`에 `Sort` 포함 — `Sort.by("createdAt").descending()`
- 복잡한 정렬: `@Query` 내 `ORDER BY` 직접 작성 (여러 컬럼, 조건부 정렬 등)

### 잘 묻는 방법

```text
로드형, 주문 목록 페이징 API 짜줘.
전체 건수도 보여줘야 하고, 정렬은 최신순이야.
```

```text
로드형, 피드 목록인데 무한 스크롤이야.
전체 건수는 필요 없어, 다음 페이지 여부만 있으면 돼.
```

## 9. Projection — 필요한 컬럼만

### Interface Projection (단순 읽기 전용)

```java
public interface OrderSummary {
    Long getId();
    String getOrderNumber();
    OrderStatus getStatus();
}

List<OrderSummary> findAllByStatus(OrderStatus status);
```

필요한 컬럼만 SELECT하므로 성능에 유리하다.  
중첩 Projection은 N+1을 유발할 수 있으니 단순한 경우에만 쓴다.

### DTO Projection — @Query

```java
@Query("SELECT new com.example.dto.OrderDto(o.id, o.orderNumber, o.status) " +
       "FROM Order o WHERE o.status = :status")
List<OrderDto> findOrderDtoByStatus(@Param("status") OrderStatus status);
```

패키지 경로를 전부 써야 하는 불편함이 있지만 타입이 안전하다.

### 선택 기준

| 상황 | 선택 |
|---|---|
| 단순 읽기 전용 | Interface Projection |
| 복잡한 변환/계산 필요 | DTO Projection 또는 QueryDSL Projection |
| 동적 조건 + Projection | QueryDSL (`@QueryProjection` 또는 `Projections.constructor()`) |

### 잘 묻는 방법

```text
로드형, 주문 목록 조회인데 전체 엔티티 말고 id, 주문번호, 상태만 필요해.
성능 고려해서 짜줘.
```

```text
로드형, 회원별 주문 통계 쿼리 필요해.
회원 이름, 주문 수, 총 금액을 한 번에 조회해야 해.
```

## 10. 안티패턴 — 로드형이 바로 잡는 것들

### OSIV와 LazyInitializationException

OSIV가 꺼진 환경에서 트랜잭션 밖에서 LAZY 로딩하면 예외가 발생한다.  
서비스 레이어에서 필요한 데이터를 모두 로딩하고 DTO로 변환한 다음 반환해야 한다.

Spring Boot 기본값은 OSIV가 켜져 있다. 로드형은 기본값을 건드리지 않는다.  
단, OSIV를 꺼야 하는 상황이라면 모든 LAZY 로딩 경계를 트랜잭션 안으로 옮겨야 한다.

### save() 오용

이미 영속 상태인 엔티티에 `save()`를 다시 호출하면 불필요한 merge가 발생한다.  
트랜잭션 안에서 엔티티를 조회했다면 필드를 바꾸는 것만으로 변경 감지(dirty checking)가 동작한다.

```java
// 이렇게 하지 않는다
Order order = orderRepository.findById(id).orElseThrow();
order.updateStatus(CANCELLED);
orderRepository.save(order); // 불필요

// 이렇게 한다
Order order = orderRepository.findById(id).orElseThrow();
order.updateStatus(CANCELLED); // dirty checking으로 커밋 시 UPDATE
```

### findAll() 후 Java 필터링

DB에서 전체를 가져온 다음 Java 코드로 걸러내는 건 인덱스를 전혀 못 쓰는 것과 같다.  
WHERE 조건을 쿼리에 넣어야 한다.

### Entity를 API 응답으로 직접 반환

`toString()`, JSON 직렬화에서 양방향 연관관계 순환 참조가 발생한다.  
Entity는 DTO로 변환한 다음 반환한다.

## 11. 검증 포인트 — 코드 받은 다음 꼭 확인할 것

로드형이 코드를 써준 다음에는 항상 검증 포인트를 안내한다.  
아래는 공통적으로 확인해야 하는 항목이다.

| 항목 | 확인 방법 |
|---|---|
| N+1 발생 여부 | SQL 로깅 켜고 쿼리 수 확인 |
| 연관관계 방향 | 실제 사용 방향과 매핑 방향이 맞는지 |
| 트랜잭션 경계 | 필요한 로딩이 트랜잭션 안에서 이루어지는지 |
| 페이징 + 컬렉션 fetch join | `HHH000104` 경고 로그 확인 |
| 벌크 연산 후 조회 | clearAutomatically 설정 여부 |
| 비즈니스 규칙 | 상태 전이, 제약 조건이 의도대로 동작하는지 |

## 12. 마무리

JPA 작업을 들고 갈 때는 세 가지만 같이 주면 된다.

1. **만들거나 수정할 대상** — 엔티티인지, 쿼리인지, 성능 최적화인지
2. **도메인 맥락** — 어떤 비즈니스 동작인지 한 줄
3. **연관된 기존 코드** — 이미 있는 엔티티나 리포지토리 파일 경로

로드형은 프로젝트 파일을 직접 열어서 컨벤션을 파악한다.  
코드를 복붙해 줄 필요도, 설정을 일일이 설명할 필요도 없다.

## 이력관리

- 2026-04-14: 로드형 첫번째 특집 - Spring Data JPA 전문가 가이드 초안 작성
