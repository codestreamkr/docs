# Codex 실전 작업 흐름

세션, Worktree와 코드 검토 기능을 필요한 Skill에 연결해요.  
공통 작업 절차는 [Playbook](../../Playbooks/README.md), 명령 요약은 [명령 확인](./commands.md)을 봐요.

- 터미널 명령: CLI 기준
- 입력창 요청: CLI·앱·IDE 확장에서 필요한 기능이 제공될 때 사용
- 앱 화면 절차: 각 절에서 별도 표시
- 예제의 브랜치·파일·심볼은 실제 프로젝트 대상으로 바꿔요.

## 중단한 작업 이어가기

이전 대화의 결정과 남은 작업을 이어갈 때 사용해요.  
프로젝트 터미널에서 세션을 선택해요.

```bash
codex resume
```

최근 세션을 바로 열려면 `codex resume --last`를 사용해요.  
재개한 입력창에서 현재 코드와 이전 대화의 차이를 먼저 확인해요.

```text
이전 작업의 완료·미완료 항목을 정리하고 현재 git 상태와 대조해줘.
다른 변경과 충돌하지 않는지 확인한 뒤 남은 구현과 관련 테스트를 진행해줘.
```

- 확인할 결과: 현재 작업 루트, 변경 파일, 남은 구현과 테스트 결과
- 새 세션으로 넘길 때: 목표, 확정된 계획 경로, 변경 범위, 실행한 테스트와 남은 검증을 전달해요.
- 이전 테스트 결과는 현재 코드에서도 유효한지 확인해요.

### 같은 대화에서 다른 접근 시도

```bash
codex fork
```

- 기존 대화에서 분기할 세션을 선택해요.
- `fork`는 대화 이력을 나누는 기능이에요. 파일 격리가 필요하면 Worktree도 사용해요.
- 같은 디렉터리에서 두 세션이 동시에 같은 파일을 수정하지 않도록 해요.

```text
기존 대화의 요구사항은 유지하고, 캐시를 추가하지 않는 대안을 비교해줘.
코드는 수정하지 말고 변경 범위와 검증 방법을 알려줘.
```

## 별도 작업 공간에서 구현하기

현재 작업 디렉터리를 유지하면서 다른 변경을 구현할 때 사용해요.  
Git 저장소에서 CLI로 새 Worktree 세션을 시작해요.

```bash
git status --short
codex --worktree
```

입력창에서 구현 전 작업 위치와 기준을 확인해요.

```text
현재 Worktree 경로, HEAD와 브랜치, 미커밋 변경을 먼저 확인해줘.
.docs/order-cancel-plan.md가 이 작업 공간에 있는지 확인하고,
그 계획의 중복 취소 방지 범위만 구현한 뒤 관련 테스트를 실행해줘.
```

