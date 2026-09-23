# 01. 권한과 Plan 모드

일상 작업은 `auto`로 시작해요.  
승인 범위, Plan 모드, Sandbox를 여기서 다뤄요.  
기준 버전은 grok 1.0.41이에요.

명령 위치는 [명령 확인](../commands.md)을 봐요.

## 권한 모드

모드는 승인 질문의 기본값이에요.  
`deny` 규칙과 Hook은 모드와 관계없이 적용돼요.  

| 모드 | 동작 | 적합한 작업 |
| --- | --- | --- |
| `auto` | 안전 분류를 통과한 도구는 승인 없이 실행해요. 통과하지 못한 호출은 대화형 세션에서 다시 물어요. 비대화형 세션에서는 실패로 보고돼요. | 구현, 테스트, 문서 수정 |
| `ask` | 읽기 전용 외에는 물어요. 기본값이에요. | 민감한 설정, 처음 여는 저장소 |
| `always-approve` | 일반 승인 질문을 건너뛰어요. `deny` 규칙과 Hook은 유지돼요. | 격리된 자동 실행 |
| Plan | 계획 파일 외의 편집 도구는 거절해요. `always-approve`에서도 같아요. | 구현 전에 합의할 때 |

세션 안에서는 `Shift+Tab`으로 Normal, Plan, Auto, Always-approve를 순환해요.  
Auto가 꺼져 있으면 그 단계는 빠져요.  
`/auto`와 `/always-approve`는 이미 그 모드면 `ask`로 돌아와요.  

시작 예:

```bash
grok --permission-mode auto
```

사용자 설정은 `~/.grok/config.toml`에 둬요.  

```toml
[ui]
permission_mode = "auto"
```

저장소 `.grok/config.toml`은 이 키를 적용하지 않아요.  
`--dangerously-skip-permissions`는 쓰지 않아요.  

## 권한 규칙

프로젝트 `.grok/config.toml`의 `[permission]`은 사용자 규칙과 합쳐져요.  
`deny`가 `ask`, `allow`보다 우선해요.  

## Plan 모드와 ct-plan-work

`/plan`은 다음 프롬프트부터 세션을 계획 모드로 바꿔요.  
`/plan 설명`은 그 설명으로 바로 시작해요.  
계획은 세션 디렉터리의 `plan.md`에 저장돼요.  
승인한 뒤에 구현으로 넘어가고, 다시 보려면 `/view-plan`을 써요.  
편집 도구만 계획 파일로 제한돼요.  
셸 명령의 파일 쓰기는 검사하지 않아요.  
Subagent는 부모의 Plan 제한을 받지 않아요.  
쓰기 가능한 타입은 부모가 Plan 모드여도 파일을 수정할 수 있어요.  

`ct-plan-work`는 계획 문서를 만드는 Skill이에요.  
Playbook에서 수정 전에 범위 합의가 필요하면 Plan 모드에서 이 Skill을 호출해요.  
확정된 계획을 구현할 때는 Plan 모드를 끄고 `ct-code-spring`으로 넘어가요.  

## Sandbox

Sandbox는 기본으로 꺼져 있어요.  

```bash
grok --sandbox workspace
grok --sandbox read-only
```

`workspace`는 읽기 범위가 넓고, 쓰기는 현재 디렉터리와 `~/.grok/`, 임시 디렉터리로 제한해요.  
`read-only`는 조사와 검토에 맞아요.  
macOS에서는 자식 프로세스의 네트워크 차단이 적용되지 않아요.  

프로필 전체는 `~/.grok/docs/user-guide/18-sandbox.md`를 봐요.  

## 폴더 신뢰

프로젝트 `AGENTS.md`, 프로젝트 Skill, Hook, 저장소 MCP는 폴더를 신뢰한 뒤에 동작해요.  
`/hooks-trust` 또는 `--trust`로 기록해요.  
