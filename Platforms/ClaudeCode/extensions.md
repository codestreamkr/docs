# Claude Code 확장 기능

반복 절차, 역할 분리, 외부 연결과 자동 검사는 서로 다른 확장 수단으로 구성한다.

## 선택 기준

필요한 책임에 맞는 기능을 선택한다.

| 필요한 것 | Claude Code 기능 |
| --- | --- |
| 저장소에서 계속 읽을 기준 | `CLAUDE.md` |
| 반복 작업 절차와 전문 지식 | Skill |
| 역할이 고정된 독립 작업 | Custom subagent |
| 여러 독립 역할의 협력 | Agent team |
| 외부 데이터와 도구 | MCP |
| 결정적인 생명주기 검사 | Hook |
| 여러 구성요소의 설치 단위 | Plugin |

## Skill

Skill은 `SKILL.md`와 선택적 참조 자료·스크립트로 구성한다.

- 개인 위치: `~/.claude/skills/<name>/SKILL.md`
- 프로젝트 위치: `.claude/skills/<name>/SKILL.md`
- 직접 호출: `/skill-name`
- 자연 호출: `description`과 현재 요청을 기준으로 선택

Claude Code의 기존 `.claude/commands/*.md`도 동작하지만 공식 문서에서는 Custom commands가 Skills에 통합되었다고 안내한다. 신규 공통 기능은 Skill 구조로 작성한다.

## Custom subagent와 Agent team

격리된 컨텍스트에서 역할을 반복할 때 사용한다.

- Custom subagent: 탐색, 리뷰, 검증처럼 독립된 단일 역할
- Agent team: 서로 다른 역할이 결과와 메시지를 주고받는 협력 작업

Master를 항상 Agent로 구현할 필요는 없다. 현재 대화 안에서 함께 일하는 역할은 Skill로 구현하고, 격리된 독립 작업이 필요할 때 Agent를 연결한다.

## MCP

외부 서비스와 도구를 연결한다.

- 로컬 프로세스 또는 원격 HTTP 서버
- 프로젝트 공유 설정과 사용자별 설정 분리
- `/mcp`에서 연결과 인증 상태 확인
- 신뢰할 수 있는 서버와 최소 권한 사용

## Hook

모델 판단 없이 항상 실행할 검사를 연결한다.

- 도구 실행 전후 검사
- 세션 시작과 종료 처리
- 파일 변경 뒤 formatter 또는 lint
- 명령 차단과 감사 로그

## Plugin

Skill, Agent, Hook과 MCP 설정을 배포 단위로 묶는다.

팀에서 Masters 전체를 배포할 때 공통 문서를 복제하지 않고 Claude Code 구현과 연결 정보만 Plugin에 포함한다.

## 공식 문서 기준

- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code MCP](https://code.claude.com/docs/en/mcp)
- [Hooks](https://code.claude.com/docs/en/hooks-guide)

## 이력관리

- 2026-07-13: Commands의 Skill 통합과 Master 구현 기준을 반영해 Claude Code 확장 기능 재구성
