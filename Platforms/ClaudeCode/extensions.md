# Claude Code 확장 기능

반복되는 작업과 외부 연결은 필요한 책임에 맞는 확장 수단으로 구성해요.

## 선택 기준

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트 전체에 계속 적용할 작업 기준 | `CLAUDE.md` |
| 특정 파일과 경로에만 적용할 기준 | `.claude/rules/` |
| 반복 가능한 작업 절차와 전문 지식 | Skill |
| 분리 가능한 조사, 검토와 구현 | Subagent |
| 서로 간섭하면 안 되는 동시 작업 | worktree 또는 백그라운드 세션 |
| 외부 API, 서비스와 현재 데이터 | MCP |
| 도구 실행 전후의 결정적 검사 | Hook |
| 정해진 시각이나 이벤트에 반복 실행 | Routines 또는 외부 스케줄러 |
| 여러 구성요소를 함께 배포 | Plugin |

권한과 샌드박스는 확장이 아니라 실행 조건이므로 [환경 설정](./setup.md)에서 다뤄요.

## Skill

Skill은 필요한 입력, 절차, 결과와 선택 자원을 묶어요.

- 개인 위치는 `~/.claude/skills/<name>/SKILL.md`예요.
- 프로젝트 위치는 `<repo>/.claude/skills/<name>/SKILL.md`예요.
- 입력창에서 `/skill-name`으로 호출하거나 설명과 요청을 보고 자동 선택되게 할 수 있어요.
- `references/`, `scripts/`, `assets/`를 필요한 경우에만 함께 읽게 둘 수 있어요.

`disable-model-invocation`, `user-invocable`, `allowed-tools` frontmatter로 호출과 도구 사용을 제한할 수 있어요.  
CodeStream Skill의 실제 사용법은 [사용자 Skill](./skills.md)을 봐요.

## Subagent와 동시 작업

Subagent는 독립된 컨텍스트에서 조사, 검토나 구현을 맡아요.  
개인 정의는 `~/.claude/agents/<name>.md`, 프로젝트 정의는 `<repo>/.claude/agents/<name>.md`에 둬요.  
`description`, `tools`, `model`, `skills`로 역할을 정하고 `/tasks`에서 진행 상태를 확인해요.

같은 저장소를 동시에 수정해야 하면 worktree 세션을 사용해요.  
오래 걸리는 작업은 백그라운드 세션으로 보내고, 앞 단계의 결과가 필요한 작업은 같은 세션에서 이어가요.

### GitLab MR에서 작업

Claude Code 2.1.233 이상에서는 GitLab MR에서 별도 worktree를 만들어요.

1. 대상 저장소를 로컬에 열어요.
2. `origin`이 MR의 GitLab 저장소를 가리키는지 확인해요.
3. GitLab 인증을 확인하고 MR URL로 세션을 열어요.

```bash
git remote get-url origin
claude --worktree "https://gitlab.com/<group>/<project>/-/merge_requests/<number>"
```

worktree는 `origin`에서 MR을 가져와 분기해요.  
세션에서 현재 브랜치와 diff를 확인한 뒤 검토나 수정을 요청해요.

### Subagent 추론과 압축 조정

2.1.292 이상에서는 일반 Subagent를 시작할 때 요청별 `effort`를 지정할 수 있어요.  
2.1.296 이상에서는 정의 파일의 `autoCompactWindow`로 압축 시점을 앞당길 수 있어요.

다음은 `.claude/agents/log-reader.md` 예제예요.

```markdown
---
name: log-reader
description: 로그에서 실패 원인을 찾는다.
tools: Read, Grep, Glob
effort: medium
autoCompactWindow: 200000
---
로그에서 확인한 오류와 파일 위치를 보고한다.
```

```text
log-reader Subagent로 logs/의 실패 원인을 medium effort로 분석해줘.
```

