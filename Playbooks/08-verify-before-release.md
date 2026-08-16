# 오픈 전 품질을 검증한다

배포 전에 위험이 높은 흐름부터 검증하고, 검증하지 못한 범위를 남긴다.

## 흐름

```text
ct-qa-lucin          검증 범위, 위험별 시나리오, 실행 결과와 재현 방법
      ↓
ct-calltree test     자동화가 필요한 흐름의 테스트          ← 반복 검증이 필요할 때
      ↓
ct-spring            발견한 결함 수정                      ← 수정 대상이 확정된 뒤
```

## 단계별로 확정할 것

### ct-qa-lucin

- 이번 변경으로 영향받는 사용자 흐름
- 위험이 높은 순서: 권한, 결제와 상태 변경, 중복 요청, 실패 복구
- 현재 환경에서 실행 가능한 검증과 불가능한 검증
- 결함의 재현 절차

전 범위를 같은 깊이로 보지 않는다. 위험이 낮은 흐름은 확인 대상에서 제외한 이유를 남긴다.

### ct-calltree test

같은 검증을 다음 배포에서도 반복해야 하면 테스트로 남긴다. 일회성 확인은 테스트로 만들지 않는다.

### ct-spring

결함 수정은 원인이 확정된 뒤에 진행한다. 증상만 가리는 수정은 재발 조건을 함께 기록한다.

## 다음 단계로 넘길 것

- 검증한 범위와 결과
- 발견한 결함과 재현 방법
- 수정 여부와 남긴 결함
- 실행하지 못한 검증과 그 이유
- 배포 후 확인할 항목

## 이 Playbook을 벗어나는 경우

- 검증 대상 흐름을 모르면 [03](./03-understand-code.md)에서 호출 흐름부터 확인한다.
- 구현과 검증을 이어서 진행 중이면 [02](./02-implement-and-verify.md)에 이미 포함된다.
- 검증 환경 자체가 없으면 [09](./09-prepare-runtime.md)를 먼저 진행한다.

## 실행

호출 표기는 [Codex](../Platforms/Codex/workflows.md), [Claude Code](../Platforms/ClaudeCode/workflows.md), [Grok Build](../Platforms/GrokBuild/workflows.md), [Pi](../Platforms/Pi/workflows.md) 문서에서 확인한다.
