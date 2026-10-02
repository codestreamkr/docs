# 03. 아티팩트 기반 작업과 피드백

Antigravity는 계획, 작업 설명, walkthrough, 시각 결과 같은 아티팩트를 만들고 검토할 수 있어요.  
이 문서는 2026-10-01에 설치된 Antigravity CLI `1.2.9`과 공식 Artifacts·Review Changes 문서를 기준으로 해요.

## 1. 아티팩트를 사용할 때

대화에서 확정한 계획이나 검토 결과를 별도 산출물로 남겨야 할 때 아티팩트를 사용해요.  
계획 파일을 저장해야 한다면 `ct-plan` 요청에 저장 위치를 명시해요.  
다음 구현·검증 요청에는 그 파일 경로와 확인할 요구사항을 전달해요.

```text
/ct-plan docs/order-cancel-plan.md에 주문 취소 구현 계획을 작성해줘
```

## 2. 검토와 피드백

열린 CLI 입력창에서 `/artifact`로 아티팩트 검토 패널을 열고, `/diff`로 변경·턴·커밋을 검토해요.  
검토 후에는 수정할 대상과 요구사항을 자연어로 다시 요청해요.

```text
/diff
```

```text
검토에서 확인한 null 처리 누락을 수정하고 관련 테스트를 실행해줘.
```

## 3. 작업 흐름에 연결하기

1. `/plan` 또는 `ct-plan`으로 계획을 만들어요.
2. 계획의 완료 조건을 확인해요.
3. `ct-apply`로 구현과 검증을 요청해요.
4. `/diff`와 `ct-verify`로 변경과 요구사항을 검토해요.
5. 최종 결과와 남은 항목을 파일 또는 대화에서 확인해요.

공통 단계와 전환 기준은 [Antigravity 작업 흐름](../workflows.md)과 [Playbook](../../../Playbooks/README.md)을 봐요.

## 4. 확인 기준

- 계획의 정본 위치와 구현 대상이 다음 단계에 전달돼요.
- `/artifact` 또는 `/diff`에서 검토할 결과를 확인해요.
- 수정 요청에는 검토에서 확인한 문제와 기대 결과를 함께 적어요.

## 공식 문서

- [Antigravity Artifacts](https://antigravity.google/docs/artifacts/)
- [Antigravity Reviewing Artifacts](https://antigravity.google/docs/cli/artifacts/)
- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
