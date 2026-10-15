# 03. 아티팩트 기반 작업과 피드백

Antigravity는 계획, 작업 설명, walkthrough, 시각 결과 같은 아티팩트를 만들고 검토할 수 있어요.  
이 문서는 2026-10-01에 설치된 Antigravity CLI `1.2.9`과 공식 Artifacts·Review Changes 문서를 기준으로 해요.

## 1. 아티팩트를 사용할 때

대화에서 확정한 계획이나 검토 결과를 별도 산출물로 남겨야 할 때 아티팩트를 사용해요.  
계획 파일을 저장할 위치를 요청에 명시해요.  
다음 구현·검증 요청에는 그 파일 경로와 확인할 요구사항을 전달해요.

```text
docs/order-cancel-plan.md에 주문 취소 구현 계획을 작성해줘.
완료 조건과 검증 방법을 포함해줘.
```

## 2. 검토와 피드백

CLI 채팅창에서 아티팩트 검토 패널을 여세요.

```text
/artifact
```

산출물에서 보완할 항목과 대상 파일을 지정하세요.

```text
docs/order-cancel-plan.md의 완료 조건에 중복 취소 요청 검증을 추가해줘.
각 조건에 테스트 방법을 적어줘.
```

수정한 산출물이 요청한 조건을 포함하는지 확인하세요.  
구현과 변경 검토는 [Antigravity 작업 흐름](../workflows.md)을 따르세요.

## 공식 문서

- [Antigravity Artifacts](https://antigravity.google/docs/artifacts/)
- [Antigravity Reviewing Artifacts](https://antigravity.google/docs/cli/artifacts/)
- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
