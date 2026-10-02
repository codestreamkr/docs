# 03. Workflow와 Agent Profile

반복할 연결을 저장하는 Workflow와 세션 역할을 고정하는 Agent Profile을 설명해요.  
기준 버전은 Grok Build 1.0.41이에요.

## 두 가지 작업 흐름

[작업 흐름](../workflows.md)은 Playbook에 따라 사람이 `/ct-*` 결과를 이어 가는 방법이에요.  
`/workflow`는 저장된 오케스트레이션을 실행해요.  
한 번만 연결할 때는 Skill 호출로 충분하고, 같은 연결을 반복할 때 Workflow를 검토해요.

프로젝트 Workflow는 `<repo>/.grok/workflows/*.rhai`, 개인 Workflow는 `~/.grok/workflows/*.rhai`에 둬요.

## Workflow 실행

```text
/workflow <이름>
/workflow runs
/workflow pause <표시 이름>
/workflow resume <표시 이름>
/workflow stop <표시 이름>
```

`/workflow runs`에서 실행 목록을 보고 상태를 관리해요.  
자식 호출 상한은 `agent_budget`으로 제한될 수 있으므로, 반복 실행 전에 현재 설정과 중단 조건을 확인해요.  
프로세스가 다시 시작되어 끊긴 실행의 복원 가능 여부는 현재 버전 도움말을 확인해요.

## Goal

`/goal`은 목표가 충족될 때까지 여러 차례 작업을 이어가게 해요.  
범위와 완료 조건이 Playbook과 Skill에 이미 정해진 작업의 기본 수단은 아니에요.

```text
/goal status
/goal pause
/goal resume
/goal clear
```

## Agent Profile

Agent Profile은 세션의 시스템 프롬프트와 도구 구성을 고정해요.  
파일은 `<repo>/.grok/agents/`, `~/.grok/agents/`에 두고, 프로젝트 공통 기준은 `AGENTS.md`에 둬요.

대화형 세션은 `--agent`로 Profile을 지정할 수 있어요.  
기본 Profile은 `[agent] name` 또는 `GROK_AGENT`로 설정할 수 있어요.  
headless 모드의 Agent 설정은 대화형 지정과 다를 수 있으므로 현재 `grok --help`를 확인해요.

## 확인 기준

반복할 연결인지, 한 번의 Skill 호출 연결인지 먼저 판단해요.  
Profile이 프로젝트 기준을 대체하지 않도록 `AGENTS.md`와 역할을 분리해요.

## 공식 문서

- [Grok Build 개요](https://docs.x.ai/build/overview)
- [Settings](https://docs.x.ai/build/settings)
