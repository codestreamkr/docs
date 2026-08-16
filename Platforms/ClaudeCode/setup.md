# Claude Code 환경 설정

사용자 공통 확장, 프로젝트 작업 기준과 Claude Code 실행 설정을 역할에 맞는 위치에 둔다.

## 설치와 실행

프로젝트 루트에서 실행하고 설치 상태는 진단 명령으로 확인한다.

```bash
npm install -g @anthropic-ai/claude-code
cd /path/to/project
claude
```

```bash
claude doctor
claude update
```

권한 확인을 건너뛰는 실행 옵션은 승인과 격리를 별도로 보장하는 환경에서만 사용한다.

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

Claude Code가 제공하는 Bundled Skill은 제품이 관리하며 사용자 Skill과 이름이 겹치면 사용자 Skill이 우선한다.

## 사용자 Skill 확인

현재 CodeStream 사용자 Skill은 `~/.claude/skills/`에서 사용한다.

```text
~/.claude/skills/
├── ct-calltree/
├── ct-external-architect/
├── ct-plan/
├── ct-qa-lucin/
├── ct-query-tuner/
├── ct-script-run/
├── ct-spring/
├── ct-wiki-api/
└── ct-wiki-ops/
```

새 세션에서 `/`를 입력해 실제 노출 목록을 확인한다. Skill을 추가하거나 수정하면 세션을 다시 시작하지 않아도 반영된다.

## 프로젝트 지침

프로젝트에 계속 적용할 짧은 기준과 정본 위치를 `CLAUDE.md`에 기록한다.

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

- 파일당 200줄 이하를 목표로 하고 매 세션에 필요한 사실만 남긴다.
- 여러 단계의 절차는 `CLAUDE.md`가 아니라 Skill로 분리한다.
- 특정 경로에만 필요한 기준은 `.claude/rules/`에 `paths` 조건과 함께 둔다.
- 다른 파일을 함께 읽히려면 `@path/to/file` 형식으로 가져온다.
- `/init`으로 초안을 만들고 프로젝트에서 직접 확인한 내용을 보완한다.

Claude Code는 `AGENTS.md`를 직접 읽지 않는다. `AGENTS.md`를 쓰는 저장소는 `CLAUDE.md`에서 `@AGENTS.md`로 가져와 같은 기준을 공유한다.

## Settings

`settings.json`에는 Claude Code 실행에 필요한 설정을 둔다.

- 도구 권한의 허용과 차단
- 환경 변수
- Hook
- MCP 서버 사용 여부
- 자동 메모리와 컨텍스트 동작

우선순위는 관리 정책, CLI 옵션, `settings.local.json`, `settings.json`, 사용자 설정 순이다. 프로젝트의 코드 규칙과 문서 책임은 Settings가 아니라 `CLAUDE.md`에서 관리한다. 비밀값은 설정 본문에 기록하지 않고 환경 변수를 사용한다.

## 적용 확인

새 세션을 열고 다음 항목을 확인한다.

- 현재 작업 루트
- `/context`의 Memory files에 표시되는 지침 파일
- `/`에 표시되는 사용자 Skill
- `/mcp`에 표시되는 외부 연결
- `/permissions`의 현재 권한 범위

## 공식 문서

- [Quickstart](https://code.claude.com/docs/en/quickstart)
- [Memory와 CLAUDE.md](https://code.claude.com/docs/en/memory)
- [Settings](https://code.claude.com/docs/en/settings)
- [Skills](https://code.claude.com/docs/en/skills)

