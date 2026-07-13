# 03. [중급] Pi 확장과 자동화

Pi의 하네스 강점을 서로 다른 방식으로 직접 확인한다.

이 문서는 [Pi 기본 개념](./02-understanding-core-concepts.md)의 `Pi가 잘하는 작업 방식`을 실습으로 연결한다. 같은 형태의 Extension 예제를 반복하지 않고, 설치해서 쓰기, 명령으로 쓰기, 도구로 쓰기, provider 연결, SDK/RPC 내장, 세션 분기까지 다른 패턴으로 나눠 확인한다.

## 1. 실습 전 준비

프로젝트 루트에서 Pi를 실행한다.

```bash
cd /path/to/project
pi
```

프로젝트 로컬 설정 폴더를 만든다.

```bash
mkdir -p .pi/extensions
```

Extension이나 package를 추가한 뒤에는 Pi 안에서 다시 로드한다.

```text
/reload
```

실습 기준은 아래와 같다.

- 처음에는 프로젝트 로컬 설정만 사용한다.
- 설치형 리소스는 `-l`로 프로젝트에만 적용한다.
- 직접 구현은 한 번만 해보고, 나머지는 설치와 내장 흐름을 확인한다.
- 외부 package는 신뢰할 수 있는 출처만 사용한다.

## 2. 패턴 1: Extension 하나로 실행 흐름에 개입하기

Extension은 모델 앞단이나 도구 실행 전후에 코드로 개입한다.

이 실습에서는 하나의 Extension으로 두 가지를 확인한다.

- `?짧게` 입력을 모델에 보내기 전에 변환한다.
- 긴 `bash` 결과를 모델에 전달하기 전에 줄인다.

### 목표

- 실행 흐름 앞단 개입 확인
- 도구 결과 후처리 확인
- 프롬프트가 아니라 하네스 코드가 처리하는 흐름 확인

### 파일 생성

