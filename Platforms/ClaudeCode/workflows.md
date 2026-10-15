# Claude Code 작업 흐름

계획을 확정한 뒤 구현하고, 마지막에 독립 검증해요.  
문제별 판단 기준은 [Playbook](../../Playbooks/README.md)을 확인해요.

## 1. 계획 작성

Claude Code 채팅창에서 대상과 완료 조건을 전달해요.

```text
/ct-plan 주문 취소의 중복 요청 방지 기능을 계획해줘.
기존 응답 형식을 유지하고 정상·중복·외부 실패 흐름의 검증 방법을 포함해줘.
```

결정할 사항을 확인하고 계획을 확정해요.

## 2. 구현과 검증

확정한 계획을 실행해요.

```text
/ct-apply 확정된 주문 취소 계획의 남은 작업을 구현해줘.
관련 테스트를 실행하고 완료 조건별 결과를 기록해줘.
```

계획 파일이 있으면 요청에 경로를 함께 적어요.

## 3. 변경 확인과 검토

채팅창에서 변경 내용을 확인해요.

```text
/diff
```

동작 문제와 누락된 테스트를 검토해요.

```text
현재 변경에서 동작 문제와 누락된 테스트를 검토해줘.
문제가 있으면 근거 파일과 수정 방향을 알려줘.
```

문제를 수정한 뒤 요구사항 충족 여부를 독립적으로 확인해요.

```text
/ct-verify 주문 취소 기능이 확정된 계획의 요구사항을 충족하는지 검증해줘.
```

미검증 항목과 실패 원인이 남았는지 확인해요.

## 별도 작업 공간에서 작업

같은 저장소에서 작업이 겹치면 터미널에서 별도 worktree를 열어요.

```bash
claude --worktree order-cancel
```

작업 후 채팅창에서 변경 비교와 통합을 요청해요.

```text
이 worktree의 변경을 원래 브랜치와 비교해줘.
테스트 통과 여부와 충돌을 확인한 뒤 원래 브랜치로 통합해줘.
```

## 세션과 맥락 관리

대화가 길어지면 `/compact`로 확정된 결과와 남은 작업을 남겨요.  
재개·분기·되돌리기 명령은 [명령 확인](./commands.md#채팅창에서-사용)을 확인해요.

새 세션에서는 계획과 결과 파일의 경로를 다시 전달해요.  
독립 조사와 반복 작업은 [확장 기능](./extensions.md)을 확인해요.

## 다른 환경에서 이어가기

- [UI 디자인](https://code.claude.com/docs/en/whats-new/2026-w34): `/design`으로 시안을 만들고 선택한 시안을 구현으로 연결해요.
- [Remote Control](https://code.claude.com/docs/en/remote-control): 휴대전화에서 컴퓨터의 세션을 이어가요.
- [Desktop](https://code.claude.com/docs/ko/desktop-quickstart): 데스크톱 앱에서 프로젝트 작업을 시작해요.

## 공식 문서

- [일반 작업 흐름](https://code.claude.com/docs/en/common-workflows)
- [체크포인트와 되돌리기](https://code.claude.com/docs/en/checkpointing)
