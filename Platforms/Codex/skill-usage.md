# Codex Skill 사용하기

CodeStream의 `ct-*` Skill은 공통 Playbook을 Codex에서 실행하는 구현이다.

## 사용 전 확인

Skill 파일의 존재보다 현재 세션에 노출된 목록을 실행 기준으로 사용한다.

- 현재 Skill 목록에서 이름을 확인한다.
- 자연어 또는 `$skill-name`으로 호출한다.
- 문서 생성과 운영 코드 변경 Skill을 구분한다.
- 선행 결과와 필요한 입력을 확인한다.

## 공통 Playbook 연결

같은 업무 흐름을 담당하는 Skill을 연결한다.

| 공통 작업 | Codex Skill | 기본 결과 |
| --- | --- | --- |
| 프로젝트 기준 문서 준비 | `ct-init` | 프로젝트 구조·스타일·작업 절차 문서와 `AGENTS.md` 연결 |
| 로컬 실행 환경 준비 | `ct-script-run` | sh·ps1 스크립트, env 예시와 요청된 의존 서비스 구성 |
| 개선 우선순위 판단 | `ct-improve-plan` | 개선 계획 문서 |
| 큰 설계안 검토 | `ct-design-review` | 설계 결정 문서 |
| 구현 기준 문서 작성 | `ct-implement-plan` | 기능 기준 문서와 개발 가이드 |
| 실제 기능 구현 | `ct-implement` | 운영 코드 변경과 기본 검증 |
| Java 호출 흐름 분석 | `ct-calltree` | 3depth CallTree와 테스트 대상 판정 |
| CallTree 기반 테스트 | `ct-calltree-test` | 테스트 코드, fixture와 검증 보고 |
| 현재·목표 구조 전환 계획 | `ct-tran-plan` | AS-IS·TO-BE 전환 계획 문서 |

## 대표 호출

### 프로젝트 준비

```text
$ct-init 프로젝트 기준 문서를 만들고 AGENTS.md와 연결해줘.
```

### 계획과 구현

```text
$ct-design-review 결제 취소 구조를 검토해줘.
멱등성과 실패 후 보상 처리를 포함해줘.
```

```text
$ct-implement 확정된 설계 문서를 기준으로 구현하고 관련 테스트를 실행해줘.
```

### 분석과 테스트

```text
$ct-calltree OrderService.java의 reqOrder 메서드를 분석해줘.
```

```text
$ct-calltree-test 방금 만든 CallTree의 TC 대상 테스트를 구현해줘.
```

## 연결 기준

모든 Skill을 고정 순서로 실행하지 않는다.

- 우선순위가 불명확함: `ct-improve-plan`
- 설계 선택이 결과를 바꿈: `ct-design-review`
- 구현 계약이 분명함: `ct-implement`
- 호출 구조를 모름: `ct-calltree`
- 분석 결과를 테스트로 고정함: `ct-calltree-test`
- 구조 변경 순서가 필요함: `ct-tran-plan`

공통 판단 기준은 [계획하고 구현하기](../../Playbooks/planning-and-implementation.md)와 [분석하고 테스트하기](../../Playbooks/analysis-and-testing.md)를 따른다.

## 이력관리

- 2026-07-13: 현재 등록된 `ct-*` Skill을 공통 Playbook과 연결하는 Codex 전용 문서로 재구성
