# Codex 명령 확인

이 문서의 `/` 명령은 CLI 채팅창 기준이에요.  
CLI를 시작하거나 관리할 때는 터미널을 사용해요.

## Codex 채팅창에서 사용

채팅창에 `/`를 입력하면 사용할 수 있는 명령이 표시돼요.  
작업을 시작할 때 상태를 확인하고 모델과 권한을 선택하세요.

| 명령 | 용도 |
| --- | --- |
| `/status` | 현재 세션 상태 확인 |
| `/model` | 모델과 추론 수준 선택 |
| `/permissions` | 접근 권한 선택 |
| `/skills` | 사용자 Skill 확인 |
| `/mcp` | 연결된 외부 도구 확인 |

구현 전에 계획이 필요하면 계획 모드로 전환하세요.

```text
/plan
```

`/plan`은 Codex의 계획 모드예요.  
`$ct-plan`은 CodeStream Skill의 계획 절차를 실행해요.

```text
$ct-plan 주문 취소의 중복 요청 방지 계획을 작성해줘
```

작업이 끝나면 변경 내용을 확인하고 검토하세요.

```text
/diff
```

```text
/review
```

다음 작업을 시작할 때는 대화를 이어가거나 새 대화를 여세요.

| 명령 | 용도 |
| --- | --- |
| `/resume` | 이전 대화 재개 |
| `/fork` | 현재 대화에서 분기 |
| `/compact` | 대화 요약 |
| `/new` | 새 대화 시작 |
| `/quit` | CLI 종료 |

대화를 분기해도 파일은 같은 작업 공간을 사용해요.  
파일도 분리하려면 [Worktree](./workflows.md#별도-작업-공간에서-구현하기)를 사용하세요.

## 백그라운드 작업 관리

Codex 채팅창에서 실행 중인 터미널과 최근 출력을 확인하세요.

```text
/ps
```

현재 세션의 백그라운드 터미널을 중지하려면 다음 명령을 입력하세요.

```text
/stop
```

## 터미널에서 실행

프로젝트 폴더에서 Codex를 시작하세요.

```bash
codex
```

종료한 뒤 최근 대화를 이어가려면 다음 명령을 실행하세요.

```bash
codex resume --last
```

추가 옵션은 도움말에서 확인하세요.

```bash
codex --help
```

대화 없이 실행하는 방법은 [자동화](./automation.md)를 확인하세요.

## 공식 문서

- [입력창 명령과 CLI 옵션](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
- [CLI 사용 안내](https://learn.chatgpt.com/docs/codex/cli)
