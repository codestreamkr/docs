# Claude Code 환경 설정

설치, 인증, 지침과 실행 설정을 책임별 위치에 나눠 둬요.  
일상 작업은 설정을 마친 뒤 열린 세션의 입력창에서 진행해요.

## 설치와 첫 실행

공식 권장 방법은 네이티브 설치예요.  
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
| Homebrew stable | `brew install --cask claude-code` | `brew upgrade claude-code` |
| Homebrew latest | `brew install --cask claude-code@latest` | `brew upgrade claude-code@latest` |
| WinGet | `winget install Anthropic.ClaudeCode` | `winget upgrade Anthropic.ClaudeCode` |
| npm | `npm install -g @anthropic-ai/claude-code` | 쓰기 권한이 있으면 자동 업데이트 |

네이티브 설치는 Node.js가 필요 없어요.  
npm 설치는 Node.js 22 이상과 optional dependencies를 요구하고, 같은 네이티브 바이너리를 설치해요.  
npm으로 직접 업데이트할 때는 `npm install -g @anthropic-ai/claude-code@latest`를 실행해요.

### 업데이트 방법과 채널

- 네이티브 자동 업데이트는 다음 실행부터 적용돼요.
- `autoUpdatesChannel`의 기본값 `latest`는 새 릴리스를 바로 받아요.
- `stable`은 보통 약 1주 늦고, 주요 회귀 문제가 있는 릴리스를 건너뛰어요.
- Homebrew는 설정값 대신 cask 이름으로 채널을 선택해요.
- Homebrew와 WinGet은 기본적으로 수동 업데이트해요.
- `apt`, `dnf`, `apk` 설치는 시스템 패키지 관리자로 업데이트해요.

다음 설정은 네이티브 설치의 채널을 선택하는 예제예요.

```json
{
  "autoUpdatesChannel": "stable"
}
```

Homebrew·WinGet에서 백그라운드 업그레이드를 사용하려면 `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1`을 설정해요.  
WinGet은 실행 중인 바이너리 잠금 때문에 수동 업그레이드가 필요할 수 있어요.  
현재 실행 경로는 PowerShell의 `Get-Command claude -All` 또는 Bash의 `type -a claude`로 확인해요.  
설치·업데이트 상세 조건은 [공식 설치 문서](https://code.claude.com/docs/en/setup)를 확인해요.

### Windows 실행 조건

Windows 네이티브에서는 Git for Windows가 Bash 도구 사용을 위해 권장돼요.  
설치하지 않으면 PowerShell 도구를 사용해요.  
내장 Bash 샌드박스가 필요하면 WSL 2에서 설치하고 실행해요.  
Windows 네이티브와 WSL 1은 내장 Bash 샌드박스를 지원하지 않아요.

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
명령 실행과 사용자·프로젝트 설정을 제외하는 평가에는 2.1.248 이상의 `claude --restricted`를 사용해요.  
`--restricted` 자체는 읽기 전용 모드가 아니에요.  
설정 문제 조사에는 `claude --safe-mode`를 사용해요.

2026년 8월 14일부터 Pro·Max·Team의 새 세션 기본 권한 모드는 `auto`예요.  
직접 지정한 기본값과 조직 기본값은 자동으로 바뀌지 않아요.  
세션을 시작하면 상태 표시와 `/permissions`에서 실제 모드를 확인해요.  
설정 범위와 동작은 [기본 모드 변경 안내](https://code.claude.com/docs/en/whats-new/2026-w32)를 확인해요.

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

### 새 모델과 호환성

| 모델 | 최소 Claude Code 버전 | 고정 모델 ID |
| --- | --- | --- |
| Haiku 5.5 | 2.1.293 | `claude-haiku-5-5` |
| Sonnet 5.5 | 2.1.284 | `claude-sonnet-5-5` |
| Opus 5.5 | 2.1.280 | `claude-opus-5-5` |
| Fable 5.1 | 2.1.257 | `claude-fable-5-1` |

1. `claude --version`으로 최소 버전을 확인해요.
2. `/model`에서 계정과 공급자가 제공하는 모델을 확인해요.
3. 재현 가능한 자동화에는 지원되는 고정 모델 ID를 사용해요.
4. 모델을 바꾼 뒤 `/effort`로 추론 수준을 확인해요.

```text
/model claude-sonnet-5-5
/effort medium
```

`opus`, `sonnet`, `haiku` 별칭은 공급자별로 다른 버전을 가리킬 수 있어요.  
5.5 모델의 기본 추론 수준은 `medium`이고, thinking을 끌 수 없어요.  
`/effort`는 모델별 값을 저장해요.  
선택창에서 `s`를 누르면 현재 세션에만 적용해요.  
예전 사용자 설정의 최상위 `effortLevel`은 Opus 5.5 이후 새 모델에 자동 승계되지 않아요.  
Fable은 조직의 모델 접근 권한을 요구해요.

공급자별 모델과 설정 우선순위는 [모델 설정](https://code.claude.com/docs/en/model-config)을 확인해요.

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