`autoCompactWindow`는 100000~1000000 사이 정수로 써요.  
`CLAUDE_CODE_AUTO_COMPACT_WINDOW`가 설정되면 해당 환경 변수가 우선해요.  
요청별 `effort`는 fork Subagent에 적용되지 않아요.  
`/tasks`에서 실행 모델과 결과를 확인해요.  
정의와 우선순위는 [Subagents](https://code.claude.com/docs/en/sub-agents)를 확인해요.

### 다른 세션에 메시지 전달

2.1.224부터 다른 Claude Code 세션을 찾아 메시지를 전달할 수 있어요.  
Windows 네이티브는 2.1.234 이상이 필요해요.  
현재 지원 범위와 수신 정책은 [세션 간 메시지](https://code.claude.com/docs/en/cross-session-messaging)를 확인해요.

1. 수신할 세션에 구분할 수 있는 이름을 지정해요.
2. `/list-agents`로 도달할 수 있는 세션을 확인해요.
3. 수신 세션과 전달할 내용만 지정해 요청해요.

```text
payments-api 세션에 users.name을 users.display_name으로 바꿨다고 전달해줘.
```

메시지는 텍스트만 전달하고, 대화 이력이나 파일 전체를 전송하지 않아요.  
`/config`의 세션 메시지 수신 설정에서 허용·보류·거절을 선택해요.

### 자체 인프라에서 클라우드 세션 실행

Self-hosted environments는 Team·Enterprise의 공개 베타예요.  
Claude Code 2.1.224 이상에서 조직의 Linux·macOS 호스트나 Linux 컨테이너를 실행 환경으로 연결해요.

1. Owner가 관리자 화면에서 Allow self-hosted environments를 켜요.
2. 전용 호스트에서 버전과 필요한 HTTPS 연결을 확인해요.
3. Owner로 로그인한 호스트에서 안내형 설정을 실행해요.

```bash
claude self-hosted-runner --help
claude self-hosted-runner setup
```

4. 관리자 화면에서 환경이 Healthy인지 확인해요.
5. `claude.ai/code`에서 해당 환경을 선택하고 테스트 세션을 실행해요.

Windows를 runner 호스트로 직접 사용할 수 없어요.  
설정 완료 단계는 임시 runner를 종료하므로 계속 사용하려면 생성된 안내서의 실행 명령을 사용해요.  
실제 저장소 연결 전 [공식 빠른 시작](https://code.claude.com/docs/en/self-hosted-environments-quickstart)의 인증·전용 디렉터리 조건을 확인해요.

## MCP

MCP는 외부 시스템의 현재 데이터를 읽거나 작업할 때 연결해요.

```bash
claude mcp add --transport http <name> <url>
claude mcp list
```

`local`은 현재 프로젝트 개인용, `project`는 `.mcp.json`으로 팀 공유, `user`는 모든 프로젝트에 적용해요.  
연결과 도구 상태는 입력창의 `/mcp`에서 확인해요.

## Hook

Hook은 모델 판단 없이 도구 실행 전후와 세션 생명주기에 검사를 연결해요.  
`settings.json`의 `hooks`에서 `PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `Stop` 같은 이벤트에 설정해요.  
프로젝트 의미를 판단해야 하는 기준은 Hook이 아니라 `CLAUDE.md`나 Skill에 둬요.

### Hook 실패 시 차단

Claude Code 2.1.295 이상에서는 command·HTTP Hook에 `onFailure: "block"`을 설정할 수 있어요.  
검사 실행 실패나 시간 초과가 발생하면 해당 작업을 차단해요.

1. 실제 검사 스크립트를 준비해요.
2. `.claude/settings.json`에 Hook 설정을 추가해요.
3. 검사 실패와 시간 초과에서 대상 도구 호출이 차단되는지 확인해요.

다음은 Bash 실행 전에 Node.js 검사 스크립트를 호출하는 예제예요.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/check-command.js"],
            "onFailure": "block"
          }
        ]
      }
    ]
  }
}
```

기본값 `continue`는 Hook 실행 실패만으로 작업을 차단하지 않아요.  
`Stop`, `SubagentStop`, `TaskCompleted`, `TeammateIdle`과 비동기 command Hook에는 이 설정이 적용되지 않아요.  
상세 실패 조건은 [Hook 실패 시 차단](https://code.claude.com/docs/en/hooks#block-the-action-when-a-hook-fails)을 확인해요.

## 반복 실행

반복 작업은 세션이 열려 있어야 하는지, Claude Code 클라우드에서 계속 실행해야 하는지, 기존 자동화가 호출하는지에 따라 나눠요.

| 수단 | 실행 조건 | 쓰는 상황 |
| --- | --- | --- |
| `/loop` | 열린 CLI 세션 | 짧은 간격으로 상태를 확인할 때 |
| `/schedule` | Claude Code Routines | 시간·API·GitHub 이벤트로 클라우드 작업을 실행할 때 |
| `claude --print "요청"` | 외부 스케줄러 | CI나 cron에서 한 번 실행할 때 |

`/schedule`로 만든 Routine은 계정의 Claude Code 웹과 연결되고, 지원 요금제와 조직 정책에 따라 사용할 수 있어요.  
Routine은 커넥터와 저장소에 쓰기 작업을 할 수 있으므로 실행 범위와 권한을 최소화해요.  
`/schedule list`로 현재 Routine을 확인해요.

## Plugin

Plugin은 Skill, Subagent, Hook과 MCP 설정을 함께 배포할 때 사용해요.  
입력창의 `/plugin` 또는 터미널의 `claude plugin`으로 설치와 상태 관리를 해요.  
개별 작업 절차만 필요하면 Skill로 시작해요.

### Plugin 설정 확인

Claude Code 2.1.285 이상에서는 터미널에서 Plugin 옵션과 미설정 값을 확인해요.

```bash
claude plugin configure <plugin>
```

1. 설치한 Plugin 이름으로 명령을 실행해요.
2. 미설정 값을 확인해요.
3. 입력창의 `/plugin`에서 해당 Plugin의 Configure를 열어 필요한 값을 설정해요.

설정을 마친 뒤 `/plugin`에서 Plugin과 번들 MCP 서버의 상태를 확인해요.

### Plugin 평가

2.1.269 이상에서는 Plugin의 유무에 따른 결과를 비교할 수 있어요.

1. Plugin 루트에서 평가 초안을 만들어요.

```bash
claude plugin eval init
```

2. 생성한 사례와 채점 기준을 검토하고 초안 생성 세션을 종료해요.
3. 평가를 실행하고 `evals/results/`의 `report.html`을 확인해요.

```bash
claude plugin eval . --no-publish
```

평가와 모델 기반 채점은 실제 모델 호출 비용을 사용해요.  
`--no-publish`는 HTML 보고서를 로컬에만 남겨요.  
기본 비교 실행은 Plugin이 없는 상태도 평가해요.  
도구 권한과 평가 구성은 [Plugin 평가](https://code.claude.com/docs/en/plugin-evals)를 확인해요.

## 확인 기준

확장 기능을 추가한 뒤 새 세션에서 `/`, `/mcp`, `/tasks` 또는 `/plugin`으로 노출과 연결 상태를 확인해요.

## 공식 문서

- [Skills](https://code.claude.com/docs/ko/skills)
- [Subagents](https://code.claude.com/docs/ko/sub-agents)
- [MCP](https://code.claude.com/docs/ko/mcp)
- [Hooks](https://code.claude.com/docs/ko/hooks)
- [Routines](https://code.claude.com/docs/en/routines)
- [Plugins](https://code.claude.com/docs/ko/plugins)
