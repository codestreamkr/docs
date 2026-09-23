# Claude Code 환경 설정

사용자 공통 확장, 프로젝트 작업 기준과 Claude Code 실행 설정을 역할에 맞는 위치에 둬요.

## 설치

설치 방법은 하나만 고르면 돼요.  
여러 방법으로 설치하면 `claude` 명령이 충돌해요.

```bash
# 맥/리눅스/WSL 설치 스크립트
curl -fsSL https://claude.ai/install.sh | bash
```

```powershell
# 윈도우 PowerShell 설치 스크립트
irm https://claude.ai/install.ps1 | iex
```

| 방법 | 명령 | 자동 업데이트 |
| --- | --- | --- |
| 설치 스크립트 | 위 명령 | 있음 |
| Homebrew | `brew install --cask claude-code` | 없음 |
| WinGet | `winget install Anthropic.ClaudeCode` | 없음 |
| npm | `npm install -g @anthropic-ai/claude-code` | 있음 |

설치 스크립트로 설치하면 백그라운드에서 자동으로 업데이트돼요.  
업데이트 시점을 늦추려면 `settings.json`에 `"autoUpdatesChannel": "stable"`을 두면 약 1주 지난 버전을 받아요.

터미널 대신 GUI를 쓰려면 [데스크톱 앱](https://code.claude.com/docs/ko/desktop-quickstart)을 설치해요.  
설정 파일은 CLI와 같은 `~/.claude/`를 공유해요.

## 인증

Claude Code는 Pro, Max, Team, Enterprise 또는 Console 계정이 필요해요.  
무료 claude.ai 플랜에는 포함되지 않아요.

- 설치 후 `claude`를 실행하면 브라우저 로그인이 열려요.
- `ANTHROPIC_API_KEY`가 설정돼 있으면 브라우저 대신 키 승인을 한 번 물어봐요.
- 로그인 상태와 계정 전환은 `claude auth`에서 관리해요.

## 실행

```bash
# 기본
claude

# 첫 요청과 함께 시작
claude "주문 취소 흐름을 먼저 파악해줘"

# 최근 대화 계속
claude -c

# 별도 worktree에서 시작
claude -w

# 백그라운드 세션으로 시작 (다시 열 때 쓸 id를 출력해요)
claude --bg

# 설정 문제를 의심할 때 (커스터마이징 전부 비활성)
claude --safe-mode

# 그 외
claude doctor
claude update
claude --version
```

## 권한과 안전 기준

권한 모드는 Claude가 작업 전에 물어볼지를 정해요.  
세션 중에는 Shift+Tab으로 바꿔요.

| 모드 | 묻지 않고 실행하는 범위 | 쓰는 상황 |
| --- | --- | --- |
| `default` | 읽기만 | 모든 작업을 직접 검토할 때 |
| `plan` | 읽기와 탐색, 편집은 계획 승인까지 차단 | 변경 전에 코드를 파악할 때 |
| `acceptEdits` | 읽기, 파일 편집, 일반 파일시스템 명령 | 검토 중인 코드를 반복해 고칠 때 |
| `auto` | 별도 분류기가 검사한 모든 작업 | 긴 작업에서 확인 요청을 줄일 때 |
| `dontAsk` | 읽기와 사전 승인 도구, 나머지는 거부 | CI와 스크립트 |
| `bypassPermissions` | 모든 작업 | 격리된 컨테이너와 VM에서만 |

```bash
claude --permission-mode plan
```

Pro, Max, Team 플랜의 기본 시작 모드는 `auto`예요.

안전 기준:

- `--dangerously-skip-permissions`와 `bypassPermissions`는 격리된 실행 환경에서만 써요.
- 외부에 영향을 주는 명령은 `permissions.deny`로 막아요. deny 규칙은 모든 모드에서 적용돼요.
- 맥, 리눅스, WSL2에서는 Bash 샌드박스를 함께 켜면 명령이 닿는 범위까지 제한할 수 있어요.
- `--restricted`는 명령 실행 도구를 아예 빼고 실행해요. 낯선 저장소를 읽기만 할 때 써요.

## 모델과 응답 설정

세션마다 바꿀 수 있고, `settings.json`에 기본값을 둘 수도 있어요.

| 하려는 것 | `settings.json` 키 | 세션·실행 시 변경 |
| --- | --- | --- |
| 기본 모델 지정 | `model` | `/model` |
| 기본 모델이 막혔을 때 대체 | `fallbackModel` | `--fallback-model` 옵션 |
| 추론 수준 조정 | `effortLevel` | `/effort` |
| 같은 모델로 더 빠르게 응답 | 없음 | `/fast` |
| 자동 요약 시점 조정 | 없음 | `--autocompact` 옵션 |

긴 분석에는 높은 effort, 반복 수정에는 빠른 모드가 맞아요.  
빠른 모드는 지원하는 모델에서만 켜져요.  
어느 쪽이든 결과의 근거는 직접 확인해요.

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `~/.claude/skills/` | 여러 프로젝트에서 개인적으로 사용하는 Skill |
| `<repo>/.claude/skills/` | 저장소에서 공유하는 프로젝트 Skill |
| `<repo>/CLAUDE.md` 또는 `<repo>/.claude/CLAUDE.md` | 프로젝트 작업 기준과 정본 문서 안내 |
| `<repo>/CLAUDE.local.md` | Git에 포함하지 않는 개인 프로젝트 지침 |
| `<repo>/.claude/rules/` | 파일 경로별로 적용할 규칙 |
| `~/.claude/CLAUDE.md` | 모든 프로젝트에 적용할 개인 지침 |
| `~/.claude/settings.json` | 사용자 실행 설정 |
| `<repo>/.claude/settings.json` | 팀과 공유하는 프로젝트 설정 |
| `<repo>/.claude/settings.local.json` | Git에 포함하지 않는 개인 프로젝트 설정 |
| `<repo>/.claude/agents/` | 역할이 고정된 Subagent |
| `<repo>/.mcp.json` | 팀과 공유하는 MCP 서버 연결 |
| `~/.claude/plugins/` | 설치한 Plugin |

Claude Code가 제공하는 번들 Skill은 제품이 관리하며 사용자 Skill과 이름이 겹치면 사용자 Skill이 우선해요.

## 커밋 기준

같은 `.claude/` 아래에 있어도 공유 대상이 달라요.

| 구분 | 대상 |
| --- | --- |
| 팀과 공유 | `CLAUDE.md`, `.claude/rules/`, `.claude/settings.json`, `.claude/skills/`, `.claude/agents/`, `.mcp.json` |
| 개인 전용 | `CLAUDE.local.md`, `.claude/settings.local.json` |
| 저장소에 두지 않음 | 토큰, 비밀번호, 접속 정보 |

개인 전용 파일은 `.gitignore`에 넣어요.  
비밀값은 설정 본문에 적지 않고 환경 변수로 넘겨요.

## 사용자 Skill 확인

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
clone과 배치 절차는 해당 저장소를 따라요.

Claude Code는 `~/.claude/skills/`에서 인식해요.

```text
~/.claude/skills/
├── ct-code-spring/
├── ct-code-tree/
├── ct-code-tree-test/
├── ct-data-query/
├── ct-docs-impl/
├── ct-docs-md-format/
├── ct-plan-ext/
├── ct-plan-work/
├── ct-qa-flow/
├── ct-run-script/
├── ct-wiki-api/
└── ct-wiki-ops/
```

새 세션에서 `/`를 입력해 실제 노출 목록을 확인해요.  
기존 skills 디렉터리 안에서 Skill을 추가하거나 수정하면 세션을 다시 시작하지 않아도 반영돼요.  
세션을 시작한 뒤에 skills 디렉터리를 새로 만들었다면 Claude Code를 다시 시작해요.

## 프로젝트 지침

프로젝트에 계속 적용할 짧은 기준과 정본 위치를 `CLAUDE.md`에 적어요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

작성 기준:

- 파일당 200줄 이하를 목표로 하고 매 세션에 필요한 사실만 남겨요.
- 여러 단계의 절차는 `CLAUDE.md`가 아니라 Skill로 나눠요.
- 특정 경로에만 필요한 기준은 `.claude/rules/`에 `paths` 조건과 함께 둬요.
- 다른 파일을 함께 읽히려면 `@path/to/file` 형식으로 가져와요.
- `/init`으로 초안을 만들고 프로젝트에서 직접 확인한 내용을 보완해요.

`AGENTS.md`를 쓰는 저장소는 그대로 둬도 돼요.  
작업 디렉터리와 상위에 `CLAUDE.md`나 `CLAUDE.local.md`가 없으면 Claude Code가 `AGENTS.md`를 직접 읽어요.  
둘 다 있으면 `CLAUDE.md`만 읽으므로, 두 파일을 함께 쓰려면 `CLAUDE.md`에서 `@AGENTS.md`로 가져와요.

## Settings

`settings.json`에는 Claude Code 실행에 필요한 설정을 둬요.

- 도구 권한의 허용과 차단
- 환경 변수
- Hook
- MCP 서버 사용 여부
- 모델, 업데이트 채널과 컨텍스트 동작

우선순위는 관리 정책, CLI 옵션, `settings.local.json`, `settings.json`, 사용자 설정 순이에요.  
프로젝트의 코드 규칙과 문서 책임은 Settings가 아니라 `CLAUDE.md`에서 관리해요.

## 적용 확인

새 세션을 열고 다음 항목을 확인해요.  
버전이 올라가면 같은 순서로 다시 확인해요.

| 확인할 것 | 방법 |
| --- | --- |
| 설치 버전 | `claude --version` |
| 현재 작업 루트와 로그인 상태 | `/status` |
| 적용된 지침 파일 | `/context`의 Memory files |
| 사용자 Skill 노출 | `/` 목록에서 `ct-*` 확인 |
| 외부 연결 | `/mcp` |
| 권한 범위 | `/permissions` |
| 바뀐 옵션 | `claude --help` |

## 설정이 깨졌을 때

| 증상 | 확인 순서 |
| --- | --- |
| 실행이나 설정이 이상함 | `claude doctor` → 세션에서 `/doctor` |
| 지침이나 Skill이 적용되지 않음 | `claude --safe-mode`로 커스터마이징을 끄고 재현 여부 확인 |
| 변경이 잘못 반영됨 | `/rewind`로 이전 지점으로 되돌리기 |
| 원인을 못 찾음 | `claude --debug`로 실행하고 로그 확인 |

`--safe-mode`에서 증상이 사라지면 원인은 지침 파일, Skill, Hook, Plugin, MCP 중 하나예요.  
하나씩 되돌리며 좁혀요.

## 확인 기준

2026-09-23에 Claude Code 2.1.280으로 확인했어요.  
설치 경로, 명령과 옵션은 버전마다 달라지므로 공식 문서를 함께 봐요.

## 공식 문서

- [Quickstart](https://code.claude.com/docs/ko/quickstart)
- [설치와 업데이트](https://code.claude.com/docs/ko/setup)
- [Memory와 CLAUDE.md](https://code.claude.com/docs/ko/memory)
- [권한 모드](https://code.claude.com/docs/ko/permission-modes)
- [Settings](https://code.claude.com/docs/ko/settings)
- [Skills](https://code.claude.com/docs/ko/skills)