`.pi/extensions/harness-flow.ts`를 만든다.

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { isBashToolResult } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("input", async (event) => {
    if (!event.text.startsWith("?짧게 ")) return { action: "continue" };

    return {
      action: "transform",
      text: `짧고 핵심만 답해줘. ${event.text.slice("?짧게 ".length)}`,
    };
  });

  pi.on("tool_result", async (event) => {
    if (!isBashToolResult(event)) return;

    const text = event.content
      .map((item) => item.type === "text" ? item.text : "")
      .join("\n");

    if (text.length < 4000) return;

    const lines = text.split("\n");
    const focused = lines.filter((line) =>
      /error|failed|failure|exception|ERR!/i.test(line)
    );

    return {
      content: [
        {
          type: "text",
          text: [
            "긴 bash 출력이 감지되어 핵심 라인만 전달합니다.",
            "",
            ...focused.slice(0, 80),
            "",
            `원본 라인 수: ${lines.length}`,
          ].join("\n"),
        },
      ],
    };
  });
}
```

Pi에서 다시 로드한다.

```text
/reload
```

### 입력

```text
?짧게 이 프로젝트에서 먼저 확인할 파일을 알려줘.
```

긴 출력이 있는 프로젝트에서는 아래도 실행한다.

```text
테스트 명령을 하나 실행하고, 실패하면 핵심 에러를 기준으로 원인을 설명해줘.
```

### 확인할 결과

- `?짧게` 입력이 실제 모델 입력으로 변환된다.
- 긴 명령 출력은 모델에 들어가기 전에 줄어든다.
- 같은 Extension 안에서 입력 전처리와 결과 후처리를 모두 확인한다.

## 3. 패턴 2: 만들어진 Pi package 설치해서 쓰기

이미 만들어진 하네스 리소스는 package로 설치해서 쓴다.

package는 extension, skill, prompt template, theme를 묶어 배포하는 단위다. 사내 공통 기능이 많아지면 전역 파일로 흩어두기보다 package로 묶는 방식을 검토한다.

### 목표

- Extension, skill, prompt template을 직접 만들지 않고 설치한다.
- 프로젝트 로컬 설치와 전역 설치를 구분한다.
- 설치된 리소스가 Pi에 추가되는 것을 확인한다.

### 설치

저장소 루트에 `PI/examples/basic-pi-package/package.json`, `prompts/ready-pr.md`, `skills/project-check/SKILL.md`가 있는지 먼저 확인한다.

```bash
test -f PI/examples/basic-pi-package/package.json
test -f PI/examples/basic-pi-package/prompts/ready-pr.md
test -f PI/examples/basic-pi-package/skills/project-check/SKILL.md
```

설치 전에 package가 등록하는 리소스와 실행 지침을 검토한다.

```bash
sed -n '1,220p' PI/examples/basic-pi-package/package.json
sed -n '1,220p' PI/examples/basic-pi-package/prompts/ready-pr.md
sed -n '1,260p' PI/examples/basic-pi-package/skills/project-check/SKILL.md
```

검토한 로컬 리소스를 이 명령에서 승인하고 프로젝트에만 설치한다. `--approve`는 현재 명령에만 적용된다.

```bash
pi install -l ./PI/examples/basic-pi-package --approve
```

설치 상태를 확인한다.

```bash
pi list --approve
```

Pi 안에서 `/trust`를 실행해 현재 프로젝트를 신뢰 대상으로 저장한다. Pi를 종료하고 저장소 루트에서 다시 시작한다.

```text
/trust
```

```bash
pi
```

### 실행

설치한 prompt template과 skill을 각각 호출한다.

```text
/ready-pr
/skill:project-check
```

### 확인할 결과

- `/ready-pr`가 변경 상태, 검증 상태, PR 초안을 요청하는 프롬프트로 확장된다.
- `/skill:project-check`가 읽기 전용 프로젝트 점검 절차를 불러온다.
- `pi list --approve`의 `Project packages`에 `../PI/examples/basic-pi-package`와 실제 package 경로가 표시된다.

### 실패 점검

- `No such file`이 나오면 저장소 루트에서 실행했는지 확인한다.
- `Project is not trusted`가 나오면 소스를 검토한 뒤 명령에 `--approve`를 붙였는지 확인한다.
- 명령이 보이지 않으면 `/trust` 저장 후 Pi를 재시작했는지 확인한다.
- 같은 이름의 전역 prompt나 skill이 있으면 충돌을 피하도록 기존 리소스를 비활성화한다.

전역, npm, git 설치 형식은 실제 배포 package를 사용할 때 적용한다.

```bash
pi install ./PI/examples/basic-pi-package
pi install npm:@scope/pi-package
pi install git:github.com/organization/pi-package
```

## 4. 패턴 3: prompt template을 명령처럼 쓰기

반복 프롬프트는 prompt template로 실행한다.

예를 들어 `ready-pr-local.md`를 만들면 Pi 안에서 `/ready-pr-local`로 호출할 수 있다.

### 목표

- 긴 요청을 slash command처럼 실행한다.
- PR 준비 점검 흐름을 재사용한다.
- 매번 같은 출력 형식을 유지한다.

### 사전 조건

프로젝트 루트에서 `.pi/prompts`를 만든다.

```bash
mkdir -p .pi/prompts
```

### 파일 생성

`.pi/prompts/ready-pr-local.md`를 만든다.

```markdown
---
description: 현재 변경 상태를 읽고 로컬 PR 준비 결과를 정리한다
---
`git status --short`와 `git diff`를 기준으로 변경 요약, 검증 상태, 남은 확인 사항, PR 제목과 본문 초안을 작성해줘.
파일은 수정하지 마.
```

### 다시 읽기

```text
/reload
```

### 실행

```text
/ready-pr-local
```

### 확인할 결과

- 변경 요약
- 확인한 파일
- 검증 상태
- 남은 확인 사항
- PR 설명 초안

### 실패 점검

- `/ready-pr-local`이 보이지 않으면 파일 경로와 `.md` 확장자를 확인한다.
- frontmatter의 `---` 시작·종료 구분자가 있는지 확인한다.
- 같은 이름의 전역 prompt가 있으면 파일명을 바꾸고 `/reload`한다.

### 활용 기준

- 매번 같은 문장으로 요청하는 작업은 prompt template로 둔다.
- 실행 코드가 필요 없는 반복 프롬프트에 적합하다.
- 팀 문서 형식, PR 설명, 릴리스 노트 초안에 쓰기 좋다.

## 5. 패턴 4: skill로 작업 절차 불러오기

작업 절차와 참고 기준은 skill로 불러온다.

예를 들어 `project-check-local` skill을 만들면 `/skill:project-check-local`로 호출할 수 있다.

### 목표

- 작업 절차를 필요할 때 불러온다.
- 새 프로젝트 분석 흐름을 표준화한다.
- 명령 실행 전 확인 절차를 유지한다.

### 사전 조건

프로젝트 로컬 skill 디렉터리를 만든다.

```bash
mkdir -p .pi/skills/project-check-local
```

### 파일 생성

`.pi/skills/project-check-local/SKILL.md`를 만든다.

```markdown
---
name: project-check-local
description: 현재 프로젝트의 실행 명령과 검증 명령을 읽기 전용으로 점검할 때 사용한다.
---

