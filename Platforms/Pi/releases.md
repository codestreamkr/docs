# Pi 릴리스

2026년 8월부터 10월 15일까지 개발 작업에 영향을 주는 변경사항을 최신순으로 정리해요.  
자동 적용 개선은 이 문서에서 확인하고, 새 기능과 호환성 변경은 연결된 활용 문서에서 확인해요.

## 2026년 10월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 10/12 | 1.2.0 | 기능 추가 | 설정 스키마와 원격 클립보드 설정을 추가했어요. | [설정 검증](./setup.md#설정-파일-검증), [터미널 표시와 원격 복사](./setup.md#터미널-표시와-원격-복사) | [1.2.0](https://pi.dev/changelog/releases/1.2.0) |
| 10/12 | 1.2.0 | 호환성 변경 | `before_agent_start`가 Extension의 사용자 정의 메시지 실행에도 발생해요. | [Extension 호환성](./extensions.md#extension-호환성-확인) | [1.2.0](https://pi.dev/changelog/releases/1.2.0) |
| 10/12 | 1.2.0 | 기능 추가 | `/share`의 업로드 위치를 선택할 수 있어요. | [세션 공유 위치 선택](./workflows.md#세션-공유-위치-선택) | [1.2.0](https://pi.dev/changelog/releases/1.2.0) |
| 10/7 | 1.1.0 | 기능 추가 | 기본 도구에 `+name`·`-name`을 적용하고 이미지 분류를 실행할 수 있어요. | [도구 선택](./setup.md#권한과-실행-범위), [Codemode](./extensions.md#codemode) | [1.1.0](https://pi.dev/changelog/releases/1.1.0) |
| 10/5 | 1.0.4 | 기능 추가 | 도구 이름 패턴과 `--no-mcp`를 지원해요. | [도구 선택](./setup.md#권한과-실행-범위) | [1.0.4](https://pi.dev/changelog/releases/1.0.4) |
| 10/5 | 1.0.3 | 호환성 변경 | Azure 제공자 이름을 `azure-openai-responses`에서 `azure`로 바꿨어요. | [제공자 설정 변경](./setup.md#제공자-설정-변경) | [1.0.3](https://pi.dev/changelog/releases/1.0.3) |
| 10/3 | 1.0.1 | 설치 변경 | 전역 npm 설치에서 관리형 설치 전환을 권장해요. npm 배포의 전이 의존성 고정을 제거했어요. | [업데이트와 설치 방식 전환](./setup.md#업데이트와-설치-방식-전환) | [1.0.1](https://pi.dev/changelog/releases/1.0.1) |
| 10/1 | 1.0.0 | 설치 안내 | 공식 발표에서 Windows PowerShell 설치기를 안내해요. | [설치와 첫 실행](./setup.md#설치와-첫-실행), [Windows 실행 환경](./setup.md#windows-실행-환경) | [Pi 1.0 발표](https://earendil.com/posts/pi-1-0/) |
| 10/1 | — | 기능 추가 | 장기 실행 애플리케이션용 Pi Durable 실험 패키지를 공개했어요. | [Pi Durable 활용](./extensions.md#pi-durable로-장기-실행-서비스-만들기) | [Pi Durable 발표](https://earendil.com/posts/pi-durable/) |
| 10/1 | 1.0.0 | 기본값 변경 | TUI의 기본 화면을 Fullscreen으로 바꿨어요. | [화면, 세션과 맥락](./setup.md#화면-세션과-맥락) | [1.0.0](https://pi.dev/changelog/releases/1.0.0) |
| 10/1 | 1.0.0 | 자동 적용 개선 | Codemode의 프롬프트 사용량과 오류 안내를 개선했어요. | 별도 절차 없음 | [1.0.0](https://pi.dev/changelog/releases/1.0.0) |

## 2026년 9월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 9/30 | 0.99.2 | 기능 추가 | MCP 도구 노출과 인증 설정을 확장했어요. | [MCP 연결](./extensions.md#mcp-연결) | [0.99.2](https://pi.dev/changelog/releases/0.99.2) |
| 9/30 | 0.99.2 | 자동 적용 개선 | 긴 세션의 요청 지연과 Windows Codemode 시작 오류를 수정했어요. | 별도 절차 없음 | [0.99.2](https://pi.dev/changelog/releases/0.99.2) |
| 9/29 | 0.99.1 | 기능 추가 | GPT-6.1 Sol을 제공자 카탈로그에 추가했어요. | [모델과 추론 수준](./setup.md#모델과-추론-수준) | [0.99.1](https://pi.dev/changelog/releases/0.99.1) |
| 9/29 | 0.99.0 | 기능 추가 | 내장 MCP·Codemode와 OpenAI 제공자의 ChatGPT 로그인을 추가했어요. | [MCP 연결](./extensions.md#mcp-연결), [Codemode](./extensions.md#codemode), [인증](./setup.md#인증) | [0.99.0](https://pi.dev/changelog/releases/0.99.0) |
| 9/29 | 0.99.0 | 기능 추가 | Extension으로 요청별 실제 모델을 선택하는 가상 모델을 추가했어요. | [가상 모델로 요청 분배](./extensions.md#가상-모델로-요청-분배) | [0.99.0](https://pi.dev/changelog/releases/0.99.0) |
| 9/22 | 0.87.1 | 기능 추가 | Claude Opus 5.5와 GPT-6 Sol·Luna를 지원해요. | [모델과 추론 수준](./setup.md#모델과-추론-수준) | [0.87.1](https://pi.dev/changelog/releases/0.87.1) |
| 9/21 | 0.87.0 | 호환성 변경 | SessionManager의 문맥 관리와 Extension 이벤트 경계를 변경했어요. | [Extension 호환성](./extensions.md#extension-호환성-확인) | [0.87.0](https://pi.dev/changelog/releases/0.87.0) |

## 2026년 8월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 8/28 | 0.84.4 | 기능 추가 | 터미널 기능 감지와 선택 영역 복사 설정을 추가했어요. | [터미널 표시와 원격 복사](./setup.md#터미널-표시와-원격-복사) | [0.84.4](https://pi.dev/changelog/releases/0.84.4) |
| 8/28 | 0.84.4 | 자동 적용 개선 | 대규모 도구 결과의 요약과 세션 JSONL 복구 오류를 수정했어요. | 별도 절차 없음 | [0.84.4](https://pi.dev/changelog/releases/0.84.4) |
| 8/7 | 0.84.1 | 기능 추가 | 제공자 인증을 사전 확인하는 `pi auth check`를 추가했어요. | [인증](./setup.md#인증) | [0.84.1](https://pi.dev/changelog/releases/0.84.1) |

## 공식 문서

- [Pi Changelog](https://pi.dev/changelog)
- [Pi 공식 사용 안내](https://pi.dev/docs/latest)
