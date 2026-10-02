# Antigravity 작업 흐름

열린 Antigravity CLI 세션에서 앞 단계 결과를 다음 요청에 연결해요.  
문제 유형별 단계와 판단 기준은 [Playbook](../../Playbooks/README.md)에서 관리해요.

## 호출과 연결

Skill 이름과 필요한 대상을 한 요청에 적고, 이전 단계의 결과 파일이 있으면 경로를 함께 알려줘요.

```text
/ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
        ↓
/ct-apply 확정된 계획의 남은 작업을 구현·검증하고 완료 상태를 기록해줘
        ↓
/ct-verify 주문 취소의 정상·중복·외부 실패 흐름이 계획의 요구사항을 충족하는지 검증해줘
```

대화만으로 대상이 분명하면 같은 세션에서 다음 요청을 이어가요.  
결과가 파일로 남았거나 세션을 바꿨다면 파일 경로와 확인할 요구사항을 다시 적어요.

## 변경 확인과 검토

코드나 문서를 바꾸는 작업은 에이전트에 자연어로 요청하고, 변경 결과는 `/diff`에서 확인해요.  
필요하면 검토 패널에서 피드백을 남긴 뒤 같은 세션에서 수정을 요청해요.

```text
현재 변경을 /diff에서 검토할 수 있게 정리하고, 실패한 테스트 원인을 설명해줘.
```

Git 상태와 커밋 이력은 터미널에서 `git status`, `git diff`, `git log`로 직접 확인해요.  
에이전트에는 Git 명령 자체보다 검토·수정·검증할 대상과 의도를 요청해요.

## 세션과 맥락 관리

- 같은 작업은 같은 세션에서 이어가요.
- 이전 대화를 열 때는 입력창의 `/resume` 또는 터미널의 `agy -c`를 사용해요.
- 특정 대화로 돌아가야 하면 `agy --conversation <conversation-id>`로 세션을 열어요.
- 무관한 새 작업은 입력창의 `/clear` 또는 `/new`로 시작해요.
- 긴 요청의 맥락 사용량은 `/context`에서 확인해요.

## Antigravity 고유 작업

| 작업 | 입력창에서 하는 일 | 사용 시점 |
| --- | --- | --- |
| 복잡한 계획 | `/plan` | 설계와 구현 순서를 먼저 검토할 때 |
| 심층 검토 | `/boost <작업>` | 여러 관점의 분석이 필요할 때 |
| 장기 협업 | `/teamwork-preview <작업>` | 독립적인 조사·구현을 나눌 때 |
| 서브에이전트 확인 | `/agents` | 실행 중인 서브에이전트와 대기 작업을 볼 때 |
| 아티팩트 검토 | `/artifact` | 계획·walkthrough·시각 결과를 검토할 때 |

요금제나 현재 버전에서 명령이 보이지 않으면 `/help`의 목록을 따라요.

## 함께 사용하는 문서

| 필요한 것 | 문서 |
| --- | --- |
| Skill별 입력·결과·호출 형식 | [Skill 안내](./skills.md) |
| 현재 입력창 명령과 CLI 옵션 | [명령 확인](./commands.md) |
| 확장 수단의 책임과 위치 | [확장 기능](./extensions.md) |
| 공통 작업 흐름과 전환 기준 | [Playbook](../../Playbooks/README.md) |

## 확인 기준

- 각 단계의 입력과 결과가 다음 요청에서 식별돼요.
- 변경은 `/diff` 또는 터미널 Git 명령으로 확인해요.
- 새 세션으로 넘길 때 필요한 파일 경로와 요구사항을 다시 적어요.

## 공식 문서

- [Antigravity Projects](https://antigravity.google/docs/projects/)
- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
- [Antigravity Reviewing Artifacts](https://antigravity.google/docs/cli/artifacts/)
