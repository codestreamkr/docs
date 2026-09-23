# Pi 확장 기능

필요한 책임에 맞는 확장 수단을 선택해요.

## 선택표

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `AGENTS.md` |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill |
| 자주 쓰는 요청 문구의 단축 입력 | Prompt Template |
| 도구, 명령, 이벤트 처리와 UI 변경 | Extension |
| 사내 게이트웨이나 로컬 모델 연결 | `models.json` 또는 Provider Extension |
| 화면 색과 표시 방식 | Theme |
| 여러 구성요소를 배포하는 단위 | Pi Package |
| 다른 프로그램에 에이전트를 내장 | SDK, RPC 또는 JSON 모드 |
| 실행이 닿는 범위 제한 | 격리 실행 |

Pi는 MCP를 기본으로 제공하지 않아요.  
외부 도구 연결은 CLI 도구를 설명하는 Skill로 만들거나 Extension으로 붙여요.

프로젝트의 `.pi/` 자원과 `.agents/skills/`는 신뢰를 준 뒤에만 로드돼요.  
신뢰 기준은 [환경 설정](./setup.md)을 봐요.

## Skill

Skill은 반복 가능한 작업의 입력, 절차, 결과와 필요한 자원을 묶어요.  
Agent Skills 표준을 따라요.

- 공유 위치: `~/.agents/skills/<name>/SKILL.md`
- Pi 전용 위치: `~/.pi/agent/skills/<name>/SKILL.md`
- 프로젝트 위치: `<repo>/.agents/skills/`, `<repo>/.pi/skills/`
- 직접 호출: `/skill:name`
- 자동 선택: `description`과 현재 요청을 기준으로 선택
- 다시 읽기: `/reload`

frontmatter의 `allowed-tools`로 사전 승인 도구를 정하고, `disable-model-invocation`으로 자동 선택에서 감출 수 있어요.

같은 `SKILL.md`를 Claude Code, Codex, Grok Build와 공유할 수 있어요.  
현재 사용자 Skill과 호출 예제는 [Skill 안내](./skills.md)에서 확인해요.

## Prompt Template

자주 쓰는 요청 문구를 직접 만들어 명령처럼 사용해요.  
실행 코드는 없고, Pi가 기본 제공하는 템플릿도 없어요.

파일 이름이 명령 이름이 돼요.  
[예제 `ready-pr.md`](./examples/basic-pi-package/prompts/ready-pr.md)를 `~/.pi/agent/prompts/`에 두면 `/ready-pr`로 불러요.

- 위치: `~/.pi/agent/prompts/`, `<repo>/.pi/prompts/`
- 추가하거나 고친 뒤에는 `/reload`로 다시 읽어요.

