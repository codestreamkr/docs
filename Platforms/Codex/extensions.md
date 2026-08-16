# Codex 확장 기능

필요한 책임에 맞는 확장 수단을 선택한다.

## 선택표

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `AGENTS.md` |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill |
| 외부 API, 서비스와 실시간 데이터 | MCP 또는 App·Connector |
| 분리 가능한 작업의 별도 컨텍스트 | Subagent |
| 도구 실행 전후의 결정적 자동 검사 | Hook |
| 실행 명령의 허용·확인 정책 | Rules |
| 여러 Skill과 연결 구성을 배포하는 단위 | Plugin |

## Skill

Skill은 반복 가능한 작업의 입력, 절차, 결과와 필요한 자원을 묶는다.

- 사용자 공통 위치: `~/.agents/skills/`
- 저장소 공유 위치: `<repo>/.agents/skills/`
- 필수 파일: `SKILL.md`
- 선택 자원: `scripts/`, `references/`, `assets/`, `agents/openai.yaml`

현재 사용자 Skill과 호출 예제는 [Skill 안내](./skills.md)에서 확인한다.

## MCP와 App·Connector

외부 시스템의 현재 데이터를 읽거나 작업할 때 사용한다.

- MCP: 도구와 API를 Codex에 연결한다.
- App·Connector: 인증된 개인 또는 조직 서비스를 연결한다.
- 설정 후 `/mcp` 또는 현재 도구 목록에서 사용 가능 상태를 확인한다.

## Subagent

서로 독립된 조사, 검증이나 구현을 별도 컨텍스트로 나눌 때 사용한다.

적합한 예:

- 서로 다른 모듈의 독립 분석
- 보안, 품질과 성능의 별도 검토
- 책임 파일이 겹치지 않는 구현과 테스트

## Hook과 Rules

기계적으로 판정할 수 있는 실행 제어에 사용한다.

- Hook: 도구 실행과 작업 생명주기 이벤트에 연결한다.
- Rules: 실행 명령의 허용, 확인과 차단을 판정한다.

프로젝트의 의미와 맥락을 판단해야 하는 기준은 `AGENTS.md`나 필요한 Skill에서 제공한다.

## Plugin

여러 사람이 설치할 수 있도록 Skill과 연결 구성을 하나의 단위로 배포할 때 사용한다.

하나의 개인 작업 절차만 필요하면 Skill로 시작하고, 여러 Skill·MCP·자산을 함께 배포할 때 Plugin을 검토한다.

## 공식 문서

- [Skill](https://learn.chatgpt.com/docs/build-skills)
- [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)
- [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Hooks](https://learn.chatgpt.com/docs/hooks)
