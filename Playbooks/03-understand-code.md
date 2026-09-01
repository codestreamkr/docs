# 낯선 코드 파악하기

변경하기 전에 실제 호출 흐름과 외부 경계를 확인하고, 필요하면 현재 동작을 테스트로 고정한다.

## 흐름

```text
ct-calltree analyze   진입점부터의 호출과 데이터 흐름
      ↓
ct-calltree test      호출 흐름을 근거로 한 테스트와 검증 결과   ← 현재 동작을 고정할 때
```

## 단계별로 확정할 것

### ct-calltree analyze

먼저 분석 단위를 정한다. 실제 업무가 시작되는 지점으로 잡는다.

- Controller API
- Service 공개 메서드
- 배치 Job 또는 Step
- 메시지 Consumer, 이벤트 Handler

대형 파일은 메서드나 API 경로로 범위를 좁힌다.

결과에서 확인할 항목:

- 분기와 검증이 일어나는 위치
- 상태를 변경하는 지점
- 데이터 접근과 트랜잭션 경계
- 외부 API와 메시지 발행

getter, 로깅과 단순 DTO 필드 설정은 흐름에서 제외한다.

### ct-calltree test

행동과 결과가 있는 노드만 테스트 대상으로 삼는다.

- 조건에 따라 결과가 달라진다
- 입력을 검증하거나 예외를 발생시킨다
- 데이터를 계산하거나 변환한다
- 상태를 변경한다
- 외부 시스템과 상호작용한다

단순 위임은 상위 테스트에서 이미 검증되는지 확인한다. 분석 문서만으로 테스트를 만들지 않고 현재 시그니처, 실제 분기와 기존 테스트 스타일을 대조한다.

## 다음 단계로 넘길 것

- 진입점과 분석 범위
- 업무 분기와 외부 경계
- 테스트로 고정한 현재 동작
- 분석하지 못한 구간

## 이 Playbook을 벗어나는 경우

- 파악한 구조를 바꿀 계획이면 [05](./05-transition-structure.md)로 이어간다.
- 파악 목적이 조회 성능이면 [04](./04-tune-sql.md)를 사용한다.
- 빌드와 실행 방법 자체를 모르면 [09](./09-prepare-runtime.md)를 먼저 진행한다.

## 실행

호출 표기는 [Codex](../Platforms/Codex/workflows.md), [Claude Code](../Platforms/ClaudeCode/workflows.md), [Grok Build](../Platforms/GrokBuild/workflows.md), [Pi](../Platforms/Pi/workflows.md) 문서에서 확인한다.
