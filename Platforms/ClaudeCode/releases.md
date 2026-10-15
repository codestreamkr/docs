# Claude Code 릴리스

2026년 8월부터 10월 15일까지 주요 변경을 월별로 정리해요.  
버전 확인과 업데이트는 [환경 설정](./setup.md#7-버전-확인과-업데이트)을 확인해요.

## 2026년 10월

| 날짜 | 버전 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- |
| 10/14 | 2.1.300 | 종료 시 Hook이 빠지거나 세션 중 도구 검색이 꺼지는 문제를 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.300) |
| 10/14 | 2.1.299 | 대기 중인 긴 대화의 요약과 예약 시간 표시를 개선했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.299) |
| 10/09 | 2.1.296 | Hook이 차단한 작업이 계속되거나 일부 인코딩의 파일 편집이 실패하는 문제를 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.296) |
| 10/09 | 2.1.296 | Subagent의 대화 요약 시점을 설정할 수 있어요. | [Subagent 추론과 압축 조정](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.296) |
| 10/08 | 2.1.295 | Hook 검사에 실패하면 작업을 차단할 수 있어요. | [Hook 실패 시 차단](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.295) |
| 10/07 | 2.1.293 | Haiku 5.5를 추가하고 Anthropic API의 기본 Haiku 모델로 지정했어요. | [새 모델과 호환성](./setup.md#3-모델과-권한-선택) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.293) |
| 10/06 | 2.1.292 | Subagent 요청마다 추론 수준을 선택할 수 있어요. | [Subagent 추론과 압축 조정](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.292) |

## 2026년 9월

| 날짜 | 버전 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- |
| 09/30 | 2.1.286 | 병렬 작업 후 복원한 대화가 사라지거나 MCP 오류에 인증 정보가 노출되는 문제를 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.286) |
| 09/29 | 2.1.285 | 현재 프로젝트나 세션을 Desktop으로 여는 `--desktop` 옵션을 추가했어요. | [Desktop으로 이어가기](./commands.md#추가-명령) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.285) |
| 09/29 | 2.1.285 | Plugin 옵션과 미설정 값을 확인하는 `claude plugin configure` 명령을 추가했어요. | [Plugin 설정 확인](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.285) |
| 09/28 | 2.1.284 | Sonnet 5.5를 추가하고 Anthropic API의 기본 Sonnet 모델로 지정했어요. | [새 모델과 호환성](./setup.md#3-모델과-권한-선택) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.284) |
| 09/22 | 2.1.280 | Opus 5.5를 추가했어요. | [새 모델과 호환성](./setup.md#3-모델과-권한-선택) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.280) |
| 09/11 | 2.1.269 | Plugin 적용 전후 결과를 평가할 수 있어요. | [Plugin 평가](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.269) |
| 09/01 | 2.1.257 | 접근 권한이 있는 조직에서 Fable 5.1을 사용할 수 있어요. | [새 모델과 호환성](./setup.md#3-모델과-권한-선택) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.257) |

## 2026년 8월

| 날짜 | 버전 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- |
| 08/28 | 2.1.251 | `/cost`에서 캐시 사용과 다시 처리한 토큰을 확인할 수 있어요. | [프롬프트 캐시 확인](./commands.md#추가-명령) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.251) |
| 08/17~21 | 2.1.234 이상 | `/design` 미리보기로 UI 시안을 만들고 구현할 수 있어요. | [UI 시안에서 구현으로 연결](./workflows.md#다른-환경에서-이어가기) | [주간 발표](https://code.claude.com/docs/en/whats-new/2026-w34) |
| 08/17~21 | 버전 미표기 | Remote Control을 정식 제공하고 모바일에서 로컬 세션을 시작할 수 있어요. | [휴대전화에서 로컬 작업 이어가기](./workflows.md#다른-환경에서-이어가기) | [주간 발표](https://code.claude.com/docs/en/whats-new/2026-w34) |
| 08/17 | 2.1.234 | 사용량 한도가 초기화되면 세션을 자동으로 이어가요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.234) |
| 08/14 | 2.1.233 | GitLab MR URL로 worktree를 여는 기능을 추가했어요. | [GitLab MR에서 작업](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.233) |
| 08/14 | 계정별 적용 | Pro·Max·Team의 새 세션 기본 권한을 `auto`로 변경했어요. | [권한과 실행 범위](./setup.md#3-모델과-권한-선택) | [공식 발표](https://code.claude.com/docs/en/whats-new/2026-w32) |
| 08/07 | 2.1.224 | 조직 자체 인프라에서 클라우드 세션을 실행하는 self-hosted 환경을 추가했어요. | [자체 인프라에서 클라우드 세션 실행](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.224) |
| 08/07 | 2.1.224 | 다른 Claude Code 세션에 메시지를 전달할 수 있어요. | [다른 세션에 메시지 전달](./extensions.md#추가-기능) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.224) |

## 공식 문서

- [전체 변경 기록](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [공식 릴리스](https://github.com/anthropics/claude-code/releases)
