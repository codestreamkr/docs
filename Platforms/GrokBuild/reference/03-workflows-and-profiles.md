# 03. Workflow와 Agent Profile

반복 절차를 저장하고 완료 조건이 있는 작업을 이어 가는 방법을 설명해요.  
기준은 2026-10-16 공식 문서예요.

## Workflow 만들기

같은 절차를 반복할 때는 CLI 채팅창에서 Workflow 생성을 요청하세요.

```text
/create-workflow 현재 브랜치의 결함을 조사하고 각 결함을 재현하는 검토 절차를 만들어줘.
```

분담 범위와 검증 방법을 확인한 뒤 저장하세요.  
프로젝트 파일은 `.grok/workflows/*.rhai`, 개인 파일은 `~/.grok/workflows/*.rhai`에 저장해요.

## Workflow 실행

저장한 이름으로 실행하고 대시보드에서 결과를 확인하세요.

```text
/workflow <이름>
/workflows
```

| 필요한 작업 | CLI 채팅창 명령 |
| --- | --- |
| 일시 중지 | `/workflow pause <표시 이름>` |
| 다시 실행 | `/workflow resume <표시 이름>` |
| 중지 | `/workflow stop <표시 이름>` |

자식 호출 상한과 추론 수준은 실행할 때 지정할 수 있어요.  
옵션은 [공식 변경사항](https://x.ai/changelog/build)과 현재 도움말을 확인하세요.

## Goal

여러 차례 작업을 이어 가려면 목표와 검증 가능한 완료 조건을 적으세요.

```text
/goal 인증 모듈의 실패한 테스트를 수정하고 전체 인증 테스트가 통과할 때까지 진행해줘. 공개 API는 유지해줘.
```

CLI 채팅창에서 상태와 사용량을 확인하세요.

```text
/goal status
```

`/goal pause`, `/goal resume`, `/goal clear`로 관리해요.  
정해진 계획을 한 번 구현할 때는 [작업 흐름](../workflows.md)으로 충분해요.

## Agent Profile

Agent Profile은 세션 역할과 도구 구성을 고정해요.  
프로젝트 정의는 `.grok/agents/`, 개인 정의는 `~/.grok/agents/`에 둬요.

`profile-name`을 정의한 Profile 이름으로 바꿔 터미널에서 실행하세요.

```bash
GROK_AGENT="profile-name" grok
```

공통 작업 기준은 Profile 대신 `AGENTS.md`에 적으세요.  
환경 변수의 지원 범위는 [설정 참조](https://docs.x.ai/build/settings/reference)를 확인하세요.

## 공식 문서

- [Workflow와 Goal](https://docs.x.ai/build/modes-and-commands)
- [Agent 정의](https://docs.x.ai/build/features/subagents)
- [설정](https://docs.x.ai/build/settings)
- [자동화 실행](https://docs.x.ai/build/cli/headless-scripting)
