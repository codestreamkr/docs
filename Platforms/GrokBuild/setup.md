# Grok Build 환경 설정

설치부터 로그인, 프로젝트 지침 확인까지 순서대로 진행해요.

## 1. 설치와 첫 실행

사용하는 운영체제의 터미널에서 설치하세요.

macOS·Linux·WSL:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

프로젝트 폴더에서 실행하세요.

```bash
cd /path/to/project
grok
```

## 2. 인증

첫 실행 안내에 따라 브라우저에서 로그인하세요.  
다시 로그인하려면 CLI 채팅창에 입력하세요.

```text
/login
```

브라우저를 열 수 없는 환경은 터미널에서 기기 인증을 시작하세요.

```bash
grok login --device-auth
```

자동화에서는 `XAI_API_KEY` 환경 변수로 인증할 수도 있어요.

## 3. 모델과 권한 선택

CLI 채팅창에서 모델과 추론 수준을 선택하세요.

```text
/model
/effort
```

기본 권한은 도구 실행 전에 승인을 요청해요.  
일반 작업의 자동 승인이 필요하면 Auto 모드를 선택하세요.

```text
/auto
```

Shift+Tab으로 모드를 바꿀 수 있어요.  
모드별 차이와 Sandbox는 [권한과 Plan 모드](./reference/01-permissions-and-plan-mode.md)를 확인하세요.

## 4. 기본 설정 저장

CLI 채팅창의 `/settings`에서 개인 기본값을 바꾸세요.  
설정 파일은 `~/.grok/config.toml`이에요.

```text
/settings
```

파일로 권한 기본값을 저장하려면 다음처럼 작성하세요.

```toml
[ui]
permission_mode = "ask"
```

팀 공유 `.grok/config.toml`에는 MCP, Plugin과 권한 규칙을 저장해요.

## 5. 프로젝트 지침

개인 공통 지침은 `~/.grok/AGENTS.md`, 프로젝트 지침은 루트의 `AGENTS.md`에 적으세요.  
하위 폴더의 지침은 해당 경로에 적용하며, 충돌하면 상위 지침보다 우선해요.

```markdown
# 프로젝트 작업 기준

- 먼저 README.md에서 실행 방법을 확인한다.
- 요청한 범위만 수정한다.
- 변경 후 관련 테스트를 실행한다.
- 실행하지 못한 검증을 보고한다.
```

## 6. 사용자 Skill

[ai-comm-init](https://github.com/codestreamkr/ai-comm-init)의 설치 절차를 따른 뒤 Grok Build를 다시 실행하세요.  
CLI 채팅창에서 설치한 Skill을 확인하세요.

```text
/skills
```

개인 Skill은 `~/.grok/skills/`, 프로젝트 Skill은 `.grok/skills/`에 두세요.  
각 Skill 폴더에는 `SKILL.md`가 있어야 해요.  
공유 개인 경로 `~/.agents/skills/`와 Claude 호환 Skill도 읽어요.

목록에 없으면 경로와 파일명을 확인하고 다시 실행하세요.  
호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## 7. 버전 확인과 업데이트

터미널에서 버전을 확인하고 업데이트하세요.

```bash
grok --version
grok update
```

WinGet 설치는 출력된 `winget upgrade` 명령을 따르세요.  
채널 전환과 버전 고정은 [CLI Reference](https://docs.x.ai/build/cli/reference)를 확인하세요.

## 8. 적용 확인과 진단

터미널에서 적용된 지침, Skill과 외부 연결을 확인하세요.

```bash
grok inspect
```

설정이나 터미널 문제가 있으면 진단하세요.

```bash
grok doctor
```

## 공식 문서

- [설치와 첫 실행](https://docs.x.ai/build/overview)
- [로그인과 CLI 옵션](https://docs.x.ai/build/cli/reference)
- [기본 설정](https://docs.x.ai/build/settings)
- [프로젝트 지침](https://docs.x.ai/build/features/project-rules)
- [Skill과 호환 설정](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [권한](https://docs.x.ai/build/features/permissions)