- 계획 파일이 아직 커밋되지 않았다면 새 공간에도 있는지 확인하고 전달해요.
- 의존성, 환경변수와 무시된 파일은 새 공간에서 별도 준비가 필요할 수 있어요.
- 앱에서는 새 대화에서 **Worktree**와 기준 브랜치를 선택해요. 작업 환경 준비는 [Local environments](https://learn.chatgpt.com/docs/environments/local-environment)를 봐요.

### 변경 비교·통합·정리

1. Worktree에서 diff와 테스트 결과를 확인해요.
2. detached HEAD라면 변경을 보존할 브랜치를 만들어요. 앱에서는 **Create branch here**를 사용해요.
3. 필요한 변경을 커밋하고, 프로젝트의 PR·병합 절차로 대상 브랜치에 통합해요.
4. 앱의 작업을 로컬로 옮겨 계속하려면 **Handoff**를 사용해요. 이동 후 작업 경로와 변경 상태를 확인해요.
5. 변경이 보존·통합됐고 남은 미커밋 파일이 없는지 확인한 뒤 Worktree를 정리해요.

CLI에서 현재 Worktree에 브랜치를 만드는 예제예요.  
브랜치 이름은 아직 사용하지 않는 이름으로 정해요.

```bash
git switch -c codex/order-cancel
git diff
git status --short
```

CLI의 Worktree 확인·제거는 해당 세션을 종료한 뒤 다른 작업 디렉터리에서 수행해요.  
아래 제거 명령은 보존·통합 확인이 끝난 Worktree만 대상으로 해요.

```bash
git worktree list
git worktree remove /path/to/completed-worktree
```

- 같은 브랜치를 두 Worktree에서 동시에 체크아웃할 수 없어요.
- Handoff는 작업 위치를 옮기는 절차예요. 대상 브랜치로의 병합 여부는 별도로 확인해요.

## 구현한 변경 검토하기

커밋 전 미커밋 변경이나 기준 브랜치 대비 변경에서 문제를 찾을 때 사용해요.

1. 입력창의 `/diff`로 요청 밖 변경과 누락된 파일을 확인해요.
2. `/review`로 검토하거나, 터미널에서 검토 대상을 하나 선택해 실행해요.

```bash
# 미커밋 변경 검토
codex review --uncommitted

# 기준 브랜치 대비 검토: main을 실제 기준 브랜치로 변경
codex review --base main
```

3. 지적 사항의 근거를 확인하고 수정·재검증을 요청해요.

```text
검토에서 지적한 중복 취소와 트랜잭션 문제를 현재 코드에서 확인해줘.
재현되는 문제를 수정하고 관련 회귀 테스트를 실행해줘.
변경 파일, 실행 결과와 해결하지 못한 항목을 알려줘.
```

- 확인할 결과: 지적 사항별 수정 여부, 변경 diff, 테스트 결과와 미검증 범위
- 검토 응답만으로 수정이나 테스트까지 완료된 것으로 보지 않아요.
- Spring 구현 관례까지 지정하려면 `$ct-code-spring`을 함께 호출해요.

## 큰 코드베이스 병렬 조사하기

서로 독립된 모듈을 조사하고 한 결과로 취합할 때 사용해요.  
Subagent를 사용할 수 있는 입력창에서 분담 범위와 결과 형식을 지정해요.

```text
주문 취소 흐름을 Subagent로 병렬 조사해줘.
한 에이전트는 주문 상태 전이, 다른 에이전트는 결제 취소 연동을 읽기 전용으로 분석해줘.
각자 진입점, 관련 파일·심볼, 실패 조건과 기존 테스트를 보고해줘.
모든 결과를 받은 뒤 호출 순서와 확인되지 않은 부분을 하나로 정리해줘.
```

- 확인할 결과: 모듈별 근거와 전체 호출 흐름, 상충하는 설명과 미확인 사항
- 메인 세션에서 결과를 대조하고 다음 구현 범위를 확정해요.
- 구현을 나눌 때는 파일 담당 범위를 지정해요. Subagent를 별도 파일 작업 공간으로 가정하지 않아요.
- 활동 확인과 설정은 [Subagent 안내](./extensions.md)를 봐요.

## Skill 결과 연결하기

앞 단계의 결과를 다음 Skill 입력에서 구체적으로 지정해요.

```text
$ct-plan-work 주문 취소의 중복 요청 방지 계획을 .docs/order-cancel-plan.md에 작성해줘
```

계획의 범위와 완료 조건을 확정한 뒤 구현 요청으로 이어가요.

```text
$ct-code-spring .docs/order-cancel-plan.md의 확정된 범위를 구현해줘.
기존 API 계약을 유지하고 관련 테스트를 실행해줘.
```

diff·코드 검토 후 필요한 기능 검증을 요청해요.

```text
$ct-qa-flow 주문 취소 변경의 정상·중복·외부 실패 흐름을 검증해줘.
계획의 완료 조건별 결과와 실행하지 못한 검증을 알려줘.
```

다음 요청에는 확정된 범위, 유지할 계약, 근거 파일과 남은 검증을 전달해요.

## 연결된 도구로 런타임 확인하기

IntelliJ IDEA의 JavaScript Debug 세션에서 실제 실행 상태를 확인할 때 사용해요.

1. [확장 기능](./extensions.md)에서 MCP 연결·인증·노출 도구를 확인해요.
2. [IntelliJ 런타임 디버깅](../../IntelliJ/intellij_01_runtime_debug_guide.md)에 따라 디버그 세션을 준비해요.
3. 입력창에서 사용할 도구, 대상 세션과 확인할 값을 지정해요.

```text
IntelliJ MCP의 실행 중인 JavaScript Debug 세션에서 주문 취소 버튼의 호출 흐름을 확인해줘.
중단된 위치와 요청 파라미터를 근거로 수정한 분기가 실행되는지 알려줘.
확인할 수 없는 값은 추측하지 말고 미확인으로 표시해줘.
```

- 확인할 결과: 실행 세션, 소스 위치, 관찰한 값과 검증 조건의 충족 여부
- 세션·소스 매핑의 기준은 IntelliJ IDEA이고 Codex는 MCP 클라이언트로 연결해요.

## 문제 유형별 흐름

| 필요한 결과 | Playbook |
| --- | --- |
| 만들 것의 범위와 완료 조건을 정해요 | [01 무엇을 만들지 정하기](../../Playbooks/01-define-scope.md) |
| 확정된 계획을 코드로 반영하고 검증해요 | [02 기능 구현하고 검증하기](../../Playbooks/02-implement-and-verify.md) |
| 기존 코드의 실제 동작을 파악해요 | [03 낯선 코드 파악하기](../../Playbooks/03-understand-code.md) |
| 느린 조회의 원인을 찾고 개선해요 | [04 느린 SQL 개선하기](../../Playbooks/04-tune-sql.md) |
| 기존 구조를 유지하면서 새 구조로 옮겨요 | [05 구조 전환하기](../../Playbooks/05-transition-structure.md) |
| 외부 서비스를 붙이거나 공급자를 바꿔요 | [06 외부 서비스 연동하기](../../Playbooks/06-integrate-external.md) |
| 무엇부터 손볼지 정하고 순서대로 반영해요 | [07 개선 과제 정리해 반영하기](../../Playbooks/07-improve-module.md) |
| 배포 전에 위험한 흐름을 검증해요 | [08 오픈 전 품질 검증하기](../../Playbooks/08-verify-before-release.md) |
| 빌드와 실행 절차를 재현 가능하게 만들어요 | [09 실행 환경 준비하기](../../Playbooks/09-prepare-runtime.md) |
| 흩어진 지식을 위키로 정리해요 | [10 지식 위키로 남기기](../../Playbooks/10-operate-wiki.md) |

## 반복 실행으로 옮기기

입력과 기대 결과가 정해진 작업은 [자동화](./automation.md)의 `codex exec` 예제로 옮겨요.

## 공식 문서

- [세션과 검토 명령](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
- [앱의 Worktree와 Handoff](https://learn.chatgpt.com/docs/environments/git-worktrees)
- [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
