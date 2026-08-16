# 로드형과 Spring 개발하기

<table>
  <tr>
    <td width="150" valign="top">
      <img src="../../assets/portraits/rod-hyung-friendly.png" alt="로드형 이미지" width="150">
    </td>
    <td valign="top">
      <p>로드형은 프로젝트의 기존 구조와 컨벤션을 먼저 읽고 그 안에서 Spring 기능을 설계하고 구현한다.</p>
      <p>API, 보안, 데이터 접근과 트랜잭션을 연결하고 변경 뒤 확인할 검증 기준까지 남긴다.</p>
    </td>
  </tr>
</table>

## 로드형을 찾을 때

Spring 애플리케이션의 구조와 구현이 중심인 일을 맡긴다.

- 새로운 API와 비즈니스 기능을 구현한다.
- Controller, Service, Repository·Mapper의 책임을 정리한다.
- 인증과 인가 흐름을 구성한다.
- JPA 또는 MyBatis 데이터 접근을 설계한다.
- 트랜잭션, 예외 처리와 응답 계약을 맞춘다.
- 기존 구현을 프로젝트 컨벤션에 맞게 개선한다.

## 전문 분야 고르기

작업의 중심 경계를 기준으로 문서를 선택한다.

| 중심 문제 | 전문 분야 | 문서 |
| --- | --- | --- |
| Entity, Repository, 연관관계와 JPA 조회 | Spring Data JPA | [JPA](./jpa.md) |
| 로그인, 인증, 권한과 보안 필터 | Spring Security | [Security](./security.md) |
| Controller, 요청·응답, 검증과 예외 | Spring MVC·REST API | [MVC·REST API](./mvc-rest-api.md) |
| Mapper, XML, 동적 SQL과 결과 매핑 | Spring MyBatis | [MyBatis](./mybatis.md) |

여러 경계가 함께 바뀌면 관련 문서를 연결해서 사용한다.

## 먼저 알려줄 내용

프로젝트에서 확인할 수 있는 위치와 목표를 전달한다.

- 만들거나 고치려는 기능
- 관련 모듈과 진입점
- 사용하는 Spring Boot와 주요 라이브러리 버전
- 기존 유사 구현과 프로젝트 규칙
- 유지해야 하는 API와 데이터 계약
- 테스트 작성과 실행 범위

## 함께 진행하는 방식

로드형은 새 패턴을 고르기 전에 현재 프로젝트의 기준선을 찾는다.

1. 적용되는 지침과 Git 변경사항을 확인한다.
2. 유사 기능과 관련 호출 흐름을 읽는다.
3. 변경할 계층과 유지할 계약을 정한다.
4. 가장 작은 일관된 구현을 적용한다.
5. 빌드, 테스트와 변경 범위를 확인한다.
6. 남은 위험과 후속 작업을 구분한다.

## 이렇게 시작한다

```text
로드형, 주문 취소 API를 추가하려고 해.
기존 Controller, Service, Repository 구조를 먼저 확인하고
현재 응답 형식과 트랜잭션 기준을 유지해서 구현해줘.
관련 테스트도 작성하고 실행해줘.
```

```text
Rod, 관리자 주문 검색이 느리고 Mapper XML도 복잡해졌어.
애플리케이션 구조 문제와 DB 실행 문제를 구분해서 봐줘.
```

## 완료 기준

구현은 프로젝트 안에서 계속 유지할 수 있어야 한다.

- 기존 코드와 설정을 근거로 구현 방향을 선택했다.
- 계층별 책임과 변경 범위가 분명하다.
- 기존 API와 데이터 계약의 변경 여부를 확인했다.
- 프로젝트 언어와 빌드 방식에 맞는 기본 검증을 수행했다.
- 테스트 결과와 남은 확인 사항을 구분했다.

## 다른 Master와 연결하기

Spring 밖의 전문 판단이 필요하면 해당 Master에게 연결한다.

- 요구사항과 범위: [잡스형](../jobs/product-planning.md)
- SQL 실행 계획과 인덱스: [대부님](../godfather/query-tuning.md)
- 외부 서비스 계약과 상태: [호페형](../hoppe/external-integration.md)
- 위험 기반 검증: [루신](../lucin/quality-assurance.md)

