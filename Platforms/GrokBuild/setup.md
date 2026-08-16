# Grok Build 환경 설정

사용자 공통 확장, 프로젝트 작업 기준과 Grok Build 실행 설정을 역할에 맞는 위치에 둔다.

## 설치와 로그인

설치 스크립트로 설치하고 로그인한다.

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
cd /path/to/project
grok login
grok
```

설치 상태와 버전은 다음 명령으로 확인한다.

```bash
grok version
grok doctor
grok update
```

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `~/.grok/skills/` | 여러 프로젝트에서 개인적으로 사용하는 Skill |
| `<repo>/.grok/skills/` | 저장소에서 공유하는 프로젝트 Skill |
| `<repo>/AGENTS.md` | 프로젝트 작업 기준과 정본 문서 안내 |
| `~/.grok/rules/` | 모든 프로젝트에 적용할 개인 규칙 |
| `~/.grok/config.toml` | 사용자 실행 설정, 모델과 MCP 연결 |
| `<repo>/.grok/config.toml` | 저장소에서 공유하는 프로젝트 설정 |
| `<repo>/.grok/hooks/` | 프로젝트 생명주기 스크립트 |
| `~/.grok/agents/`, `<repo>/.grok/agents/` | Agent Profile과 Subagent 정의 |
| `~/.grok/plugins/`, `<repo>/.grok/plugins/` | Plugin |

같은 이름의 Skill은 현재 디렉터리, 저장소, 사용자 순으로 우선한다. Grok은 작업 디렉터리와 저장소 루트 사이의 `.grok/skills/`도 읽는다.

## Claude Code 호환

Grok Build은 Claude Code 없이도 동작한다. 다만 기본으로 Claude 호환을 켜 두어 기존 Claude 설정을 함께 읽는다. Cursor 경로도 같은 방식으로 읽을 수 있다.

| 위치 | 호환으로 읽는 내용 |
| --- | --- |
| `~/.claude/skills/`, `<repo>/.claude/skills/` | Skill |
| `CLAUDE.md`, `.claude/CLAUDE.md` | 프로젝트 지침 |
| `.mcp.json`, `~/.claude.json` | MCP 서버 |
| `.claude/settings.json` | 권한 등 실행 설정 |
| `.claude/plugins/` | Plugin |

CodeStream 사용자 Skill이 `~/.claude/skills/`에 있으면 별도 복사 없이 인식된다. 호환 탐색을 끄려면 `[compat.claude]`에서 해당 항목을 `false`로 둔다.

## 사용자 Skill 확인

CodeStream 사용자 Skill은 `~/.grok/skills/` 또는 Claude 호환 위치에서 인식된다.

```bash
grok inspect
```

```text
Skills (31)
└ ct-calltree                 user
└ ct-external-architect       user
└ ct-plan                     user
...
```

세션에서는 `/skills`로 현재 목록을 확인한다. 사용자 Skill은 `/ct-*`로 직접 호출한다.

## 프로젝트 AGENTS.md

프로젝트에 계속 적용할 짧은 기준과 정본 위치를 기록한다.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

적용 기준:

- 파일은 절단되지 않는다. 짧고 구체적인 기준만 남긴다.
- 저장소 루트부터 현재 디렉터리까지의 파일을 모두 읽고, 하위 디렉터리의 내용이 뒤에 온다.
- `~/.grok/rules/`에 둔 파일은 모든 프로젝트에 적용된다.
- 세션에만 필요한 기준은 `--rules`로 추가한다.

프레임워크 일반 지식이나 Grok Build이 현재 환경에서 확인할 수 있는 기능 목록은 반복하지 않는다.

## Config

`config.toml`에는 Grok Build 실행에 필요한 설정을 둔다.

- 기본 모델과 reasoning 수준
- 권한 모드와 자동 승인
- 추가 Skill·Plugin 경로
- MCP 서버 연결
- Subagent 사용 여부와 모델 지정

```toml
[models]
default = "grok-4.6"
default_reasoning_effort = "medium"

[skills]
paths = ["~/my-team-skills"]

[ui]
permission_mode = "auto"
```

프로젝트의 코드 규칙과 문서 책임은 Config가 아니라 `AGENTS.md`에서 관리한다. 비밀값은 설정 본문에 기록하지 않고 환경 변수나 `auth_provider` 명령을 사용한다.

## 적용 확인

`grok inspect`로 현재 디렉터리에서 인식된 구성을 확인한다.

- 현재 작업 루트와 Git 루트
- 적용된 프로젝트 지침 파일
- 사용할 수 있는 Skill과 Agent
- 연결된 Plugin과 MCP
- 권한 규칙과 신뢰 상태

## 공식 문서

- [Grok Build 소개](https://x.ai/news/grok-build-cli)
- 설치된 전체 문서: `~/.grok/README.md`
- 기능별 사용자 가이드: `~/.grok/docs/user-guide/`
- 변경 이력: `~/.grok/CHANGELOG.md`
