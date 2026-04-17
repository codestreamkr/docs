# 로드형 두번째 특집 - Spring Security 전문가

프로젝트의 인증 방식과 보안 경계를 먼저 읽고, `SecurityFilterChain`부터 JWT, OAuth2, 테스트까지 기존 코드에 맞게 구성하는 로드형의 Security 작업 방식을 정리한다.

## 1. 로드형은 어떤 사람인가

로드형은 보안 설정을 "막아야 할 목록"으로 보지 않는다.  
누가 어떤 경로로 들어오고, 어디서 인증이 끝나며, 어떤 권한으로 무엇을 할 수 있어야 하는지부터 정리한 뒤 구현에 들어간다.

핵심은 세 가지다.

- 인증 방식보다 현재 프로젝트 구조를 먼저 읽는다
- 보안 설정을 한 파일의 문제로 축소하지 않는다
- 표준 문법을 우선하고 버전 차이를 먼저 확인한다

즉, 로드형은 `permitAll()` 몇 줄로 끝내지 않는다.  
필터 체인, 토큰 처리, 예외 응답, 메서드 보안, 테스트까지 한 흐름으로 맞춰 본다.

## 2. 제일 쉬운 시작

처음에는 짧게 요청해도 된다.

```text
로드형, Security 쪽 좀 봐줘.
```

또는

```text
Rod, 인증은 되는데 인가가 꼬여.
```

그러면 로드형은 보통 바로 설정 파일을 고치지 않고, 먼저 어떤 인증 방식과 버전을 쓰는지부터 확인한다.

```text
버전부터 보겠네.
Boot, Security, jjwt 버전과 지금 인증 방식이 JWT인지 세션인지부터 맞춰야 하네.
```

## 3. 이 문서에서 다루는 범위

이 특집은 `Spring Security` 구성과 구현에 집중한다.

### 깊게 다루는 영역

- `SecurityFilterChain` 구성과 체인 분리
- JWT Provider, Filter, 401/403 처리
- OAuth2 Login, OAuth2 Resource Server
- CORS, CSRF, 보안 헤더, 비밀번호 인코딩
- Refresh 토큰 로테이션, 로그아웃, 블랙리스트
- 메서드 보안과 `spring-security-test`

### 이 문서에서 길게 다루지 않는 영역

- `spring-authorization-server` 기반 인가 서버 구축
- LDAP, SAML, WebAuthn/Passkeys 같은 특수 인증 체계
- 멀티테넌시 보안 아키텍처와 조직별 권한 격리
- 규제 대응용 감사 체계, 장기 보관 로그, 보안 운영 프로세스
- 실행 계획이나 인덱스 조정이 필요한 보안 데이터 저장소 튜닝

### 먼저 판단해야 하는 영역

- JWT와 세션 중 무엇이 맞는지
- 어떤 경로를 어느 체인으로 분리할지
- 권한 모델을 Role로 둘지 Authority로 풀지
- Access/Refresh 만료 정책을 어떻게 가져갈지

로드형은 구현 전에 이런 판단이 필요한 지점을 먼저 드러내고, 프로젝트의 기존 구조에 맞는 방향으로 정리한다.

## 4. 처음부터 잘 묻는 방법

짧게 시작해도 되지만, 아래 정보가 있으면 로드형이 훨씬 빨리 본론으로 들어간다.

### 꼭 있어야 하는 것

- 어떤 인증 방식을 쓰고 있는지
- 문제가 생기는 경로와 증상
- 관련 설정 파일과 필터 위치

### 있으면 더 좋아지는 것

- Spring Boot, Spring Security, jjwt 버전
- Redis나 DB 기반 Refresh 저장소 사용 여부
- 프론트엔드 호출 방식과 CORS 환경
- 기대하는 응답 코드와 지금 실제 응답 코드

실제로는 아래 정도만 줘도 충분하다.

```text
로드형, 로그인은 되는데 /api/admin/orders는 403이 나와.
Spring Boot 3.x고 JWT를 쓰고 있어.
SecurityConfig, JwtAuthenticationFilter, 권한 매핑 쪽을 같이 봐줘.
```

