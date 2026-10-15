# Codex 릴리스

2026년 8월부터 10월 15일 확인 시점까지 개발 작업에 영향을 주는 Codex 변경사항을 정리해요.  
자동 적용 개선은 이 문서에서 확인하고, 추가 기능과 설정 변경은 연결된 활용 문서에서 확인해요.

## 2026년 10월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 10/14 | — | 지원 종료 | GPT-5.5는 한국 시각 10/15 04시에 ChatGPT 로그인 기반 Codex에서 지원을 종료했어요. API 키 인증은 유지해요. | [모델과 속도 선택](./setup.md#모델과-속도-선택) | [종료 공지](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/9 | CLI `0.162.1` | 자동 적용 개선 | 여러 줄 비동기 질문의 TUI 충돌과 백그라운드 서버 설정 불일치의 시작 실패를 수정했어요. | 별도 절차 없음 | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/8 | — | 기능 추가 | GPT-6.1 Sol에 Ultrafast를 추가했어요. 요금제와 관리자 설정에 따라 사용할 수 있어요. | [모델과 속도 선택](./setup.md#모델과-속도-선택) | [속도 설정](https://learn.chatgpt.com/docs/agent-configuration/speed) |
| 10/8 | CLI `0.162.0` | 기능 추가 | `/copy` 블록 탐색과 `Ctrl+Insert` 선택 복사를 추가했어요. | [대화 블록 복사](./workflows.md#대화-블록-복사하기) | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/8 | CLI `0.162.0` | 기능 추가 | 지원 서버에서 작업 고정과 신뢰한 로컬 프로젝트의 관리 Worktree 도구를 제공해요. | [병렬 조사](./workflows.md#큰-코드베이스-병렬-조사하기), [Worktree](./workflows.md#별도-작업-공간에서-구현하기) | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/8 | CLI `0.162.0` | 설치 변경 | Windows에 서명된 PowerShell 설치기를 제공해요. | [설치와 첫 실행](./setup.md#설치와-첫-실행) | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/8 | CLI `0.162.0` | 자동 적용 개선 | CRLF 보존, Windows 10 파일 접근과 Linux 샌드박스 제한을 수정했어요. | 별도 절차 없음 | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/7 | CLI `0.161.0` | 기능 추가 | 활성 세션에서 `/mcp login <name>`을 지원해요. | [MCP 연결과 인증](./extensions.md#mcp와-appconnector) | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/7·2 | — | 자동 적용 개선 | iOS의 작업 목록, 스트리밍, worktree 저장 위치와 파일 표시를 개선했어요. | 별도 절차 없음 | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/5 | CLI `0.160.1` | 자동 적용 개선 | 원격 stdio MCP의 Windows 실행 환경변수 보존을 수정했어요. | 별도 절차 없음 | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |
| 10/1 | CLI `0.160.0` | 기능 추가 | Command Center의 **Show more**로 이전 작업을 조회할 수 있어요. | [병렬 조사](./workflows.md#큰-코드베이스-병렬-조사하기) | [10월 릴리스](https://learn.chatgpt.com/docs/changelog#october-2026) |

## 2026년 9월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 9/29 | — | 기능 추가 | GPT-6.1 Sol을 추가했어요. | [모델과 속도 선택](./setup.md#모델과-속도-선택) | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/29 | — | 기능 추가 | Agents API에 호스팅 브라우저를 사용하는 Computer Use를 추가했어요. | [Agents API 연결](./automation.md#agents-api로-서비스에-연결하기) | [API 릴리스](https://developers.openai.com/api/docs/changelog) |
| 9/29 | CLI `0.159.0` | 기능 추가 | `instant_interrupt`로 응답·Code Mode 실행 중 방향 전환을 켤 수 있어요. | [실행 중 방향 전환](./workflows.md#실행-중-방향-전환하기) | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/29 | CLI `0.159.2` | 자동 적용 개선 | Windows 백그라운드 프로세스의 콘솔 창 깜박임을 수정했어요. | 별도 절차 없음 | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/28 | CLI `0.158.0` | 자동 적용 개선 | Windows·Linux 샌드박스 오류와 Mermaid 렌더링을 수정했어요. | 별도 절차 없음 | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/25 | CLI `0.157.0` | 기능 추가 | 원격·로컬 백그라운드 서버 세션에서 `/import`를 지원해요. | [다른 에이전트에서 가져오기](./setup.md#다른-에이전트에서-가져오기) | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/25 | CLI `0.157.0` | 자동 적용 개선 | 지원되는 대화형 세션에서 백그라운드 서버를 자동 시작해요. | 별도 절차 없음 | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/25 | — | 자동 적용 개선 | macOS 26.924.20706에서 CVE-2026-100754를 수정했어요. | 별도 절차 없음 | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/25 | — | 자동 적용 개선 | GPT-6 Sol·Luna의 이미지 인코딩 오류를 수정했어요. 이미지 입력 평가를 다시 실행해요. | 별도 설정 없음 | [API 릴리스](https://developers.openai.com/api/docs/changelog) |
| 9/23·18·8·1 | — | 자동 적용 개선 | iOS의 작업 목록, 재연결, 리뷰와 worktree 표시를 개선했어요. | 별도 절차 없음 | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/22 | — | 기능 추가 | GPT-6 Sol과 GPT-6 Luna를 추가했어요. | [모델과 속도 선택](./setup.md#모델과-속도-선택) | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/14 | — | 지원 종료 | GPT-5.3-Codex-Spark 프리뷰 지원을 종료했어요. | [모델과 속도 선택](./setup.md#모델과-속도-선택) | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/11 | — | 기능 추가 | Windows에 Appshots를 추가했어요. | [앱 화면 전달](./workflows.md#앱-화면을-문맥으로-전달하기) | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/10 | — | 기능 추가 | Codex 실행 환경을 사용하는 Agents API 공개 베타를 추가했어요. | [Agents API 연결](./automation.md#agents-api로-서비스에-연결하기) | [API 릴리스](https://developers.openai.com/api/docs/changelog) |
| 9/8 | — | 기능 추가 | iOS에서 새 worktree의 시작 브랜치나 현재 변경사항을 선택할 수 있어요. | [모바일 worktree 작업](./workflows.md#모바일에서-worktree-작업하기) | [9월 릴리스](https://learn.chatgpt.com/docs/changelog#september-2026) |
| 9/5 | — | 연동 변경 | `codex mcp-server`와 `codex-mcp-server`를 제거했어요. 외부 MCP 서버 연결은 유지해요. | [외부 프로그램 연결](./extensions.md#codex를-외부-프로그램에-연결하기) | [MCP 서버 이전](https://learn.chatgpt.com/docs/mcp-server) |

## 2026년 8월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 8/31 | — | 지원 종료 | ChatGPT 로그인에서 GPT-5.4와 GPT-5.4 mini 지원을 종료했어요. API 키 인증은 유지해요. | [모델과 속도 선택](./setup.md#모델과-속도-선택) | [종료 공지](https://learn.chatgpt.com/docs/changelog#july-2026) |
| 8/26·18·7 | — | 자동 적용 개선 | iOS의 재연결, 작업 목록, 큰 응답 표시를 개선했어요. | 별도 절차 없음 | [8월 릴리스](https://learn.chatgpt.com/docs/changelog#august-2026) |
| 8/25 | — | 기능 추가 | 내장 브라우저에서 사이트가 제공하는 WebMCP 도구를 사용할 수 있어요. | [사이트 도구](./extensions.md#사이트-도구webmcp) | [WebMCP](https://learn.chatgpt.com/docs/webmcp) |
| 8/25 | — | 기능 추가 | 브라우저 확장의 지원 범위를 Edge·Brave·Opera·Vivaldi로 넓혔어요. | [기존 브라우저 연결](./extensions.md#기존-브라우저-연결) | [브라우저 확장](https://learn.chatgpt.com/docs/chrome-extension) |
| 8/20 | — | 기능 추가 | macOS에서 로컬 대화의 읽기 전용 스냅샷을 공유할 수 있어요. | [대화 결과 공유](./workflows.md#대화-결과-공유하기) | [8월 릴리스](https://learn.chatgpt.com/docs/changelog#august-2026) |
| 8/19 | — | 기능 추가 | Codex Cloud에 GitLab 연동 베타를 추가했어요. | [GitLab Merge Request 검토](./workflows.md#gitlab-merge-request-검토하기) | [GitLab 연동](https://learn.chatgpt.com/docs/third-party/gitlab) |
| 8/11 | — | 기능 추가 | Linux 데스크톱 앱을 프리뷰로 공개했어요. | [설치와 환경 준비](./setup.md) | [Linux 앱](https://learn.chatgpt.com/docs/linux/linux-app) |
| 8/11 | — | 기능 추가 | 다른 에이전트의 설정과 최근 작업을 가져올 수 있어요. | [다른 에이전트에서 가져오기](./setup.md#다른-에이전트에서-가져오기) | [가져오기](https://learn.chatgpt.com/docs/import) |

## 공식 문서

- [ChatGPT·Codex 릴리스](https://learn.chatgpt.com/docs/changelog)
- [OpenAI API 릴리스](https://developers.openai.com/api/docs/changelog)