# 프로젝트 점검

1. README와 빌드 설정 파일을 찾는다.
2. 파일에 정의된 실행·빌드·테스트·린트 명령만 정리한다.
3. 명령은 실행하지 않고 확인되지 않은 항목은 `확인 필요`로 표시한다.
4. 파일은 수정하지 않는다.
```

### 다시 읽기

```text
/reload
```

### 실행

```text
/skill:project-check-local
```

### 이어서 입력

```text
현재 프로젝트 기준으로 실행 명령과 검증 명령 후보를 정리해줘. 아직 실행하지는 마.
```

### 확인할 결과

- 기술 스택 후보
- 주요 디렉터리
- 실행 명령 후보
- 검증 명령 후보
- 먼저 읽을 파일

### 실패 점검

- 명령이 보이지 않으면 디렉터리명과 frontmatter의 `name`이 같은지 확인한다.
- 파일명이 대문자 `SKILL.md`인지 확인한다.
- `/reload` 후 `/skill:project-check-local`을 다시 실행한다.

### 활용 기준

- 절차와 판단 기준이 중요한 작업은 skill로 둔다.
- 코드 실행이 필요한 기능은 Extension이나 custom tool로 둔다.

## 6. 패턴 5: custom tool을 모델이 호출하게 하기

custom tool은 모델이 직접 호출할 수 있는 실행 기능이다.

예를 들어 `package_scripts` 도구를 만들면 `package.json`의 scripts를 모델이 직접 조회하게 할 수 있다.

### 목표

- 모델이 하네스 도구를 호출하는 흐름을 확인한다.
- 로컬 정보 조회를 프롬프트 설명이 아니라 도구 호출로 처리한다.
- 사내 Jira, Confluence, 로그 조회 도구로 확장할 기준을 잡는다.

### 사전 조건

프로젝트 루트에 유효한 `package.json`이 있어야 한다. Extension 디렉터리를 만든다.

```bash
test -f package.json
mkdir -p .pi/extensions
```

### 파일 생성

`.pi/extensions/package-scripts.ts`를 만든다.

```typescript
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "package_scripts",
    label: "Package Scripts",
    description: "현재 프로젝트 package.json의 scripts를 읽는다.",
    parameters: Type.Object({}),
    execute: async () => {
      try {
        const path = join(process.cwd(), "package.json");
        const packageJson = JSON.parse(await readFile(path, "utf8"));
        const scripts = packageJson.scripts ?? {};

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(scripts, null, 2),
            },
          ],
          details: { scriptCount: Object.keys(scripts).length },
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: "text", text: `package.json 조회 실패: ${message}` }],
          details: { scriptCount: 0 },
        };
      }
    },
  });
}
```

### 다시 읽기

```text
/reload
```

### 실행

```text
package_scripts 도구를 사용해서 테스트와 빌드에 쓸 수 있는 명령을 정리해줘.
```

### 확인할 결과

- 모델이 custom tool을 호출할 수 있다.
- 도구 결과에 `package.json`의 `scripts` 객체가 JSON으로 표시된다.
- 모델이 실제 script 이름을 바탕으로 테스트·빌드 명령을 정리한다.
- 같은 방식으로 외부 API나 로컬 스크립트를 도구화할 수 있다.

### 실패 점검

- 도구가 보이지 않으면 Extension 파일 위치와 `/reload` 결과를 확인한다.
- `package.json 조회 실패`가 나오면 현재 작업 디렉터리와 JSON 문법을 확인한다.
- `scripts`가 빈 객체라면 `package.json`에 실행 script가 정의되어 있는지 확인한다.

### 사내 Jira 예시

Jira 이슈 조회는 custom tool로 만들기 좋은 작업이다.

모델에게 Jira 사용법을 설명하는 대신, 모델이 호출할 수 있는 도구를 하네스에 붙인다.

예시 도구:

- `jira_get_issue`: 이슈 키로 제목, 설명, 상태, 담당자, 댓글 조회
- `jira_search`: JQL 또는 키워드로 관련 이슈 검색
- `jira_linked_issues`: 연결 이슈와 blocker 확인

사용자 요청 예시:

```text
PAY-421 이슈를 확인하고, 현재 코드에서 수정 영향 범위를 정리해줘.
```

기대 흐름:

1. 모델이 `jira_get_issue`로 `PAY-421`을 조회한다.
2. 이슈 요구사항과 댓글을 요약한다.
3. 관련 코드와 테스트를 찾는다.
4. 요구사항과 구현 차이를 정리한다.
5. 수정 대상과 검증 명령을 제안한다.

### 사내 Confluence 예시

Confluence 문서 검색도 custom tool로 만들기 좋다.

예시 도구:

- `confluence_search`: 키워드로 문서 검색
- `confluence_get_page`: page id로 본문 조회
- `confluence_recent_pages`: 특정 space의 최근 변경 문서 조회

사용자 요청 예시:

```text
결제 취소 정책 문서를 찾아서 현재 구현과 다른 부분을 정리해줘.
```

기대 흐름:

1. 모델이 `confluence_search`로 관련 정책 문서를 찾는다.
2. `confluence_get_page`로 문서 본문을 조회한다.
3. 코드에서 결제 취소 구현을 찾는다.
4. 정책 문서와 구현 차이를 표로 정리한다.
5. 코드 수정, 테스트 추가, 문서 수정 필요 여부를 나눈다.

### 활용 기준

- 사람이 매번 브라우저에서 찾아 붙여넣는 정보는 custom tool 후보로 본다.
- API 토큰, 사내망 접근, 권한 처리는 Extension 내부에서 다룬다.
- 여러 팀이나 프로젝트에서 반복되면 Jira/Confluence 도구를 Pi package로 묶는다.

## 7. 패턴 6: provider 연결 방식을 코드로 등록하기

Custom Provider는 모델 실행 계층을 프로젝트 환경에 맞춘다.

초급 단계에서는 실제 서버를 만들지 않고, 로컬 OpenAI 호환 서버를 등록하는 형태만 확인한다.

### 목표

- provider 등록 위치를 이해한다.
- endpoint, api key, 모델 목록을 코드로 등록한다.
- 사내 Gateway나 로컬 모델 서버 연결의 출발점을 만든다.

### 파일 생성

`.pi/extensions/local-provider-example.ts`를 만든다.

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerProvider("local-openai", {
    name: "Local OpenAI Compatible",
    baseUrl: "http://localhost:1234/v1",
    apiKey: "$LOCAL_OPENAI_API_KEY",
    api: "openai-completions",
    models: [
      {
        id: "local-model",
        name: "Local Model",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 4096,
      },
    ],
  });
}
```

