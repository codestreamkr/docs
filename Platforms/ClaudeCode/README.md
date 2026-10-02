# Claude Code 가이드

Claude Code에서 프로젝트를 열고 입력창으로 요청과 Skill을 보내는 방법을 안내해요.  
문제 유형별 작업 순서는 [Playbook](../../Playbooks/README.md)에서 관리해요.

## 바로 시작

프로젝트 루트에서 한 번 세션을 열어요.

```bash
claude
```

이후에는 열린 세션의 입력창에서 필요한 Skill과 작업 대상을 함께 보내요.

```text
/ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

Skill을 먼저 확인하려면 입력창에 `/`를 입력해 목록을 열어요.  
설치와 로그인, 권한 기본값은 [환경 설정](./setup.md)을 봐요.

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

## Claude Code의 작업 방식

Claude Code는 터미널 세션을 유지하면서 코드, 지침과 도구 결과를 함께 읽고 작업해요.  
입력창의 `/` 목록에는 내장 명령, 번들 Skill, 사용자 Skill이 함께 보여요.  
독립 작업은 Subagent나 worktree로 나누고, 오래 걸리는 작업은 백그라운드 세션으로 이어갈 수 있어요.  
각 수단의 역할은 [확장 기능](./extensions.md)에서 확인해요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, 인증, 지침과 권한 설정 | [환경 설정](./setup.md) |
| 사용자 Skill의 역할과 선택 | [사용자 Skill](./skills.md) |
| 세션에서 Skill을 연결하고 검토하는 방법 | [작업 흐름](./workflows.md) |
| Skill, Subagent, MCP, Hook과 Plugin의 선택 | [확장 기능](./extensions.md) |
| 입력창 명령과 터미널 명령의 구분 | [명령 확인](./commands.md) |

## 사용 기준

- 일상 작업은 열린 세션의 입력창에서 자연어 요청과 `/ct-*`를 사용해요.
- `claude`, `claude -p`, Git 명령은 세션을 열거나 자동화·저장소를 관리하는 터미널 명령이에요.
- Git 상태 확인이나 변경은 직접 실행할 수도 있고, AI에게 검토나 작업을 요청할 수도 있어요.
- 사용자 Skill은 `/` 목록에서 현재 세션에 노출된 이름을 기준으로 호출해요.
- 명령과 기능은 현재 설치 환경과 [Claude Code 공식 문서](https://code.claude.com/docs/ko/overview)를 함께 확인해요.
