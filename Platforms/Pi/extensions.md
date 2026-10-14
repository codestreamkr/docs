# Pi 확장 기능

필요한 책임에 맞는 확장 수단을 선택해요.

## 선택 기준

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
| 외부 서버의 도구와 데이터 연결 | 내장 MCP |
| 도구를 병렬 호출하고 결과를 추려 전달 | Codemode |
| 실행이 닿는 범위 제한 | 격리 실행 |

Pi `0.99.0` 이상은 MCP와 Codemode를 내장 Extension으로 제공해요.  
이전 버전에서는 외부 도구를 Skill 또는 별도 Extension으로 연결해요.

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
변경 문제 지적은 [작업 흐름](./workflows.md#변경-확인과-검토)을 봐요.

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

## MCP 연결

Pi `0.99.0` 이상에서 stdio 또는 Streamable HTTP 서버를 연결해요.

1. 사용할 MCP 서버의 주소·인증·도구 범위를 확인하세요.
2. 터미널에서 서버를 등록하고 연결 상태를 확인하세요.

```bash
pi mcp add docs --url https://example.com/mcp --bearer-token-env-var DOCS_TOKEN
pi mcp list
```

`https://example.com/mcp`는 실제 서버 주소로 바꾸세요.  
`DOCS_TOKEN` 환경 변수에 서버가 요구하는 자격증명을 설정하세요.

3. 실행 중인 세션에서는 `/reload` 후 `/mcp`에서 서버 상태와 노출 도구를 확인하세요.
4. OAuth 서버는 `/mcp login <서버명>`으로 로그인하세요.

| 위치 또는 설정 | 동작 |
| --- | --- |
| `~/.pi/agent/mcp.json` | 사용자 서버를 설정해요. |
| `<repo>/.pi/mcp.json` | 신뢰한 프로젝트에서만 서버 설정을 읽어요. |
| `exposure: "codemode"` | 도구를 검색하고 Codemode에서 호출해요. |
| `exposure: "direct"` | 모델에 도구를 직접 선언해요. |

- Pi `1.0.1` 이상은 프로젝트에서 사용자 서버의 활성화와 노출 범위만 재정의할 수 있어요.
- `/mcp`에서 **Disable in this project**를 선택하면 프로젝트 재정의를 저장해요.
- 인증 정보는 사용자 설정에 두세요.
- SSE 전송은 지원하지 않아요.

인증 옵션과 도구 노출 기준은 [MCP Servers](https://pi.dev/docs/latest/mcp)를 확인하세요.

## Codemode

Codemode는 JavaScript로 여러 도구를 호출하고 필요한 결과만 모델에 전달해요.  
Pi `0.99.0` 이상에서 사용할 수 있어요.

```bash
pi --tools +codemode
```

위 시작 옵션은 Pi `1.1.0` 이상을 기준으로 해요.  
Pi `0.99.0` 이상에서는 Settings의 `defaultTools`에 `+codemode`를 추가할 수도 있어요.

```json
{
  "defaultTools": ["+codemode"]
}
```

입력창에서 도구와 조사 범위를 지정하세요.

```text
Codemode로 src/order와 src/payment의 테스트 목록을 병렬 조회해줘.
모듈별 테스트 경로와 누락된 검증만 보고해줘. 파일은 수정하지 마.
```

- JavaScript는 QuickJS 샌드박스에서 실행해요.
- 파일·네트워크 작업은 도구를 통해 실행해요.
- 도구 호출로 발생한 변경은 스크립트 실패로 취소되지 않아요.
- `searchTools()`와 `describeTool()`로 도구를 찾고 입력 형식을 확인해요.
- `models.classify()`는 분류 모델을, `models.generateImages()`는 이미지 모델을 호출해요.
- 해당 모델을 지원하는 제공자 인증이 필요해요. 모델 호출 비용은 세션 비용에 포함돼요.

호출 형식과 지원 모델은 [Codemode](https://pi.dev/docs/latest/codemode)를 확인하세요.

## Extension 호환성 확인

Extension이나 SDK를 사용하는 프로젝트는 업그레이드 전에 다음 항목을 확인하세요.

| 기준 버전 | 기존 사용 | 변경할 내용 |
| --- | --- | --- |
| 0.87.0 | `shouldStopAfterTurn` | `finishTurn`에서 `{ action: "end" }`를 반환해요. 오류·중단 응답도 처리해요. |
| 0.87.0 | `session.agent.state.messages`에 문맥 대입 | SessionManager에서 항목을 변경한 뒤 `session.refreshContext()`를 호출해요. |
| 0.87.0 | `SessionEntry`·`ExtensionEvent` 전체 분기 | `context_edit`와 `agent_before_settle`을 처리해요. |
| 1.2.0 | `before_agent_start`에서 항상 `prompt` 참조 | `event.messageType === "user"`일 때만 사용자 요청 필드를 읽어요. |

1. 설치 버전과 프로젝트가 사용하는 이벤트 타입을 확인하세요.
2. [0.87.0](https://pi.dev/changelog/releases/0.87.0)과 [1.2.0](https://pi.dev/changelog/releases/1.2.0)의 변경된 타입을 적용하세요.
3. 사용자 요청·Extension 메시지·실행 중단·오류 경로를 검증하세요.

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

## 확인 기준

기본 기능은 설치본 Pi `0.87.1`, 추가 기능은 2026-10-14 공식 문서를 기준으로 해요.  
추가한 Extension·Package는 `/reload` 뒤 명령과 도구가 노출되는지 확인해요.  
Extension·SDK·RPC 예제의 실행과 외부 서비스 연결은 사용할 프로젝트에서 확인해요.

## 공식 문서

- [Extensions](https://pi.dev/docs/latest/extensions)
- [Skills](https://pi.dev/docs/latest/skills)
- [Prompt Templates](https://pi.dev/docs/latest/prompt-templates)
- [Custom Provider](https://pi.dev/docs/latest/custom-provider)
- [Packages](https://pi.dev/docs/latest/packages)
- [CLI Integration](https://pi.dev/docs/latest/cli-integration)
- [SDK](https://pi.dev/docs/latest/sdk)
- [Containerization](https://pi.dev/docs/latest/containerization)
- [MCP Servers](https://pi.dev/docs/latest/mcp)
- [Codemode](https://pi.dev/docs/latest/codemode)
