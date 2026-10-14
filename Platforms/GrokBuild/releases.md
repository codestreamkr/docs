# Grok Build 릴리스

2026년 8월부터 10월 14일까지 개발자에게 필요한 Grok Build CLI 변경을 최신순으로 정리해요.  
자동 적용 개선은 이 문서에서 확인하고, 새 기능의 사용법은 연결된 활용 문서에서 확인해요.

## 2026년 10월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 10/11 | 1.0.52 | 자동 적용 개선 | 종료 후 셸 명령 정리와 컨텍스트 초과 시 자동 압축을 수정했어요. | 별도 절차 없음 | [Changelog](https://x.ai/changelog/build) |
| 10/09 | 1.0.51 | 기능 추가 | headless 실행의 Goal 완료 대기와 `/density`를 추가했어요. | [headless 실행과 표시 설정](./commands.md#자동화와-표시-설정) | [Changelog](https://x.ai/changelog/build) |
| 10/09 | 1.0.51 | 지원 종료 | `/share`와 세션 URL 공유를 제거했어요. | [대화 내보내기](./commands.md#자동화와-표시-설정) | [Changelog](https://x.ai/changelog/build) |
| 10/06 | 1.0.50 | 기능 추가 | `/timestamps`로 메시지 시간을 표시할 수 있어요. | [메시지 시간 설정](./commands.md#자동화와-표시-설정) | [Changelog](https://x.ai/changelog/build) |
| 10/06 | 1.0.50 | 자동 적용 개선 | 파일 쓰기 실패 시 기존 내용 보존과 사용 중인 worktree 삭제 보호를 수정했어요. | 별도 절차 없음 | [Changelog](https://x.ai/changelog/build) |

## 2026년 9월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 09/28 | 1.0.44 | 기능 추가 | `/context-window`로 컨텍스트 창을 선택할 수 있어요. | [컨텍스트 창 선택](./reference/02-sessions-and-subagents.md#컨텍스트-창-선택) | [Changelog](https://x.ai/changelog/build) |
| 09/28 | 1.0.44 | 자동 적용 개선 | 같은 파일의 병렬 수정을 순서대로 실행해요. | 별도 절차 없음 | [Changelog](https://x.ai/changelog/build) |
| 09/26 | 1.0.42 | 기능 추가 | 대화형 세션 없이 `grok worktree create`로 worktree를 만들 수 있어요. | [worktree 자동화](./commands.md#worktree-자동화) | [Changelog](https://x.ai/changelog/build) |
| 09/07 | 1.0.24 | 사용법 변경 | `Esc`가 실행 중인 턴을 취소하지 않아요. | [턴 취소](./commands.md#자동화와-표시-설정) | [Changelog](https://x.ai/changelog/build) |
| 09/04 | 1.0.19 | 기능 추가 | headless 실행에서 `--worktree`를 지원해요. | [worktree 자동화](./commands.md#worktree-자동화) | [Changelog](https://x.ai/changelog/build) |

## 2026년 8월

| 날짜 | 버전 | 구분 | 변경사항 | 활용 문서 | 공식 자료 |
| --- | --- | --- | --- | --- | --- |
| 08/28 | 1.0.13 | 자동 적용 개선 | 일시적인 추론 실패를 재시도하고, 길이 제한으로 끊긴 응답을 이어가요. | 별도 절차 없음 | [Changelog](https://x.ai/changelog/build) |
| 08/24 | 1.0.9 | 기능 추가 | Workflow의 자식 호출 상한과 추론 수준을 실행 시 지정할 수 있어요. | [Workflow 실행](./reference/03-workflows-and-profiles.md#workflow-실행) | [Changelog](https://x.ai/changelog/build) |

## 공식 문서

- [Grok Build Changelog](https://x.ai/changelog/build)
- [Modes and Commands](https://docs.x.ai/build/modes-and-commands)
- [Headless and Scripting](https://docs.x.ai/build/cli/headless-scripting)
- [Worktrees](https://docs.x.ai/build/features/worktrees)
