# Pi 환경 설정

사용자 공통 확장, 프로젝트 작업 기준과 Pi 실행 설정을 역할에 맞는 위치에 둔다.

## 설치와 인증

설치한 뒤 사용할 모델 제공자로 인증한다.

```bash
npm install -g @earendil-works/pi-coding-agent
cd /path/to/project
pi
```

인증은 두 방식 중 하나를 사용한다.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

```text
/login
```

설치와 버전은 다음 명령으로 확인한다.

```bash
pi --version
pi update
```

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `~/.agents/skills/` | 여러 도구에서 공유하는 사용자 Skill |
| `~/.pi/agent/skills/` | Pi 전용 사용자 Skill |
| `<repo>/.agents/skills/`, `<repo>/.pi/skills/` | 저장소에서 공유하는 프로젝트 Skill |
| `<repo>/AGENTS.md` | 프로젝트 작업 기준과 정본 문서 안내 |
| `~/.pi/agent/AGENTS.md` | 모든 프로젝트에 적용할 개인 지침 |
| `~/.pi/agent/settings.json` | 사용자 실행 설정 |
| `<repo>/.pi/settings.json` | 프로젝트 실행 설정 |
| `~/.pi/agent/extensions/`, `<repo>/.pi/extensions/` | TypeScript Extension |
| `~/.pi/agent/prompts/`, `<repo>/.pi/prompts/` | Prompt Template |
| `~/.pi/agent/themes/`, `<repo>/.pi/themes/` | Theme |

시스템 프롬프트를 바꿀 때는 `.pi/SYSTEM.md`로 대체하고, 덧붙일 때는 `APPEND_SYSTEM.md`를 사용한다.

## 사용자 Skill 확인

CodeStream 사용자 Skill은 `~/.agents/skills/`에 두면 별도 설정 없이 인식된다.

```text
~/.agents/skills/
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

Pi를 실행하면 시작 화면에 불러온 Skill이 표시된다. 세션 중에 Skill을 추가하거나 수정했다면 `/reload`로 다시 읽는다.

다른 도구의 Skill 디렉터리를 함께 쓰려면 Settings에 경로를 추가한다.

```json
{
  "skills": ["~/.claude/skills", "~/.codex/skills"]
}
```

## 프로젝트 AGENTS.md

프로젝트에 계속 적용할 짧은 기준과 정본 위치를 기록한다.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

적용 기준:

- Pi는 `AGENTS.md` 또는 `CLAUDE.md`를 읽는다.
- 현재 디렉터리부터 상위 디렉터리까지 찾은 파일을 모두 이어 붙인다.
- `~/.pi/agent/AGENTS.md`는 모든 프로젝트에 적용된다.
- 지침 파일을 쓰지 않을 때는 `--no-context-files`로 끈다.

프레임워크 일반 지식이나 Pi가 현재 환경에서 확인할 수 있는 기능 목록은 반복하지 않는다.

## Settings

`settings.json`에는 Pi 실행에 필요한 설정을 둔다.

- 기본 provider와 model
- thinking 수준과 표시 방식
- 추가 Skill·Extension 경로
- 설치한 Package 목록
- 업데이트 확인과 telemetry

```json
{
  "skills": ["~/.claude/skills"],
  "enableInstallTelemetry": false
}
```

프로젝트 설정은 사용자 설정을 덮어쓴다. 프로젝트의 코드 규칙과 문서 책임은 Settings가 아니라 `AGENTS.md`에서 관리한다. API 키는 설정 본문에 기록하지 않고 환경 변수를 사용한다.

## 적용 확인

Pi를 실행하고 시작 화면에서 다음 항목을 확인한다.

- 현재 작업 루트
- 불러온 `AGENTS.md`
- 사용할 수 있는 Skill과 Prompt Template
- 로드된 Extension
- 현재 provider와 model

```bash
pi --list-models
pi list
```

## 공식 문서

- [Pi Coding Agent](https://github.com/earendil-works/pi/tree/main/packages/coding-agent)
- [Quickstart](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/quickstart.md)
- [Settings](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/settings.md)
- [Skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md)
