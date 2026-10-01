# Codex 가이드

Codex의 세션, Worktree, 코드 검토와 병렬 작업 기능으로 개발하고 필요한 CodeStream Skill을 연결해요.

- 공통 작업 절차와 판단 기준: [Playbook](../../Playbooks/README.md)
- Codex에서 실행·설정·확인하는 방법: 이 가이드
- 기준: 2026-09-23 공식 문서와 Codex CLI `0.155.1`
- 터미널 예제는 CLI 기준이에요. 앱 전용 절차는 별도로 표시해요. IDE 확장의 명령은 현재 화면에서 확인해요.

## 바로 시작

1. [환경 설정](./setup.md)에서 설치·로그인 후 프로젝트를 열어요.
2. 다음 요청으로 작업 루트와 실행 방법을 확인해요.
3. 원하는 변경과 완료 조건을 요청하고, [변경 검토](./workflows.md#구현한-변경-검토하기)로 결과를 확인해요.

```text
현재 작업 루트와 적용된 AGENTS.md를 확인하고,
프로젝트의 빌드·테스트 방법을 근거 파일과 함께 알려줘. 파일은 수정하지 마.
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 현재 코드의 동작과 영향 분석 | `ct-analyze` | `$ct-analyze` |
| 개발 문제 탐색과 작업 계획 | `ct-plan` | `$ct-plan` |
| 확정된 작업의 실행·검증과 완료 기록 | `ct-apply` | `$ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` | `$ct-verify` |
| Markdown 문서 생성과 형식 정리 | `ct-docs-md-format` | `$ct-docs-md-format` |
| Git 이력의 월별·주차별 업무 보고 | `ct-docs-weekly-report` | `$ct-docs-weekly-report` |
| Confluence REST API 작업 | `ct-wiki-api` | `$ct-wiki-api` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` | `$ct-wiki-ops` |

```text
$ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

## 결과 확인

- 요청한 범위와 실제 변경 파일을 비교해요.
- 테스트·실행 결과와 미검증 항목을 확인해요.
- 후속 작업에는 계획 문서가 있으면 경로를 전달하고, 변경 범위와 남은 검증도 함께 알려줘요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 중단한 작업을 이어가거나 다른 접근을 시도해요 | [세션 재개·분기](./workflows.md#중단한-작업-이어가기) |
| 현재 작업과 분리된 공간에서 구현해요 | [Worktree](./workflows.md#별도-작업-공간에서-구현하기) |
| 구현한 변경의 문제를 찾아 수정해요 | [코드 검토](./workflows.md#구현한-변경-검토하기) |
| 여러 모듈을 나누어 조사해요 | [병렬 조사](./workflows.md#큰-코드베이스-병렬-조사하기) |
| 권한 요청이나 파일 접근 문제를 해결해요 | [승인과 샌드박스](./setup.md#승인과-샌드박스) |
| MCP·Plugin을 연결하고 활용해요 | [확장 기능](./extensions.md) |
| 분석·계획·실행·검증에 맞는 사용자 Skill을 골라요 | [Skill 안내](./skills.md#선택-기준) |
| 반복 작업을 스크립트나 CI에서 실행해요 | [자동화](./automation.md) |
| 필요한 명령을 빠르게 찾아요 | [명령 확인](./commands.md) |

## 사용 기준

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 `/skills`에서 확인해요.
- 사용자 Skill은 `$ct-*` 이름으로 직접 호출해요. 자동 선택과 안내 요청 방식은 [공통 호출 형식](./skills.md#공통-호출-형식)을 봐요.
- 작업별 입력과 결과는 [Skill 안내](./skills.md)를 기준으로 해요.
- 제품별 지원 범위와 전체 기능은 [OpenAI 공식 문서](https://learn.chatgpt.com/docs/codex/cli)에서 확인해요.
