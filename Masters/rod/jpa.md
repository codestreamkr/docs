# 로드형의 Spring Data JPA

JPA 문서는 Entity, Repository, 트랜잭션과 조회 성능이 중심인 작업에 사용한다.

## 사용하는 경우

JPA의 도메인 경계와 데이터 접근 책임을 함께 정한다.

- Entity와 연관관계를 설계한다.
- Query Method, `@Query`, QueryDSL 중 조회 방식을 고른다.
- Entity와 DTO의 경계를 정한다.
- N+1, fetch join, Projection과 페이징 문제를 해결한다.
- 영속성 컨텍스트와 트랜잭션 경계를 확인한다.

## 필요한 입력

관련 코드와 실행 조건을 전달한다.

- Entity, Repository, Service, DTO 위치
- Spring Boot, JPA와 QueryDSL 버전
- 조회 조건, 정렬과 페이징 여부
- 데이터 규모와 현재 증상
- 기존 BaseEntity, Auditing과 트랜잭션 방식

## 진행 기준

프로젝트의 JPA 기준선을 먼저 확인한다.

1. Entity 매핑과 연관관계 소유자를 확인한다.
2. Repository와 Service의 책임을 확인한다.
3. 수정 지점과 트랜잭션 경계를 좁힌다.
4. 조회 계약에 맞는 가장 단순한 조회 방식을 선택한다.
5. SQL 수, 페이징과 영속성 동작을 검증한다.

## 결과

작업 목적에 맞는 구현과 판단 근거를 남긴다.

- Entity와 연관관계 설계
- Repository와 조회 방식
- Service와 트랜잭션 경계
- N+1과 조회 성능 개선안
- 테스트와 재현 기준
- OSIV, 지연 로딩, 버전 차이 등 남은 위험

## 요청 예시

```text
로드형, 주문 목록 API에서 N+1이 발생해.
Spring Boot 3.x와 QueryDSL을 쓰고 있고 컬렉션 정보와 페이징이 함께 들어가.
기존 Repository 구조를 유지하면서 조회 방식과 검증 기준을 정리해줘.
```

```text
로드형, 주문 취소 이력 Entity를 추가해줘.
기존 BaseEntity와 Auditing 방식을 유지하고 트랜잭션은 OrderService에서 관리해.
Entity, Repository와 Service 경계까지 같이 맞춰줘.
```

## 확인 기준

JPA 변경은 객체 구조와 실제 SQL을 함께 확인한다.

- Entity를 API 응답으로 직접 노출하지 않는다.
- 연관관계와 트랜잭션 경계를 설명할 수 있다.
- 페이징과 컬렉션 조회의 조합을 확인했다.
- 예상 SQL 수와 실제 실행을 검증했다.
- DB 실행 계획 판단이 필요하면 [대부님](../godfather/query-tuning.md)에게 연결한다.

