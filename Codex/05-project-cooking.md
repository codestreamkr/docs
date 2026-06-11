# 06. [중급]프로젝트 코딩

## 이 문서는 언제 보나

Codex로 프로젝트를 손봐야 하는데 어디서부터 맡겨야 할지 애매할 때 본다.

기능 하나를 바로 붙이는 경우도 있고, 리팩토링이나 구조 개선처럼 먼저 판단이 필요한 경우도 있다.

이 문서는 Codex에서 `ct-improve-plan`, `ct-design-review`, `ct-implement` 스킬을 어떻게 이어서 쓰면 되는지 정리한다.

## 사전작업

이 문서의 `$ct-*` 호출은 Codex 기본 제공 명령이 아니라 Skill 기준이다.

### 준비가 필요한 기능

| 기능 | 구분 | 준비 기준 |
| --- | --- | --- |
| `$ct-improve-plan` | Skill | 개선 과제 정리 Skill이 설치되어 있어야 한다 |
| `$ct-design-review` | Skill | 설계 검토 Skill이 설치되어 있어야 한다 |
| `$ct-implement` | Skill | 구현 Skill이 설치되어 있어야 한다 |
| `$ct-spring-component` | Skill | Spring 컴포넌트 추가 Skill이 설치되어 있어야 한다 |
| `spring` | Skill | Spring 구현 판단 Skill이 설치되어 있어야 한다 |
| `pd` | Skill | 제품·화면 기획 Skill이 설치되어 있어야 한다 |
| `external-architect` | Skill | 외부 연동 설계 Skill이 설치되어 있어야 한다 |
| `query-tuner` | Skill | 쿼리 튜닝 Skill이 설치되어 있어야 한다 |
| `qa-lucin` | Skill | QA 검증 Skill이 설치되어 있어야 한다 |

이후 예시는 위 Skill이 설치된 상태에서 실행한다.

## Codex 작업 모드 먼저 고르기

작업을 맡기기 전에 실행 위치를 정한다.

| 상황 | 권장 모드 |
| --- | --- |
| 문서 수정, 작은 코드 변경 | `Local` |
| 큰 리팩토링, 여러 접근 비교 | `Worktree` |
| 오래 걸리는 구현, 장시간 분석 | `Cloud` |
| 프론트엔드 화면 확인 | `Local` + in-app browser 또는 Browser use |
| 반복 확인, PR 추적, CI 재점검 | thread automation |

작업이 커지면 하나의 thread에 모두 넣지 않는다.

- 구현: `$ct-implement`
- 테스트와 회귀: `qa-lucin`
- Spring 구조 판단: `spring`
- 쿼리 성능: `query-tuner`
- 외부 연동: `external-architect`
- 정책과 화면 흐름: `pd`

## 먼저 감을 잡자

### 구조 개선, 리팩토링, 기술부채 정리

- 추천 흐름: `$ct-improve-plan` -> `$ct-design-review` -> `$ct-implement`
- 이유: 무엇을 먼저 바꿀지 판단하고, 설계를 정리한 뒤 구현해야 재작업이 줄어든다.

### 새 기능인데 정책, 권한, 운영 영향이 큰 경우

- 추천 흐름: `$ct-design-review` -> `$ct-implement`
- 이유: 구현 전에 범위와 운영 기준을 먼저 정리하는 편이 안전하다.

### 단일 기능 추가, 범위가 작고 정책이 단순한 경우

- 추천 흐름: `$ct-implement`
- 이유: 문서 단계를 줄이고 바로 구현으로 들어가는 편이 빠르다.

### Spring 공통 컴포넌트를 붙이는 경우

- 추천 흐름: `$ct-spring-component <component-name>`
- 이유: 허용된 컴포넌트 묶음을 프로젝트 컨벤션에 맞춰 적용한다.
- 허용 컴포넌트: `service-log`, `jwt-auth`, `exception-handler`, `api-response`

### 이미 개선 계획 문서가 있는 경우

- 추천 흐름: `$ct-design-review` -> `$ct-implement`
- 이유: 우선순위 판단은 끝났으니 구현 방향과 실제 반영 범위만 정리하면 된다.

## 각 스킬은 무슨 일을 하나

### `$ct-improve-plan`

- 하는 일: 코드와 설정을 근거로 개선 과제를 뽑고 우선순위를 정한다.
- 결과물: `{project}_improve_plan.md`

### `$ct-design-review`

- 하는 일: 여러 전문가 관점으로 설계안을 검토하고, 충돌을 조율해 최종 채택안을 정리한다.
- 결과물: `{topic}_design_review.md`

### `$ct-implement`

- 하는 일: 구현 가능 범위를 먼저 정리한 뒤, 승인되면 실제 코드 수정까지 이어서 처리한다.
- 결과물: 코드 변경 + 영향 범위 정리

### 전문가 Skill

- `spring`: Spring, MVC, JPA, MyBatis, Security, Batch 작업 판단
- `pd`: 서비스 기획, 화면 설계, PRD 정리
- `external-architect`: 결제, 인증, 메시징, 웹훅, 외부 API 연동
- `query-tuner`: Oracle, MySQL, PostgreSQL 쿼리 튜닝
- `qa-lucin`: 엔드포인트 테스트, Playwright E2E, 회귀 검증

