# Claude Code 확장 기능

필요한 책임에 맞는 확장 수단을 선택한다.

## 선택표

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `CLAUDE.md` |
| 특정 파일과 경로에만 적용할 기준 | `.claude/rules/` |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill |
| 분리 가능한 작업의 별도 컨텍스트 | Subagent |
| 외부 API, 서비스와 실시간 데이터 | MCP |
| 도구 실행 전후의 결정적 자동 검사 | Hook |
| 여러 구성요소를 배포하는 단위 | Plugin |

## Skill

Skill은 반복 가능한 작업의 입력, 절차, 결과와 필요한 자원을 묶는다.

- 개인 위치: `~/.claude/skills/<name>/SKILL.md`
- 프로젝트 위치: `<repo>/.claude/skills/<name>/SKILL.md`
- 직접 호출: `/skill-name`
- 자동 선택: `description`과 현재 요청을 기준으로 Claude가 선택
- 선택 자원: `references/`, `scripts/`, `assets/`

frontmatter로 동작을 제한할 수 있다.

- `disable-model-invocation: true`: 사용자가 호출할 때만 실행한다.
- `user-invocable: false`: Claude만 사용하는 배경 지식으로 둔다.
- `allowed-tools`: 호출한 턴에서 승인 없이 사용할 도구를 지정한다.

기존 `.claude/commands/*.md`도 계속 동작하지만 Custom command는 Skill로 통합되었다. 신규 공통 기능은 Skill 구조로 작성한다.

현재 사용자 Skill과 호출 예제는 [Skill 안내](./skills.md)에서 확인한다.

## Subagent

서로 독립된 조사, 검증이나 구현을 별도 컨텍스트로 나눌 때 사용한다.

- 개인 위치: `~/.claude/agents/<name>.md`
- 프로젝트 위치: `<repo>/.claude/agents/<name>.md`
- 주요 frontmatter: `description`, `tools`, `model`, `skills`

적합한 예:

- 서로 다른 모듈의 독립 분석
- 보안, 품질과 성능의 별도 검토
- 출력이 큰 작업의 컨텍스트 분리

Subagent는 현재 대화의 파일과 맥락을 물려받지 않는다. 단계마다 결과를 주고받아야 하는 작업은 현재 대화에서 진행한다.

## MCP

외부 시스템의 현재 데이터를 읽거나 작업할 때 사용한다.

```bash
claude mcp add --transport http <name> <url>
claude mcp list
```

- 범위: `local`은 현재 프로젝트 개인용, `project`는 `.mcp.json`으로 팀 공유, `user`는 모든 프로젝트
- 인증: 환경 변수 또는 서버가 제공하는 인증 절차 사용
- 확인: `/mcp`에서 연결과 도구 상태를 확인

## Hook

모델 판단 없이 항상 실행할 검사를 연결한다.

- 설정 위치: `settings.json`의 `hooks`
- 도구 실행 전후: `PreToolUse`, `PostToolUse`
- 세션 생명주기: `SessionStart`, `SessionEnd`, `Stop`
- 그 외: 권한 요청, 컨텍스트 압축, 파일 변경 등 이벤트별 연결

프로젝트의 의미와 맥락을 판단해야 하는 기준은 Hook이 아니라 `CLAUDE.md`나 Skill에서 제공한다.

## Plugin

Skill, Subagent, Hook과 MCP 설정을 하나의 설치 단위로 배포할 때 사용한다.

하나의 개인 작업 절차만 필요하면 Skill로 시작하고, 여러 구성요소를 함께 배포할 때 Plugin을 검토한다.

## 공식 문서

- [Skills](https://code.claude.com/docs/en/skills)
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [MCP](https://code.claude.com/docs/en/mcp)
- [Hooks](https://code.claude.com/docs/en/hooks)
- [Plugins](https://code.claude.com/docs/en/plugins)

