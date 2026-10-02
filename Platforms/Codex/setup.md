# Codex 환경 설정

CLI에서 설치·로그인·첫 요청을 완료하고 작업에 맞는 접근 범위를 선택해요.

## 설치와 첫 실행

macOS·Linux:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Windows PowerShell:

```powershell
irm https://chatgpt.com/codex/install.ps1 | iex
```

설치 후 프로젝트 루트의 터미널에서 세션을 열어요.

```bash
codex --version
codex
```

열린 입력창에서 [바로 시작](./README.md#바로-시작)의 Skill을 호출하거나 자연어로 요청해요.  
현재 작업 루트는 `/status`로 확인해요.  
다른 경로를 지정해 시작할 때만 `codex -C /path/to/project`를 사용해요.

## 인증

첫 실행의 로그인 안내에서 제공되는 인증 방식을 선택해요.  
로그인이 필요하면 입력창 밖의 터미널에서 `codex login`을 실행해요.  
로그인 상태는 `codex login status`로 확인해요.  
계정과 조직 정책에 따라 사용할 수 있는 기능이 달라질 수 있어요.

## 사용자 Skill

1. [ai-comm-init](https://github.com/codestreamkr/ai-comm-init)의 설치·배치 절차를 따라요.
2. `~/.agents/skills/`의 각 Skill 폴더에 `SKILL.md`가 있는지 확인해요.
3. CLI 입력창에서 `/skills`를 열고 필요한 Skill을 선택해요.
4. `$ct-plan`처럼 이름만 호출해 사용 안내를 확인해요.

8개 목록과 선택 기준은 [사용자 Skill](./skills.md)에서 관리해요.  
설치한 Skill이 보이지 않으면 Codex를 다시 시작해요.

## 프로젝트 지침

- 전역 지침을 먼저 읽고 저장소 루트부터 현재 작업 디렉터리까지의 지침을 결합해요.
- 전역과 프로젝트의 각 위치에서는 `AGENTS.override.md`, `AGENTS.md` 순서로 비어 있지 않은 파일 하나를 선택해요.
- 하위 경로의 지침이 앞선 지침을 구체화하거나 재정의해요.
- 기본 지침 총량은 32 KiB이며, 더 필요하면 `project_doc_max_bytes`를 조정해요.
- 프로젝트에는 실제 실행 명령과 정본 위치처럼 계속 적용할 짧은 기준을 둬요.

```markdown
# 프로젝트 작업 기준

- 먼저 README.md에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 영역의 기존 코드와 문서를 확인한다.
- 빌드와 테스트: README.md
- API 계약: docs/api.md
```

설정 후 새 작업에서 “현재 적용된 지침 파일과 작업 루트를 알려줘”라고 요청해요.

## 권한과 실행 범위

먼저 입력창의 `/status`에서 현재 범위를 확인하고, `/permissions`에서 작업에 맞는 모드를 선택해요.  
조사만 할 때는 읽기 전용, 파일 수정과 테스트가 필요하면 작업 공간 수정 모드를 선택해요.

- 샌드박스: 명령이 접근할 수 있는 파일·네트워크 범위를 정해요.
- 승인 정책: 그 범위를 넘는 작업 등에 사용자 확인을 요청할지 정해요.
- `on-request`: Codex가 필요하다고 판단하면 승인을 요청해요.
- `never`: 승인을 요청하지 않아요. 샌드박스 밖 작업이 자동으로 허용되는 것은 아니에요.

시작할 때 범위를 지정하거나 추가 디렉터리가 필요하면 터미널 옵션을 사용해요.

```bash
# 읽기 위주 조사, 필요시 승인 요청
codex --sandbox read-only --ask-for-approval on-request

# 작업 공간에서 수정·실행, 필요시 승인 요청
codex --sandbox workspace-write --ask-for-approval on-request

# 추가 디렉터리에도 쓰기가 필요한 작업
codex --sandbox workspace-write --add-dir /path/to/shared --ask-for-approval on-request
```

- `/status`에서 현재 상태를 보고 `/permissions`에서 지원되는 권한 모드를 확인해요.
- `workspace-write`에서도 `.git`, `.agents`, `.codex` 같은 보호 경로와 네트워크 접근은 별도 제한을 받을 수 있어요.
- `--approve-for-me`는 승인 요청을 자동 검토로 보내는 CLI 옵션이에요. 일반 `on-request`와 구분해요.
- `--dangerously-bypass-approvals-and-sandbox`는 승인과 샌드박스를 모두 해제해요. 외부에서 격리된 실행 환경에 한해 검토해요.
- 조직에서 강제한 정책은 사용자 옵션만으로 해제할 수 없어요.

## 모델과 실행 설정

세션의 모델과 추론 수준은 입력창의 `/model`에서 선택해요.  
계획 모드 전환은 `/plan`, 권한 조정은 `/permissions`에서 진행해요.  
기본 실행 설정은 `config.toml`, 계속 적용할 작업 기준은 `AGENTS.md`에 둬요.

- `config.toml`: 모델·reasoning, 승인·샌드박스, MCP와 UI 설정
- `AGENTS.md`: 코드 규칙, 작업 기준과 정본 안내
- 비밀값: 환경변수나 지원되는 인증 저장소

프로젝트 실행 설정의 최소 예:

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
```

설정은 다음 순서로 우선해요.

1. CLI 옵션과 `--config` 지정값
2. 신뢰된 프로젝트의 `.codex/config.toml` — 현재 디렉터리에 가까운 설정 우선
3. `--profile`로 선택한 프로필 파일
4. 사용자 `~/.codex/config.toml`
5. 조직에서 배포한 기본 설정
6. 시스템 설정
7. 제품 기본값

프로젝트가 신뢰되지 않으면 프로젝트 설정 계층을 읽지 않아요.  
조직이 강제하는 제한은 이 우선순위와 별도로 적용돼요.

## 저장 위치

아래 `~/.codex`는 기본 Codex 홈이에요.  
`CODEX_HOME`을 지정했다면 해당 경로를 사용해요.

| 위치 | 책임 |
| --- | --- |
| `~/.agents/skills/` | 여러 프로젝트에서 개인적으로 사용하는 Skill |
| `<repo>/.agents/skills/` | 저장소에서 공유하는 Skill |
| `~/.codex/AGENTS.md` | 사용자 공통 작업 기준 |
| `<repo>/AGENTS.md` | 프로젝트 작업 기준과 정본 문서 안내 |
| 하위 `AGENTS.md` | 해당 경로의 추가 기준 |
| `AGENTS.override.md` | 같은 위치의 `AGENTS.md`를 대신하는 지침 |
| `~/.codex/config.toml` | 사용자 실행 설정과 MCP 연결 |
| `<repo>/.codex/config.toml` | 신뢰된 프로젝트의 실행 설정 |

## 진단과 적용 확인

| 증상 | 확인할 것 |
| --- | --- |
| Skill이 보이지 않아요 | 배치 경로, `SKILL.md`, 비활성화 설정 확인 후 재시작 |
| 프로젝트 규칙이 적용되지 않아요 | 작업 루트, 상위 지침, `AGENTS.override.md` 확인 |
| 프로젝트 Config가 적용되지 않아요 | 프로젝트 신뢰 여부, CLI 옵션과 더 가까운 설정 확인 |
| 파일 수정·명령 실행이 막혀요 | `/status`, `/permissions`, 보호 경로와 네트워크 제한 확인 |
| MCP를 사용할 수 없어요 | [연결 확인](./extensions.md), 서버 실행 상태와 인증 확인 |
| 명령이 보이지 않아요 | 제품·버전과 [명령 확인](./commands.md)의 도움말 확인 |

설치 상태는 터미널에서 `codex doctor`, 현재 버전은 `codex --version`으로 확인해요.  
업데이트는 `codex update` 또는 사용한 패키지 관리자의 명령을 사용해요.  
터미널 스크롤 기록을 유지하려면 시작할 때 `codex --no-alt-screen`을 사용해요.

## 확인 기준

2026-10-01에 공식 문서와 설치된 Codex CLI `0.158.0`의 도움말을 확인했어요.  
새 세션에서 작업 루트, 적용 지침, Skill 목록과 권한을 확인해요.

| 확인할 것 | 방법 |
| --- | --- |
| 작업 루트와 권한 | `/status`, `/permissions` |
| 모델과 추론 수준 | `/model` |
| 적용 지침 | `현재 적용된 지침 파일을 알려줘`라고 요청 |
| 사용자 Skill | `/skills` |
| MCP 연결 | `/mcp` |
| CLI 옵션 | 터미널의 `codex --help` |

인증과 설정을 바꾼 뒤에는 새 세션에서 적용 결과를 확인해요.

## 공식 문서

- [CLI 설치와 로그인](https://learn.chatgpt.com/docs/codex/cli)
- [승인과 샌드박스](https://learn.chatgpt.com/docs/agent-approvals-security)
- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Config 기본과 우선순위](https://learn.chatgpt.com/docs/config-file/config-basic)
- [Skill 검색 위치](https://learn.chatgpt.com/docs/build-skills)
- [인증](https://learn.chatgpt.com/docs/auth)
- [CLI 입력창 명령](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
