# 02. [초급]핵심개념 이해

Codex는 아래 개념을 조합해 프로젝트 안에서 작업한다.

각 개념이 어디에 쓰이는지 구분하면 설정과 요청이 쉬워진다.

## 1. AGENTS.md

Codex가 작업 전에 읽는 프로젝트 지침 파일이다.

- 전역 지침은 `~/.codex/AGENTS.md`에 둔다.
- 임시 전역 덮어쓰기는 `~/.codex/AGENTS.override.md`에 둔다.
- 프로젝트 지침은 저장소 루트나 하위 폴더의 `AGENTS.md`에 둔다.
- 하위 폴더에는 `AGENTS.override.md`로 더 구체적인 규칙을 둘 수 있다.
- 루트에서 현재 작업 폴더까지 발견한 지침을 순서대로 합친다.
- 더 가까운 폴더의 지침이 뒤에 붙기 때문에 구체 규칙으로 우선 적용된다.
- 기본 최대 로드 크기는 `project_doc_max_bytes` 기준을 따른다.

> 언제 쓰나: Codex가 항상 지켜야 할 프로젝트 규칙과 작업 기준

## 2. Config

Codex 동작과 권한을 정하는 설정이다.

- 사용자 설정은 `~/.codex/config.toml`에 둔다.
- 프로젝트 설정은 `.codex/config.toml`에 둔다.
- 프로젝트 설정은 신뢰한 프로젝트에서만 로드된다.
- CLI 옵션과 `-c key=value` 값이 가장 높은 우선순위를 가진다.
- 모델, 승인 정책, 샌드박스, MCP, 권한 프로필을 설정한다.

> 언제 쓰나: 모델, 실행 권한, 샌드박스, 도구 연결 기준을 정할 때

## 3. Slash Commands

CLI 대화 중 `/명령어`로 실행하는 내장 제어 명령이다.

- `/init`으로 `AGENTS.md` 초안을 만든다.
- `/model`로 모델과 reasoning effort를 바꾼다.
- `/permissions`로 승인과 권한 수준을 조정한다.
- `/mcp`로 연결된 MCP 서버를 확인한다.
- `/compact`로 긴 대화를 요약한다.
- `/diff`로 현재 변경사항을 확인한다.
- `/agent`로 Subagent 스레드를 확인하거나 전환한다.
- 전체 목록은 공식 `Slash commands in Codex CLI` 문서를 기준으로 확인한다.

> 언제 쓰나: 세션 중 Codex 동작을 빠르게 바꿀 때

## 4. MCP

Codex를 외부 도구와 컨텍스트에 연결하는 프로토콜이다.

- CLI와 IDE 확장에서 사용할 수 있다.
- STDIO 서버와 Streamable HTTP 서버를 지원한다.
- 설정은 `config.toml`의 `[mcp_servers.<name>]` 테이블에 둔다.
- CLI에서는 `codex mcp add`로 서버를 추가할 수 있다.
- TUI에서는 `/mcp`로 활성 서버를 확인한다.

> 언제 쓰나: 공식 문서, Figma, 브라우저, 사내 도구 같은 외부 컨텍스트가 필요할 때

## 5. Skills

반복 작업을 위한 지침, 참조 자료, 스크립트를 묶은 단위다.

- 기본 구조는 `skill-name/SKILL.md`다.
- `SKILL.md`에는 `name`과 `description`이 필요하다.
- `scripts/`, `references/`, `assets/`를 함께 둘 수 있다.
- Codex는 처음에 스킬 이름, 설명, 경로만 보고 필요할 때 전체 내용을 읽는다.
- 명시 호출은 CLI/IDE에서 `/skills` 또는 `$` 멘션을 사용한다.
- 묵시 호출은 `description`이 요청과 맞을 때 동작한다.

> 언제 쓰나: 반복 작업 절차나 전문 지식을 재사용할 때

## 6. Subagents

독립 에이전트를 병렬로 실행하는 작업 방식이다.

- 복잡하고 병렬성이 높은 작업에 적합하다.
- Codex는 사용자가 명시적으로 요청할 때만 Subagent를 생성한다.
- 각 Subagent는 별도 모델과 도구 작업을 수행하므로 토큰 사용량이 늘어난다.
- 기본 내장 에이전트는 `default`, `worker`, `explorer`다.
- 사용자 정의 에이전트는 `~/.codex/agents/` 또는 `.codex/agents/`의 TOML 파일로 정의한다.
- 현재 Subagent 활동 표시는 Codex 앱과 CLI에서 제공된다.

> 언제 쓰나: 코드 탐색, 리뷰, 구현 분할처럼 독립 작업을 병렬 처리할 때

