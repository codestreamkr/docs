# Claude Code 가이드

프로젝트에서 할 일을 고르고 필요한 사용자 Skill을 직접 호출해요.

문제 유형별 작업 흐름은 [Playbook](../../Playbooks/README.md)에서 관리해요.  
이 가이드는 Claude Code의 설정, Skill 호출과 확장 기능만 다뤄요.

## 바로 시작

1. 프로젝트 루트에서 `claude`를 실행해요.
2. 입력창에 `/`를 입력해 사용할 수 있는 Skill을 확인해요.
3. Skill만 호출해 역할, 필요한 입력과 예제를 확인해요.
4. 원하는 결과와 대상을 자연어로 이어서 실행해요.

```text
/ct-plan
/ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 현재 코드의 동작과 영향 범위 분석 | `ct-analyze` | `/ct-analyze` |
| 개발 요구사항의 탐색과 계획 | `ct-plan` | `/ct-plan` |
| 확정된 계획의 실행과 검증 | `ct-apply` | `/ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` | `/ct-verify` |
| Markdown 파일 생성과 형식 정리 | `ct-docs-md-format` | `/ct-docs-md-format` |
| Git 이력 기반 주간·월간 보고서 | `ct-docs-weekly-report` | `/ct-docs-weekly-report` |
| Confluence REST API 작업 | `ct-wiki-api` | `/ct-wiki-api` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` | `/ct-wiki-ops` |

## 어디서 실행하나요?

같은 계정과 설정을 여러 진입점에서 함께 써요.  
이 가이드는 터미널 CLI를 기준으로 해요.

| 진입점 | 쓰는 상황 | 설정 공유 |
| --- | --- | --- |
| 터미널 CLI | 프로젝트 루트에서 `claude` 실행 (기본) | `~/.claude/` |
| 데스크톱 앱 | 터미널 없이 GUI로 사용 | `~/.claude/` |
| VS Code, JetBrains | 편집기 안에서 변경과 검토 | `~/.claude/` |
| 웹, 모바일 | 클라우드 세션으로 실행과 확인 | 별도 환경 설정 |

진입점마다 제공하는 기능이 달라요.  
사용자 Skill은 `~/.claude/skills/`를 읽는 진입점에서만 보여요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, 인증, 권한과 `CLAUDE.md`·Settings의 책임 | [환경 설정](./setup.md) |
| 사용자 Skill의 입력과 결과, 번들 Skill과의 선택 기준 | [사용자 Skill](./skills.md) |
| 여러 Skill을 연결하는 실제 예제 | [작업 흐름](./workflows.md) |
| Skill, Subagent, MCP, Hook과 Plugin의 차이 | [확장 기능](./extensions.md) |
| 현재 환경에서 명령을 찾는 방법 | [명령 확인](./commands.md) |

## 사용 기준

- CodeStream 사용자 Skill의 설치와 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.
- 사용자 Skill은 `/ct-*` 이름으로 직접 호출해요.
- Skill은 현재 프로젝트의 지침 문서, 코드와 설정에서 필요한 근거를 모아요.
- `/` 목록에는 제품이 제공하는 번들 Skill도 함께 보여요. 역할이 겹치면 `ct-*`를 먼저 써요.
- 작업별 입력과 결과는 실제 Skill 안내를 기준으로 해요.
- 제품 기능과 명령은 현재 환경과 [Claude Code 공식 문서](https://code.claude.com/docs/ko/overview)에서 확인해요.
