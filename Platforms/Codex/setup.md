# Codex 환경 설정

설치부터 로그인, 첫 요청까지 순서대로 진행해요.

## 1. 설치와 첫 실행

사용하는 운영체제의 터미널에서 설치하세요.

macOS·Linux:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Windows PowerShell:

```powershell
irm https://chatgpt.com/codex/install.ps1 | iex
```

프로젝트 폴더로 이동한 뒤 Codex를 실행하세요.

```bash
cd /path/to/project
codex
```

## 2. 인증

첫 실행의 안내에 따라 로그인하세요.  
이미 실행했다면 터미널에서 로그인할 수 있어요.

```bash
codex login
```

## 3. 모델과 권한 선택

Codex 채팅창에서 모델을 선택하세요.

```text
/model
```

파일 수정과 명령 실행에 필요한 권한을 선택하세요.

```text
/permissions
```

## 4. 기본 설정 저장

개인 기본값은 `~/.codex/config.toml`에 저장하세요.  
프로젝트에서 공유할 설정은 `.codex/config.toml`에 저장하세요.

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
```

새 세션에서 `/status`로 적용 결과를 확인하세요.

## 5. 프로젝트 지침

개인 공통 지침은 `~/.codex/AGENTS.md`에 적으세요.  
프로젝트 지침은 루트의 `AGENTS.md`에 적으세요.  
하위 폴더의 `AGENTS.md`는 해당 경로의 지침을 추가하거나 앞선 지침을 재정의해요.

```markdown
# 프로젝트 작업 기준

- 먼저 README.md에서 실행 방법을 확인한다.
- 요청한 범위만 수정한다.
- 변경 후 관련 테스트를 실행한다.
- 실행하지 못한 검증을 보고한다.
```

지침 적용 여부는 [가이드의 첫 요청](./README.md#바로-시작)으로 확인하세요.

## 6. 사용자 Skill

[ai-comm-init](https://github.com/codestreamkr/ai-comm-init)의 설치 절차를 따른 뒤 Codex를 다시 실행하세요.  
채팅창에서 설치한 Skill을 확인하세요.

```text
/skills
```

개인 Skill은 `~/.agents/skills/`, 프로젝트 Skill은 `.agents/skills/`에 두세요.  
각 Skill 폴더에 `SKILL.md`가 있어야 해요.  
목록에 보이지 않으면 경로와 파일명을 확인한 뒤 Codex를 다시 실행하세요.

호출 방법과 작업별 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## 7. 버전 확인과 업데이트

터미널에서 설치 버전을 확인하세요.

```bash
codex --version
```

최신 버전으로 업데이트한 뒤 Codex를 다시 실행하세요.

```bash
codex update
```

## 다른 환경에서 시작하기

- [설정 가져오기](https://learn.chatgpt.com/docs/import): 다른 에이전트의 설정과 최근 대화를 가져와요.
- [Linux 앱](https://learn.chatgpt.com/docs/linux/linux-app): Linux 데스크톱 앱을 설치해요.

## 공식 문서

- [CLI 설치와 실행](https://learn.chatgpt.com/docs/codex/cli)
- [기본 설정](https://learn.chatgpt.com/docs/config-file/config-basic)
- [Skill 설치 위치](https://learn.chatgpt.com/docs/build-skills)
- [인증](https://learn.chatgpt.com/docs/auth)
- [모델 선택](https://learn.chatgpt.com/docs/models)
- [권한 설정](https://learn.chatgpt.com/docs/agent-approvals-security)
- [프로젝트 지침](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
