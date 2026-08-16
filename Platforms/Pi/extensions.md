# Pi 확장 기능

필요한 책임에 맞는 확장 수단을 선택한다.

## 선택표

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `AGENTS.md` |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill |
| 자주 쓰는 요청 문구의 단축 입력 | Prompt Template |
| 도구, 명령, 이벤트 처리와 UI 변경 | Extension |
| 사내 게이트웨이나 로컬 모델 연결 | Custom Provider |
| 화면 색과 표시 방식 | Theme |
| 여러 구성요소를 배포하는 단위 | Pi Package |
| 다른 프로그램에 에이전트를 내장 | SDK 또는 RPC |

Pi는 MCP를 기본으로 제공하지 않는다. 외부 도구 연결은 CLI 도구를 설명하는 Skill로 만들거나 Extension으로 MCP를 붙인다.

## Skill

Skill은 반복 가능한 작업의 입력, 절차, 결과와 필요한 자원을 묶는다. Agent Skills 표준을 따른다.

- 공유 위치: `~/.agents/skills/<name>/SKILL.md`
- Pi 전용 위치: `~/.pi/agent/skills/<name>/SKILL.md`
- 프로젝트 위치: `<repo>/.agents/skills/`, `<repo>/.pi/skills/`
- 직접 호출: `/skill:name`
- 자동 선택: `description`과 현재 요청을 기준으로 선택
- 다시 읽기: `/reload`

같은 `SKILL.md`를 Claude Code, Codex, Grok Build과 공유할 수 있다. 현재 사용자 Skill과 호출 예제는 [Skill 안내](./skills.md)에서 확인한다.

## Prompt Template

자주 쓰는 요청 문구를 명령처럼 사용한다.

- 위치: `~/.pi/agent/prompts/`, `<repo>/.pi/prompts/`
- 호출: `/템플릿이름`

판단 기준과 절차가 중요한 작업은 Prompt Template이 아니라 Skill로 만든다.

## Extension

TypeScript로 Pi의 동작 자체를 바꾼다.

```typescript
export default function (pi: ExtensionAPI) {
  pi.registerTool({ name: "deploy" });
  pi.registerCommand("stats", {});
  pi.on("tool_call", async (event, ctx) => {});
}
```

- 위치: `~/.pi/agent/extensions/`, `<repo>/.pi/extensions/`
- 세션 로드: `--extension <경로>`, 끄기: `--no-extensions`

주요 용도:

- 커스텀 도구 추가와 기본 도구 대체
- 서브 에이전트와 plan 모드
- 권한 게이트와 경로 보호
- 컨텍스트 압축 방식 변경
- 상태줄, 헤더와 UI 컴포넌트
- MCP 연결 추가

## Custom Provider

모델 실행 계층을 프로젝트 환경에 맞춘다.

```typescript
pi.registerProvider("local-openai", {
  name: "Local OpenAI Compatible",
  baseUrl: "http://localhost:1234/v1",
  apiKey: "$LOCAL_OPENAI_API_KEY",
  api: "openai-completions",
  models: [],
});
```

- 사내 LLM Gateway 연결
- 회사 프록시나 SSO 인증 경유
- 로컬 모델 서버를 모델 목록에 포함
- 확인: `/model` 또는 `pi --list-models`

## Pi Package

Extension, Skill, Prompt Template과 Theme를 하나의 배포 단위로 묶는다.

```bash
pi install <source>
pi list
pi config
pi remove <source>
```

- npm 또는 git으로 배포한다.
- `package.json`의 `pi` 항목으로 포함 자원을 지정하고, 없으면 관례 디렉터리에서 찾는다.
- Package는 전체 시스템 권한으로 실행되므로 설치 전에 코드를 확인한다.

## SDK와 RPC

에이전트를 다른 프로그램에 내장할 때 사용한다.

- SDK: 자동화 스크립트나 서비스에 Pi를 직접 포함한다.
- RPC: `--mode rpc`로 다른 언어에서 Pi를 제어한다.
- JSON 출력: `--mode json`으로 실행 결과를 수집한다.

## 공식 문서

- [Extensions](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md)
- [Skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md)
- [Custom Provider](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/custom-provider.md)
- [Packages](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md)
- [SDK](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md)
- [RPC](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md)
