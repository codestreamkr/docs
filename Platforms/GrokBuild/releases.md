# Grok Build 릴리스

2026년 8월부터 10월 15일까지 개발자에게 필요한 Grok Build CLI 변경을 최신순으로 정리해요.  
주요 변경을 확인하고 연결된 문서에서 사용법을 확인하세요.

설치와 업데이트는 [환경 설정](./setup.md#7-버전-확인과-업데이트)을 확인하세요.

## 2026년 10월

| 날짜 | 버전 | 주요 변경 | 사용 안내 |
| --- | --- | --- | --- |
| 10/11 | 1.0.52 | 앱 종료 뒤 명령이 남는 문제와 긴 대화의 압축 오류를 수정했어요. | 자동 적용 |
| 10/09 | 1.0.51 | headless 실행의 Goal 완료 대기와 `/density`를 추가했어요. | [자동화 실행](./workflows.md#6-간단한-자동화) |
| 10/09 | 1.0.51 | `/share`와 세션 URL 공유를 제거했어요. | [채팅창 명령](./commands.md#cli-채팅창-명령) |
| 10/06 | 1.0.50 | `/timestamps`로 메시지 시간을 표시할 수 있어요. | [메시지 시간 설정](./commands.md#표시-설정) |
| 10/06 | 1.0.50 | 저장 실패 때 기존 파일을 보존하고 사용 중인 worktree 삭제를 막아요. | 자동 적용 |

## 2026년 9월

| 날짜 | 버전 | 주요 변경 | 사용 안내 |
| --- | --- | --- | --- |
| 09/28 | 1.0.44 | macOS Sandbox가 Seatbelt를 사용해요. | [Sandbox](./reference/01-permissions-and-plan-mode.md#sandbox) |
| 09/28 | 1.0.44 | `/context-window`로 컨텍스트 창을 선택할 수 있어요. | [컨텍스트 창 선택](./reference/02-sessions-and-subagents.md#컨텍스트-창-선택) |
| 09/28 | 1.0.44 | 같은 파일의 병렬 수정을 순서대로 실행해요. | 자동 적용 |
| 09/26 | 1.0.42 | 대화형 세션 없이 `grok worktree create`로 worktree를 만들 수 있어요. | [worktree 자동화](./workflows.md#5-worktree로-작업-분리) |
| 09/26 | 1.0.42 | WinGet 설치는 `grok update`가 안내하는 `winget upgrade` 명령으로 업데이트해요. | [업데이트와 채널](./setup.md#7-버전-확인과-업데이트) |
| 09/22 | 1.0.41 | Subagent 모델 상속 설정을 `/settings`에 추가했어요. | [Subagent 설정](./reference/02-sessions-and-subagents.md#subagent-설정) |
| 09/20 | 1.0.40 | Grok Build에서 Grok 4.7을 지원해요. | [모델과 실행 설정](./setup.md#3-모델과-권한-선택) |
| 09/07 | 1.0.24 | `Esc`가 실행 중인 턴을 취소하지 않아요. | [실행 중지](./commands.md#cli-채팅창-명령) |
| 09/04 | 1.0.19 | headless 실행에서 `--worktree`를 지원해요. | [worktree 자동화](./workflows.md#5-worktree로-작업-분리) |

## 2026년 8월

| 날짜 | 버전 | 주요 변경 | 사용 안내 |
| --- | --- | --- | --- |
| 08/31 | 1.0.14 | `--sandbox strict`의 쓰기 범위를 `~/.grok/sessions`로 제한했어요. | [Sandbox](./reference/01-permissions-and-plan-mode.md#sandbox) |
| 08/28 | 1.0.13 | 일시적인 추론 실패를 재시도하고, 길이 제한으로 끊긴 응답을 이어가요. | 자동 적용 |
| 08/24 | 1.0.9 | Workflow의 자식 호출 상한과 추론 수준을 실행 시 지정할 수 있어요. | [Workflow 실행](./reference/03-workflows-and-profiles.md#workflow-실행) |
| 08/10 | 1.0.1 | `/rewind`는 대화 기록만 되돌려요. 파일은 복원하지 않아요. | [세션 관리](./reference/02-sessions-and-subagents.md#세션-관리) |
| 08/07 | 1.0.0 | 원격 세션의 코드는 `--restore-code`를 지정해야 복원해요. | [원격 세션과 코드 복원](./reference/02-sessions-and-subagents.md#원격-세션과-코드-복원) |

## 공식 문서

- [Grok Build Changelog](https://x.ai/changelog/build)
- [Modes and Commands](https://docs.x.ai/build/modes-and-commands)
- [Headless and Scripting](https://docs.x.ai/build/cli/headless-scripting)
- [Worktrees](https://docs.x.ai/build/features/worktrees)
