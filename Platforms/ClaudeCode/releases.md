# Claude Code 릴리스

2026년 8월부터 10월 15일까지 개발자가 확인할 주요 변경을 최신순으로 정리해요.  
새 기능의 사용법은 활용 문서로 연결하고, 자동 적용되는 개선은 이 페이지에서 안내해요.

## 2026년 10월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 10/14 | 2.1.300 | 자동 적용 개선 | 종료 시 `SessionEnd` Hook 누락과 자동 도구 검색이 세션 중 꺼지는 문제를 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.300) |
| 10/14 | 2.1.299 | 자동 적용 개선 | 긴 대화의 유휴 압축과 예약 작업 시각 표시를 개선했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.299) |
| 10/09 | 2.1.296 | 자동 적용 개선 | 관리 Hook의 차단 뒤에도 턴이 계속되는 문제와 비 UTF-8 파일 편집 문제를 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.296) |
| 10/09 | 2.1.296 | 기능 추가 | Subagent 정의에서 압축 시점을 지정하는 `autoCompactWindow`를 추가했어요. | [Subagent 추론과 압축 조정](./extensions.md#subagent-추론과-압축-조정) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.296) |
| 10/08 | 2.1.295 | 기능 추가 | command·HTTP Hook이 실패할 때 작업을 차단하는 `onFailure` 설정을 추가했어요. | [Hook 실패 시 차단](./extensions.md#hook-실패-시-차단) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.295) |
| 10/07 | 2.1.293 | 모델 추가 | Haiku 5.5를 추가하고 Anthropic API의 기본 Haiku 모델로 지정했어요. | [새 모델과 호환성](./setup.md#새-모델과-호환성) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.293) |
| 10/06 | 2.1.292 | 기능 추가 | 일반 Subagent 호출에 요청별 `effort` 지정을 추가했어요. | [Subagent 추론과 압축 조정](./extensions.md#subagent-추론과-압축-조정) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.292) |

## 2026년 9월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 09/30 | 2.1.286 | 자동 적용 개선 | 중단된 병렬 도구 호출 뒤 세션 복원 시 대화가 사라지는 문제와 MCP 오류의 자격 증명 노출을 수정했어요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.286) |
| 09/29 | 2.1.285 | 기능 추가 | 현재 프로젝트나 세션을 Desktop으로 여는 `--desktop` 옵션을 추가했어요. | [Desktop으로 이어가기](./commands.md#desktop으로-이어가기) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.285) |
| 09/29 | 2.1.285 | 기능 추가 | Plugin 옵션과 미설정 값을 확인하는 `claude plugin configure` 명령을 추가했어요. | [Plugin 설정 확인](./extensions.md#plugin-설정-확인) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.285) |
| 09/28 | 2.1.284 | 모델 추가 | Sonnet 5.5를 추가하고 Anthropic API의 기본 Sonnet 모델로 지정했어요. | [새 모델과 호환성](./setup.md#새-모델과-호환성) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.284) |
| 09/22 | 2.1.280 | 모델 추가 | Opus 5.5를 추가했어요. 새 모델의 추론 수준과 기존 설정 승계 범위를 확인해요. | [새 모델과 호환성](./setup.md#새-모델과-호환성) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.280) |
| 09/11 | 2.1.269 | 기능 추가 | 사례별 채점과 Plugin 없는 실행 비교를 제공하는 `claude plugin eval`을 추가했어요. | [Plugin 평가](./extensions.md#plugin-평가) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.269) |
| 09/01 | 2.1.257 | 모델 추가 | 접근 권한이 있는 조직에서 Fable 5.1을 사용할 수 있어요. | [새 모델과 호환성](./setup.md#새-모델과-호환성) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.257) |

## 2026년 8월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 08/28 | 2.1.251 | 기능 추가 | `/cost`에 세션의 프롬프트 캐시 적중률과 재처리 토큰 정보를 추가했어요. | [프롬프트 캐시 확인](./commands.md#프롬프트-캐시-확인) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.251) |
| 08/17~21 | 2.1.234 이상 | 기능 추가 | `/design` research preview로 UI artboard 생성과 구현을 연결해요. | [UI 시안에서 구현으로 연결](./workflows.md#ui-시안에서-구현으로-연결) | [주간 발표](https://code.claude.com/docs/en/whats-new/2026-w34) |
| 08/17~21 | 버전 미표기 | 기능 확대 | Remote Control이 research preview를 마치고 모바일 Devices에서 세션을 시작할 수 있어요. | [휴대전화에서 로컬 작업 이어가기](./workflows.md#휴대전화에서-로컬-작업-이어가기) | [주간 발표](https://code.claude.com/docs/en/whats-new/2026-w34) |
| 08/17 | 2.1.234 | 자동 적용 개선 | 사용량 한도가 초기화되면 세션을 자동으로 이어가요. | 별도 절차 없음 | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.234) |
| 08/14 | 2.1.233 | 기능 추가 | GitLab MR URL로 worktree를 여는 기능을 추가했어요. | [GitLab MR에서 작업](./extensions.md#gitlab-mr에서-작업) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.233) |
| 08/14 | 계정별 적용 | 기본값 변경 | Pro·Max·Team의 새 세션 기본 권한 모드를 `auto`로 변경했어요. 명시한 기본값은 유지해요. | [권한과 실행 범위](./setup.md#권한과-실행-범위) | [공식 발표](https://code.claude.com/docs/en/whats-new/2026-w32) |
| 08/07 | 2.1.224 | 기능 추가 | 조직 자체 인프라에서 클라우드 세션을 실행하는 self-hosted 환경을 추가했어요. | [자체 인프라에서 클라우드 세션 실행](./extensions.md#자체-인프라에서-클라우드-세션-실행) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.224) |
| 08/07 | 2.1.224 | 기능 추가 | `ListAgents`·`SendMessage`로 별도 Claude Code 세션에 메시지를 전달할 수 있어요. | [다른 세션에 메시지 전달](./extensions.md#다른-세션에-메시지-전달) | [릴리스](https://github.com/anthropics/claude-code/releases/tag/v2.1.224) |

## 확인 기준

- 버전 릴리스는 공식 GitHub 게시 날짜를 사용해요.
- 주간 발표만 날짜를 제공하면 해당 기간을 그대로 표시해요.
- 네이티브 권장 설치와 패키지별 업데이트 차이는 [환경 설정](./setup.md#설치와-첫-실행)에서 확인해요.
- 전체 버전 목록과 세부 변경은 [공식 변경 기록](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)에서 확인해요.
- 설치 버전은 `claude --version`으로 확인해요.
- CLI 예제는 실제 실행 환경에서 검증해야 해요.
