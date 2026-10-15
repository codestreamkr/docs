# Antigravity 확장 기능

프로젝트 지침, 반복 절차와 외부 도구를 필요한 범위에 연결해요.

## 확장 선택

| 필요한 것 | 선택 |
| --- | --- |
| 계속 적용할 작업 기준 | `AGENTS.md` 또는 Rules |
| 반복 절차와 전문 지식 | Skill |
| 독립적인 조사와 검증 | Custom subagent |
| 외부 서비스의 도구와 데이터 | MCP |
| 실행 전후 자동 검사 | Hook |
| 여러 확장의 묶음 배포 | Plugin |

## Skill 만들기

프로젝트의 `.agents/skills/explain-tests/SKILL.md`에 작성하세요.

```markdown
---
name: explain-tests
description: 테스트의 실행 방법과 검증 범위를 설명한다.
---

# 테스트 설명

1. README.md에서 테스트 명령을 확인한다.
2. 관련 테스트 파일과 검증 범위를 설명한다.
3. 파일은 수정하지 않는다.
```

목록 갱신은 [환경 설정](./setup.md#5-사용자-skill)을 확인하세요.  
갱신한 뒤 호출하세요.

```text
/explain-tests 주문 취소 테스트를 설명해줘
```

## MCP

외부 도구를 연결하기 전에 서버의 설치·인증 절차를 확인하세요.  
전역 설정은 `~/.gemini/config/mcp_config.json`, 프로젝트 설정은 `.agents/mcp_config.json`에 둬요.

터미널에서 OpenAI 공식 문서 서버를 등록하고 목록을 확인하세요.

```bash
agy mcp add docs https://developers.openai.com/mcp
agy mcp list
```

서버를 등록한 뒤 연결과 인증 상태를 확인하세요.

```text
/mcp
```

서버별 설정은 [MCP 공식 안내](https://antigravity.google/docs/mcp)를 따라요.

## Rules

프로젝트·전역 지침 위치는 [환경 설정](./setup.md#4-프로젝트-지침)을 확인하세요.  
경로별 규칙은 `.agents/rules/`에 두고 `trigger`를 지정해요.  
[Rules 공식 안내](https://antigravity.google/docs/rules)에서 활성화 조건을 확인하세요.

## 확장 매니페스트의 중첩 항목

중첩된 Skill·Rule·Agent는 매니페스트의 `include_only`로 경로를 지정해요.  
[Rules 매니페스트](https://antigravity.google/docs/rules/#sharing-rules-across-projects)에서 형식을 확인하세요.

## Custom subagent

독립적인 조사·검증 역할을 재사용해요.  
[서브에이전트 학습 자료](./reference/02-subagents-and-background-tasks.md)와 [공식 정의 방법](https://antigravity.google/docs/subagents/)을 확인하세요.

## Hook

도구 실행 전후에 검사나 형식화를 실행해요.  
`/hooks`에서 로드 상태를 확인하고 [Hook 공식 안내](https://antigravity.google/docs/hooks)에서 설정하세요.

## Plugin

Skill·Rule·Subagent·MCP·Hook을 묶어 배포해요.  
`/plugin`에서 설치와 활성 상태를 확인하고 [Plugin 공식 안내](https://antigravity.google/docs/plugins)를 따라요.

## 공식 문서

- [Agent Skills](https://antigravity.google/docs/skills)
- [확장 관리](https://www.antigravity.google/docs/cli/plugins/)
- [MCP](https://antigravity.google/docs/mcp)
- [Rules](https://antigravity.google/docs/rules)
- [Hooks](https://antigravity.google/docs/hooks)
- [Plugins](https://antigravity.google/docs/plugins)
