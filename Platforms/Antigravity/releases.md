# Antigravity 릴리스

2026년 8월부터 10월 15일까지 개발 작업에 영향을 주는 CLI 변경을 최신순으로 정리해요.  
이 가이드는 `agy` CLI 적용 항목을 다루며, app·IDE·IDE Extensions의 고유 화면 변경은 포함하지 않아요.

## 반영 기준

- 자동 적용 개선과 오류 수정은 이 페이지에서 확인해요.
- 추가 기능과 변경된 사용 조건은 연결된 활용 문서에서 확인해요.
- 배포는 순차적으로 진행되므로 설치 버전의 `agy changelog`와 `/help`를 함께 확인해요.

## 2026년 10월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 10/13 | 모델 제공 | 모델 추가 | Gemini 4 Argon을 CLI·app에 배포해요. Ultra·적격 Enterprise 구독이 필요해요. | [모델 선택과 제공 조건](./setup.md#모델-선택과-제공-조건) | [Argon 발표](https://antigravity.google/blog/gemini-4-argon-in-google-antigravity) |
| 10/07 | CLI 1.3.1 | 자동 적용 개선 | Windows Plugin 교체와 MCP 재시작 오류를 수정해요. | 별도 절차 없음 | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 10/07 | CLI 1.3.1 | 기능 개선 | `/diff`에서 파일 간 변경 탐색과 위치 표시를 개선해요. | [변경 확인과 검토](./workflows.md#변경-확인과-검토) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 10/06 | CLI 1.3.0 | 기본값 변경 | 기본 `Verbosity`가 `medium`으로 바뀌어요. | [출력 상세 수준](./commands.md#출력-상세-수준) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 10/05 | CLI 1.2.17 | 자동 적용 개선 | Windows 샌드박스가 관리자 권한 없이 Python·Git·npm을 실행해요. | 별도 절차 없음 | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 10/03 | CLI 1.2.16 | 자동 적용 개선 | 하위 디렉터리에서 실행할 때 상위 `.agents/` 매니페스트 누락을 수정해요. | 별도 절차 없음 | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |

## 2026년 9월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 09/30 | CLI 1.2.14 | 기능 추가 | 후속 메시지의 대기·즉시 전달을 설정해요. | [후속 메시지 전달](./workflows.md#후속-메시지-전달) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/30 | CLI 1.2.14 | 호환성 변경 | `--json-schema`가 루트 객체 스키마만 허용해요. | [비대화형 자동화](./commands.md#비대화형-자동화) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/30 | CLI 1.2.14 | 호환성 개선 | systemd가 없는 Linux에서도 원격 데몬을 실행해요. 자동 재시작과 부팅 시작은 지원하지 않아요. | [원격 세션 연결](./workflows.md#원격-세션-연결) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/25 | CLI 1.2.11 | 설정 변경 | MCP 설정 변수가 필요한 전역 Plugin은 비활성 상태로 시작해요. | [Plugin](./extensions.md#plugin) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/24 | CLI 1.2.10 | 호환성 변경 | 확장 매니페스트의 디렉터리를 재귀 탐색하지 않아요. 중첩 항목은 `include_only`로 지정해요. | [확장 매니페스트의 중첩 항목](./extensions.md#확장-매니페스트의-중첩-항목) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/24 | CLI 1.2.10 | 자동 적용 개선 | 응답 일부를 출력한 뒤 실패한 단일 print 실행은 코드 `3`으로 종료해요. | 별도 절차 없음 | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/22 | CLI 1.2.8 | 자동 적용 개선 | 긴 요청의 맥락 압축과 메모리 누수를 개선해요. | 별도 절차 없음 | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/16 | CLI 1.2.4 | 기능 추가 | 세션을 재시작하지 않고 Skill을 다시 찾아요. | [Skill 새로고침](./commands.md#skill-새로고침) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/15 | CLI 1.2.3 | 기능 추가 | `/btw` 답변을 클립보드에 복사해요. | [보조 질문](./commands.md#보조-질문) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/12 | CLI 1.2.2 | 호환성 안내 | 폐기 예정인 `unsandboxed` 규칙의 경로와 `command` 규칙 이전 방법을 시작 경고에 표시해요. | [기존 권한 규칙 이전](./reference/01-sandbox-and-permissions.md#4-기존-권한-규칙-이전) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/10 | CLI 1.2.0 | 기능 추가 | Remote Control을 백그라운드 서비스로 등록해요. | [원격 세션 연결](./workflows.md#원격-세션-연결) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 09/03 | CLI 1.1.25 | 모델 추가 | Gemini API 키 인증의 모델 목록에 Gemini 3.8 Flash를 추가해요. | [모델 선택과 제공 조건](./setup.md#모델-선택과-제공-조건) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |

## 2026년 8월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 08/26 | CLI 1.1.21 | 기능 추가 | 음성을 입력창 텍스트로 변환해요. | [음성 입력](./commands.md#음성-입력) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 08/26 | CLI 1.1.21 | 자동 적용 개선 | 비ASCII 문자 편집의 UTF-8 손상을 수정해요. | 별도 절차 없음 | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 08/20 | CLI 1.1.16 | 기능 추가 | MCP 서버를 터미널 명령으로 관리해요. | [MCP](./extensions.md#mcp) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 08/19 | CLI 1.1.15 | 기능 추가 | NDJSON 요청으로 한 프로세스에서 대화를 이어가요. | [비대화형 자동화](./commands.md#비대화형-자동화) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 08/14 | CLI 1.1.13 | 기능 추가 | `GEMINI_API_KEY`로 로그인 없이 인증해요. | [Gemini API 키 인증](./setup.md#gemini-api-키-인증) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 08/11 | CLI 1.1.12 | 기능 추가 | `/permissions`·`/hooks`·`/help`·`/config`를 에이전트 호출 없이 비대화형으로 조회해요. | [비대화형 상태 조회](./commands.md#비대화형-상태-조회) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 08/07 | CLI 1.1.11 | 자동 적용 개선 | 검토 모드의 잘못된 명령 자동 승인과 빈 명령 허용 규칙의 전체 일치 오류를 수정해요. | 별도 절차 없음 | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |
| 08/03 | CLI 1.1.10 | 인증 추가 | Gemini Enterprise의 Business·WIF·ADC 인증을 지원해요. | [Gemini Enterprise 인증](./setup.md#gemini-enterprise-인증) | [CLI 릴리스](https://www.antigravity.google/docs/changelog?tab=cli) |

## 제품 적용 범위

- Gemini 4 Argon은 CLI·app·IDE Extensions에서 지원해요. 독립 제품인 Antigravity IDE에서는 지원하지 않아요.
- IDE Extensions의 8/20 공개는 CLI 설치와 별개예요. IDE별 준비는 [공식 확장 안내](https://antigravity.google/blog/introducing-ide-extensions)를 따라요.
- app의 Marketplace·Automations·WSL 화면은 CLI 명령으로 해석하지 않아요.

모델별 요금제와 종료 예정 모델은 [모델 선택과 제공 조건](./setup.md#모델-선택과-제공-조건)에서 확인해요.

## 공식 문서

- [Antigravity 공식 변경 기록](https://www.antigravity.google/docs/changelog?tab=cli): 날짜·버전·변경 내용을 확인해요.
- [CLI 명령 참조](https://www.antigravity.google/docs/cli/reference/): 현재 명령을 확인해요.
