# Antigravity 가이드

프로젝트 루트에서 Antigravity CLI(`agy`) 세션을 열고, 입력창에서 자연어 요청과 사용자 Skill을 사용해요.  
문제 유형별 작업 흐름은 [Playbook](../../Playbooks/README.md)에서 관리해요.  
이 가이드는 Antigravity CLI의 준비, Skill, 세션 작업과 확장 기능을 다뤄요.

## 바로 시작

1. 프로젝트 루트의 터미널에서 `agy`를 실행해요.
2. 열린 입력창에 `/skills`를 입력해 현재 사용할 수 있는 Skill을 확인해요.
3. Skill 이름이나 자연어로 대상과 원하는 결과를 요청해요.
4. 변경이 생기면 `/diff`로 결과를 확인한 뒤 다음 요청을 이어가요.

```bash
agy
```

```text
/ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 현재 코드의 동작과 영향 범위 분석 | `ct-analyze` | `/ct-analyze` |
| 개발 문제 탐색과 작업 계획 | `ct-plan` | `/ct-plan` |
| 확정된 작업의 실행·검증과 완료 기록 | `ct-apply` | `/ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` | `/ct-verify` |
| Markdown 문서 생성과 형식 정리 | `ct-docs-md-format` | `/ct-docs-md-format` |
| Git 이력의 월별·주차별 업무 보고 | `ct-docs-weekly-report` | `/ct-docs-weekly-report` |
| 원격 Confluence API 작업 | `ct-wiki-api` | `/ct-wiki-api` |
| 저장소 안의 Markdown 위키 운영 | `ct-wiki-ops` | `/ct-wiki-ops` |

## Antigravity의 작업 방식

- `/plan`은 복잡한 작업의 다중 턴 계획 생성을 켜요.
- `/boost <작업>`은 여러 에이전트의 심층 추론을 요청해요.
- `/teamwork-preview <작업>`은 장기 작업의 협업 에이전트 팀을 시작해요.
- `/artifact`와 `/diff`는 계획·변경·검토 결과를 확인하는 패널을 열어요.

각 명령은 열린 Antigravity CLI 입력창에서 사용해요.  
현재 지원 여부와 사용 조건은 [명령 확인](./commands.md)에서 확인해요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, 인증, Skill 위치와 지침·권한·설정의 책임 | [환경 설정](./setup.md) |
| 8개 사용자 Skill의 입력과 결과 | [Skill 안내](./skills.md) |
| Skill 연결, 검토, 세션과 Antigravity 고유 작업 | [작업 흐름](./workflows.md) |
| Rules, Skill, Subagent, Plugin, Hook과 MCP의 선택 기준 | [확장 기능](./extensions.md) |
| 입력창 명령과 터미널 실행 옵션 | [명령 확인](./commands.md) |

## 사용 기준

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 사용해요.
- 일상 작업은 실행 중인 세션의 입력창에서 Skill 또는 자연어 요청으로 진행해요.
- `agy` 실행 옵션은 세션 시작, 재개, 비대화형 자동화와 관리에만 사용해요.
- Git 상태 조회나 변경 검토를 맡길 때는 자연어로 요청하고, Git 명령을 직접 실행할 때는 별도 터미널을 사용해요.
- 제품 기능과 명령은 설치된 CLI와 [Antigravity 공식 문서](https://antigravity.google/docs)에서 함께 확인해요.

## 심화 학습 자료

| 주제 | 문서 |
| --- | --- |
| 터미널 샌드박스와 권한 정책 | [샌드박스와 권한](./reference/01-sandbox-and-permissions.md) |
| 서브에이전트와 백그라운드 태스크 | [서브에이전트와 백그라운드 태스크](./reference/02-subagents-and-background-tasks.md) |
| 아티팩트 기반 작업과 피드백 | [아티팩트 작업 흐름](./reference/03-artifacts-workflow.md) |