핵심은 역할을 섞지 않는 것이다.

- `$ct-improve-plan`은 판단 문서 작성용이다. 코드를 바로 고치지 않는다.
- `$ct-design-review`는 설계 합의용이다.
- `$ct-implement`는 실행 단계다.

## 흐름 1. 큰 작업은 3단계로 끊는다

리팩토링, 구조 개선, 운영 안정화, 성능 개선처럼 범위가 넓은 작업은 아래 순서가 기본이다.

### Step 1. `$ct-improve-plan`으로 먼저 판을 깐다

무엇이 문제인지보다 무엇부터 손대야 하는지를 먼저 정리한다.

예시:

```text
$ct-improve-plan 이 프로젝트의 개선 과제를 우선순위 기준으로 정리해줘.
```

기대 결과:

- 개선 항목이 `IMP-xxx` 형태로 정리된다.
- 각 항목마다 왜 필요한지, 어디까지 손댈지, 바로 위임 가능한지 구분된다.
- 당장 구현해도 되는 항목과 추가 확인이 필요한 항목이 갈린다.

### Step 2. `$ct-design-review`로 구현 방향을 좁힌다

정책, 운영 모델, 범위 경계가 애매한 항목은 설계 검토를 거친다.

예시:

```text
$ct-design-review IMP-002를 기준으로 게시판 기능 구조를 검토해줘.
관리자/일반 사용자 권한 차이와 첨부파일 처리 방식까지 포함해줘.
```

기대 결과:

- 전문가별 판단과 우려사항이 정리된다.
- 의견 충돌 지점과 조율 결과가 남는다.
- 채택안, 제외안, 보류안이 분리된다.
- 구현 순서와 성공 기준이 정리된다.

### Step 3. `$ct-implement`로 실제 반영한다

계획 문서나 설계 검토 문서를 넘기면 먼저 구현 범위를 정리한다.

예시:

```text
$ct-implement 방금 만든 design review 기준으로 게시판 기능 구현해줘.
```

확인할 범위:

- 이번에 바로 구현할 범위
- 가정을 두고 구현 가능한 범위
- 정책 미확정으로 보류할 범위

## 흐름 2. 작은 작업은 바로 구현한다

정책이 단순하고 범위가 분명하면 `$ct-implement`로 바로 들어가도 된다.

예시:

```text
$ct-implement 게시판 기능 추가해줘.
이번 범위는 목록/상세/등록/수정/삭제고,
첨부파일과 알림은 제외해줘.
기존 응답 형식은 유지하고 관리자만 수정/삭제 가능하게 해줘.
```

이 방식이 맞는 경우:

- 화면과 API 범위가 분명하다.
- 권한 정책이 단순하다.
- 외부 연동이나 배치가 없다.
- 기존 코드 패턴을 따라가면 된다.

설계 검토로 올릴 조건:

- 권한 정책이 여러 역할로 갈린다.
- 상태 전이나 승인 흐름이 있다.
- 파일 업로드, 알림, 배치, 외부 API가 같이 붙는다.
- 운영 중 장애나 데이터 정합성 이슈가 커질 수 있다.

## 요청을 이렇게 쓰면 결과가 좋아진다

아래 네 가지를 붙이면 결과가 안정적이다.

- 대상: 게시판, 회원관리, 정산 배치
- 이번 범위: 목록/상세/등록만, 관리자 화면만, API만
- 제외 범위: 첨부파일 제외, 알림 제외, 마이그레이션 제외
- 제약: 기존 응답 형식 유지, 특정 테이블 재사용, 테스트는 이번 라운드 제외
- 실행 모드: Local, Worktree, Cloud 중 원하는 방식
- 검증: 단위 테스트, E2E, 화면 확인, `/review` 중 필요한 항목

## 빠르게 고르는 기준

1. 무엇부터 손댈지 모르면 `$ct-improve-plan`
2. 어떻게 만들지 합의가 필요하면 `$ct-design-review`
3. 범위가 확정됐고 바로 반영하면 되면 `$ct-implement`
4. Spring 공통 컴포넌트가 필요하면 `$ct-spring-component`
5. 테스트와 화면 검증이 필요하면 `qa-lucin`과 Browser 계열 도구

## 검토와 반영

구현 후에는 변경을 바로 끝내지 않고 확인한다.

- CLI에서는 `/diff`로 변경을 확인한다.
- CLI에서는 `/review`로 결함, 회귀, 테스트 누락을 점검한다.
- Codex App에서는 Review pane과 inline comment로 후속 수정을 지시한다.
- 프론트엔드 변경은 in-app browser나 Browser use로 로컬 화면을 확인한다.
- commit, push, PR 생성은 사용자 확인 후 진행한다.

## 이력관리

- 2026-06-10: Codex 작업 모드와 화면 검증 흐름 반영
- 2026-05-11: Codex 스킬 호출 방식에 맞춘 프로젝트 코딩 가이드 추가
