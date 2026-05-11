# 03. [초급]핵심개념 적용

Codex 핵심 개념을 실제 파일과 명령으로 어떻게 쓰는지 정리한다.

## 1. AGENTS.md

### 만들기

프로젝트 루트에서 `/init`을 실행한다.

```text
/init
```

직접 작성할 때는 프로젝트 루트에 `AGENTS.md`를 만든다.

```markdown
## 빌드 명령
- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 테스트: `npm test`

## 작업 규칙
- 기존 패턴을 먼저 확인한다.
- 기능 변경 후 관련 테스트를 실행한다.
- 사용자가 만든 변경은 되돌리지 않는다.
```

### 적용 기준

- 전역 공통 규칙은 `~/.codex/AGENTS.md`에 둔다.
- 프로젝트 규칙은 저장소 루트 `AGENTS.md`에 둔다.
- 특정 모듈 규칙은 하위 폴더 `AGENTS.md`에 둔다.
- 임시 덮어쓰기는 `AGENTS.override.md`에 둔다.

## 2. Config

### 만들기

사용자 기본 설정은 `~/.codex/config.toml`에 둔다.

```toml
model = "gpt-5.5"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

프로젝트 설정은 `.codex/config.toml`에 둔다.

```toml
model = "gpt-5.5"
default_permissions = ":workspace"

[windows]
sandbox = "elevated"
```

### 적용 기준

- 일회성 실행값은 CLI 옵션으로 넘긴다.
- 팀 공통값은 프로젝트 `.codex/config.toml`에 둔다.
- 개인 기본값은 `~/.codex/config.toml`에 둔다.

## 3. MCP

### 만들기

CLI로 추가한다.

```powershell
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

`config.toml`에 직접 쓸 수도 있다.

```toml
[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"
```

STDIO 서버는 아래처럼 둔다.

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
```

### 쓰기

- `/mcp`로 현재 연결을 확인한다.
- 공식 문서 확인처럼 외부 컨텍스트가 필요한 요청에서 사용한다.
- OAuth 서버는 `codex mcp login <server-name>`으로 로그인한다.

## 4. Skills

### 만들기

스킬은 디렉토리와 `SKILL.md`로 구성한다.

```text
.agents/
└── skills/
    └── code-review/
        └── SKILL.md
```

기본 형식:

```markdown
---
name: code-review
description: 코드 변경의 버그, 회귀, 누락 테스트를 검토할 때 사용한다.
---

# 코드 리뷰 기준

- 실제 동작 변경을 먼저 본다.
- 파일과 라인 기준으로 지적한다.
- 스타일만의 지적은 피한다.
```

### 쓰기

- 명시 호출: `$code-review로 이 변경 검토해줘`
- 자연 호출: `버그와 테스트 누락 중심으로 리뷰해줘`
- 스킬이 많으면 `description`이 짧고 구체적이어야 선택이 잘 된다.

## 5. Subagents

### 만들기

개인 에이전트는 `~/.codex/agents/`에 둔다.

프로젝트 에이전트는 `.codex/agents/`에 둔다.

```toml
name = "reviewer"
description = "정확성, 보안, 테스트 누락을 보는 PR 리뷰어"
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "read-only"
developer_instructions = """
리뷰는 실제 결함, 회귀, 보안, 테스트 누락을 우선한다.
각 발견사항은 파일과 근거를 함께 제시한다.
"""
```

### 쓰기

Subagent는 명시적으로 요청한다.

```text
보안, 테스트, 유지보수성 관점으로 에이전트를 각각 하나씩 띄워서 검토하고 결과를 합쳐줘.
```

적용 기준:

- Subagent는 사용자가 명시적으로 요청할 때만 생성된다.
- 활동 확인과 스레드 전환은 Codex 앱과 CLI에서 한다.
- IDE 확장에서의 표시 여부는 공식 문서에서 별도 확인한다.

## 6. Memories

### 켜기

기본값은 꺼져 있다.

```toml
[features]
memories = true
```

### 쓰기

- 이전 작업의 안정적인 맥락을 이후 세션에 이어갈 때 사용한다.
- 팀 규칙, 필수 절차, 보안 기준은 `AGENTS.md`나 저장소 문서에 둔다.
- 현재 스레드의 메모리 사용 여부는 `/memories`로 제어한다.
- 지역과 조직 설정에 따라 사용할 수 없는 경우가 있다.

## 7. Hooks

### 만들기

기능 플래그를 확인한다.

```toml
[features]
codex_hooks = true
```

`~/.codex/hooks.json` 또는 `<repo>/.codex/hooks.json`에 훅을 둔다.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python \"$(git rev-parse --show-toplevel)/.codex/hooks/check_bash.py\"",
            "statusMessage": "Bash 명령 확인"
          }
        ]
      }
    ]
  }
}
```

### 쓰기

- 프롬프트 제출 전 검사: `UserPromptSubmit`
- 도구 실행 전 검사: `PreToolUse`
- 승인 요청 검사: `PermissionRequest`
- 도구 실행 후 검증: `PostToolUse`
- 턴 종료 후 정리: `Stop`
- `PreToolUse`와 `PostToolUse`는 Bash, `apply_patch`, MCP 도구 호출 중심으로 적용한다.
- 모든 shell 흐름과 WebSearch를 완전히 차단하는 수단으로 쓰지 않는다.

## 8. Rules

### 만들기

Rules는 실험 기능이다.

`~/.codex/rules/default.rules` 또는 `<repo>/.codex/rules/default.rules`에 작성한다.

```python
prefix_rule(
  pattern = ["gh", "pr", "view"],
  decision = "prompt",
  justification = "PR 조회는 승인 후 허용한다",
  match = [
    "gh pr view 123"
  ],
  not_match = [
    "gh pr list"
  ],
)
```

### 쓰기

- 항상 허용: `allow`
- 매번 승인: `prompt`
- 차단: `forbidden`
- 프로젝트 로컬 Rules는 신뢰한 프로젝트에서만 로드된다.
- 저장 전 아래 명령으로 적용 결과를 확인한다.

```powershell
codex execpolicy check --pretty --rules ~/.codex/rules/default.rules -- gh pr view 123
```

## 9. Plugins

### 설치하기

CLI에서 plugin browser를 연다.

```text
/plugins
```

설치 후 새 스레드에서 사용한다.

```text
@플러그인명 오늘 Slack 요약해줘.
```

### 끄기

```toml
[plugins."plugin-name@marketplace"]
enabled = false
```

## 공식 문서 기준

- <https://developers.openai.com/codex/guides/agents-md/>
- <https://developers.openai.com/codex/config-basic>
- <https://developers.openai.com/codex/mcp/>
- <https://developers.openai.com/codex/skills>
- <https://developers.openai.com/codex/subagents>
- <https://developers.openai.com/codex/memories>
- <https://developers.openai.com/codex/hooks>
- <https://developers.openai.com/codex/rules>
- <https://developers.openai.com/codex/plugins>

## 이력관리

- 2026-05-11: Codex 핵심 개념 적용 문서 추가
