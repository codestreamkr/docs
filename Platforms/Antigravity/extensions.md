# Antigravity 확장 기능

반복 절차, 지속 규칙, 외부 도구와 자동 검사는 서로 다른 확장 수단으로 관리해요.  
일상 작업은 세션 입력창에서 요청하고, 확장은 재사용하거나 강제할 기준이 있을 때만 추가해요.

## 선택 기준

| 필요한 것 | 선택 | 기본 위치 |
| --- | --- | --- |
| 프로젝트 작업 기준 | `AGENTS.md` 또는 `GEMINI.md` | 작업 공간 루트 또는 관련 디렉터리 |
| 세부 규칙 | Rules | `.agents/rules/` |
| 반복 가능한 절차·전문 지식 | Skill | `.agents/skills/` |
| 분리된 역할의 병렬 작업 | Custom subagent | Plugin 또는 사용자 정의 위치 |
| 외부 서비스의 도구·데이터 | MCP | `.agents/mcp_config.json` |
| 도구 실행 전후 자동 검사 | Hook | `.agents/hooks.json` |
| 여러 확장의 배포 | Plugin | Plugin 디렉터리 |

## Rules

`AGENTS.md` 또는 `GEMINI.md`에는 프로젝트 전반의 짧은 작업 기준과 정본 위치를 둬요.  
경로별 세부 규칙은 `.agents/rules/`의 Markdown 파일로 분리해요.  
반복 절차를 길게 적어야 하면 Rules 대신 Skill을 만들어요.

## Skill

Skill은 `SKILL.md`와 선택적인 스크립트·예제·리소스를 묶은 폴더예요.  
세션 시작 시 이름과 설명을 확인하고, 요청과 맞으면 에이전트가 전체 지시를 읽어요.  
사용자가 명시적으로 실행하려면 입력창에서 `/<skill-name>`을 입력해요.

CLI에서 사용할 위치와 CodeStream Skill 연결 방법은 [환경 설정](./setup.md#사용자-skill)을 봐요.

## Custom subagent

서로 독립적인 조사·검증·구현을 별도 맥락으로 나눌 때 사용해요.  
입력창의 `/agents`로 현재 에이전트와 백그라운드 서브에이전트를 확인해요.  
역할·권한·도구는 서브에이전트 정의에서 필요한 만큼만 지정해요.

## MCP

MCP는 데이터베이스, 로컬 개발 도구, 원격 API 같은 외부 도구와 최신 데이터를 연결해요.  
CLI에서 `/mcp`로 상태와 연결 로그를 확인하고, 전역 또는 작업 공간 설정으로 관리해요.

| 범위 | 위치 |
| --- | --- |
| 개인 전역 | `~/.gemini/config/mcp_config.json` |
| 작업 공간 | `.agents/mcp_config.json` |

비밀값과 권한 범위는 MCP 서버의 인증 방식과 Antigravity 권한 정책을 함께 검토해요.

## Hook

Hook은 도구 실행 전후 또는 에이전트 실행 단계에 셸 명령을 연결해 검사와 형식화를 자동화해요.  
CLI는 작업 공간 `.agents/hooks.json`, 전역 `~/.gemini/config/hooks.json`, `~/.gemini/antigravity-cli/settings.json`, Plugin의 `hooks.json`을 지원해요.  
현재 로드된 Hook은 입력창의 `/hooks`에서 확인해요.

Hook에는 안전하고 빠르며 결과가 일정한 검사만 넣어요.

## Plugin

Plugin은 `plugin.json`을 필수 매니페스트로 사용하고 Skill·Subagent·Rule·MCP·Hook을 함께 배포해요.  
설치된 Plugin은 입력창의 `/plugin` 또는 터미널의 `agy plugin list`로 확인해요.

```bash
agy plugin --help
agy plugin list
```

## 확인 기준

- 작업 기준, 반복 절차, 자동 검사, 외부 도구의 책임이 겹치지 않아요.
- `/skills`, `/agents`, `/mcp`, `/hooks`에서 필요한 확장이 로드된 것을 확인해요.
- 공유 설정에는 비밀값을 저장하지 않아요.

## 공식 문서

- [Antigravity Agent Skills](https://antigravity.google/docs/skills)
- [Antigravity Rules](https://antigravity.google/docs/rules)
- [Antigravity Custom Subagents](https://antigravity.google/docs/subagents/)
- [Antigravity MCP](https://antigravity.google/docs/mcp)
- [Antigravity Hooks](https://antigravity.google/docs/hooks)
- [Antigravity Plugins](https://antigravity.google/docs/plugins)