`$LOCAL_OPENAI_API_KEY`는 환경 변수 참조다. 실제 호출 전에는 로컬 서버를 실행하고 값을 설정한다.

```bash
export LOCAL_OPENAI_API_KEY="replace-with-local-api-key"
```

Pi에서 다시 로드한다.

```text
/reload
```

### 확인

```text
/model
```

또는 CLI에서 확인한다.

```bash
pi --list-models local-openai
```

### 활용 기준

- 사내 LLM Gateway를 붙일 때 사용한다.
- 회사 프록시나 SSO 인증이 필요할 때 사용한다.
- 로컬 모델 서버를 Pi 모델 목록에 포함할 때 사용한다.

## 8. 패턴 7: SDK로 자동화 스크립트에 내장하기

SDK는 Pi를 다른 Node.js 프로그램 안에 넣을 때 사용한다.

이 패턴은 대화형 CLI가 아니라 CI, 내부 도구, 개인 자동화에서 Pi agent를 실행하는 방식이다.

### 목표

- Node.js 코드에서 agent session을 만든다.
- 출력 스트림을 코드에서 받는다.
- CI나 봇으로 확장할 출발점을 만든다.

### 준비

Pi에서 `/login`을 완료했거나 사용할 provider의 API 키 환경 변수가 설정되어 있어야 한다. `/model`에서 기본 모델을 선택한 뒤 임시 폴더에서 진행한다.

