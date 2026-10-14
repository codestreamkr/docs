# Claude Code 릴리스

2026년 8월부터 10월 14일까지 개발자가 확인할 주요 변경을 최신순으로 정리해요.  
새 기능의 사용법은 활용 문서로 연결하고, 자동 적용되는 개선은 이 페이지에서 안내해요.

## 2026년 10월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 10/14 | 2.1.299 | 자동 적용 개선 | 긴 대화의 유휴 압축과 예약 작업 시각 표시를 개선했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.299) |
| 10/09 | 2.1.296 | 자동 적용 개선 | 관리 Hook의 차단 뒤에도 턴이 계속되는 문제와 비 UTF-8 파일 편집 문제를 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.296) |
| 10/08 | 2.1.295 | 기능 추가 | command·HTTP Hook이 실패할 때 작업을 차단하는 `onFailure` 설정을 추가했어요. | [Hook 실패 시 차단](./extensions.md#hook-실패-시-차단) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.295) |

## 2026년 9월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 09/30 | 2.1.286 | 자동 적용 개선 | 중단된 병렬 도구 호출 뒤 세션 복원 시 대화가 사라지는 문제와 MCP 오류의 자격 증명 노출을 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.286) |
| 09/29 | 2.1.285 | 기능 추가 | 현재 프로젝트나 세션을 Desktop으로 여는 `--desktop` 옵션을 추가했어요. | [Desktop으로 이어가기](./commands.md#desktop으로-이어가기) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.285) |
| 09/29 | 2.1.285 | 기능 추가 | Plugin 옵션과 미설정 값을 확인하는 `claude plugin configure` 명령을 추가했어요. | [Plugin 설정 확인](./extensions.md#plugin-설정-확인) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.285) |

## 2026년 8월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 08/28 | 2.1.251 | 기능 추가 | `/cost`에 세션의 프롬프트 캐시 적중률과 재처리 토큰 정보를 추가했어요. | [프롬프트 캐시 확인](./commands.md#프롬프트-캐시-확인) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.251) |
| 08/17 | 2.1.234 | 자동 적용 개선 | 사용량 한도가 초기화되면 세션을 자동으로 이어가요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.234) |
| 08/14 | 2.1.233 | 기능 추가 | GitLab MR URL로 worktree를 여는 기능을 추가했어요. | [GitLab MR에서 작업](./extensions.md#gitlab-mr에서-작업) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.233) |

## 확인 기준

- 날짜는 공식 GitHub 릴리스의 게시 날짜를 사용해요.
- 전체 버전 목록과 세부 변경은 [공식 변경 기록](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)에서 확인해요.
- 설치 버전은 `claude --version`으로 확인해요.
- CLI 예제는 실제 실행 환경에서 검증해야 해요.
