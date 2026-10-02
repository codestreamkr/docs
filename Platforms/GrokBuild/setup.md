# Grok Build 환경 설정

설치, 인증, 사용자 Skill, 프로젝트 지침과 실행 설정을 책임별 위치에 나눠 둬요.  
일상 작업은 설정을 마친 뒤 열린 세션의 입력창에서 진행해요.

## 설치와 첫 실행

```bash
# macOS, Linux, WSL
curl -fsSL https://x.ai/cli/install.sh | bash

# 설치 확인과 첫 세션
grok --version
grok
```

Windows PowerShell에서는 `irm https://x.ai/cli/install.ps1 | iex`를 실행해요.  
설치 방법과 업데이트는 [Grok Build 개요](https://docs.x.ai/build/overview)와 `grok update`를 확인해요.

## 인증

처음 `grok`를 실행하면 브라우저에서 로그인해요.  
브라우저를 열 수 없는 환경은 `XAI_API_KEY` 환경 변수 또는 `grok login --device-auth`를 사용해요.  
API 키와 인증 정보는 저장소나 설정 파일에 직접 기록하지 않아요.  
로그아웃은 `grok logout`으로 관리해요.

## 사용자 Skill

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 사용해요.  
Grok Build는 `~/.agents/skills/`, `~/.grok/skills/`, Claude 호환 위치의 `~/.claude/skills/`를 읽을 수 있어요.

```bash
grok inspect
```

`grok inspect`의 Skill 목록과 세션 입력창의 `/skills`에서 `ct-*`가 노출되는지 확인해요.  
사용자 Skill은 `/ct-*`로 직접 호출해요.

## 프로젝트 지침

프로젝트에 계속 적용할 짧은 기준과 정본 위치는 `<repo>/AGENTS.md`에 둬요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

저장소 루트부터 현재 디렉터리까지의 지침이 적용되고, 하위 디렉터리 지침이 뒤에 와요.  
프로젝트 지침과 Skill은 폴더를 신뢰한 뒤에 읽으므로 `/hooks-trust` 또는 `--trust`로 신뢰 상태를 기록해요.  
세션에만 필요한 기준은 `--rules`로 추가해요.

## 권한과 실행 범위

권한 모드는 도구 실행 전에 물어볼 범위를 정해요.  
세션에서는 Shift+Tab, `/auto`, `/always-approve`로 현재 동작을 바꿀 수 있어요.

| 모드 | 적합한 작업 |
| --- | --- |
| `plan` | 구현 전에 계획을 검토할 때 |
| `acceptEdits` | 검토한 파일을 반복해서 고칠 때 |
| `auto` | 긴 작업에서 일반 승인 요청을 줄일 때 |
| `dontAsk` | 승인할 수 없는 자동화 |
| `bypassPermissions` | 격리된 실행 환경에서만 |

`deny` 규칙은 허용 규칙보다 우선해요.  
Sandbox와 제품 Plan 모드의 상세 동작은 [권한과 Plan 모드](./reference/01-permissions-and-plan-mode.md)를 봐요.

## 모델과 실행 설정

세션 입력창의 `/model`, `/effort`로 현재 세션의 모델과 추론 수준을 조정해요.  
기본 모델, reasoning 수준, 추가 Skill 경로와 사용자 권한 기본값은 `~/.grok/config.toml`에 둬요.

```toml
[models]
default_reasoning_effort = "medium"

[skills]
paths = ["~/my-team-skills"]

[ui]
permission_mode = "auto"
```

현재 모델 ID는 `grok models` 또는 `/model`에서 확인해요.  
프로젝트 `.grok/config.toml`은 MCP, Plugin과 권한 규칙처럼 팀에서 공유할 항목에 사용해요.

프로젝트 설정의 같은 이름 MCP와 Plugin은 현재 디렉터리, 저장소 루트, 사용자 설정 순으로 대체될 수 있어요.  
권한 규칙은 함께 적용하고 `deny`가 `ask`, `allow`보다 우선해요.

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `~/.grok/skills/` | 개인 Skill |
| `<repo>/.grok/skills/` | 팀 Skill |
| `~/.agents/skills/`, `<repo>/.agents/skills/` | 공유 Skill 정본과 호환 Skill |
| `AGENTS.md` | 프로젝트 작업 기준과 정본 안내 |
| `~/.grok/rules/` | 모든 프로젝트에 적용할 개인 규칙 |
| `~/.grok/config.toml` | 사용자 실행 설정, 모델과 MCP 연결 |
| `<repo>/.grok/config.toml` | 팀 공유 MCP, Plugin과 권한 규칙 |
| `<repo>/.grok/hooks/` | 프로젝트 생명주기 스크립트 |
| `~/.grok/agents/`, `<repo>/.grok/agents/` | Agent Profile과 Subagent 정의 |
| `~/.grok/plugins/`, `<repo>/.grok/plugins/` | Plugin |

Grok Build는 Claude 호환 Skill, `CLAUDE.md`, `.mcp.json`, `.claude/settings.json`과 Plugin도 읽을 수 있어요.  
호환 탐색의 세부 범위는 현재 설치된 도움말과 `grok inspect`를 기준으로 확인해요.  
비밀값은 환경 변수나 `auth_provider`로 전달해요.

### 다른 도구 호환

Claude Code 없이도 Grok Build를 사용할 수 있어요.  
Claude와 Cursor 호환 설정을 켜면 기존 Skill, 지침, MCP, Hook과 Plugin을 발견할 수 있어요.

| 위치 | 호환으로 발견할 수 있는 내용 |
| --- | --- |
| `~/.claude/skills/`, `<repo>/.claude/skills/` | Skill |
| `CLAUDE.md`, `.claude/CLAUDE.md` | 프로젝트 지침 |
| `.mcp.json`, `~/.claude.json` | MCP 서버 |
| `.claude/settings.json` | 권한 등 실행 설정 |
| `.claude/plugins/` | Plugin |

호환 탐색은 `[compat.claude]`, `[compat.cursor]` 설정으로 조정할 수 있어요.  
지원 범위가 바뀔 수 있으므로 활성 항목은 `grok inspect`로 확인해요.

## 진단과 적용 확인

`grok inspect`로 현재 디렉터리에서 인식한 구성을 확인해요.

| 확인할 것 | 방법 |
| --- | --- |
| 설치 버전 | `grok --version` |
| 현재 작업 루트와 Git 루트 | `grok inspect` |
| 적용된 프로젝트 지침과 Skill | `grok inspect`, `/skills` |
| 연결된 Plugin과 MCP | `grok inspect`, `/plugins`, `/mcps` |
| 권한 규칙과 신뢰 상태 | `grok inspect` |
| 터미널 문제 | `grok doctor` |

## 확인 기준

이 문서는 2026-10-01에 Grok Build 1.0.41로 설치된 CLI 도움말을 확인해 정리했어요.

## 공식 문서

- [Grok Build 개요](https://docs.x.ai/build/overview)
- [Settings](https://docs.x.ai/build/settings)
- [Enterprise 인증](https://docs.x.ai/build/enterprise)
