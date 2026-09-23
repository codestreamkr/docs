# Claude Code 확장 기능

필요한 책임에 맞는 확장 수단을 선택해요.

## 용어

문서 전체에서 다음 구분을 써요.

| 용어 | 뜻 |
| --- | --- |
| 번들 Skill | Claude Code가 기본 제공하는 Skill이에요. `/code-review`처럼 제품이 관리해요 |
| 사용자 Skill | CodeStream이 관리하는 `ct-*` Skill |
| 프로젝트 Skill | 저장소의 `.claude/skills/`에 두고 팀과 공유하는 Skill |

## 선택표

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `CLAUDE.md` |
| 특정 파일과 경로에만 적용할 기준 | `.claude/rules/` |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill |
| 분리 가능한 작업의 별도 컨텍스트 | Subagent |
| 서로 간섭하면 안 되는 동시 작업 | worktree 세션, 백그라운드 세션 |
| 외부 API, 서비스와 실시간 데이터 | MCP |
| 도구 실행 전후의 결정적 자동 검사 | Hook |
| 정해진 시각이나 주기의 반복 실행 | 예약 실행 |
| 여러 구성요소를 배포하는 단위 | Plugin |

권한과 샌드박스는 확장이 아니라 실행 조건이라 [환경 설정](./setup.md)에서 다뤄요.

## Skill

Skill은 반복 가능한 작업의 입력, 절차, 결과와 필요한 자원을 묶어요.

- 개인 위치: `~/.claude/skills/<name>/SKILL.md`
- 프로젝트 위치: `<repo>/.claude/skills/<name>/SKILL.md`
- 직접 호출: `/skill-name`
- 자동 선택: `description`과 현재 요청을 기준으로 Claude가 선택
- 선택 자원: `references/`, `scripts/`, `assets/`

frontmatter로 동작을 제한할 수 있어요.

- `disable-model-invocation: true`: 사용자가 호출할 때만 실행해요.
- `user-invocable: false`: Claude만 사용하는 배경 지식으로 둬요.
- `allowed-tools`: 호출한 턴에서 승인 없이 사용할 도구를 지정해요.

기존 `.claude/commands/*.md`도 계속 동작하지만 Custom command는 Skill로 통합됐어요.  
신규 공통 기능은 Skill 구조로 작성해요.

현재 사용자 Skill과 호출 예제는 [사용자 Skill](./skills.md)에서 확인해요.

## Subagent

서로 독립된 조사, 검증이나 구현을 별도 컨텍스트로 나눌 때 사용해요.

- 개인 위치: `~/.claude/agents/<name>.md`
- 프로젝트 위치: `<repo>/.claude/agents/<name>.md`
- 주요 frontmatter: `description`, `tools`, `model`, `skills`
- 진행 상태 확인: `/tasks`

적합한 예:

- 서로 다른 모듈의 독립 분석
- 보안, 품질과 성능의 별도 검토
- 출력이 큰 작업의 컨텍스트 분리

Subagent는 현재 대화 기록 없이 새 컨텍스트에서 시작해요.  
대화 전체를 이어받아야 하면 `/subtask`로 fork를 시작해요.  
단계마다 결과를 주고받아야 하는 작업은 현재 대화에서 진행해요.

## 동시 작업

같은 저장소에서 여러 작업을 동시에 진행할 때 써요.

| 수단 | 시작 | 쓰는 상황 |
| --- | --- | --- |
| worktree 세션 | `claude -w` | 현재 체크아웃을 건드리지 않고 다른 브랜치에서 작업할 때 |
| 백그라운드 세션 | `claude --bg` 또는 `/background` | 오래 걸리는 작업을 돌려두고 다른 일을 할 때 |

백그라운드 세션은 `claude agents`로 목록을 보고 `claude attach <id>`로 다시 열어요.

작업을 언제 나눌지에 대한 판단 기준은 [Playbook](../../Playbooks/README.md)에서 관리해요.  
이 문서는 나누기로 정한 뒤의 실행 방법만 다뤄요.

## MCP

외부 시스템의 현재 데이터를 읽거나 작업할 때 사용해요.

```bash
claude mcp add --transport http <name> <url>
claude mcp list
```

- 범위: `local`은 현재 프로젝트 개인용, `project`는 `.mcp.json`으로 팀 공유, `user`는 모든 프로젝트
- 인증: 환경 변수 또는 서버가 제공하는 인증 절차 사용
- 확인: `/mcp`에서 연결과 도구 상태를 확인

## Hook

모델 판단 없이 항상 실행할 검사를 연결해요.

- 설정 위치: `settings.json`의 `hooks`
- 도구 실행 전후: `PreToolUse`, `PostToolUse`
- 세션 생명주기: `SessionStart`, `SessionEnd`
- 응답 종료: `Stop`
- 그 외: 권한 요청, 컨텍스트 압축, 지침 로드 등 이벤트별 연결

프로젝트의 의미와 맥락을 판단해야 하는 기준은 Hook이 아니라 `CLAUDE.md`나 Skill에서 제공해요.

## 예약 실행

정해진 시각이나 주기에 같은 작업을 반복할 때 써요.

| 수단 | 실행 조건 | 쓰는 상황 |
| --- | --- | --- |
| `/loop` | 세션이 열려 있어야 해요 | 빌드나 배포 상태를 주기적으로 확인할 때 |
| `/schedule` | 클라우드에서 실행돼요 | 세션과 무관하게 정해진 주기로 돌릴 때 |
| `claude -p "요청"` | 외부 스케줄러가 호출해요 | CI나 cron에서 1회 실행할 때 |

사람이 결과를 확인해야 하는 작업은 예약 실행으로 넘기지 않아요.

## Plugin

Skill, Subagent, Hook과 MCP 설정을 하나의 설치 단위로 배포할 때 사용해요.

- 설치와 관리: `/plugin` 또는 `claude plugin`
- 마켓플레이스에서 설치하거나 저장소를 직접 지정할 수 있어요.
- 설치 상태는 `settings.json`의 `enabledPlugins`에 남아요.

하나의 개인 작업 절차만 필요하면 Skill로 시작하고, 여러 구성요소를 함께 배포할 때 Plugin을 검토해요.

## 확인 기준

2026-09-23에 Claude Code 2.1.280으로 확인했어요.  
각 수단의 세부 옵션은 공식 문서를 함께 봐요.

## 공식 문서

- [Skills](https://code.claude.com/docs/ko/skills)
- [Subagents](https://code.claude.com/docs/ko/sub-agents)
- [worktree 병렬 세션](https://code.claude.com/docs/ko/worktrees)
- [MCP](https://code.claude.com/docs/ko/mcp)
- [Hooks](https://code.claude.com/docs/ko/hooks)
- [Plugins](https://code.claude.com/docs/ko/plugins)
