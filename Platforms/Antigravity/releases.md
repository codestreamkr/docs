# Antigravity 릴리스

2026년 8월부터 10월 15일까지 개발 작업에 영향을 주는 CLI 변경을 최신순으로 정리해요.  
이 가이드는 `agy` CLI 적용 항목을 다루며, app·IDE·IDE Extensions의 고유 화면 변경은 포함하지 않아요.

## 2026년 10월

| 날짜 | 버전 | 주요 변경사항 |
| --- | --- | --- |
| 10/13 | 모델 제공 | Gemini 4 Argon을 CLI·app에 배포해요. Ultra·적격 Enterprise 구독이 필요해요. |
| 10/07 | CLI 1.3.1 | Windows Plugin 교체와 MCP 재시작 오류를 수정해요. |
| 10/07 | CLI 1.3.1 | `/diff`에서 파일 간 변경 탐색과 위치 표시를 개선해요. |
| 10/06 | CLI 1.3.0 | 기본 `Verbosity`가 `medium`으로 바뀌어요. |
| 10/05 | CLI 1.2.17 | Windows 샌드박스가 관리자 권한 없이 Python·Git·npm을 실행해요. |
| 10/03 | CLI 1.2.16 | 하위 디렉터리에서 실행할 때 상위 폴더의 확장 설정을 놓치던 문제를 수정해요. |

## 2026년 9월

| 날짜 | 버전 | 주요 변경사항 |
| --- | --- | --- |
| 09/30 | CLI 1.2.14 | 후속 메시지의 대기·즉시 전달을 설정해요. |
| 09/30 | CLI 1.2.14 | `--json-schema`가 루트 객체 스키마만 허용해요. |
| 09/30 | CLI 1.2.14 | systemd가 없는 Linux에서도 원격 데몬을 실행해요. 자동 재시작과 부팅 시작은 지원하지 않아요. |
| 09/25 | CLI 1.2.11 | MCP 설정 변수가 필요한 전역 Plugin은 비활성 상태로 시작해요. |
| 09/24 | CLI 1.2.10 | 확장 매니페스트의 디렉터리를 재귀 탐색하지 않아요. 중첩 항목은 `include_only`로 지정해요. |
| 09/24 | CLI 1.2.10 | 비대화형 실행이 응답 도중 실패하면 종료 코드 `3`을 반환해요. |
| 09/22 | CLI 1.2.8 | 긴 요청의 대화 처리와 메모리 사용을 개선해요. |
| 09/16 | CLI 1.2.4 | 세션을 재시작하지 않고 Skill을 다시 찾아요. |
| 09/15 | CLI 1.2.3 | `/btw` 답변을 클립보드에 복사해요. |
| 09/12 | CLI 1.2.2 | 폐기 예정인 `unsandboxed` 규칙의 경로와 `command` 규칙 이전 방법을 시작 경고에 표시해요. |
| 09/10 | CLI 1.2.0 | Remote Control을 백그라운드 서비스로 등록해요. |
| 09/03 | CLI 1.1.25 | Gemini API 키 인증의 모델 목록에 Gemini 3.8 Flash를 추가해요. |

## 2026년 8월

| 날짜 | 버전 | 주요 변경사항 |
| --- | --- | --- |
| 08/26 | CLI 1.1.21 | 음성을 입력창 텍스트로 변환해요. |
| 08/26 | CLI 1.1.21 | 비ASCII 문자 편집의 UTF-8 손상을 수정해요. |
| 08/20 | CLI 1.1.16 | MCP 서버를 터미널 명령으로 관리해요. |
| 08/19 | CLI 1.1.15 | NDJSON 요청으로 한 프로세스에서 대화를 이어가요. |
| 08/14 | CLI 1.1.13 | `GEMINI_API_KEY`로 로그인 없이 인증해요. |
| 08/11 | CLI 1.1.12 | `/permissions`·`/hooks`·`/help`·`/config`를 에이전트 호출 없이 비대화형으로 조회해요. |
| 08/07 | CLI 1.1.11 | 검토 모드의 잘못된 명령 자동 승인과 빈 명령 허용 규칙의 전체 일치 오류를 수정해요. |
| 08/03 | CLI 1.1.10 | Gemini Enterprise의 Business·WIF·ADC 인증을 지원해요. |

## 변경사항 적용

- Gemini 4 Argon은 CLI·app·IDE Extensions에서 지원해요. 독립 제품인 Antigravity IDE에서는 지원하지 않아요.
- IDE Extensions의 8/20 공개는 CLI 설치와 별개예요. IDE별 준비는 [공식 확장 안내](https://antigravity.google/blog/introducing-ide-extensions)를 따라요.
- app의 Marketplace·Automations·WSL 화면은 CLI 명령으로 해석하지 않아요.

버전 확인과 업데이트는 [환경 설정](./setup.md#6-버전-확인과-업데이트)을 따라요.  
모델별 제공 조건은 [공식 모델 안내](https://www.antigravity.google/docs/models/)에서 확인하세요.

## 공식 문서

- [Antigravity 공식 변경 기록](https://www.antigravity.google/docs/changelog?tab=cli): 날짜·버전·변경 내용을 확인해요.
- [CLI 명령 참조](https://www.antigravity.google/docs/cli/reference/): 현재 명령을 확인해요.