```bash
mkdir pi-sdk-practice
cd pi-sdk-practice
npm init -y
npm install --ignore-scripts @earendil-works/pi-coding-agent@0.80.6
mkdir -p scripts
```

`package.json`에 아래 값을 추가한다.

```json
{
  "type": "module"
}
```

### 파일 생성

`scripts/pi-check.mjs`를 만든다.

```javascript
import {
  AuthStorage,
  createAgentSession,
  ModelRegistry,
  SessionManager,
} from "@earendil-works/pi-coding-agent";

const authStorage = AuthStorage.create();
const modelRegistry = ModelRegistry.create(authStorage);

const { session } = await createAgentSession({
  sessionManager: SessionManager.inMemory(),
  authStorage,
  modelRegistry,
});

session.subscribe((event) => {
  if (
    event.type === "message_update" &&
    event.assistantMessageEvent.type === "text_delta"
  ) {
    process.stdout.write(event.assistantMessageEvent.delta);
  }
});

await session.prompt("현재 작업 디렉터리에서 확인해야 할 파일 종류를 짧게 설명해줘.");
session.dispose();
```

실행한다.

```bash
node scripts/pi-check.mjs
```

### 확인할 결과

- Pi가 대화형 UI 없이 실행된다.
- 출력 스트림을 코드에서 받을 수 있다.
- 같은 구조를 PR 점검, CI 리포트, 내부 포털에 붙일 수 있다.

### 실패 점검

- 인증 오류가 나오면 `/login` 상태 또는 provider API 키 환경 변수를 확인한다.
- 모델 오류가 나오면 Pi의 `/model`에서 기본 모델을 다시 선택한다.
- `scripts/pi-check.mjs`를 찾지 못하면 `scripts` 디렉터리와 실행 위치를 확인한다.

## 9. 패턴 8: RPC 모드로 다른 언어에서 붙이기

RPC 모드는 Pi를 별도 프로세스로 실행하고 외부 프로그램에서 제어할 때 사용한다.

### 목표

- Pi를 JSONL 기반 프로세스로 실행한다.
- Node.js가 아닌 언어에서도 붙일 수 있는 방식을 확인한다.
- SDK와 RPC의 선택 기준을 구분한다.

### 사전 조건

Pi 0.80.6 이상에서 `/login`을 완료했거나 provider API 키 환경 변수를 설정한다. 요청 파일을 둘 디렉터리를 만든다.

```bash
pi --version
mkdir -p scripts
```

### 파일 생성

`scripts/pi-rpc-request.jsonl`을 만든다. JSON 객체 한 개를 한 줄에 작성하고 마지막에 줄바꿈을 둔다.

```json
{"id":"req-1","type":"prompt","message":"현재 디렉터리를 요약해줘"}
```

### 실행

```bash
pi --mode rpc --no-session < scripts/pi-rpc-request.jsonl
```

RPC를 계속 제어하는 프로그램은 같은 형식의 JSON 객체를 stdin에 한 줄씩 보내고 stdout의 JSONL을 읽는다.

### 확인할 결과

