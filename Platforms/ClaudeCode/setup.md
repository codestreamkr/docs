# Claude Code 환경 설정

설치, 인증, 지침과 실행 설정을 책임별 위치에 나눠 둬요.  
일상 작업은 설정을 마친 뒤 열린 세션의 입력창에서 진행해요.

## 설치와 첫 실행

설치 방법은 하나만 선택해 `claude` 명령 충돌을 피해야 해요.

```bash
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash

# 설치 확인과 첫 세션
claude --version
claude
```

Windows PowerShell에서는 `irm https://claude.ai/install.ps1 | iex`를 실행해요.  
Homebrew, WinGet, npm 설치 방법과 업데이트 정책은 [설치와 업데이트](https://code.claude.com/docs/ko/setup)를 확인해요.  
터미널 대신 GUI를 쓰려면 [데스크톱 앱](https://code.claude.com/docs/ko/desktop-quickstart)을 설치할 수 있어요.  
설치 스크립트로 설치한 경우 자동 업데이트 채널은 `settings.json`의 `autoUpdatesChannel`로 조정할 수 있어요.

| 방법 | 설치 명령 | 업데이트 |
| --- | --- | --- |
| 설치 스크립트 | 위 설치 명령 | 자동 업데이트 |
| Homebrew | `brew install --cask claude-code` | `brew upgrade claude-code` |
| WinGet | `winget install Anthropic.ClaudeCode` | `winget upgrade Anthropic.ClaudeCode` |
| npm | `npm install -g @anthropic-ai/claude-code` | 쓰기 권한이 있으면 자동 업데이트 |

## 인증

처음 `claude`를 실행하면 브라우저에서 로그인해요.  
Pro, Max, Team, Enterprise 또는 Console 계정의 지원 범위는 현재 요금제와 공식 안내를 확인해요.  
API 키를 쓸 때는 `ANTHROPIC_API_KEY`를 환경 변수로 설정하고 파일이나 저장소에 기록하지 않아요.  
로그인 상태와 계정 전환은 `claude auth`에서 관리해요.

## 사용자 Skill

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 사용해요.  
개인 Skill은 `~/.claude/skills/`, 팀 Skill은 `<repo>/.claude/skills/`에 둬요.

```text
~/.claude/skills/
├── ct-analyze/
├── ct-apply/
├── ct-docs-md-format/
├── ct-docs-weekly-report/
├── ct-plan/
├── ct-verify/
├── ct-wiki-api/
└── ct-wiki-ops/
```

새 세션의 입력창에서 `/`를 입력해 `ct-*`가 노출되는지 확인해요.  
기존 Skill 디렉터리에 추가하거나 수정한 Skill은 다시 시작하지 않아도 반영될 수 있지만, 세션을 시작한 뒤 디렉터리를 새로 만들었다면 Claude Code를 다시 열어요.

## 프로젝트 지침

프로젝트에 계속 적용할 짧은 기준과 정본 위치는 `<repo>/CLAUDE.md` 또는 `<repo>/.claude/CLAUDE.md`에 둬요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

파일당 200줄 이하를 목표로 하고, 여러 단계의 절차는 Skill로 나눠요.  
특정 경로 규칙은 `.claude/rules/`에 두고, 다른 문서는 `@path/to/file`로 가져와요.  
`/init`으로 초안을 만든 뒤 프로젝트에 맞게 고쳐요.  
`AGENTS.md`만 쓰는 저장소는 그대로 둘 수 있고, `CLAUDE.md`도 함께 쓸 때는 `CLAUDE.md`에서 `@AGENTS.md`로 가져와요.

## 권한과 실행 범위

권한 모드는 도구 실행 전에 물어볼 범위를 정해요.  
세션에서는 Shift+Tab 또는 `/permissions`로 현재 범위를 확인하고 조정해요.

| 모드 | 범위 | 적합한 작업 |
| --- | --- | --- |
| `plan` | 계획 파일 외 편집을 제한해요 | 변경 전 코드와 선택지를 파악할 때 |
| `acceptEdits` | 파일 편집과 일반 파일 시스템 작업을 허용해요 | 검토한 파일을 반복해서 고칠 때 |
| `auto` | 자동 분류가 허용한 도구 호출을 실행해요 | 긴 작업에서 일반 승인 요청을 줄일 때 |
| `dontAsk` | 승인할 수 없는 호출을 거부해요 | CI와 스크립트에서 승인할 수 없을 때 |
| `bypassPermissions` | 권한 검사를 우회해요 | 격리된 컨테이너나 VM에서만 |

`permissions.deny` 규칙은 모든 모드에서 적용돼요.  
`--dangerously-skip-permissions`와 `bypassPermissions`는 격리된 실행 환경에서만 사용해요.  
낯선 저장소를 읽기만 할 때는 `claude --restricted`를 사용하고, 설정 문제 조사에는 `claude --safe-mode`를 사용해요.

## 모델과 실행 설정

세션 입력창의 `/model`, `/effort`, `/fast`로 현재 세션의 모델과 응답 방식을 조정해요.  
기본값은 `~/.claude/settings.json` 또는 `<repo>/.claude/settings.json`에서 `model`, `fallbackModel`, `effortLevel`로 설정해요.  
지원되는 모델과 수준은 `/model`과 `claude --help`를 기준으로 확인해요.

| 하려는 것 | 설정 또는 입력창 |
| --- | --- |
| 기본 모델 지정 | `model`, `/model` |
| 기본 모델이 막혔을 때 대체 | `fallbackModel`, `--fallback-model` |
| 추론 수준 조정 | `effortLevel`, `/effort` |
| 지원 모델의 빠른 모드 전환 | `/fast` |
| 자동 요약 시점 조정 | `--autocompact` |

### Settings

`settings.json`에는 도구 권한의 허용·차단, 환경 변수, Hook, MCP 사용 여부, 모델과 컨텍스트 동작을 둬요.  
프로젝트의 코드 규칙과 문서 책임은 Settings가 아니라 `CLAUDE.md`에서 관리해요.  
관리 정책, CLI 옵션, 로컬 설정, 프로젝트 설정, 사용자 설정의 우선순위와 적용 결과는 현재 공식 문서를 확인해요.

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `~/.claude/skills/` | 개인 Skill |
| `<repo>/.claude/skills/` | 팀 Skill |
| `CLAUDE.md`, `.claude/CLAUDE.md` | 프로젝트 작업 기준과 정본 안내 |
| `CLAUDE.local.md` | Git에 넣지 않는 개인 지침 |
| `.claude/rules/` | 경로별 규칙 |
| `~/.claude/CLAUDE.md` | 모든 프로젝트에 적용할 개인 지침 |
| `~/.claude/settings.json` | 사용자 실행 설정 |
| `.claude/settings.json` | 팀 공유 설정 |
| `.claude/settings.local.json` | Git에 넣지 않는 개인 설정 |
| `.claude/agents/` | 프로젝트 Subagent |
| `.mcp.json` | 팀 공유 MCP 연결 |
| `~/.claude/plugins/` | 설치한 Plugin |

`CLAUDE.local.md`와 `.claude/settings.local.json`은 `.gitignore`에 넣고, 토큰·비밀번호·접속 정보는 설정 본문에 적지 않아요.

### 커밋 기준

팀과 공유할 `CLAUDE.md`, `.claude/rules/`, `.claude/settings.json`, `.claude/skills/`, `.claude/agents/`, `.mcp.json`은 저장소에서 관리해요.  
개인 전용 `CLAUDE.local.md`와 `.claude/settings.local.json`은 Git에 넣지 않아요.  
토큰, 비밀번호와 접속 정보는 어느 설정 파일에도 넣지 않아요.

## 진단과 적용 확인

새 세션을 열고 다음 항목을 확인해요.

| 확인할 것 | 방법 |
| --- | --- |
| 설치 버전 | `claude --version` |
| 현재 작업 루트와 로그인 상태 | `/status` |
| 적용된 지침 파일 | `/context`의 Memory files |
| 사용자 Skill 노출 | `/` 목록의 `ct-*` |
| 외부 연결 | `/mcp` |
| 권한 범위 | `/permissions` |
| 바뀐 옵션 | `claude --help` |

설정이 이상하면 `claude doctor`와 세션의 `/doctor`를 실행해요.  
커스터마이징을 끈 `claude --safe-mode`에서도 재현되는지 확인하고, 변경을 되돌려 조사해야 하면 `/rewind`를 사용해요.

## 확인 기준

이 문서는 2026-10-01에 Claude Code 2.1.283으로 설치된 CLI 도움말을 확인해 정리했어요.

## 공식 문서

- [Quickstart](https://code.claude.com/docs/ko/quickstart)
- [설치와 업데이트](https://code.claude.com/docs/ko/setup)
- [Memory와 CLAUDE.md](https://code.claude.com/docs/ko/memory)
- [권한 모드](https://code.claude.com/docs/ko/permission-modes)
- [Settings](https://code.claude.com/docs/ko/settings)
