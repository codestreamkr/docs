# 03. Workflow와 Agent Profile

반복해서 실행할 연결과, 세션의 역할 고정을 다뤄요.  
기준 버전은 grok 1.0.41이에요.

## 두 가지 작업 흐름

[작업 흐름](../workflows.md)은 Playbook에 따라 `/ct-*`를 사람이 잇는 방법이에요.  
`/workflow`는 저장된 오케스트레이션을 실행해요.  
한 번만 이어 붙일 때는 Skill 호출로 충분해요.  
같은 연결을 반복할 때 Workflow로 고정해요.  

프로젝트 파일은 `<repo>/.grok/workflows/*.rhai`예요.  
개인 파일은 `~/.grok/workflows/*.rhai`예요.  

## 실행

```text
/workflow <이름>
/workflow runs
/workflow pause <표시 이름>
/workflow resume <표시 이름>
/workflow stop <표시 이름>
```

`/workflow runs`는 전체 화면에서 실행 목록을 열어요.  
minimal 모드에서는 텍스트로 보여줘요.  
자식 호출 수 상한은 `agent_budget`이에요.  
기본은 128이에요.  
상한에 닿은 실행은 `/workflow resume`만으로 다시 시작하지 않아요.  
더 높은 `agent_budget`을 모델 또는 도구의 resume로 넘겨야 해요.  
프로세스가 다시 시작되며 끊긴 실행은 이어서 열리지 않아요.

## Goal

`/goal`은 목표를 두고 여러 차례 작업해요.  
독립 확인이 끝나기 전에는 완료로 두지 않아요.  
범위와 완료 조건이 Playbook과 Skill로 이미 정해진 작업의 기본 수단은 아니에요.  

```text
/goal status
/goal pause
/goal resume
/goal clear
```

## Agent Profile

세션의 시스템 프롬프트와 도구 구성을 고정할 때 써요.  
파일은 `<repo>/.grok/agents/`, `~/.grok/agents/`의 Markdown이에요.  
대화형 세션은 `--agent-profile`로 지정해요.  
설정은 `[agent] name` 또는 `GROK_AGENT`예요.  
프로젝트 공통 기준은 Profile이 아니라 `AGENTS.md`에 둬요.  

헤드리스의 `--agent`는 대화형 지정과 달라요.  
항목은 `~/.grok/docs/user-guide/14-headless-mode.md`를 봐요.  
