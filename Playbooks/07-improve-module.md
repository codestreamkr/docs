# 개선 과제를 정리해 반영한다

무엇부터 손볼지 정한 다음, 확정된 범위만 코드로 반영한다.

## 흐름

```text
ct-plan improve   현황, 개선 과제, 우선순위와 기대 효과
      ↓
ct-plan impl      선택한 과제의 변경 대상, 영향과 구현 순서
      ↓
ct-spring         확정된 범위 구현
      ↓
ct-qa-lucin       회귀 범위 검증                          ← 영향 범위가 넓을 때
```

## 단계별로 확정할 것

### ct-plan improve

이 단계에서는 운영 코드를 변경하지 않는다.

- 현재 문제와 그 영향
- 개선 과제 후보와 각각의 변경 범위
- 우선순위와 선행 조건
- 이번 단계와 후속 단계의 경계
- 바로 구현 가능한 과제와 결정이 필요한 과제

### ct-plan impl

과제를 실제 변경 단위로 바꾼다.

- 바로 구현할 범위
- 확인된 가정 위에서 구현할 범위
- 정책 결정이 필요해 보류할 범위
- 유지할 API, 데이터와 운영 계약

### ct-spring

보류 범위는 반영하지 않는다. 구현 중 새 과제가 보이면 목록에 추가하고 이번 범위는 유지한다.

### ct-qa-lucin

여러 모듈을 건드렸다면 변경 지점이 아니라 영향 지점을 기준으로 회귀 범위를 정한다.

## 다음 단계로 넘길 것

- 채택한 과제와 보류한 과제
- 반영한 범위와 그 근거
- 검증 결과와 미검증 범위
- 다음 순번 과제

## 이 Playbook을 벗어나는 경우

- 개선 대상이 조회 성능 한 가지면 [04](./04-tune-sql.md)로 바로 간다.
- 개선이 아니라 구조 자체를 바꾸는 일이면 [05](./05-transition-structure.md)를 사용한다.
- 새로 만드는 기능이면 [01](./01-define-scope.md)에서 시작한다.

## 실행

호출 표기는 [Codex](../Platforms/Codex/workflows.md), [Claude Code](../Platforms/ClaudeCode/workflows.md), [Grok Build](../Platforms/GrokBuild/workflows.md), [Pi](../Platforms/Pi/workflows.md) 문서에서 확인한다.
