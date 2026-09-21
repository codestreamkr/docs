# IntelliJ IDEA 개발 가이드

IntelliJ IDEA 세션을 기준으로 변경을 검증해요.  
Codex는 IntelliJ MCP와 `ij-debugger`를 호출하는 클라이언트예요.

요청할 때마다 **어디를 디버그할지**와 **무엇을 기준으로 볼지**만 정해요.  
도구 선택과 순서는 에이전트가 `ij-debugger`와 공식 문서를 보고 정해요.

## 범위와 방식

두 줄만 채워요. `+`는 이번 요청에 둘 다 넣겠다는 뜻이에요.  
적지 않은 쪽은 실행하지 않아요.

| 질문 | 항목 | 값 | 의미 |
| --- | --- | --- | --- |
| 어디를 디버그할까요? | 범위 | `JVM` | 서버만 |
| | | `JavaScript` | 브라우저 JS만 |
| | | `JVM+JavaScript` | 서버와 브라우저를 이어서 |
| 무엇을 기준으로 볼까요? | 방식 | `변경 세트` | 지금 Git 변경 전체 |
| | | `호출 경로` | 한 심볼이 실제로 어떻게 호출되는지 |
| | | `변경 세트+호출 경로` | 호출 경로로 줄을 고른 뒤 그 줄로 변경을 검증 |

서버와 브라우저를 함께 보면 양쪽 결과를 따로 적어요.  
한쪽만 보고 전체를 통과시키지 않아요.

`변경 세트`는 작업 트리 diff가 대상이에요. 변경 파일에서 테스트와 런타임을 정하고, 아니면 건너요.

`호출 경로`는 한 심볼의 호출 계층이 대상이에요. 텍스트 검색으로 대체하지 않아요. 소스만으로 값이 확정되면 디버거에 들어가지 않아요. 런타임이 필요하면 변경 파일의 후보 줄만 멈춰요.

둘 다 넣으면 호출 경로로 줄을 고른 다음, 그 줄로 변경 세트를 검증해요.

## 요청 문구

범위와 방식만 채워요. 제약은 아래 화이트리스트를 따라요.  
요구사항 문서가 있으면 경로를 한 줄 더 넣어요.

```text
$ij-debugger

범위: JVM+JavaScript
방식: 변경 세트+호출 경로

현재 Git 변경사항 전체를 기준으로, IntelliJ의 현재 실행 구성과 로그인 세션으로 런타임 검증해줘.
UI 클릭이 필요하면 관찰 지점을 먼저 준비한 뒤 내가 할 동작을 하나만 요청해줘.
```

범위에 JavaScript가 있으면 이 문장을 넣어요. `ij-debugger`만 있으면 JVM만 검증해요.

```text
JavaScript 변경은 IntelliJ JavaScript Debug 또는 현재 연결된 브라우저 세션으로 별도 런타임 검증해줘.
```

대상 파일·심볼·화면을 제한할 때만 아래에 경로를 추가해요.

| 지금 할 일 | 범위 | 방식 |
| --- | --- | --- |
| 서버 변경만 확인 | `JVM` | `변경 세트` |
| 브라우저 JS 변경만 확인 | `JavaScript` | `변경 세트` |
| 이 함수의 실제 호출만 확인 | `JVM` 또는 `JavaScript` | `호출 경로` |
| 서버와 브라우저 변경을 한 번에 확인 | `JVM+JavaScript` | `변경 세트` |
| 호출 줄을 고른 뒤 변경까지 확인 | `JVM+JavaScript` | `변경 세트+호출 경로` |

## 화이트리스트

이 목록만 항상 지켜요. 여기에 없는 순서는 에이전트가 정해요.

- 새 세션은 이전 대화와 디버거 상태를 가정하지 않아요. 지금 열린 실행 구성과 로그인된 화면만 사용해요.
- 요청에 적힌 범위와 방식만 실행해요. `ij-debugger`만 있으면 JVM으로 보고, JavaScript는 요청에 적혔을 때만 별도로 검증해요.
- Git 변경 파일이 아니면 건너요. 관련 없는 화면은 열지 않아요. 건너뛴 항목은 PASS가 아니에요.
- 정적 검토만으로 정상이라고 하지 않아요. 가능한 항목은 테스트 결과나 중단된 세션의 값으로 판정해요.
- 에이전트가 할 수 있는 검증은 사람에게 묻지 않아요. 사람 조작은 로그인, 클릭, 꺼진 세션 실행, JS 소스 매핑 새로고침처럼 대신할 수 없을 때만 요청해요. 동작은 한 번에 하나만, 브레이크포인트 준비 뒤에 안내해요.
- 운영 코드, 실행 구성, 설정 파일은 수정하지 않아요. 테스트 코드는 필요할 때만 추가해요.
- 변수값을 바꾸지 않아요. 사용자 브레이크포인트는 건드리지 않아요. 세션을 임의로 종료하지 않아요.
- 실제 결제와 외부 상태 변경은 하지 않아요. 결제 SDK는 호출 직전에서 멈춰요.
- JVM은 로그포인트로 확인하고, 값이 필요할 때만 중단해요.
- JS는 수동 `PAUSE`를 쓰지 않아요. 중단이 보장된 줄에서 제어해요.
- JavaScript Debug는 IntelliJ가 연 Chromium에서만 해요. 로그인이 필요하면 그 창에 로그인된 상태인지 확인해요.
- 결과는 `PASS` / `FAIL` / `미검증` / `건너뜀`과 관찰값, 근거로 남겨요. 확인하지 못한 항목을 정상이라고 하지 않아요.
- 이번 작업의 agent 브레이크포인트만 제거해요.

연결 방법과 도구 설명은 공식 문서를 따라요.

- [MCP Server](https://www.jetbrains.com/help/idea/mcp-server.html)
- [Agentic debugging](https://www.jetbrains.com/help/idea/agentic-debugging.html)
- [Logpoints](https://www.jetbrains.com/help/idea/logpoints.html)
- [JavaScript Debug](https://www.jetbrains.com/help/idea/debugging-javascript-in-chrome.html)
- [Configuring JavaScript debugger](https://www.jetbrains.com/help/idea/configuring-javascript-debugger.html)

## 연결

IntelliJ IDEA 2026.1.3 이상에서 MCP Server와 Debugger MCP Toolset을 켜고, Codex를 Auto-Configure해요.  
`ij-debugger`는 Settings → Tools → AI Assistant → Skills에서 Codex (Global)로 설치해요.  
설치 후 Codex를 다시 시작해 `/mcp`와 `/skills`를 확인해요.  
공식 호출은 `/ij-debugger`이고, Codex 관례는 `$ij-debugger`예요.

## 팀에서 정할 것

- 앱 실행 구성 이름과 JavaScript Debug 실행 구성 이름
- 자동 테스트 실행 명령
- 소스 맵 방식
- JavaScript Debug용 Chrome 사용자 데이터와 로그인된 창을 쓸지
- 요구사항·기존 검증 결과 문서 경로
- 결제 SDK 호출을 멈추는 줄
