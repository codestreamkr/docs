# Claude Code 확장 기능

독립 작업은 Subagent로 나누고, 외부 도구는 MCP로 연결해요.  
반복 작업은 예약 요청이나 짧은 CLI 명령으로 실행해요.

## Subagent로 조사 나누기

채팅창에서 독립적으로 조사할 대상을 지정해요.

```text
Subagent 두 개로 결제 API와 관련 테스트를 각각 조사해줘.
파일은 수정하지 말고 근거 파일과 결과를 합쳐줘.
```

`/tasks`로 진행 상태를 확인해요.  
직접 정의할 때는 개인 `~/.claude/agents/`나 프로젝트 `.claude/agents/`에 Markdown 파일을 둬요.

## MCP

터미널에서 서버를 추가해요.  
`<name>`과 `<url>`은 연결할 서버의 이름과 주소로 바꿔요.

```bash
claude mcp add --transport http <name> <url>
claude mcp list
```

Claude Code 채팅창에서 연결 상태를 확인해요.  
인증이 필요한 서버는 목록에서 선택하고 로그인해요.

```text
/mcp
```

팀과 공유하려면 추가 명령에 `--scope project`를 넣어요.  
공유 설정은 프로젝트의 `.mcp.json`에 저장돼요.

## 반복 실행

클라우드에서 정기적으로 실행하려면 채팅창에서 예약해요.

```text
/schedule 매주 월요일 오전 9시 Asia/Seoul 기준으로 지난주 변경을 요약해줘. 파일은 수정하지 마.
```

안내에 따라 저장소와 실행 환경을 연결하고 예약 내용을 확인해요.  
`/schedule list`에서 저장한 예약을 확인해요.  
Routines는 계정과 조직의 지원이 필요하며, 로컬 컴퓨터가 아닌 클라우드에서 실행해요.

스크립트에서 한 번 실행하려면 터미널에서 요청해요.

```bash
claude -p "현재 변경을 검토하고 동작 문제와 누락된 테스트를 알려줘. 파일은 수정하지 마."
```

실행 결과에서 검토 내용과 미검증 항목을 확인해요.  
CI의 완료 기준에는 필요한 테스트의 통과 여부도 포함해요.

## 추가 기능

| 기능 | 용도와 공식 안내 |
| --- | --- |
| Skill | [Skills](https://code.claude.com/docs/ko/skills)로 반복 절차를 묶어요. CodeStream 예제는 [사용자 Skill](./skills.md)을 확인해요. |
| 경로별 규칙 | [Rules](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules)로 특정 경로의 지침을 관리해요. |
| Subagent 추론과 압축 조정 | [Subagents](https://code.claude.com/docs/en/sub-agents)에서 역할별 모델·추론·압축 시점을 정해요. |
| GitLab MR 작업 | [worktree](https://code.claude.com/docs/en/common-workflows)에서 MR을 별도 작업 공간으로 열어요. |
| 세션 간 메시지 | [세션 간 메시지](https://code.claude.com/docs/en/cross-session-messaging)로 다른 세션에 변경 내용을 전달해요. |
| 자체 인프라 실행 | [Self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments-quickstart)로 조직의 호스트에서 클라우드 작업을 실행해요. |
| Hook | [Hooks](https://code.claude.com/docs/ko/hooks)로 도구 실행 전후의 검사를 연결해요. |
| Hook 실패 시 차단 | [Hook 실패 처리](https://code.claude.com/docs/en/hooks#block-the-action-when-a-hook-fails)로 검사 실패 때 작업을 차단해요. |
| 짧은 간격의 반복 확인 | [세션 내 예약](https://code.claude.com/docs/en/scheduled-tasks)의 `/loop`로 열린 CLI 세션에서 상태를 확인해요. |
| Plugin 설치와 설정 | [Plugins](https://code.claude.com/docs/ko/plugins)로 Skill·Hook·MCP를 함께 배포하고 설정해요. |
| Plugin 평가 | [Plugin 평가](https://code.claude.com/docs/en/plugin-evals)로 Plugin 적용 전후 결과를 비교해요. |
| GitHub CI | [GitHub Actions](https://code.claude.com/docs/en/github-actions)로 저장소 이벤트에 작업을 연결해요. |

## 공식 문서

- [Subagents](https://code.claude.com/docs/ko/sub-agents)
- [MCP 연결과 인증](https://code.claude.com/docs/ko/mcp)
- [Routines](https://code.claude.com/docs/en/routines)
- [비대화형 실행](https://code.claude.com/docs/en/headless)
