# Grok Build 작업 흐름

프로젝트 확인부터 구현과 검증까지 같은 세션에서 이어 가요.  
문제 유형별 판단 기준은 [Playbook](../../Playbooks/README.md)을 확인하세요.

## 1. 계획과 구현

CLI 채팅창에서 CodeStream Skill로 변경 범위와 완료 조건을 정하세요.

```text
/ct-plan 주문 취소의 중복 요청 방지 기능을 계획해줘.
```

계획에서 변경 범위와 테스트 방법을 확인하세요.

확정된 계획을 구현하고 검증하세요.

```text
/ct-apply 확정된 주문 취소 계획의 남은 작업을 구현하고 관련 테스트를 실행해줘.
```

제품의 `/plan`을 사용하면 계획 승인 직후 구현을 시작해요.  
이 경우 `/ct-apply`로 같은 구현을 다시 요청하지 마세요.

## 2. 변경 확인과 검토

구현 결과에서 결함과 테스트 누락을 확인하세요.

```text
현재 변경에서 동작 문제, 빠진 테스트와 요청 밖 변경을 검토해줘.
파일은 수정하지 말고 근거 파일과 함께 알려줘.
```

발견한 문제를 수정한 뒤 관련 테스트를 다시 실행하세요.  
요구사항별 독립 검증은 [ct-verify](./skills.md#ct-verify)를 사용하세요.

## 3. 세션과 맥락 관리

대화가 길어지면 확정한 결정과 남은 작업을 보존하며 압축하세요.

```text
/compact 확정된 요구사항, 계획 파일 경로와 남은 검증을 남겨줘.
```

관련 없는 작업은 `/new`, 이전 작업은 `/resume`으로 여세요.  
분기와 원격 코드 복원은 [세션과 Subagent](./reference/02-sessions-and-subagents.md)를 확인하세요.

## 4. 병렬 조사

서로 독립된 조사는 Subagent에 나눠 요청하세요.

```text
Subagent 두 개로 주문 취소 API와 관련 테스트를 각각 조사해줘.
파일은 수정하지 말고 근거와 누락된 테스트를 취합해줘.
```

`/dashboard`에서 세션을 확인하고 `/tasks`에서 백그라운드 작업을 관리하세요.

## 5. worktree로 작업 분리

현재 작업과 분리해서 수정하려면 터미널에서 새 worktree 세션을 여세요.

```bash
grok --worktree
```

작업을 마치면 변경과 테스트 결과를 확인하고 원래 브랜치에 반영하도록 요청하세요.

```text
이 worktree의 변경과 테스트 결과를 검토해줘.
문제가 없으면 원래 브랜치에 반영해줘.
충돌이 생기면 원인과 해결할 파일을 알려줘.
```

기본 worktree는 현재 HEAD와 커밋하지 않은 변경을 포함해요.  
세션 종료 후에도 worktree는 남아요.  
터미널에서 목록을 확인하세요.

```bash
grok worktree list
```

## 6. 간단한 자동화

스크립트에서 한 번 실행하려면 터미널에서 요청을 전달하세요.

```bash
grok -p "현재 변경에서 재현 가능한 결함과 테스트 누락을 보고해줘. 파일은 수정하지 마."
```

실행 결과에서 완료한 작업과 미검증 항목을 확인하세요.  
CI에 연결할 때는 종료 상태와 프로젝트 테스트 결과를 함께 확인하세요.

## 반복 작업과 외부 연동

- [Goal과 Workflow](./reference/03-workflows-and-profiles.md): 완료 조건이 있는 장기 작업과 반복 절차를 실행해요.
- [백그라운드 작업](https://docs.x.ai/build/features/background-tasks): 반복 요청과 실행 중인 작업을 관리해요.
- [JSON 출력과 ACP](https://docs.x.ai/build/cli/headless-scripting): 스크립트 결과를 처리하거나 IDE와 연결해요.

## 공식 문서

- [계획 검토와 승인](https://docs.x.ai/build/features/plan-mode)
- [세션 관리](https://docs.x.ai/build/features/sessions)
- [Subagent](https://docs.x.ai/build/features/subagents)
- [Worktree](https://docs.x.ai/build/features/worktrees)
- [자동화 실행](https://docs.x.ai/build/cli/headless-scripting)