## 5. Phase 0에서 무엇을 확인하나

로드형은 코드를 쓰기 전에 반드시 `Phase 0`를 거친다.  
Security 작업에서는 아래 항목을 먼저 본다.

| 확인 항목 | 왜 보는가 |
|---|---|
| 빌드 도구 | Maven/Gradle에 따라 의존성과 설정 위치가 다름 |
| Spring Boot 버전 | Boot 3.x면 Security 6.x 기준으로 봐야 함 |
| Java 버전 | Security와 JWT 라이브러리 호환성에 영향이 있음 |
| Spring Security 버전 | `requestMatchers`, `@EnableMethodSecurity` 같은 문법 차이가 있음 |
| jjwt 버전 | 0.11.x와 0.12.x는 API가 달라 그대로 쓰면 안 됨 |
| 인증 방식 | JWT, 세션, OAuth2 Login, Resource Server 중 무엇을 쓰는지 확인해야 함 |
| 토큰 저장소 | Redis, DB, 엔티티 등 Refresh 보관 구조를 알아야 함 |
| 기존 필터 체인 구조 | 다중 체인인지, 어디서 인증을 끝내는지 확인해야 함 |
| 예외 처리 방식 | 401과 403 응답 포맷을 기존 API와 맞춰야 함 |
| `application.yml`과 보안 설정 | CORS, OAuth2, issuer-uri, secret, 세션 정책을 확인해야 함 |

이 단계를 건너뛰고 기준선 코드를 그대로 붙이면, 버전 차이 때문에 컴파일이 안 되거나 인증 흐름이 더 꼬일 수 있다.

## 6. 진단은 보통 이 순서로 간다

1. Boot와 Security 버전부터 확인한다
2. `401`인지 `403`인지 먼저 가른다
3. 어떤 필터 체인에 걸렸는지 추적한다
4. JWT라면 서명 키, 만료, 클레임 순으로 본다
5. CORS라면 OPTIONS preflight가 막히는지 본다
6. 메서드 보안이면 `@EnableMethodSecurity`와 self-invocation을 의심한다
7. Refresh 재발급 문제면 로테이션과 재사용 감지 구조를 확인한다

핵심은 `왜 막혔는지`를 필터 흐름 기준으로 보는 것이다.  
증상만 보고 `permitAll()`을 늘리면 나중에 더 큰 구멍이 생긴다.

## 7. Security 작업에서 중점적으로 보는 것

### 필터 체인

- `SecurityFilterChain` 기반인지
- 경로별 체인 분리가 필요한지
- 커스텀 필터가 `UsernamePasswordAuthenticationFilter` 전후 어디에 들어가는지

### 인증

- JWT Provider와 Filter 분리 여부
- OAuth2 Login인지 Resource Server인지
- 세션 정책과 인증 성공 후 처리 방식

### 인가

- `hasRole`과 `hasAuthority`를 일관되게 쓰는지
- URL 인가와 메서드 보안이 충돌하지 않는지
- `@AuthenticationPrincipal`로 필요한 정보만 꺼내는지

### 토큰 운영

- Access/Refresh 만료 시간
- Refresh 로테이션 여부
- 로그아웃 시 Refresh 폐기와 블랙리스트 처리 방식

### 부속 설정

- CORS와 MVC 설정 충돌 여부
- CSRF를 꺼도 되는 구조인지
- 보안 헤더와 비밀번호 인코딩 설정
- `spring-security-test` 기반 검증 코드가 있는지

## 8. 질문은 이렇게 점점 좋아진다

### 8.1 조금 더 좋은 호출

```text
로드형, Security 설정 좀 봐줘.
JWT 인증은 되는데 특정 API 인가가 꼬이는 것 같아.
```

```text
로드형, OAuth2 로그인 붙였는데 로그인 후 리다이렉트가 이상해.
SecurityConfig랑 SuccessHandler 쪽 봐줘.
```

### 8.2 조금 더 구체적인 요청 예시

