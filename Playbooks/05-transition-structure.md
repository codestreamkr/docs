# 구조 전환하기

기존 동작을 유지하면서 현재 흐름, 목표 책임과 단계별 적용 순서를 함께 정한다.

## 흐름

```text
ct-calltree analyze      현재 호출과 데이터 흐름
      ↓
ct-calltree transition   현재·목표 구조와 전환 계획
      ↓
ct-calltree test         전환 전후를 비교할 테스트
      ↓
ct-spring                단계별 구현                     ← 코드 반영이 필요할 때
```

기존 구조를 유지한 채 테스트만 필요하면 `analyze` 다음에 바로 `test`를 사용한다.

## 단계별로 확정할 것

### ct-calltree analyze

- 호출 시작점부터 저장과 외부 호출까지
- 실패, 재시도와 운영 재처리 경로
- 사용자와 다른 시스템에 노출된 계약

### ct-calltree transition

현재 구성요소가 어디로 이동하는지 표시한다.

| 현재 | 목표 | 처리 방식 |
| --- | --- | --- |
| 기존 API | 호환 API 또는 신규 버전 | 유지·변경·폐기 중 선택 |
| 레거시 Service | 신규 Service | 책임 이동 순서 정의 |
| 전용 상태 | 내부 공통 상태 | 변환 규칙 정의 |
| 운영 재처리 | 공통 운영 도구 | 이관과 권한 기준 정의 |

각 단계는 독립적으로 검증되고 되돌릴 수 있어야 한다.

1. 공통 계약과 관측 기준을 준비한다.
2. 신규 구조를 기존 흐름 옆에 추가한다.
3. 제한된 대상부터 라우팅한다.
4. 결과와 상태를 비교한다.
5. 적용 대상을 넓힌다.
6. 기존 구조를 제거하고 운영 문서를 갱신한다.

### ct-calltree test

전환 전후에 같은 입력이 같은 결과를 만드는지 고정한다.

### ct-spring

확정된 단계만 반영한다. 병행 운영 기간에는 두 구조가 같은 상태를 공유하는지 확인한다.

## 다음 단계로 넘길 것

- 현재와 목표 호출 흐름
- 구성요소의 이동 관계
- 단계별 적용 범위와 성공 기준
- 병행 운영과 롤백 조건
- 기존 구조 제거 조건

## 이 Playbook을 벗어나는 경우

- 바뀌는 대상이 외부 공급자면 [06](./06-integrate-external.md)에서 계약부터 설계한다.
- 전환 범위를 아직 못 정했으면 [07](./07-improve-module.md)에서 우선순위를 먼저 정한다.
- 단계별 회귀 검증이 커지면 [08](./08-verify-before-release.md)을 함께 사용한다.

## 실행

호출 표기는 [Codex](../Platforms/Codex/workflows.md), [Claude Code](../Platforms/ClaudeCode/workflows.md), [Grok Build](../Platforms/GrokBuild/workflows.md), [Pi](../Platforms/Pi/workflows.md) 문서에서 확인한다.