판단 기준과 절차가 중요한 작업은 Prompt Template이 아니라 Skill로 만들어요.  
변경 문제 지적은 [작업 흐름](./workflows.md#구현한-변경-검토하기)을 봐요.

## Extension

TypeScript로 Pi의 동작 자체를 바꿔요.  
로컬 Extension은 별도 컴파일 없이 그대로 읽혀요.

```typescript
export default function (pi: ExtensionAPI) {
  pi.registerTool(/* 도구 정의 */);
  pi.registerCommand(/* 명령 정의 */);
  pi.on(/* 이벤트 이름, 핸들러 */);
}
```

- 위치: `~/.pi/agent/extensions/`, `<repo>/.pi/extensions/`
- 단일 `.ts`·`.js` 파일이나 `index.ts`·`index.js`를 가진 디렉터리를 읽어요.
- 세션 로드: `--extension <경로>`, 끄기: `--no-extensions`

주요 용도:

- 커스텀 도구 추가와 기본 도구 대체
- 실행 옵션과 슬래시 명령 추가
- 이벤트를 받아 권한 게이트나 경로 보호 적용
- 상태줄, 헤더와 UI 컴포넌트 변경
- 모델 제공자 등록

Extension은 Pi 프로세스 안에서 실행돼요.  
자격증명과 대화 내용에 접근할 수 있으니 외부 Extension은 코드를 먼저 확인해요.

## 모델 제공자

연결 방법은 필요한 만큼만 고르면 돼요.

| 필요한 것 | 방법 |
| --- | --- |
| 지원하는 API를 쓰는 엔드포인트 추가 | `models.json` |
| 기존 제공자의 주소나 헤더만 변경 | `models.json` 또는 작은 Provider Extension |
| 모델 목록을 동적으로 조회 | Provider Extension |
| `/login` 흐름 추가 | Provider Extension |
| 지원하지 않는 통신 규격 구현 | Provider Extension |

Provider Extension은 `pi.registerProvider()`를 Extension 함수 안에서 호출해 등록해요.  
등록한 제공자는 시작 시 모델 선택과 `pi --list-models`에 함께 나와요.

API 키는 `$NAME` 형식으로 환경 변수를 읽거나 `!command` 형식으로 명령 출력을 쓸 수 있어요.

## Pi Package

Extension, Skill, Prompt Template과 Theme를 하나의 배포 단위로 묶어요.

```bash
pi install npm:@example/pi-tools@1.0.0
pi install git:github.com/example/pi-tools@v1
pi install ./local-package
pi list
pi config
pi remove <source>
```

```json
{
  "pi": {
    "extensions": ["./src/extension.ts"],
    "skills": ["./resources/skills"],
    "prompts": ["./resources/prompts/*.md"],
    "themes": ["./resources/themes/*.json"]
  }
}
```

- `package.json`의 `pi` 항목으로 포함 자원을 지정하고, 없으면 관례 디렉터리에서 찾아요.
- `pi config`로 설치한 Package의 자원별 사용 여부를 정해요.
- Package는 코드를 실행해요. 설치 전에 출처와 내용을 확인해요.

## 실행 모드와 내장

Pi를 다른 프로그램에서 쓸 때 고르는 경계가 달라요.

| 방법 | 경계 | 쓰는 상황 |
| --- | --- | --- |
| `--print` | 프로세스 1회 실행 | 최종 텍스트만 필요할 때 |
| `--mode json` | JSONL 이벤트 스트림 | 진행 상황을 구조화해 받을 때 |
| `--mode rpc` | 장시간 유지되는 양방향 채널 | 외부 프로그램이 계속 제어할 때 |
| SDK | 프로세스 경계 없음 | Node.js나 Bun 안에 직접 내장할 때 |

네 방법 모두 같은 에이전트, 세션, 자원과 도구를 써요.

Pi가 실행하는 셸 명령에는 현재 세션 정보가 환경 변수로 들어가요.  
기존 스크립트와 엮을 때 써요.

| 변수 | 값 |
| --- | --- |
| `AI_AGENT` | `pi` |
| `PI_CODING_AGENT` | `true` |
| `PI_SESSION_ID` | 현재 세션 ID |
| `PI_PROVIDER`, `PI_MODEL` | 현재 제공자와 모델 |
| `PI_REASONING_LEVEL` | 현재 thinking 수준 |

## 격리 실행

Pi는 실행한 계정의 권한으로 파일을 읽고 쓰고 명령을 실행해요.  
매번 승인을 묻지 않아요.  
영향 범위를 제한하려면 격리 환경을 써요.

| 방법 | Pi가 도는 곳 | 격리되는 것 |
| --- | --- | --- |
| Docker | 컨테이너 | Pi, 기본 도구, `!` 명령, Extension |
| Docker Sandboxes | 관리형 샌드박스 | 위와 같고, 제공자 자격증명은 호스트에 남아요 |
| OpenShell | 로컬 또는 원격 샌드박스 | 파일, 프로세스, 네트워크와 자격증명을 정책으로 제한 |
| Gondolin Extension | 호스트 | 기본 도구와 `!` 명령만 격리 |

`~/.pi/agent`를 컨테이너에 그대로 마운트하면 자격증명과 세션까지 노출돼요.  
필요한 작업 폴더와 네트워크만 열어요.

## 공식 문서

- [Extensions](https://pi.dev/docs/latest/extensions)
- [Skills](https://pi.dev/docs/latest/skills)
- [Prompt Templates](https://pi.dev/docs/latest/prompt-templates)
- [Custom Provider](https://pi.dev/docs/latest/custom-provider)
- [Packages](https://pi.dev/docs/latest/packages)
- [CLI Integration](https://pi.dev/docs/latest/cli-integration)
- [SDK](https://pi.dev/docs/latest/sdk)
- [Containerization](https://pi.dev/docs/latest/containerization)
