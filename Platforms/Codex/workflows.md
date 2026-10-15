# Codex 작업 흐름

프로젝트를 파악한 뒤 계획, 구현, 검토 순서로 진행해요.  
단계별 완료 조건은 [Playbook](../../Playbooks/README.md)을 확인하세요.

## 프로젝트 파악하기

Codex 채팅창에서 수정할 기능의 위치와 테스트 방법을 먼저 물어보세요.

```text
주문 취소의 진입점, 상태 변경, 결제 취소 호출을 찾아줘.
관련 파일과 테스트 명령을 알려줘. 파일은 수정하지 마.
```

응답의 파일 경로를 확인한 뒤 변경 범위를 정하세요.

## 계획하고 구현하기

계획을 파일로 남기고, 같은 파일을 다음 요청에 전달하세요.

```text
$ct-plan 주문 취소의 중복 요청 방지 계획을 .docs/order-cancel-plan.md에 작성해줘
```

계획의 완료 조건을 확인한 뒤 구현을 요청하세요.

```text
$ct-apply .docs/order-cancel-plan.md의 남은 작업을 구현하고 관련 테스트를 실행해줘
```

구현이 끝나면 계획의 완료 조건으로 검증하세요.

```text
$ct-verify 주문 취소 변경의 정상·중복·외부 실패 흐름이 계획의 완료 조건을 충족하는지 검증해줘
```

다른 작업의 호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## 변경 확인과 검토

구현 결과를 확인하려면 Codex 채팅창에서 `/diff`를 실행하세요.

```text
/diff
```

요청한 파일만 바뀌었는지 확인한 뒤 `/review`로 검토 대상을 선택하세요.

```text
/review
```

문제가 나오면 수정과 테스트를 함께 요청하세요.

```text
검토에서 지적한 중복 취소 문제를 확인해줘.
재현되는 문제를 수정하고 관련 테스트를 실행해줘.
변경 파일, 테스트 결과, 해결하지 못한 항목을 알려줘.
```

테스트 결과와 남은 문제를 확인한 뒤 커밋하세요.

## 세션과 맥락 관리

작업을 중단했다면 Codex 채팅창에서 이전 대화를 여세요.

```text
/resume
```

이전 결과와 현재 파일을 대조한 뒤 남은 작업을 요청하세요.

```text
이전 작업의 완료·미완료 항목을 현재 Git 상태와 대조해줘.
다른 변경과 충돌하지 않으면 남은 구현과 관련 테스트를 진행해줘.
```

대화가 길어졌다면 `/compact`로 줄이세요.  
별개 작업은 `/new`로 시작하세요.

## 별도 작업 공간에서 구현하기

현재 파일과 분리해서 작업하려면 터미널에서 Worktree 세션을 시작하세요.

```bash
codex --worktree
```

새 채팅창에서 작업 범위와 테스트를 지정하세요.

```text
현재 Worktree 경로와 브랜치를 확인해줘.
주문 취소의 중복 요청 방지만 구현하고 관련 테스트를 실행해줘.
```

구현이 끝나면 기준 브랜치와 변경 내용을 비교하세요.

```text
현재 Worktree의 변경을 main과 비교해줘.
변경 파일, 테스트 결과, 충돌 가능성을 알려줘.
아직 커밋하거나 통합하지 마.
```

`main`을 실제 기준 브랜치로 바꾸세요.  
검토를 마치면 커밋과 통합을 요청하세요.

```text
검토한 변경 파일을 커밋하고 main에 통합해줘.
충돌이 생기면 중단하고 충돌 파일을 알려줘.
통합 후 관련 테스트를 실행해줘.
```

충돌 해결은 [Git Worktree 가이드](../../Git/git_01_worktree_guide.md)를 확인하세요.

## 큰 코드베이스 병렬 조사하기

독립된 모듈을 함께 조사할 때 Subagent를 요청하세요.

```text
주문 취소 흐름을 Subagent로 병렬 조사해줘.
한 에이전트는 주문 상태 변경을, 다른 에이전트는 결제 취소 연동을 분석해줘.
파일은 수정하지 말고 관련 파일, 실패 조건, 기존 테스트를 정리해줘.
모든 결과를 받은 뒤 호출 순서를 하나로 정리해줘.
```

CLI 채팅창의 `/agent`로 Subagent 상태를 확인하세요.  
통합된 결과를 확인한 뒤 구현 범위를 정하세요.

## 다른 환경의 작업

- [GitLab 리뷰](https://learn.chatgpt.com/docs/third-party/gitlab): Merge Request의 변경을 검토해요.
- [앱 화면 전달](https://learn.chatgpt.com/docs/appshots): 현재 앱 화면을 요청에 전달해요.
- [대화 공유](https://learn.chatgpt.com/docs/use-chatgpt#share-a-read-only-snapshot-of-a-codex-thread): 대화의 읽기 전용 스냅샷을 공유해요.
- [모바일 작업](https://learn.chatgpt.com/docs/environments/git-worktrees): 연결한 컴퓨터의 Worktree 작업을 이어가요.

## 공식 문서

- [Codex 채팅창 명령](https://learn.chatgpt.com/docs/developer-commands?surface=cli): 검토와 세션 관리 명령을 확인해요.
- [Worktree와 Handoff](https://learn.chatgpt.com/docs/environments/git-worktrees): 작업 공간의 생성과 통합 방법을 확인해요.
- [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents): 병렬 조사와 역할 설정을 확인해요.
