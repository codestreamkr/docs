# Antigravity 작업 흐름

계획을 확인한 뒤 구현과 검증을 이어가요.  
작업 유형별 판단 기준은 [Playbook](../../Playbooks/README.md)을 확인하세요.

## 1. 계획 세우기

대상과 원하는 결과를 함께 요청하세요.

```text
/ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

내장 `/plan`은 세션의 계획 모드예요.  
`/ct-plan`은 CodeStream Skill의 절차와 결과 형식을 적용해요.

## 2. 구현과 검증

계획을 확정한 뒤 남은 작업을 요청하세요.

```text
/ct-apply 확정된 주문 취소 계획의 남은 작업을 구현하고 테스트해줘
```

세션을 바꿨다면 계획 파일 경로와 완료 조건을 다시 전달하세요.

## 3. 변경 확인과 검토

변경 파일을 확인하세요.

```text
/diff
```

누락이나 오류를 발견하면 수정과 재검증을 요청하세요.

```text
검토에서 확인한 null 처리 누락을 수정하고 관련 테스트를 실행해줘.
```

독립 검증이 필요하면 [사용자 Skill](./skills.md#ct-verify)의 예제를 사용하세요.  
계획과 시각 결과는 [아티팩트 작업 흐름](./reference/03-artifacts-workflow.md)에서 확인해요.

## 세션과 맥락 관리

같은 작업은 같은 세션에서 이어가세요.  
재개와 새 대화 명령은 [명령 확인](./commands.md#명령-찾기)을 확인하세요.

### 후속 메시지 전달

`/config`의 `Queued Messages`에서 전달 시점을 선택해요.

| 값 | 사용 시점 |
| --- | --- |
| `Queue` | 현재 작업이 끝난 뒤 다음 요청을 전달할 때 |
| `Send Immediately` | 진행 중인 작업의 범위를 바로 수정할 때 |

## 병렬 작업

독립적인 조사 범위를 나눠 요청하세요.

```text
주문 API와 결제 API의 중복 요청 처리를 각각 서브에이전트로 조사해줘.
각 결과에 근거 파일과 미확인 항목을 포함해줘.
파일은 수정하지 마.
```

`/agents`로 서브에이전트를 확인하세요.  
백그라운드 명령의 로그 확인과 중지는 `/tasks`에서 진행해요.

## 원격 세션 연결

진행 중인 CLI 작업을 다른 기기에서 이어가요.

```text
/remote-control
```

출력된 URL을 같은 Google 계정으로 열어요.  
연결을 끝내려면 `/remote-control off`를 입력하세요.  
로컬 CLI를 종료하면 이 연결도 끝나요.

백그라운드 서비스 등록은 [Remote Control](https://www.antigravity.google/docs/remote-control/)을 확인하세요.

## 추가 작업 방식

- [Boost](https://antigravity.google/docs/boost/): 여러 에이전트로 심층 분석해요.
- [Teamwork](https://antigravity.google/docs/teamwork/): 장기 작업을 협업 에이전트 팀에 나눠요.
- [변경 검토](https://antigravity.google/docs/cli/artifacts/): 파일·턴·커밋별 차이를 탐색해요.

## 공식 문서

- [프로젝트와 대화](https://antigravity.google/docs/projects/)
- [CLI 명령](https://antigravity.google/docs/cli/reference)
- [서브에이전트](https://antigravity.google/docs/subagents/)
- [Remote Control](https://www.antigravity.google/docs/remote-control/)
