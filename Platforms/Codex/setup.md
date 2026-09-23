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

설치 후 프로젝트 경로를 지정해 실행하고 첫 화면의 로그인 안내를 따라요.
`/path/to/project`는 실제 프로젝트 경로로 바꿔요.

```bash
codex --version
codex -C /path/to/project
```

- 첫 요청: [바로 시작](./README.md#바로-시작)의 작업 루트·지침·테스트 확인 예제를 사용해요.
- 로그인 확인: `codex login status`
- 설치·설정 진단: `codex doctor`
- 업데이트: `codex update` 또는 사용한 패키지 관리자의 업데이트 명령
- 터미널 스크롤 기록 유지: `codex --no-alt-screen`

## 사용자 Skill 확인

1. [ai-comm-init](https://github.com/codestreamkr/ai-comm-init)의 설치·배치 절차를 따라요.
2. `~/.agents/skills/`의 각 Skill 폴더에 `SKILL.md`가 있는지 확인해요.
3. CLI 입력창에서 `/skills`를 열고 필요한 Skill을 선택해요.
4. `$ct-plan-work`처럼 이름만 호출해 사용 안내를 확인해요.

12개 목록과 선택 기준은 [사용자 Skill](./skills.md)에서 관리해요.  
설치한 Skill이 보이지 않으면 Codex를 다시 시작해요.

## 승인과 샌드박스

- 샌드박스: 명령이 접근할 수 있는 파일·네트워크 범위를 정해요.
- 승인 정책: 그 범위를 넘는 작업 등에 사용자 확인을 요청할지 정해요.
- `on-request`: Codex가 필요하다고 판단하면 승인을 요청해요.
- `never`: 승인을 요청하지 않아요. 샌드박스 밖 작업이 자동으로 허용되는 것은 아니에요.

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

## AGENTS.md 적용

- 전역 지침을 먼저 읽고 저장소 루트부터 현재 작업 디렉터리까지의 지침을 결합해요.
- 각 위치에서는 `AGENTS.override.md`를 `AGENTS.md`보다 먼저 선택해요.
- 하위 경로의 지침이 앞선 지침을 구체화하거나 재정의해요.
- 프로젝트에는 실제 실행 명령과 정본 위치처럼 계속 적용할 짧은 기준을 둬요.

```markdown
# 프로젝트 작업 기준

- 먼저 README.md에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 영역의 기존 코드와 문서를 확인한다.
- 빌드와 테스트: README.md
- API 계약: docs/api.md
```

설정 후 새 작업에서 “현재 적용된 지침 파일과 작업 루트를 알려줘”라고 요청해요.

## Config 적용

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

## 동작하지 않을 때

| 증상 | 확인할 것 |
| --- | --- |
| Skill이 보이지 않아요 | 배치 경로, `SKILL.md`, 비활성화 설정 확인 후 재시작 |
| 프로젝트 규칙이 적용되지 않아요 | 작업 루트, 상위 지침, `AGENTS.override.md` 확인 |
| 프로젝트 Config가 적용되지 않아요 | 프로젝트 신뢰 여부, CLI 옵션과 더 가까운 설정 확인 |
| 파일 수정·명령 실행이 막혀요 | `/status`, `/permissions`, 보호 경로와 네트워크 제한 확인 |
| MCP를 사용할 수 없어요 | [연결 확인](./extensions.md), 서버 실행 상태와 인증 확인 |
| 명령이 보이지 않아요 | 제품·버전과 [명령 확인](./commands.md)의 도움말 확인 |

## 공식 문서

- [CLI 설치와 로그인](https://learn.chatgpt.com/docs/codex/cli)
- [승인과 샌드박스](https://learn.chatgpt.com/docs/agent-approvals-security)
- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Config 기본과 우선순위](https://learn.chatgpt.com/docs/config-file/config-basic)
- [Skill 검색 위치](https://learn.chatgpt.com/docs/build-skills)
