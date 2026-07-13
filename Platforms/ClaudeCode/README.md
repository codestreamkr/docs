# Claude Code 사용 안내

이 폴더는 공통 Master와 Playbook을 Claude Code에서 실행하는 방법만 다룬다.

업무 역할과 결과 기준은 [Masters](../../Masters/README.md), 여러 단계의 공통 작업 순서는 [Playbooks](../../Playbooks/README.md)를 정본으로 사용한다.

## 시작 순서

Claude Code를 처음 사용하는 경우 필요한 문서만 순서대로 본다.

| 단계 | 문서 | 완료 결과 |
| --- | --- | --- |
| 실행 | [Claude Code 시작하기](./getting-started.md) | 프로젝트에서 Claude Code를 실행한다 |
| 프로젝트 적용 | [프로젝트 설정](./project-configuration.md) | `CLAUDE.md`와 Settings의 책임을 나눈다 |
| Master 연결 | [Master 연결표](./master-bindings.md) | 공통 Master의 적용 목표와 상태를 확인한다 |
| 팀 Skill | [Skill 사용](./skill-usage.md) | 기존 Command와 목표 Skill을 구분한다 |
| 확장 | [확장 기능](./extensions.md) | Skill, Agent, MCP와 Hook을 구분한다 |
| 명령 조회 | [CLI 명령 참조](./cli-reference.md) | 현재 작업에 필요한 명령을 찾는다 |

## 현재 적용 기준

공통 문서는 완성된 Master와 Playbook을 기준으로 한다.

- Codex와 같은 역할·입력·결과 기준 사용
- Claude Code Skill이 없는 기능은 `적용 예정`으로 표시
- 기존 `/ct:*` Command는 현재 연결로 기록
- 신규 구현은 `.claude/skills/<skill-name>/SKILL.md` 구조를 우선 사용

## 공식 문서 기준

- [Claude Code 시작](https://code.claude.com/docs/en/quickstart)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code Settings](https://code.claude.com/docs/en/settings)

## 이력관리

- 2026-07-13: 공통 Master·Playbook과 분리하고 미적용 Skill 상태를 포함한 Claude Code 플랫폼 안내 생성
