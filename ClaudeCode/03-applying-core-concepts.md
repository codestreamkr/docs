# 03. 핵심개념 활용하기

각 핵심 개념을 실제로 어떻게 만들고 쓰는지 정리한다.

## 1. CLAUDE.md

### 만들기

프로젝트 루트에 `CLAUDE.md` 파일을 만든다.

```markdown
## 빌드 명령
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드
npm test           # 테스트 실행

## 코딩 규칙
- TypeScript 사용, any 금지
- 컴포넌트는 함수형으로 작성

## 금지 사항
- 테스트 파일 임의 수정 금지
- console.log 커밋 금지
```

- 전역 설정은 `~/.claude/CLAUDE.md`에 둔다.
- 모든 프로젝트에 공통 적용된다.
- 하위 디렉토리에도 `CLAUDE.md`를 둘 수 있다.
- 해당 디렉토리 작업 시 추가로 로드된다.
- `/init` 명령으로 기존 코드베이스를 분석해 초안을 자동 생성할 수 있다.

## 2. Commands

### 만들기

`.claude/commands/` 디렉토리에 마크다운 파일로 작성한다.

파일명이 커맨드명이 된다.

```text
.claude/
└── commands/
    ├── commit.md
    └── review.md
```

- `commit.md`는 `/commit`
- `review.md`는 `/review`

파일 형식:

```markdown
---
allowed-tools: Bash, Read, Edit
description: 변경사항을 정리해 커밋한다
argument-hint: "[커밋 메시지 힌트]"
---
git diff를 확인하고 변경 내용에 맞는 커밋 메시지를 작성해 커밋한다.
추가 지시가 있으면 $ARGUMENTS를 참고한다.
```

- 하위 디렉토리로 네임스페이스를 구성할 수 있다.
- 예: `commands/ci/deploy.md`
- `$ARGUMENTS`로 호출 시 전달한 인수를 파일 안에서 참조한다.

### 쓰기

프롬프트에서 `/커맨드명`으로 호출한다.

- `/commit`
- `/commit 이슈 #123 반영`

## 3. Skills

### 만들기

`skills/` 디렉토리 아래에 스킬 이름으로 하위 디렉토리를 만들고 `SKILL.md`를 작성한다.

```text
skills/
└── code-style/
    └── SKILL.md
```

파일 형식:

```markdown
---
name: code-style
description: 프로젝트 코드 스타일 규칙 (TypeScript, React 기준)
---
# 코드 스타일 규칙
...
```

- `description`은 자동 로드 판단 기준이다.
- 가능한 한 구체적으로 쓴다.

### 쓰기

- `"code-style 스킬을 참고해서..."`처럼 명시 호출할 수 있다.
- Commands에서 특정 스킬을 연결하면, 해당 커맨드 실행 시 스킬 전체 내용이 로드된다.

## 4. MCP

### 만들기

프로젝트 루트의 `.mcp.json` 또는 `~/.claude/settings.json`에 서버를 등록한다.

```json
{
  "...": "...",
  "mcpServers": {
    "magic": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@21st-dev/magic"
      ],
      "env": {}
    },
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ],
      "env": {}
    }
  }
}
```

- 플러그인으로 배포된 MCP 서버는 플러그인 설치만으로 자동 등록된다.
- 연결 가능한 서버 목록은 `modelcontextprotocol.io/servers`에서 확인한다.

### 쓰기

- `"Notion에서 X를 찾아줘"`처럼 자연어로 요청하면 된다.
- `/mcp`로 연결된 서버 목록과 상태를 확인할 수 있다.

## 5. Subagents

### 만들기

두 가지 방식으로 실행할 수 있다.

첫 번째 방법은 Skill에서 `context: fork`를 설정하는 것이다.

```markdown
---
name: codebase-search
description: 코드베이스 전체 검색이 필요할 때
context: fork
---
검색 로직...
```

두 번째 방법은 Custom Agent를 정의한 뒤 Subagent로 실행하는 것이다.

