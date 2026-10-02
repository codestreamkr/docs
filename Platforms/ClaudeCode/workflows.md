# Claude Code 작업 흐름

여러 결과가 필요한 작업은 열린 세션에서 앞 단계의 확정 결과를 다음 Skill 입력으로 넘겨요.  
문제 유형별 흐름과 판단 기준은 [Playbook](../../Playbooks/README.md)에서 관리해요.

## 호출과 연결

입력창에서 Skill과 대상 정보를 함께 보내요.

```text
/ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
        ↓
/ct-apply 확정된 계획의 남은 작업을 구현·검증하고 완료 상태를 기록해줘
        ↓
/ct-verify 주문 취소의 정상·중복·외부 실패 흐름이 계획의 요구사항을 충족하는지 검증해줘
```

대화만으로 대상을 구분하기 어렵다면 계획 파일이나 결과 파일의 경로를 다음 요청에 함께 적어요.

## 변경 확인과 검토

변경 후에는 입력창에서 `/diff`를 사용하거나 `현재 변경 내용을 검토해줘`라고 요청해요.  
Git 상태와 테스트를 직접 확인해야 하면 터미널에서 명령을 실행해요.

```bash
git diff
git status --short
```

`git diff`는 직접 실행하는 터미널 명령이고, `변경 내용을 검토해줘`는 Claude Code에 검토를 맡기는 자연어 요청이에요.  
두 입력은 목적 일부가 겹쳐도 같은 명령이 아니에요.  
요구사항 충족 여부는 마지막에 `ct-verify`로 독립 확인해요.

## 세션과 맥락 관리

| 상황 | 입력창에서 하는 일 |
| --- | --- |
| 적용 지침과 남은 맥락 확인 | `/context` |
| 확정된 결과를 남기고 대화 줄이기 | `/compact` |
| 관련 없는 작업 시작 | `/clear` |
| 다른 해결 방향 시도 | `/branch` |
| 이전 대화와 변경 지점 검토 | `/rewind` |
| 이전 세션으로 돌아가기 | `/resume` |

대화를 압축하거나 새 세션을 열면 다음 Skill 호출에 계획과 결과의 경로를 다시 적어요.

## Claude Code 고유 작업

독립적인 조사, 검토와 구현은 Subagent로 나눌 수 있어요.  
같은 체크아웃과 간섭하면 안 되는 작업은 터미널에서 `claude --worktree`로 별도 worktree 세션을 열어요.  
오래 걸리는 작업은 `claude --background`로 시작하고 `claude agents`와 `claude attach <id>`로 관리해요.  
세션을 여는 명령과 관리 명령은 [명령 확인](./commands.md)을 봐요.

## 함께 사용하는 문서

- Skill별 입력과 결과는 [사용자 Skill](./skills.md)을 봐요.
- 권한, 지침과 설정은 [환경 설정](./setup.md)을 봐요.
- Subagent, MCP, Hook과 Plugin의 역할은 [확장 기능](./extensions.md)을 봐요.

## 확인 기준

다음 단계로 넘어가기 전에 앞 단계의 결과, 남은 결정과 결과 파일 경로가 요청에 포함됐는지 확인해요.

## 공식 문서

- [명령](https://code.claude.com/docs/ko/commands)
- [Subagents](https://code.claude.com/docs/ko/sub-agents)
- [worktree](https://code.claude.com/docs/ko/worktrees)
