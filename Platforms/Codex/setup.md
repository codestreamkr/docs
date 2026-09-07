# Codex 환경 설정

사용자 공통 확장, 프로젝트 작업 기준과  
Codex 실행 설정을 역할에 맞는 위치에 둬요.

## 설치와 실행

설치 스크립트로 설치하고 실행해요.

```bash
# 맥/리눅스 설치
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

```ps1
# 윈도우 설치
irm https://chatgpt.com/codex/install.ps1 | iex
```

```bash
# 기본
codex

# 전체권한
codex --dangerously-bypass-approvals-and-sandbox

# 자동승인권한 ( 필요시 승인 요청 )
codex --sandbox workspace-write --ask-for-approval on-request

# 최소화 실행 ( TUI 최소화 )
codex --no-alt-screen

# 그외
codex doctor
codex update
codex --version
```

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `~/.agents/skills/` | 여러 프로젝트에서 개인적으로 사용하는 Skill |
| `<repo>/.agents/skills/` | 저장소에서 공유하는 프로젝트 Skill |
| `<repo>/AGENTS.md` | 프로젝트 작업 기준과<br>정본 문서 안내 |
| 하위 `AGENTS.md` | 특정 폴더와 모듈에 추가로 적용할 기준 |
| `~/.codex/config.toml` | 사용자 Codex 실행 설정과<br>MCP 연결 |
| `<repo>/.codex/config.toml` | 신뢰된 저장소의 프로젝트 실행 설정 |

Codex가 제공하는 시스템 Skill은 제품이 관리하는 위치에 두고  
사용자 Skill과 나눠요.

## 사용자 Skill 확인

CodeStream 사용자 Skill(`ct-*`)은  
[ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
clone과 배치 절차는 해당 저장소를 따라요.

Codex는 `~/.agents/skills/`에서 인식해요.

```text
~/.agents/skills/
├── ct-calltree/
├── ct-external-architect/
├── ct-plan/
├── ct-qa-lucin/
├── ct-query-tuner/
├── ct-script-run/
├── ct-spring/
├── ct-wiki-api/
└── ct-wiki-ops/
```

새 작업에서 `/skills`를 열어 실제 노출 목록을 확인해요.  
사용자 Skill은 자연어 자동 선택이 아니라 `$ct-*`로 직접 호출해요.

## 프로젝트 AGENTS.md

프로젝트에 계속 적용할 짧은 기준과  
정본 위치를 적어요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

프로젝트마다 필요한 내용만 작성해요.  
프레임워크 일반 지식이나 Codex가 현재 환경에서 확인할 수 있는  
기능 목록은 반복하지 않아요.

## Config

`config.toml`에는 Codex 실행에 필요한 설정을 둬요.

- 모델과 reasoning 기본값
- 승인과 샌드박스
- MCP 서버와 인증 환경변수 이름
- UI와 지원되는 기능 설정

프로젝트의 코드 규칙과 문서 책임은 Config가 아니라  
프로젝트 `AGENTS.md`에서 관리해요.  
비밀값은 설정 본문에 적지 않고  
환경변수나 지원되는 인증 저장소를 사용해요.

## 적용 확인

새 작업을 열고 다음 항목을 확인해요.

- 현재 작업 루트
- 적용된 프로젝트 `AGENTS.md`
- `/skills`에 표시되는 사용자 Skill
- `/mcp`에 표시되는 외부 연결
- 현재 승인과 샌드박스 범위

## 공식 문서

- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Config 기본](https://learn.chatgpt.com/docs/config-file/config-basic)
- [Skill 만들기](https://learn.chatgpt.com/docs/build-skills)
