# 01. [초급]Codex요?

## 1. 설치

Codex는 앱, IDE 확장, CLI, 클라우드에서 사용할 수 있다.

CLI 설치는 아래 명령을 사용한다.

```powershell
npm install -g @openai/codex
```

설치 후 현재 프로젝트 폴더에서 실행한다.

```powershell
codex
```

실행하면 ChatGPT 계정 또는 OpenAI API key로 로그인할 수 있다.

## 2. Codex 주요 개념

- 단순 채팅 도구가 아니라, 파일 읽기·수정·명령 실행까지 이어지는 코딩 에이전트다.
- 현재 작업 폴더의 코드, 문서, 설정을 함께 읽고 작업한다.
- CLI와 IDE 확장은 로컬 프로젝트에서 동작한다.
- Codex Cloud는 브라우저에서 GitHub 저장소를 연결해 백그라운드 작업을 맡긴다.
- 프로젝트 규칙은 `AGENTS.md`로 전달한다.
- 설정과 권한은 `~/.codex/config.toml`과 `.codex/config.toml`로 관리한다.
- MCP로 외부 문서, 브라우저, Figma 같은 도구와 연결할 수 있다.
- Skills와 Plugins로 반복 작업 방식을 재사용할 수 있다.
- Memories로 이전 작업의 유용한 맥락을 이어갈 수 있다. 기본값은 꺼져 있다.
- Subagents로 독립 작업을 병렬 처리할 수 있다. 현재 활동 표시는 Codex 앱과 CLI를 기준으로 한다.

> 처음에는 "Codex가 답한다"보다 "Codex가 프로젝트 안에서 일을 한다"로 이해하면 빠르다.

## 공식 문서 기준

- <https://developers.openai.com/codex/quickstart/>
- <https://developers.openai.com/codex/cli/features/>

## 이력관리

- 2026-05-11: 공식 Codex 문서 기준으로 시작 문서 추가
