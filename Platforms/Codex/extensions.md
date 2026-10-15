# Codex 확장 기능

반복 작업에는 Skill을, 외부 서비스 연결에는 MCP나 Plugin을 사용해요.

## Skill

반복 작업을 정해진 절차로 실행해요.  
설치 확인은 [환경 설정](./setup.md#6-사용자-skill), 호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## MCP와 App·Connector

외부 도구를 직접 연결할 때는 MCP 서버를 등록해요.  
다음 예제는 터미널에서 OpenAI 공식 문서 서버를 등록해요.

```bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
```

Codex를 다시 실행하고 채팅창에서 연결을 확인하세요.

```text
/mcp
```

연결한 도구로 확인할 내용을 요청하세요.

```text
OpenAI 문서 MCP로 Codex Skill 작성 방법을 찾아줘.
최소 SKILL.md 예제와 공식 링크를 알려줘.
```

### 인증이 필요한 서버

인증이 필요한 서버는 터미널에서 로그인하세요.  
`my-mcp`를 등록한 서버 이름으로 바꾸세요.

```bash
codex mcp login my-mcp
```

## Plugin

Plugin은 Skill과 외부 도구를 함께 설치하는 기능 묶음이에요.  
채팅창에서 Plugin 목록을 열고 필요한 Plugin의 설치 안내를 따르세요.

```text
/plugins
```

설치와 인증을 마치면 새 대화에서 연결한 서비스와 작업을 지정하세요.

```text
GitHub Plugin으로 현재 저장소의 열린 PR을 조회해줘.
제목과 검토 상태를 정리해줘.
```

## 다른 확장 기능

- [IntelliJ 런타임 검증](../../IntelliJ/intellij_01_runtime_debug_guide.md): 디버거의 실행 상태로 변경 결과를 확인해요.
- [Hook](https://learn.chatgpt.com/docs/hooks): 도구 실행 전후에 검사나 스크립트를 실행해요.
- [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules): 명령 실행의 허용·확인·차단 기준을 정해요.
- [브라우저 연결](https://learn.chatgpt.com/docs/chrome-extension): 기존 브라우저의 탭을 작업에 연결해요.
- [WebMCP](https://learn.chatgpt.com/docs/webmcp): 웹사이트가 제공하는 도구를 사용해요.
- [App Server](https://learn.chatgpt.com/docs/app-server): 외부 프로그램에서 Codex 세션을 제어해요.

## 공식 문서

- [Skill 작성](https://learn.chatgpt.com/docs/build-skills): 직접 만드는 절차와 파일 형식을 확인해요.
- [MCP 연결](https://learn.chatgpt.com/docs/extend/mcp?surface=cli): 서버 등록과 인증 방법을 확인해요.
- [Plugin 사용](https://learn.chatgpt.com/docs/plugins): 설치와 서비스 연결 방법을 확인해요.
