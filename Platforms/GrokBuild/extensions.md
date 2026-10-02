# Grok Build 확장 기능

반복되는 작업과 외부 연결은 필요한 책임에 맞는 확장 수단으로 구성해요.

## 선택 기준

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `AGENTS.md` |
| 반복 가능한 작업 절차와 전문 지식 | Skill |
| 세션 역할과 도구 구성을 고정 | Agent Profile |
| 분리 가능한 조사, 검토와 구현 | Subagent |
| xAI 외 모델이나 사내 게이트웨이 연결 | Custom Model |
| 외부 API, 서비스와 현재 데이터 | MCP |
| 도구 실행 전후의 결정적 검사 | Hook |
| 여러 구성요소를 함께 배포 | Plugin |

권한과 Sandbox는 확장이 아니라 실행 조건이므로 [권한과 Plan 모드](./reference/01-permissions-and-plan-mode.md)에서 다뤄요.

## Skill

Skill은 반복되는 작업의 입력, 절차, 결과와 필요한 자원을 묶어요.

- 사용자 위치는 `~/.grok/skills/<name>/SKILL.md`예요.
- 프로젝트 위치는 `<repo>/.grok/skills/<name>/SKILL.md`예요.
- Claude 호환 Skill 위치는 `~/.claude/skills/`, `<repo>/.claude/skills/`예요.
- 입력창에서 `/skill-name`으로 직접 호출하거나 설명과 요청을 보고 자동 선택되게 할 수 있어요.
- 목록은 `/skills` 또는 `grok inspect`에서 확인해요.

CodeStream Skill의 실제 사용법은 [사용자 Skill](./skills.md)을 봐요.

## Subagent와 Agent Profile

Agent Profile은 세션의 시스템 프롬프트와 도구 구성을 고정해요.  
파일은 `<repo>/.grok/agents/`, `~/.grok/agents/`에 두고, 프로젝트 공통 기준은 Profile이 아니라 `AGENTS.md`에 둬요.

Subagent는 독립된 조사, 검토나 구현을 별도 컨텍스트에서 처리해요.  
타입과 모델 설정, 세션 관리 방법은 [세션과 Subagent](./reference/02-sessions-and-subagents.md)을 봐요.

## Custom Model

사용자 범위의 `~/.grok/config.toml`에 OpenAI 호환 엔드포인트를 모델로 추가할 수 있어요.

```toml
[model.local-llama]
model = "llama-3.1-70b"
base_url = "http://localhost:8080/v1"
name = "Local Llama"
env_key = "LOCAL_API_KEY"
```

인증값은 `env_key`나 `auth_provider`로 연결하고, 비밀값을 저장소 설정에 적지 않아요.  
적용 결과는 `grok models`, `/model`, `grok inspect`에서 확인해요.

## MCP

MCP는 외부 시스템의 현재 데이터를 읽거나 작업할 때 연결해요.

```toml
[mcp_servers.<name>]
command = "/path/to/server"
args = ["--flag", "value"]
enabled = true
```

사용자 설정은 `~/.grok/config.toml`, 팀 공유 설정은 `<repo>/.grok/config.toml`에 둬요.  
`grok mcp` 또는 `/mcps`에서 연결과 도구를 확인해요.

## Hook

Hook은 도구 실행 전후와 세션 생명주기에 결정적 검사를 연결해요.  
프로젝트 Hook은 `<repo>/.grok/hooks/` 또는 Config에 두고, 프로젝트를 신뢰한 뒤 실행해요.

## Plugin

Plugin은 도구, Skill과 MCP를 하나의 설치 단위로 배포할 때 사용해요.  
프로젝트 Plugin은 `<repo>/.grok/plugins/`, 개인 Plugin은 `~/.grok/plugins/`에 두고 `/plugins` 또는 `grok plugin`으로 관리해요.

## 확인 기준

`grok inspect`에서 지침, Skill, Plugin, Hook과 MCP가 현재 디렉터리에 인식됐는지 확인해요.

## 공식 문서

- [Grok Build 개요](https://docs.x.ai/build/overview)
- [Settings](https://docs.x.ai/build/settings)
- [Docs MCP](https://docs.x.ai/developers/docs-mcp)
