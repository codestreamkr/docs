# Codex 확장 기능

반복 절차는 Skill, 외부 도구는 MCP, 독립 조사는 Subagent로 나눠요.  
실행 권한과 자동 검사는 Rules와 Hook으로 관리해요.

## 선택표

| 필요한 것 | 선택 | 적용 위치 |
| --- | --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `AGENTS.md` | 저장소 루트 또는 하위 디렉터리 |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill | `~/.agents/skills/`, `<repo>/.agents/skills/` |
| 외부 API, 서비스와 실시간 데이터 | MCP 또는 App·Connector | `~/.codex/config.toml` 또는 연결 화면 |
| 분리 가능한 읽기·조사·검증 | Subagent | 대화에서 명시적으로 요청 |
| 도구 실행 전후의 결정적 자동 검사 | Hook | `~/.codex/hooks.json`, `<repo>/.codex/hooks.json` |
| 샌드박스 밖 명령의 허용·확인·차단 | Rules | `~/.codex/rules/`, `<repo>/.codex/rules/` |
| Skill, MCP, Hook을 함께 설치·공유 | Plugin | Marketplace 또는 Plugin 디렉터리 |

## Skill

Skill은 반복 작업의 입력, 절차, 결과와 필요한 자원을 묶어요.

- 사용자 공통 위치: `~/.agents/skills/`
- 저장소 공유 위치: `<repo>/.agents/skills/`
- 필수 파일: `SKILL.md`
- 선택 자원: `scripts/`, `references/`, `assets/`, `agents/openai.yaml`
- Codex에서는 요청에 맞는 Skill을 자동 선택하거나 `$skill-name`으로 직접 호출해요.

현재 사용자 Skill과 호출 예제는 [Skill 안내](./skills.md)에서 확인해요.

## MCP와 App·Connector

MCP는 Codex에 외부 도구를 등록해요.  
App·Connector는 인증된 서비스 연결을 제공해요.  
현재 데이터 조회나 외부 시스템 작업이 필요할 때 사용해요.

```bash
# HTTP MCP 서버 등록
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp

# OAuth가 필요한 서버 로그인과 등록 상태 확인
codex mcp login my-mcp
codex mcp list
```

- 로컬 표준 입출력 서버는 `codex mcp add <name> -- <command> [args...]`로 등록해요.
- Codex를 다시 시작한 뒤 `/mcp`에서 서버와 도구를 확인해요.
- OAuth 서버는 로그인 명령이 브라우저 인증을 시작해요. 토큰·API 키는 명령 본문이나 저장소 파일에 넣지 말고 서버가 요구하는 인증 방식으로 제공해요.
- `my-mcp`은 등록한 MCP 서버 이름으로 바꿔요.

IntelliJ IDEA MCP로 디버거를 붙이면 Codex가 실행 중인 JavaScript Debug 세션을 읽고 브레이크포인트를 다룰 수 있어요.  
연결 준비는 [IntelliJ IDEA 개발 가이드](../../IntelliJ/README.md)에서, 런타임 검증은 [IntelliJ 런타임 디버깅](../../IntelliJ/intellij_01_runtime_debug_guide.md)에서 확인해요.

## Subagent

Subagent는 메인 대화와 분리된 컨텍스트에서 결과를 돌려줘요.  
코드 탐색, 로그 분석, 테스트 공백 검토처럼 독립적인 읽기 작업에 먼저 사용해요.

```text
다음 조사를 Subagent 두 명에게 병렬로 맡겨줘.
- 첫 번째: `src/auth`의 실제 인증 흐름을 파일과 심볼로 정리해. 읽기 전용으로 조사해.
- 두 번째: 인증 관련 테스트의 누락을 찾아 파일 경로와 근거를 정리해. 파일은 수정하지 마.
모든 결과를 받은 뒤 변경 제안만 요약해.
```

