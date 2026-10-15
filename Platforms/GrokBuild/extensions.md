# Grok Build 확장 기능

외부 자료는 MCP로 연결하고, 반복 작업은 Skill로 묶어요.  
독립 작업은 Subagent로 나눠요.

## 1. MCP 연결

터미널에서 공식 문서 MCP를 추가하고 연결을 확인하세요.

```bash
grok mcp add --transport http xai-docs https://docs.x.ai/api/mcp
grok mcp doctor xai-docs
```

CLI 채팅창에서 연결된 도구를 확인하세요.

```text
/mcps
```

연결을 확인한 뒤 공식 문서 조회를 요청하세요.

```text
xai-docs MCP로 Grok Build의 현재 인증 방법을 찾아서 알려줘.
```

인증이 필요한 서버는 `/mcps`에서 서버를 선택하고 `i`로 로그인하세요.  
팀 공유 연결은 추가 명령에 `--scope project`를 붙이세요.

## 2. Skill 추가

개인·프로젝트 설치 위치는 [환경 설정](./setup.md#6-사용자-skill)을 확인하세요.  
CodeStream의 8개 Skill 호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.

직접 만든 Skill에는 이름과 용도를 적으세요.

```markdown
---
name: review-api
description: API 변경에서 계약 위반과 테스트 누락을 검토한다.
---

- API 계약과 변경 코드를 비교한다.
- 결함과 근거 파일을 보고한다.
- 파일은 수정하지 않는다.
```

`review-api/SKILL.md`로 저장하고 새 세션에서 호출하세요.

```text
/review-api 주문 취소 API 변경을 검토해줘.
```

## 다른 확장 기능

| 기능 | 용도와 안내 |
| --- | --- |
| Subagent | [별도 컨텍스트에서 독립 작업을 처리해요.](https://docs.x.ai/build/features/subagents) |
| Agent Profile | [세션 역할과 도구 구성을 고정해요.](./reference/03-workflows-and-profiles.md#agent-profile) |
| Custom Model | [OpenAI 호환 모델과 사내 게이트웨이를 연결해요.](https://docs.x.ai/build/overview#custom-models) |
| ACP | [IDE와 자체 앱에서 Grok Build를 제어해요.](https://docs.x.ai/build/cli/headless-scripting#acp) |
| Hook | [도구 실행 전후에 검사 스크립트를 실행해요.](https://docs.x.ai/build/features/hooks) |
| Plugin | [Skill, Hook과 MCP를 함께 배포해요.](https://docs.x.ai/build/features/skills-plugins-marketplaces) |
| Claude 호환 설정 | [기존 Skill, 지침과 외부 연결을 재사용해요.](https://docs.x.ai/build/features/skills-plugins-marketplaces#claude-code-compatibility) |

## 공식 문서

- [공식 문서 MCP](https://docs.x.ai/developers/docs-mcp)
- [MCP 연결과 인증](https://docs.x.ai/build/features/mcp-servers)
- [Skill과 Plugin](https://docs.x.ai/build/features/skills-plugins-marketplaces)
