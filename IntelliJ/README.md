# IntelliJ IDEA 개발 가이드

> 대상: IntelliJ IDEA를 쓰는 개발자  
> 범위: 런타임 디버깅(`ij-debugger`)

IntelliJ IDEA를 잘 쓰기 위한 기준을 모았어요.  
에이전트는 IntelliJ MCP로 IDE에 붙고, 세션과 실행 구성의 기준은 항상 IntelliJ IDEA예요.

## 학습 순서

| 순서 | 문서 | 익혀야 할 내용 |
| --- | --- | --- |
| 1 | [런타임 디버깅](./intellij_01_runtime_debug_guide.md) | `ij-debugger` 요청 문구, 범위와 대상, 화이트리스트 |

## 환경 준비

- IntelliJ IDEA 2026.1.3 이상을 써요.
- [MCP Server](https://www.jetbrains.com/help/idea/mcp-server.html)를 켜고 Codex를 Auto-Configure해요.
- Codex를 다시 시작해 `/mcp`에서 연결을 확인해요.

## 공통 원칙

에이전트가 IntelliJ 세션을 다룰 때 항상 지켜요. 하위 문서의 화이트리스트는 이 원칙에 더해 적용돼요.

- **세션**: 이전 대화와 디버거 상태를 가정하지 않음. 지금 열린 실행 구성과 로그인된 화면만 사용.
- **변경 금지**: 운영 코드, 실행 구성, 설정 파일.
- **사용자 상태**: 사용자 브레이크포인트 변경 금지. 실행 중인 세션 임의 종료 금지.
- **보고**: `PASS` / `FAIL` / `미검증` / `건너뜀`과 관찰값, 근거로 남김. 확인하지 못했거나 건너뛴 항목은 PASS가 아님.

## 팀에서 정할 것

프로젝트마다 다음 항목을 정해두세요.

- 앱 실행 구성 이름과 JavaScript Debug 실행 구성 이름
- 자동 테스트 실행 명령
- 소스 맵 방식
- JavaScript Debug용 Chrome 사용자 데이터와 로그인된 창을 쓸지
- 요구사항·기존 검증 결과 문서 경로
- 결제 SDK 호출을 멈추는 줄
