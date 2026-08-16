# 외부 서비스를 연동한다

공급자 계약과 내부 영향을 먼저 분리하고, 적용 단계가 확정된 뒤 구현한다.

## 흐름

```text
ct-external-architect   현재·목표 구조, 인터페이스와 데이터 매핑, 오류 처리, 이관 순서
      ↓
ct-plan impl            확정된 설계의 단계별 구현 계획
      ↓
ct-spring               첫 단계 구현
      ↓
ct-qa-lucin             병행 운영, 중복 요청과 공급자 지연 검증
```

## 단계별로 확정할 것

### ct-external-architect

공급자 API의 현재 계약은 추정하지 않고 공식 자료에서 확인한다.

- 인증 방식과 자격 증명 관리
- 요청·응답 필드와 내부 모델의 매핑
- 상태 전이와 소유권(어느 쪽이 정본인지)
- 실패, 타임아웃, 재시도와 멱등성 기준
- 웹훅과 비동기 통지 처리
- 이관 순서와 병행 운영 조건

### ct-plan impl

- 단계별 적용 범위와 각 단계의 완료 조건
- 유지할 내부 계약
- 되돌릴 수 있는 지점

### ct-spring

한 번에 전부 바꾸지 않고 확정된 첫 단계만 구현한다.

### ct-qa-lucin

- 중복 요청과 재시도에서 결과가 하나로 유지되는지
- 공급자 지연과 타임아웃에서의 동작
- 병행 운영 중 두 경로의 결과 비교
- 실패 후 운영 재처리 경로

## 다음 단계로 넘길 것

- 확정된 계약과 데이터 매핑
- 단계별 적용 순서와 롤백 조건
- 검증한 실패 시나리오와 미검증 범위
- 공급자 측 미확인 사항

## 이 Playbook을 벗어나는 경우

- 외부 공급자는 그대로이고 내부 구조만 바꾸면 [05](./05-transition-structure.md)를 사용한다.
- 연동 대상이 아직 정해지지 않았으면 [01](./01-define-scope.md)에서 범위부터 정한다.

## 실행

호출 표기는 [Codex](../Platforms/Codex/workflows.md), [Claude Code](../Platforms/ClaudeCode/workflows.md), [Grok Build](../Platforms/GrokBuild/workflows.md), [Pi](../Platforms/Pi/workflows.md) 문서에서 확인한다.
