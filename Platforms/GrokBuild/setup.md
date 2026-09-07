# Grok Build 환경 설정

사용자 공통 확장, 프로젝트 작업 기준과 Grok Build 실행 설정을 역할에 맞는 위치에 둬요.

## 설치와 로그인

설치 스크립트로 설치하고 실행해요.

```bash
# 맥/리눅스 설치
curl -fsSL https://x.ai/cli/install.sh | bash
```

```ps1
# 윈도우 설치
irm https://claude.ai/install.ps1 | iex
```

```bash
# 기본
grok

# 전체권한
grok --dangerously-skip-permissions

# 자동승인권한 ( 필요시 승인 요청 )
grok --permission-mode auto

# 최소화 실행 ( TUI 최소화 )
grok --minimal --no-alt-screen

# 그외
grok doctor
grok update
grok version
```

계정 로그인은 SuperGrok 또는 X Premium+ 구독을 기준으로 해요.  
처음 실행하면 브라우저로 로그인하고, 자격 증명은 `~/.grok/auth.json`에 저장돼요.  
다시 로그인하려면 `grok login`을 사용해요.

CI/CD나 브라우저 없는 환경은 [console.x.ai](https://console.x.ai)에서 발급한 키를 `XAI_API_KEY`로 둬요.  
대화형 세션이 있으면 저장된 세션이 API 키보다 우선해요.

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

같은 이름의 Skill은 현재 디렉터리, 저장소, 사용자 순으로 우선해요.  
Grok은 작업 디렉터리와 저장소 루트 사이의 `.grok/skills/`도 읽어요.

## Claude Code 호환

Grok Build은 Claude Code 없이도 동작해요.  
다만 기본으로 Claude 호환을 켜 두어 기존 Claude 설정을 함께 읽어요.  
Cursor 경로도 같은 방식으로 읽을 수 있어요.

| 위치 | 호환으로 읽는 내용 |
| --- | --- |
| `~/.claude/skills/`, `<repo>/.claude/skills/` | Skill |
| `CLAUDE.md`, `.claude/CLAUDE.md` | 프로젝트 지침 |
| `.mcp.json`, `~/.claude.json` | MCP 서버 |
| `.claude/settings.json` | 권한 등 실행 설정 |
| `.claude/plugins/` | Plugin |

CodeStream 사용자 Skill이 `~/.claude/skills/`에 있으면 별도 복사 없이 인식돼요.  
호환 탐색을 끄려면 `[compat.claude]`에서 해당 항목을 `false`로 둬요.

## 사용자 Skill 확인

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
clone과 배치 절차는 해당 저장소를 따라요.

Grok Build은 `~/.grok/skills/` 또는 Claude 호환 위치 `~/.claude/skills/`에서 인식돼요.

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

세션에서는 `/skills`로 현재 목록을 확인해요.  
사용자 Skill은 `/ct-*`로 직접 호출해요.

## 프로젝트 AGENTS.md

프로젝트에 계속 적용할 짧은 기준과 정본 위치를 기록해요.

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

- 파일은 절단되지 않아요. 짧고 구체적인 기준만 남겨요.
- 저장소 루트부터 현재 디렉터리까지의 파일을 모두 읽고, 하위 디렉터리의 내용이 뒤에 와요.
- `~/.grok/rules/`에 둔 파일은 모든 프로젝트에 적용돼요.
- 세션에만 필요한 기준은 `--rules`로 추가해요.

프레임워크 일반 지식이나 Grok Build이 현재 환경에서 확인할 수 있는 기능 목록은 반복하지 않아요.

## Config

`config.toml`에는 Grok Build 실행에 필요한 설정을 둬요.

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

프로젝트의 코드 규칙과 문서 책임은 Config가 아니라 `AGENTS.md`에서 관리해요.  
비밀값은 설정 본문에 기록하지 않고 환경 변수나 `auth_provider` 명령을 사용해요.

## 적용 확인

`grok inspect`로 현재 디렉터리에서 인식된 구성을 확인해요.

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