요청이 수락되면 stdout 이벤트 중 아래 응답을 확인할 수 있다.

```json
{"id":"req-1","type":"response","command":"prompt","success":true}
```

이후 모델 응답이 이벤트로 이어지고 작업이 끝나면 종료 이벤트가 출력된다.

### 실패 점검

- JSON 파싱 오류가 나오면 요청이 한 줄짜리 JSON인지와 마지막 줄바꿈을 확인한다.
- `success:false`가 나오면 같은 `id`의 응답에 포함된 오류 내용을 확인한다.
- 인증·모델 오류가 나오면 `/login`, API 키, 기본 모델 설정을 확인한다.
- 프로세스가 계속 실행되면 RPC는 지속 통신 모드이므로 stdin을 닫거나 프로세스를 종료한다.

### 활용 기준

- 같은 Node.js 프로세스에서 쓰면 SDK를 우선한다.
- 다른 언어에서 제어하면 RPC를 검토한다.
- 프로세스 격리가 필요하면 RPC를 검토한다.

## 10. 패턴 9: JSON 이벤트 스트림으로 실행 결과 수집하기

JSON 이벤트 스트림 모드는 한 번 실행한 Pi 작업의 이벤트를 JSON Lines로 출력한다.

RPC처럼 계속 명령을 주고받는 방식이 아니라, 단일 실행 결과와 이벤트를 수집하는 방식이다.

### 실행

```bash
pi --mode json "이 저장소를 요약해줘"
```

특정 이벤트만 필터링할 수 있다.

```bash
pi --mode json "테스트 명령을 찾아줘" 2>/dev/null | jq -c 'select(.type == "message_end")'
```

### 활용 기준

- CI 로그로 Pi 실행 결과를 남길 때 사용한다.
- 커스텀 대시보드에서 이벤트를 수집할 때 사용한다.
- 단일 작업의 tool 실행, 응답, 종료 이벤트를 분석할 때 사용한다.
- 지속 통신이 필요하면 RPC를 사용한다.

## 11. TUI Components 활용 기준

TUI Components는 Extension에서 Pi 터미널 화면에 사용자 UI를 추가할 때 사용한다.

적합한 작업은 아래와 같다.

- 선택 목록 표시
- 설정 토글 화면
- 진행 상태 표시
- 사용자 확인 다이얼로그
- 상태 위젯
- 커스텀 에디터

단순 자동화는 custom tool이나 command로 처리한다. 사용자의 선택, 확인, 입력이 필요한 경우 TUI Components를 검토한다.

## 12. 패턴 10: 세션 트리로 다른 해결 흐름 만들기

Pi 세션은 이전 지점으로 돌아가 다른 방향으로 이어갈 수 있다.

### 목표

- `/tree`로 이전 지점에 이동한다.
- `/fork`로 새 세션 파일을 만든다.
- `/clone`으로 현재 흐름을 복제한다.

### 입력

```text
이 문제를 해결하는 방법을 2가지로 나눠서 제안해줘.
```

세션 트리를 연다.

```text
/tree
```

### 해볼 것

- 이전 사용자 메시지 위치로 이동한다.
- 첫 번째 방법과 다른 방향으로 이어간다.
- 새 파일로 분리하려면 `/fork`를 사용한다.
- 현재 흐름을 복제하려면 `/clone`을 사용한다.

### 확인할 결과

- 기존 흐름이 보존된다.
- 같은 출발점에서 다른 해결 흐름을 만들 수 있다.
- 긴 작업을 여러 방향으로 비교할 수 있다.

## 13. 패턴 11: 검증된 리소스를 package로 묶기

프로젝트에서 만든 Extension, prompt, skill이 반복 사용되면 package로 묶는다.

먼저 `PI/examples/basic-pi-package`로 설치와 호출을 확인한다. 아래 `my-pi-package`는 새 package를 설계할 때 바꿔 쓰는 placeholder다.

### 목표

- 로컬 실험을 재사용 가능한 단위로 만든다.
- 여러 프로젝트에 같은 하네스 리소스를 설치한다.
- 팀 공통 작업 흐름을 배포 가능한 형태로 정리한다.

