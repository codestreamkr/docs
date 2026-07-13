# Claude Code 프로젝트 설정

Claude Code의 지속 지침, 실행 설정과 재사용 작업은 서로 다른 위치에 둔다.

## 책임 구분

항상 읽을 기준과 필요할 때 불러올 절차를 나눈다.

| 위치 | 책임 |
| --- | --- |
| `CLAUDE.md` | 저장소 작업 규칙과 공통 문서 라우팅 |
| 하위 `CLAUDE.md` | 특정 디렉터리에 추가할 맥락과 기준 |
| `.claude/settings.json` | 팀과 공유하는 Claude Code 설정 |
| `.claude/settings.local.json` | Git에 포함하지 않는 개인 프로젝트 설정 |
| `.claude/skills/` | 프로젝트에서 공유할 Skill |
| `.claude/agents/` | 역할이 고정된 Custom subagent |

구조, 코드 스타일과 실행 절차의 상세 정본은 [프로젝트 준비하기](../../Playbooks/project-setup.md)에 따라 별도 문서로 관리한다.

## CLAUDE.md 구성

짧은 작업 기준과 정본 문서 링크를 둔다.

```markdown
## 작업 기준

- 변경 전에 Git 상태와 관련 코드를 확인한다.
- 운영 코드는 기존 계층과 응답 계약을 따른다.
- 수정 후 관련 테스트를 실행한다.

## 프로젝트 문서

- 구조: `.docs/core_project.md`
- 코드 스타일: `.docs/core_code_style.md`
- 빌드와 테스트: `.docs/core_workflow.md`
```

반복 절차와 긴 참고 자료는 `CLAUDE.md`에서 Skill로 분리한다.

## Settings 구성

실행 동작과 권한을 설정한다.

- 허용, 확인과 차단 도구
- 환경 변수
- Hook
- Plugin과 MCP 관련 설정
- 사용자, 프로젝트와 로컬 범위

개인 시크릿과 로컬 전용 설정은 공유 파일에 기록하지 않는다.

## Skill과 Agent 배치

실행 책임에 맞춰 배치한다.

- 반복 지침과 참조 자료: `.claude/skills/<name>/SKILL.md`
- 별도 컨텍스트에서 반복할 역할: `.claude/agents/<name>.md`
- 기존 `.claude/commands/*.md`: 호환을 위해 유지 가능하지만 신규 작업은 Skill 우선

## 적용 확인

새 세션에서 실제 노출 상태를 확인한다.

- 적용되는 `CLAUDE.md`
- 현재 권한과 Settings 범위
- `/` 목록의 Skill과 명령
- 사용 가능한 Agent와 MCP
- 문서에 적은 빌드·테스트 명령

## 공식 문서 기준

- [프로젝트 메모리와 CLAUDE.md](https://code.claude.com/docs/en/memory)
- [Claude Code Settings](https://code.claude.com/docs/en/settings)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Custom subagents](https://code.claude.com/docs/en/sub-agents)

## 이력관리

- 2026-07-13: 공통 프로젝트 문서와 분리하고 CLAUDE.md, Settings, Skill과 Agent 위치를 정리
