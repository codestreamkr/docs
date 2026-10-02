# Codex 가이드

프로젝트에서 Codex 세션을 열고, 입력창의 명령과 자연어 요청으로 분석·구현·검토를 진행해요.  
이 가이드는 환경 준비, CodeStream 사용자 Skill과 Codex의 세션·Worktree·확장 기능을 다뤄요.  
문제 유형별 공통 작업 순서와 판단 기준은 [Playbook](../../Playbooks/README.md)을 봐요.

## 바로 시작

1. [환경 설정](./setup.md)에 따라 설치·인증을 마치고 프로젝트 루트의 터미널에서 세션을 열어요.

```bash
codex
```

2. 열린 입력창의 `/status`에서 작업 루트와 권한을 확인하고, `/skills`에서 사용자 Skill을 확인해요.
3. 필요한 Skill에 대상과 원하는 결과를 지정하거나 자연어로 요청해요.
4. 변경 뒤 `/diff`와 `/review`로 결과를 확인하고 다음 요청을 이어가요.

```text
$ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

프로젝트를 처음 읽을 때는 다음 요청으로 지침과 실행 방법을 확인해요.

```text
현재 작업 루트와 적용된 AGENTS.md를 확인하고,
프로젝트의 빌드·테스트 방법을 근거 파일과 함께 알려줘. 파일은 수정하지 마.
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 현재 코드의 동작과 영향 범위 분석 | `ct-analyze` | `$ct-analyze` |
| 개발 문제 탐색과 작업 계획 | `ct-plan` | `$ct-plan` |
| 확정된 작업의 실행·검증과 완료 기록 | `ct-apply` | `$ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` | `$ct-verify` |
| Markdown 문서 생성과 형식 정리 | `ct-docs-md-format` | `$ct-docs-md-format` |
| Git 이력의 월별·주차별 업무 보고 | `ct-docs-weekly-report` | `$ct-docs-weekly-report` |
| 원격 Confluence API 작업 | `ct-wiki-api` | `$ct-wiki-api` |
| 저장소 안의 Markdown 위키 운영 | `ct-wiki-ops` | `$ct-wiki-ops` |

## Codex의 작업 방식

| 필요한 작업 | 사용하는 기능 | 자세히 |
| --- | --- | --- |
| 변경 내용 확인과 문제 검토 | `/diff`, `/review` | [변경 확인과 검토](./workflows.md#변경-확인과-검토) |
| 작업 재개와 대안 비교 | `/resume`, `/fork` | [세션과 맥락 관리](./workflows.md#세션과-맥락-관리) |
| 파일을 분리해 다른 변경 구현 | Worktree | [별도 작업 공간](./workflows.md#별도-작업-공간에서-구현하기) |
| 독립된 모듈 병렬 조사 | Subagent 요청과 `/agent` | [병렬 조사](./workflows.md#큰-코드베이스-병렬-조사하기) |
| 연결된 서비스와 도구 사용 | `/mcp`, `/apps`, `/plugins` | [확장 기능](./extensions.md) |

CLI의 `/` 명령과 앱·IDE의 화면 절차는 구분해요.  
앱에서 작업 공간을 선택·이동하는 방법은 [Worktree와 Handoff](./workflows.md#별도-작업-공간에서-구현하기)를 봐요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, 인증, Skill 위치와 지침·권한·설정 | [환경 설정](./setup.md) |
| 입력창 명령과 터미널 명령 | [명령 확인](./commands.md) |
| 사용자 Skill의 입력과 결과 | [사용자 Skill](./skills.md) |
| Skill 연결, 변경 검토와 세션 관리 | [작업 흐름](./workflows.md) |
| MCP, Subagent, Rules, Hook과 Plugin | [확장 기능](./extensions.md) |
| 스크립트와 CI의 반복 실행 | [자동화](./automation.md) |

## 사용 기준

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 사용해요.
- 일상 작업은 열린 세션에서 `$ct-*`, 내장 명령과 자연어 요청으로 이어가요.
- 터미널 명령은 설치·시작·관리·자동화 등 셸에서 실행할 절차에 사용해요.
- Git 상태 조회나 변경 검토를 맡길 때는 자연어로 요청하고, Git 명령을 직접 실행할 때는 별도 터미널을 사용해요.
- 결과에는 변경 범위, 실행한 검증과 미검증 항목이 포함됐는지 확인해요.
- CLI `0.158.0`과 공식 문서를 기준으로 정리했으며, 현재 지원 범위는 [명령 확인](./commands.md#확인-기준)을 따라요.