### package 구조

```text
my-pi-package/
├── package.json
├── extensions/
├── prompts/
├── skills/
└── themes/
```

`package.json` 예시:

```json
{
  "name": "my-pi-package",
  "version": "1.0.0",
  "private": true,
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./extensions"],
    "prompts": ["./prompts"],
    "skills": ["./skills"],
    "themes": ["./themes"]
  }
}
```

로컬 package를 설치해 확인한다.

```bash
pi install -l ./path/to/my-pi-package
```

### 활용 기준

- 한 프로젝트에서만 쓰면 `.pi/extensions`에 둔다.
- 여러 프로젝트에서 반복되면 package로 묶는다.
- 다른 사람이 쓸 수 있으면 npm이나 git로 배포한다.

## 14. Customization 선택 기준

Customization 리소스는 목적에 맞게 나눠 쓴다.

| 목적 | 우선 선택 | 기준 |
|---|---|---|
| 외부 시스템 API 호출 | Extensions | 인증, 요청, 응답 가공이 필요할 때 |
| 모델이 직접 쓸 실행 기능 | Custom tool | Extension 안에서 `registerTool`로 등록 |
| 반복 업무 절차 표준화 | Skills | 순서, 판단 기준, 참고 문서가 중요할 때 |
| 반복 요청 단축 | Prompt Templates | 실행 코드 없이 프롬프트만 재사용할 때 |
| 화면 색상 조정 | Themes | TUI 시인성을 바꿀 때 |
| 여러 리소스 묶음 배포 | Pi Packages | 팀 공통 기능을 설치형으로 배포할 때 |
| 로컬/사내 모델 추가 | Custom Models | 설정만으로 OpenAI 호환 모델을 붙일 때 |
| 모델 연결 로직 구현 | Custom Providers | 프록시, SSO, 동적 모델 조회, 비표준 API가 필요할 때 |

전역과 프로젝트 적용 기준은 아래와 같다.

| 범위 | 위치 | 사용 기준 |
|---|---|---|
| 전역 | `~/.pi/agent/*` | 모든 프로젝트에서 반복 사용 |
| 프로젝트 | `.pi/*` | 해당 프로젝트에만 필요한 기능 |
| 패키지 | npm, git, local path | 여러 리소스를 묶어 공유 |

## 15. 패턴 선택 기준

작업 성격에 따라 하네스 활용 방식을 고른다.

| 하고 싶은 일 | 우선 선택 |
|---|---|
| 짧은 입력을 긴 지시로 바꾸기 | Extension `input` |
| 긴 로그를 자동 정리하기 | Extension `tool_result` |
| 반복 프롬프트 실행하기 | prompt template |
| 작업 절차와 참고 문서 불러오기 | skill |
| 로컬/외부 정보를 모델이 조회하게 하기 | custom tool |
| Jira 이슈나 Confluence 문서를 함께 조회하기 | custom tool 또는 Pi package |
| 모델 endpoint나 인증 방식 바꾸기 | custom provider |
| 이미 있는 기능 가져오기 | Pi package 설치 |
| 여러 프로젝트에 배포하기 | Pi package 제작 |
| CI, 봇, 내부 도구에 넣기 | SDK |
| 다른 언어에서 프로세스로 붙이기 | RPC |
| 단일 실행 이벤트를 수집하기 | JSON 이벤트 스트림 |
| 터미널 안에서 선택·확인 UI 만들기 | TUI Components |
| 다른 해결 방향 비교하기 | `/tree`, `/fork`, `/clone` |

## 이력관리

- 2026-07-13: 중급 확장·자동화 문서로 제목을 정리하고 실행 가능한 basic-pi-package와 prompt, skill, custom tool, Custom Provider, SDK, RPC 실습 절차를 보완했으며 Pi 0.80.6의 Project Trust와 package source 출력 기준 반영
- 2026-05-12: Customization 선택 기준 추가 및 삭제된 예시 package 참조 제거
- 2026-05-11: 직접 따라 할 수 있는 실습 흐름으로 재작성
