# 무엇을 만들지 정한다

구현을 시작하기 전에 범위, 흐름과 완료 조건을 확정한다.

## 흐름

```text
ct-plan pd        목표, 사용자, 요구사항, 흐름과 성공 기준
      ↓
ct-plan review    작성한 기획의 근거, 대안과 결정 항목       ← 이견이 없으면 생략
      ↓
ct-plan impl      변경 대상, 영향, 구현 순서와 검증 기준
```

`impl`의 결과는 [02 기능을 구현하고 검증한다](./02-implement-and-verify.md)의 입력이 된다.

## 단계별로 확정할 것

### ct-plan pd

- 해결할 사용자 문제와 현재 겪는 불편
- 이번 범위와 다음으로 미룰 범위
- 사용자 흐름과 운영 흐름
- 예외 상황과 적용할 정책
- 완료를 판정할 기준

정책이 결정되지 않은 항목은 임의로 채우지 않고 결정 대기로 남긴다.

### ct-plan review

기획의 어느 부분이 결과를 바꾸는지 확인한다.

- 근거가 없는 가정
- 검토하지 않은 대안
- 서로 충돌하는 요구사항
- 사람이 결정해야 하는 항목

### ct-plan impl

- 변경할 API와 데이터 계약
- 영향을 받는 기존 기능
- 구현 순서와 각 단계의 완료 조건
- 검증 방법과 범위

## 다음 단계로 넘길 것

- 확정된 범위와 제외한 범위
- 유지해야 할 기존 계약
- 완료 판정 기준
- 결정 대기 중인 정책과 결정 주체

## 이 Playbook을 벗어나는 경우

- 정책과 계약이 이미 분명하면 기획을 건너뛰고 [02](./02-implement-and-verify.md)로 간다.
- 무엇을 만들지가 아니라 무엇부터 고칠지가 문제라면 [07](./07-improve-module.md)을 사용한다.
- 기존 코드의 동작을 모르는 상태라면 [03](./03-understand-code.md)을 먼저 진행한다.

## 실행

호출 표기는 [Codex](../Platforms/Codex/workflows.md), [Claude Code](../Platforms/ClaudeCode/workflows.md), [Grok Build](../Platforms/GrokBuild/workflows.md), [Pi](../Platforms/Pi/workflows.md) 문서에서 확인한다.