- CLI에서는 `/agent`로 실행 중인 Subagent를 확인하거나 전환해요.
- Subagent는 부모의 샌드박스와 승인 정책을 물려받아요.
- 병렬 구현은 담당 파일이 겹치지 않을 때만 요청해요. 같은 파일을 수정하면 충돌과 취합 비용이 커져요.
- 반복 조사 역할은 [Custom Agent 작성 절차](https://learn.chatgpt.com/docs/agent-configuration/subagents)에 따라 `.codex/agents/*.toml`로 정의해요.

## Rules와 Hook

Rules는 샌드박스 밖에서 실행할 명령의 허용, 확인, 차단을 결정해요.  
의미를 해석해야 하는 작업 기준은 `AGENTS.md`나 Skill에 적어요.

`~/.codex/rules/default.rules`에는 모든 프로젝트에 적용할 규칙을, `<repo>/.codex/rules/`에는 해당 저장소 규칙을 둬요. 프로젝트 규칙은 프로젝트 `.codex/` 설정을 신뢰한 경우에만 적용돼요.

```starlark
# `gh pr view`는 샌드박스 밖 실행 전에 확인해요.
prefix_rule(
    pattern = ["gh", "pr", "view"],
    decision = "prompt",
    justification = "PR 조회는 확인 후 허용",
    match = ["gh pr view 123"],
    not_match = ["gh pr list"],
)
```

```bash
codex execpolicy check --pretty \
  --rules ~/.codex/rules/default.rules \
  -- gh pr view 123
```

Hook은 세션 시작, 도구 실행 전후 같은 이벤트에 명령 또는 MCP 도구를 연결해요.  
사용자 공통 Hook은 `~/.codex/hooks.json`, 저장소 Hook은 `<repo>/.codex/hooks.json` 또는 각 위치의 `config.toml`에 둬요.

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "^Bash$",
      "hooks": [{
        "type": "command",
        "command": "git diff --check >&2",
        "timeout": 30,
        "statusMessage": "변경 공백 검사"
      }]
    }]
  }
}
```

- 위 예시는 Bash 명령이 끝난 뒤 Git diff의 공백 오류를 검사해요. Hook 명령은 세션의 작업 디렉터리에서 실행돼요.
- 검사 결과는 stderr로 전달해요. 공백 오류로 종료 코드 `2`를 반환하면 Codex가 오류 내용을 피드백으로 받아요.
- 새 Hook이나 변경된 Hook은 실행 전에 `/hooks`에서 내용을 검토하고 신뢰해야 해요. 프로젝트 Hook도 프로젝트 신뢰가 필요해요.
- Hook은 같은 위치에 `hooks.json`과 `config.toml` 설정을 함께 두지 않아요. 두 구성이 병합되어 시작할 때 경고가 표시돼요.

## Plugin

Plugin은 설치와 공유가 필요한 기능 묶음이에요.  
단일 Skill도 Plugin으로 배포할 수 있고, 여러 Skill·MCP·Hook·자산을 함께 배포할 수도 있어요.  
개인 작업 절차만 만들 때는 Skill로 시작하고, 설치·공유가 필요해질 때 Plugin으로 묶어요.

```bash
# Marketplace와 설치 가능한 Plugin 확인
codex plugin marketplace list
codex plugin list --available --json

# Marketplace를 지정해 설치한 뒤 목록에서 확인
codex plugin add my-plugin@my-marketplace
codex plugin list
```

- Plugin 설치 뒤 새 대화를 시작하고, 포함된 Skill·MCP가 필요한 요청을 실행해요.
- 연결된 서비스는 Plugin 설치와 별도로 인증이 필요할 수 있어요.
- Plugin Hook은 자동 신뢰되지 않아요. `/hooks`에서 정의를 검토한 뒤 활성화해요.
- 저장소 Marketplace는 `<repo>/.agents/plugins/marketplace.json`, 개인 Marketplace는 `~/.agents/plugins/marketplace.json`에 둘 수 있어요.
- `my-plugin@my-marketplace`는 설치할 Plugin과 Marketplace 이름으로 바꿔요.

## 공식 문서

- [Skill과 Plugin](https://learn.chatgpt.com/docs/skills-and-plugins)
- [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)
- [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules)
- [Hooks](https://learn.chatgpt.com/docs/hooks)
- [Plugin 패키징](https://developers.openai.com/plugins/build/plugins)
