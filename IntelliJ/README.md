# IntelliJ IDEA 개발 가이드

> 대상: IntelliJ IDEA를 쓰는 개발자  
> 범위: IntelliJ 환경 준비, AI 에이전트 연동, 디버깅 및 개발 기준

IntelliJ IDEA를 효과적으로 활용하기 위한 환경 준비와 AI 에이전트 연동 기준을 모았어요.  
세션과 실행 구성의 기준은 항상 IntelliJ IDEA이며, 상세 작업은 각 가이드 문서를 따라요.

## 학습 순서

| 순서 | 문서 | 익혀야 할 내용 |
| --- | --- | --- |
| 1 | [사내 SSL 인증서 설정](./intellij_02_ssl_cert_guide.md) | 사내 루트 인증서 추출 스크립트, 환경 변수 등록, 로그인 재시도 |
| 2 | [런타임 디버깅](./intellij_01_runtime_debug_guide.md) | `ij-debugger` 요청 문구, 범위와 대상, 화이트리스트 |

## 환경 준비

- IntelliJ IDEA 2026.1.3 이상을 써요.
- 사내망 환경에서는 AI 에이전트 로그인 전 [사내 SSL 인증서 설정](./intellij_02_ssl_cert_guide.md)을 먼저 완료해요.
- 에이전트 디버깅 연동 시 [MCP Server](https://www.jetbrains.com/help/idea/mcp-server.html)를 켜고 Codex 또는 Antigravity를 연결해요.

## 공통 원칙

에이전트와 IntelliJ IDEA를 함께 활용할 때 지켜요.

- **IDE 세션 기준**: 실행 구성과 프로젝트 환경의 기준은 항상 IntelliJ IDEA예요.
- **설정 파일 보호**: 공유 실행 구성과 프로젝트 설정을 임의로 변경하지 않아요.
- **검증 환경 격리**: 실제 외부 서비스나 결제 API 호출 전 차단 지점을 확인해요.

## 팀에서 정할 것

프로젝트마다 다음 공통 항목을 정해두세요.

- 팀 표준 IntelliJ IDEA 버전과 권장 플러그인 목록
- 프로젝트 공통 실행 구성(`.run/*.run.xml`) 공유 정책
- 사내 개발망 인증서 및 공통 환경 변수 배포 방식
- 런타임 디버깅 세부 정책은 [런타임 디버깅 가이드](./intellij_01_runtime_debug_guide.md#5-팀에서-정할-것)를 따라요.

## 함께 사용하는 문서

여러 Skill을 연결하는 작업은 [Playbook](../Playbooks/README.md)을 확인해요.

- [02 기능 구현하고 검증하기](../Playbooks/02-implement-and-verify.md)
- [Antigravity 가이드](../Platforms/Antigravity/README.md)
- [Codex 가이드](../Platforms/Codex/README.md)