## 7. Memories

이전 작업에서 얻은 유용한 맥락을 이후 세션에 이어주는 기능이다.

- 기본값은 꺼져 있다.
- `~/.codex/config.toml`의 `[features]`에서 `memories = true`로 켠다.
- 팀 공통 규칙은 Memories가 아니라 `AGENTS.md`나 저장소 문서에 둔다.
- 지역에 따라 사용할 수 없는 경우가 있다.
- 현재 스레드의 메모리 사용 여부는 `/memories`로 제어한다.

> 언제 쓰나: 개인 선호, 반복 작업 방식, 자주 쓰는 프로젝트 맥락을 이어가고 싶을 때

## 8. Hooks

Codex 생명주기 중 실행되는 결정론적 스크립트다.

- 기능 플래그 `codex_hooks`로 제어된다.
- `hooks.json` 또는 `config.toml`의 `[hooks]`로 정의한다.
- 주요 이벤트는 `SessionStart`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`이다.
- 같은 이벤트에 매칭되는 여러 훅은 함께 실행된다.
- 프로젝트 훅은 신뢰한 프로젝트에서만 로드된다.
- `PreToolUse`와 `PostToolUse`는 모든 도구 호출을 완전히 가로채는 기능이 아니다.

> 언제 쓰나: 프롬프트 검사, 명령 검증, 작업 종료 후 요약 같은 자동화가 필요할 때

## 9. Rules

샌드박스 밖에서 실행할 명령을 제어하는 규칙이다.

- 실험 기능이며 형식과 동작이 바뀔 수 있다.
- `rules/` 폴더 아래 `.rules` 파일로 작성한다.
- `prefix_rule()`로 명령 prefix와 결정을 정의한다.
- 결정은 `allow`, `prompt`, `forbidden`을 사용한다.
- Codex가 규칙을 로드할 때 `match`, `not_match` 예시를 검증한다.
- TUI에서 허용 목록에 추가하면 사용자 레이어의 `~/.codex/rules/default.rules`에 기록된다.
- 규칙 파일은 `codex execpolicy check`로 적용 결과를 확인한다.

> 언제 쓰나: 특정 명령을 승인 없이 허용하거나 반드시 막아야 할 때

## 10. Plugins

Plugins는 Skills, Apps, MCP servers를 설치 가능한 묶음으로 만든 단위다.

- Codex 앱과 CLI에서 설치하고 관리할 수 있다.
- Codex 앱에서는 Plugin Directory에서 설치한다.
- CLI에서는 `/plugins`로 plugin browser를 연다.
- plugin은 Skills, Apps, MCP servers를 포함할 수 있다.
- 설치된 plugin은 새 스레드에서 사용할 수 있다.
- 끄려면 `~/.codex/config.toml`에서 해당 플러그인의 `enabled = false`를 설정한다.

> 언제 쓰나: 여러 사람이 같은 워크플로우와 외부 연결을 재사용해야 할 때

## 개념 비교 요약

| 개념 | 저장 위치 | 주요 용도 |
| --- | --- | --- |
| `AGENTS.md` | `~/.codex/`, 저장소 루트, 하위 폴더 | 작업 지침 |
| Config | `~/.codex/config.toml`, `.codex/config.toml` | 모델, 권한, 샌드박스, MCP |
| Slash Commands | Codex CLI 내장 | 세션 제어 |
| MCP | `config.toml` | 외부 도구 연결 |
| Skills | `.agents/skills`, 사용자 스킬 위치 | 반복 워크플로우 |
| Subagents | `.codex/agents`, `~/.codex/agents` | 병렬 작업 |
| Memories | `~/.codex/memories`, `config.toml` | 이전 작업 맥락 재사용 |
| Hooks | `hooks.json`, `config.toml` | 생명주기 자동화 |
| Rules | `.codex/rules`, `~/.codex/rules` | 샌드박스 밖 명령 실행 제어 |
| Plugins | Plugin Directory, plugin browser | 설치형 워크플로우 |

## 공식 문서 기준

- <https://developers.openai.com/codex/guides/agents-md/>
- <https://developers.openai.com/codex/config-basic>
- <https://developers.openai.com/codex/cli/slash-commands/>
- <https://developers.openai.com/codex/mcp/>
- <https://developers.openai.com/codex/skills>
- <https://developers.openai.com/codex/subagents>
- <https://developers.openai.com/codex/memories>
- <https://developers.openai.com/codex/hooks>
- <https://developers.openai.com/codex/rules>
- <https://developers.openai.com/codex/plugins>

## 이력관리

- 2026-05-11: Codex 핵심 개념 문서 추가
- 
