# Grok Build 확장 기능

필요한 책임에 맞는 확장 수단을 선택한다.

## 선택표

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `AGENTS.md` |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill |
| 세션의 시스템 프롬프트와 도구 구성 변경 | Agent Profile |
| 분리 가능한 작업의 병렬 실행 | Subagent |
| xAI 외 모델이나 사내 게이트웨이 연결 | Custom Model |
| 외부 API, 서비스와 실시간 데이터 | MCP |
| 도구 실행 전후의 결정적 자동 검사 | Hook |
| 도구, Skill과 MCP를 함께 배포하는 단위 | Plugin |

## Skill

Skill은 반복 가능한 작업의 입력, 절차, 결과와 필요한 자원을 묶는다.

- 사용자 위치: `~/.grok/skills/<name>/SKILL.md`
- 저장소 위치: `<repo>/.grok/skills/<name>/SKILL.md`
- Claude 호환 위치: `~/.claude/skills/`, `<repo>/.claude/skills/`
- 직접 호출: `/skill-name`
- 자동 선택: `description`과 현재 요청을 기준으로 선택
- 목록 확인: `/skills`

`SKILL.md`의 필수 항목은 `name`과 `description`이다. 추가 경로는 Config의 `[skills] paths`로 등록한다.

현재 사용자 Skill과 호출 예제는 [Skill 안내](./skills.md)에서 확인한다.

## Agent Profile

세션의 시스템 프롬프트, 도구 구성과 동작을 바꾼다.

- 위치: `<repo>/.grok/agents/`, `~/.grok/agents/`
- 형식: YAML frontmatter가 있는 `.md` 파일
- 지정: `--agent <이름 또는 경로>`, Config의 `[agent]`, `GROK_AGENT` 환경 변수

역할이 고정된 검토나 조사에 사용하고, 프로젝트 공통 기준은 `AGENTS.md`에 남긴다.

## Subagent

서로 독립된 조사, 검증이나 구현을 병렬로 나눌 때 사용한다. 기본으로 활성화되어 있다.

```toml
[subagents.toggle]
plan = false

[subagents.models]
explore = "grok-build"
```

- 각 Subagent는 별도 컨텍스트를 사용한다.
- Role로 기본 권한과 모델을, Persona로 응답 방식을 지정한다.
- 세션 전체에서 끄려면 `--no-subagents`를 사용한다.

## Custom Model

xAI 외 모델이나 사내 게이트웨이를 모델 목록에 추가한다.

```toml
[model.local-llama]
model = "llama-3.1-70b"
base_url = "http://localhost:8080/v1"
name = "Local Llama"
context_window = 128000
env_key = "LOCAL_API_KEY"
```

- OpenAI 호환 엔드포인트를 연결한다.
- 인증값은 `api_key`, `env_key` 또는 회전 토큰용 `auth_provider`로 지정한다.
- 내장 모델은 바꿀 필드만 다시 적어 덮어쓴다.
- 확인은 `grok models` 또는 `/model`에서 한다.

## MCP

외부 시스템의 현재 데이터를 읽거나 작업할 때 사용한다.

```toml
[mcp_servers.<name>]
command = "/path/to/server"
args = ["--flag", "value"]
enabled = true
```

- 사용자 범위는 `~/.grok/config.toml`, 저장소 범위는 `<repo>/.grok/config.toml`에 둔다.
- 같은 이름의 서버는 프로젝트 설정이 전체를 대체한다.
- Claude 호환으로 `.mcp.json`과 `~/.claude.json`도 함께 읽는다.
- 관리는 `grok mcp` 또는 세션의 `/mcps`에서 한다.

## Hook

모델 판단 없이 항상 실행할 검사를 연결한다.

- 위치: `<repo>/.grok/hooks/` 또는 Config의 `[[hooks.<Event>]]`
- 이벤트: 도구 실행 전후, 세션 시작과 종료
- 실행 조건: 프로젝트 Hook은 `/hooks-trust`로 폴더를 신뢰해야 한다
- 확인: `/hooks`

프로젝트의 의미와 맥락을 판단해야 하는 기준은 Hook이 아니라 `AGENTS.md`나 Skill에서 제공한다.

## Plugin

도구, Skill과 MCP 서버를 하나의 설치 단위로 배포할 때 사용한다.

- 위치: `<repo>/.grok/plugins/`, `~/.grok/plugins/`
- 관리: `/plugins`
- 마켓플레이스 소스는 Config의 `[[marketplace.sources]]`에 둔다
- 프로젝트 Plugin은 별도로 신뢰해야 실행된다. `~/.grok/plugins/`는 자동으로 신뢰한다.

하나의 개인 작업 절차만 필요하면 Skill로 시작하고, 여러 구성요소를 함께 배포할 때 Plugin을 검토한다.

## 공식 문서

- 확장 기능 상세: `~/.grok/README.md`의 Customization 항목
- 기능별 사용자 가이드: `~/.grok/docs/user-guide/`
- [Grok Build 소개](https://x.ai/news/grok-build-cli)