- 자세한 내용은 7번 항목을 참고한다.
- `agents/` 디렉토리에 에이전트 파일을 만들면 Subagent로 실행할 수 있다.

### 쓰기

- `"이 작업은 별도 컨텍스트에서 처리해줘"`처럼 명시 요청할 수 있다.

## 6. Agent teams

### 만들기

팀을 구성할 각 역할의 Custom Agent 파일을 `agents/` 디렉토리에 작성한다.

```text
agents/
├── frontend-reviewer.md
├── backend-reviewer.md
└── security-checker.md
```

에이전트 간 협력 방식은 Command 파일이나 프롬프트에서 지정한다.

```markdown
---
name: full-review
description: 전체 코드 리뷰
allowed-tools: Agent
---
frontend-reviewer, backend-reviewer, security-checker 에이전트가
각자 코드를 검토하고 결과를 합쳐 최종 리포트를 작성한다.
```

### 쓰기

- Command로 정의해두고 `/full-review`로 호출한다.
- 또는 `"세 에이전트를 동시에 써서 검토해줘"`처럼 프롬프트에서 직접 지시한다.

## 7. Custom Agents

### 만들기

`agents/` 디렉토리에 마크다운 파일로 작성한다.

```text
agents/
└── security-reviewer.md
```

파일 형식:

```markdown
---
name: security-reviewer
description: 보안 취약점 검토가 필요할 때 사용한다
tools: Read, Grep, Bash
model: claude-opus-4-6
---
당신은 시니어 보안 엔지니어다. 코드를 검토할 때 다음을 확인한다:
- SQL 인젝션, XSS, 커맨드 인젝션 등 입력값 취약점
- 인증·인가 결함
- 코드 내 시크릿·자격증명 하드코딩
- 안전하지 않은 데이터 처리

각 항목에 파일명과 라인 번호를 명시하고, 수정 방안을 함께 제시한다.
```

- `description`을 구체적으로 쓸수록 Claude가 자동 선택을 더 잘 한다.
- `tools`로 이 에이전트가 사용할 수 있는 도구를 제한할 수 있다.
- `model`을 지정하지 않으면 기본 모델을 사용한다.

### 쓰기

- `"security-reviewer 에이전트를 써서 검토해줘"`처럼 직접 지정할 수 있다.
- Agent teams에서는 여러 Custom Agent를 조합해 동시에 사용한다.

## 8. Plugins

### 설치하기

```bash
# npm 패키지 플러그인 설치
claude plugins install @회사/플러그인명

# 설치된 플러그인 확인
claude plugins list

# 클로드 커맨드 실행 > 조회 및 설치가능
/plugin
```

### 쓰기

- `/plugins`로 현재 활성화된 플러그인 목록을 확인한다.
- 커맨드는 `/플러그인명:커맨드명` 형태로 네임스페이스가 붙는다.

## 9. Hooks

### 만들기

`.claude/settings.json`에 이벤트별로 정의한다.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint --fix $CLAUDE_FILE_PATH"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"실행 예정: $CLAUDE_TOOL_INPUT\""
          }
        ]
      }
    ]
  }
}
```

주요 이벤트:

- `PreToolUse`
- `PostToolUse`
- `SessionStart`
- `SessionEnd`
- `UserPromptSubmit`

주요 환경 변수:

- `$CLAUDE_FILE_PATH`
- `$CLAUDE_TOOL_INPUT`
- `$CLAUDE_TOOL_OUTPUT`

## 10. Settings 계층

### 만들기

범위에 맞는 파일에 설정을 작성한다.

| 파일 | 적용 범위 | git 포함 여부 |
| --- | --- | --- |
| `~/.claude/settings.json` | 전체 사용자 | - |
| `.claude/settings.json` | 프로젝트 전체 | 포함 |
| `.claude/settings.local.json` | 로컬 전용 | 제외 |

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  }
}
```

- `allow`: 승인 없이 자동 허용
- `ask`: 실행 전 사용자 확인
- `deny`: 항상 거부

### 쓰기

- `/permissions`로 현재 권한 설정을 확인할 수 있다.