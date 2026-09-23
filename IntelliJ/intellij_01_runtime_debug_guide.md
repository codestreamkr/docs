# IntelliJ 런타임 디버깅 가이드

> 대상: IntelliJ IDEA에서 실행 중인 JVM 서버와 브라우저 JavaScript  
> 목적: Codex가 `ij-debugger`로 변경을 런타임에서 검증  
> 원칙: 사용자는 범위와 대상만 적고, 도구 선택과 순서는 에이전트가 정해요.

Codex는 IntelliJ MCP와 `ij-debugger`를 호출하는 클라이언트로만 붙어요.  
에이전트는 [공통 원칙](./README.md#공통-원칙)과 이 문서의 [화이트리스트](#4-화이트리스트)를 따라요.

## 1. 선행 조건

- [환경 준비](./README.md#환경-준비)를 마쳐요.
- Settings → Plugins → Installed에서 Debugger MCP Toolset 플러그인이 활성화돼 있는지 확인해요. 기본으로 포함·활성화돼 있어요.
- `ij-debugger`는 Settings → Tools → AI Assistant → Skills에서 Codex (Global)로 설치해요.
- Codex를 다시 시작해 `/mcp`와 `/skills`에서 확인해요.
- 공식 호출은 `/ij-debugger`이고, Codex에서는 `$ij-debugger`로도 호출해요.

## 2. 범위와 대상

| 항목 | 값 | 의미 |
| --- | --- | --- |
| 범위 | `JVM` | 서버 |
| | `JavaScript` | 브라우저 |
| | `JVM+JavaScript` | 서버와 브라우저 모두 |
| 대상 | `변경 세트` | 작업 트리의 Git 변경 전체 |
| | `호출 경로` | 지정한 심볼의 호출 계층 |
| | `변경 세트+호출 경로` | 호출 경로로 멈출 줄을 고른 뒤 그 줄로 변경 세트를 검증 |

`+`로 이은 값은 둘 다 실행하고, 적지 않은 값은 실행하지 않아요.

## 3. 요청 문구

범위와 대상 두 줄만 바꿔요.

```text
$ij-debugger

범위: JVM+JavaScript
대상: 변경 세트+호출 경로

현재 Git 변경사항 전체를 기준으로, IntelliJ의 현재 실행 구성과 로그인 세션으로 런타임 검증해줘.
UI 클릭이 필요하면 관찰 지점을 먼저 준비한 뒤 내가 할 동작을 하나만 요청해줘.
```

해당할 때만 아래 줄을 덧붙여요.

| 조건 | 추가할 줄 |
| --- | --- |
| 범위에 JavaScript가 있어요 | `JavaScript 변경은 IntelliJ JavaScript Debug 또는 현재 연결된 브라우저 세션으로 별도 런타임 검증해줘.` |
| 파일·심볼·화면을 좁혀요 | `제한: <파일 경로 또는 심볼 또는 화면>` |
| 요구사항 문서가 있어요 | `요구사항: <문서 경로>` |

자주 쓰는 조합이에요.

| 확인할 것 | 범위 | 대상 |
| --- | --- | --- |
| 서버 변경 | `JVM` | `변경 세트` |
| 브라우저 JavaScript 변경 | `JavaScript` | `변경 세트` |
| 특정 심볼의 실제 호출 | `JVM` 또는 `JavaScript` | `호출 경로` |
| 서버와 브라우저 변경 | `JVM+JavaScript` | `변경 세트` |
| 호출 줄을 고른 뒤 변경 | `JVM+JavaScript` | `변경 세트+호출 경로` |

## 4. 화이트리스트

[공통 원칙](./README.md#공통-원칙)에 더해 아래만 지켜요.  
여기에 없는 순서와 도구 선택은 에이전트가 정해요.

- **범위**: 요청에 적힌 범위와 대상만 실행해요. 범위가 없으면 `JVM`으로 봐요. Git 변경 파일 밖은 건너뛰고, 관련 없는 화면은 열지 않아요.
- **호출 경로**: 텍스트 검색으로 대체하지 않아요. 소스만으로 값이 확정되면 디버거에 들어가지 않아요.
- **변경**: 변수값, 실제 결제와 외부 상태를 바꾸지 않아요. 테스트 코드는 필요할 때만 추가해요.
- **중단**: JVM은 로그포인트로 확인하고 값이 필요할 때만 중단해요. 중단은 변경 파일의 후보 줄에서만 하고, 결제 SDK는 호출 직전에서 멈춰요.
- **JavaScript**: 수동 `PAUSE`는 쓰지 않고, 중단이 보장된 줄에만 브레이크포인트를 둬요. JavaScript Debug는 IntelliJ가 연 Chromium에서만 실행하고, 로그인이 필요하면 그 창의 로그인 상태부터 확인해요.
- **사람 조작**: 에이전트가 할 수 있는 검증은 묻지 않아요. 로그인, 클릭, 꺼진 세션 실행, JavaScript 소스 매핑 새로고침처럼 대신할 수 없을 때만 관찰 지점을 준비한 뒤 한 번에 하나씩 요청해요.
- **판정**: 정적 검토만으로 PASS를 주지 않고, 테스트 결과나 중단된 세션의 값으로 판정해요. 범위가 `JVM+JavaScript`면 결과를 따로 적고, 한쪽만으로 전체를 통과시키지 않아요.
- **정리**: 이번 작업의 agent 브레이크포인트만 제거해요.

## 5. 공식 문서

연결 방법과 도구 설명은 공식 문서를 따라요.

- [MCP Server](https://www.jetbrains.com/help/idea/mcp-server.html)
- [Agentic debugging](https://www.jetbrains.com/help/idea/agentic-debugging.html)
- [Logpoints](https://www.jetbrains.com/help/idea/logpoints.html)
- [JavaScript Debug](https://www.jetbrains.com/help/idea/debugging-javascript-in-chrome.html)
- [Configuring JavaScript debugger](https://www.jetbrains.com/help/idea/configuring-javascript-debugger.html)
