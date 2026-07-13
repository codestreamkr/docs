# Codex 사용 안내

이 폴더는 공통 Master와 Playbook을 Codex에서 실행하는 방법만 다룬다.

업무 역할과 결과 기준은 [Masters](../../Masters/README.md), 여러 단계의 공통 작업 순서는 [Playbooks](../../Playbooks/README.md)를 정본으로 사용한다.

## 시작 순서

Codex를 처음 사용하는 경우 필요한 문서만 순서대로 본다.

| 단계 | 문서 | 완료 결과 |
| --- | --- | --- |
| 실행 | [Codex 시작하기](./getting-started.md) | 프로젝트에서 Codex를 실행한다 |
| 프로젝트 적용 | [프로젝트 설정](./project-configuration.md) | `AGENTS.md`와 Config의 책임을 나눈다 |
| Master 연결 | [Master 연결표](./master-bindings.md) | 자연어 호출을 Skill에 연결한다 |
| 팀 Skill | [Skill 사용](./skill-usage.md) | 공통 Playbook을 `ct-*` Skill로 실행한다 |
| 확장 | [확장 기능](./extensions.md) | Skill, MCP, Subagent와 Plugin을 구분한다 |
| 명령 조회 | [CLI 명령 참조](./cli-reference.md) | 현재 작업에 필요한 명령을 찾는다 |

## 문서 책임

Codex 문서는 제품 전용 정보만 관리한다.

- Codex 설치와 실행 환경
- `AGENTS.md`와 `.codex/config.toml`
- Codex Skill 위치와 호출 방법
- CLI와 슬래시 명령
- MCP, Subagent, Hook과 Plugin
- Master와 `ct-*` Skill 연결 상태

문제 해결 방법과 결과 형식은 이 폴더에 반복하지 않는다.

## 공식 문서 기준

- [Codex 개발자 명령](https://developers.openai.com/codex/cli/reference/)
- [AGENTS.md 설정](https://developers.openai.com/codex/guides/agents-md/)
- [Skill 만들기](https://developers.openai.com/codex/skills/)

## 이력관리

- 2026-07-13: 공통 Master·Playbook과 분리된 Codex 플랫폼 안내로 재구성