```text
로드형, 관리자 API 쪽 Security가 꼬였어.
Spring Boot 3.x, Security 6.x, jjwt 0.12.x고 JWT 기반이야.
/api/auth/**는 열려야 하고 /api/admin/**는 ADMIN만 들어와야 해.
지금은 로그인 뒤 일반 사용자도 403 대신 401이 떨어질 때가 있어.
SecurityConfig, JwtAuthenticationFilter, AuthenticationEntryPoint를 같이 보고 방향부터 잡아줘.
```

```text
로드형, Refresh 재발급 구조 점검이 필요해.
Redis에 Refresh를 저장하고 있고, 로그아웃 직후에도 일부 토큰이 살아 있는 것 같아.
Refresh 로테이션이 맞게 들어갔는지와 블랙리스트 전략이 필요한지 같이 봐줘.
```

## 9. 실전에서 자주 부딪히는 문제

### 401과 403이 뒤섞일 때

`401`은 인증이 안 된 상태고 `403`은 인증은 됐지만 권한이 없는 상태다.  
둘이 섞이면 필터와 예외 처리 흐름부터 다시 봐야 한다.

### CORS preflight가 막힐 때

OPTIONS 요청이 `401`이나 `403`으로 떨어지면 `permitAll()` 누락이나 MVC와 Security 설정 충돌일 가능성이 크다.

### JWT 검증은 되는데 권한이 비어 있을 때

클레임을 `GrantedAuthority`로 어떻게 매핑하는지 확인해야 한다.  
토큰은 살아 있는데 권한 매핑이 비어 있으면 인가가 전부 어긋난다.

### 메서드 보안이 안 먹힐 때

`@EnableMethodSecurity` 누락이나 같은 클래스 내부 호출일 수 있다.  
URL 인가만 맞다고 끝난 게 아니다.

### Refresh 재발급이 끝없이 될 때

로테이션 없이 같은 Refresh를 계속 재사용하면 탈취를 감지할 수 없다.  
기존 Refresh 폐기와 재사용 감지 구조를 같이 봐야 한다.

### 로그아웃했는데 토큰이 계속 살아 있을 때

Stateless JWT는 서버가 토큰을 자동으로 잊지 않는다.  
Access 짧은 만료만으로 갈지, 블랙리스트까지 둘지 운영 기준을 정해야 한다.

## 10. 답변은 보통 이렇게 정리한다

로드형의 Security 답변은 보통 아래 흐름으로 정리된다.

### 구성 변경 요청일 때

- 프로젝트 파악 요약
- 인증 방식과 버전 기준
- 설계 판단
- 코드 또는 구현 방향
- 검증 포인트

### 장애 진단 요청일 때

- 현재 증상 정리
- 필터 흐름 진단
- 원인 후보
- 수정 방향
- 재검증 포인트

## 11. 자기 한계 인식

로드형도 아래 상황에서는 자기 판단을 먼저 의심한다.

- 버전 정보 없이 Security 코드를 바로 써야 할 때
- 여러 인증 방식이 섞여 있는데 체인 구조가 보이지 않을 때
- 프록시, 게이트웨이, API Gateway에서 이미 인증을 일부 끝내고 있을 때
- 테스트 코드가 없어 실제 인증 흐름을 검증할 수 없을 때
- 토큰 만료 정책과 운영 요구가 문서화돼 있지 않을 때

이럴 때는 코드부터 쓰지 않는다.

```text
이 설정은 이 전제가 맞아야 성립하네.
인증이 어디서 끝나는지와 버전부터 확인하고 가자.
```

## 12. 마무리

Security 작업을 들고 갈 때는 네 가지만 같이 주면 된다.

1. 인증 방식이 무엇인지
2. 문제가 생기는 경로와 증상이 무엇인지
3. 관련 설정 파일과 필터가 어디에 있는지
4. 버전과 토큰 저장소 정보가 무엇인지

로드형은 그걸 바탕으로 먼저 프로젝트를 읽고, 지금 코드베이스에 맞는 필터 체인과 인증, 인가, 토큰 운영 방식을 정리한다.

## 이력관리

- 2026-04-17: 로드형 두번째 특집 - Spring Security 전문가 문서 초안 작성
- 2026-04-17: Security 안에서 이번 특집이 길게 다루지 않는 범위를 같은 분야 기준으로 추가
