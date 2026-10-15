# Claude Code 환경 설정

설치부터 로그인, 지침 설정과 업데이트까지 순서대로 진행해요.

## 1. 설치와 첫 실행

macOS·Linux·WSL의 터미널에서 설치해요.

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows에서는 PowerShell에서 설치해요.

```powershell
irm https://claude.ai/install.ps1 | iex
```

프로젝트 폴더로 이동한 뒤 실행해요.

```bash
cd /path/to/project
claude
```

Windows의 Bash 도구에는 Git for Windows를 사용해요.  
Bash 샌드박스가 필요하면 WSL 2에서 실행해요.

## 2. 인증

첫 실행의 안내에 따라 로그인해요.  
다시 로그인하려면 Claude Code 채팅창에서 실행해요.

```text
/login
```

`/status`로 로그인 상태를 확인해요.  
API 키 인증은 [인증 공식 안내](https://code.claude.com/docs/en/authentication)를 확인해요.

## 3. 모델과 권한 선택

채팅창에서 사용할 모델을 선택해요.

```text
/model
```

도구 실행과 파일 수정의 권한을 확인해요.

```text
/permissions
```

변경 전 계획만 확인하려면 `/plan`을 사용해요.  
추론 수준은 `/effort`, 빠른 응답 모드는 `/fast`에서 선택해요.

## 4. 기본 설정 저장

개인 설정은 `~/.claude/settings.json`에 저장해요.  
팀 공유 설정은 프로젝트의 `.claude/settings.json`에 저장해요.

```json
{
  "model": "sonnet"
}
```

개인 프로젝트 설정은 `.claude/settings.local.json`에 두고 Git에서 제외해요.  
새 세션에서 `/status`로 적용 결과를 확인해요.

## 5. 프로젝트 지침

개인 공통 지침은 `~/.claude/CLAUDE.md`에 적어요.  
프로젝트 지침은 루트의 `CLAUDE.md` 또는 `.claude/CLAUDE.md`에 적어요.  
하위 폴더의 `CLAUDE.md`는 해당 폴더의 파일을 읽을 때 적용해요.

```markdown
# 프로젝트 작업 기준

- 먼저 README.md에서 실행 방법을 확인한다.
- 요청한 범위만 수정한다.
- 변경 후 관련 테스트를 실행한다.
- 실행하지 못한 검증을 보고한다.
```

`CLAUDE.md`가 없는 프로젝트에서는 `AGENTS.md`도 읽어요.  
두 파일을 함께 쓰려면 `CLAUDE.md`에서 가져와요.

```markdown
@AGENTS.md
```

`/context`에서 적용된 지침 파일을 확인해요.  
경로별 규칙은 `.claude/rules/`에 두고, 개인 지침 `CLAUDE.local.md`는 Git에서 제외해요.

## 6. 사용자 Skill

[ai-comm-init](https://github.com/codestreamkr/ai-comm-init)의 설치 절차를 따른 뒤 새 세션을 열어요.  
채팅창에 `/`를 입력해 `ct-*`가 표시되는지 확인해요.

개인 Skill은 `~/.claude/skills/`, 프로젝트 Skill은 `.claude/skills/`에 둬요.  
각 Skill 폴더에 `SKILL.md`가 있어야 해요.  
목록에 없으면 경로와 파일명을 확인한 뒤 Claude Code를 다시 실행해요.

호출 예제는 [사용자 Skill](./skills.md)을 확인해요.

## 7. 버전 확인과 업데이트

터미널에서 버전을 확인해요.

```bash
claude --version
```

위 설치 방법은 자동 업데이트를 지원해요.  
바로 업데이트하려면 다음 명령을 실행하고 세션을 다시 열어요.

```bash
claude update
```

다른 설치 방법의 업데이트는 [설치 공식 안내](https://code.claude.com/docs/en/setup)를 확인해요.

## 8. 문제 진단

실행이나 설정에 문제가 있으면 터미널에서 진단해요.

```bash
claude doctor
```

지원 명령과 옵션은 `claude --help`로 확인해요.

## 공식 문서

- [설치와 업데이트](https://code.claude.com/docs/ko/setup): 다른 설치 방법과 업데이트 채널을 확인해요.
- [인증](https://code.claude.com/docs/en/authentication): 계정과 API 키 인증을 확인해요.
- [모델 설정](https://code.claude.com/docs/en/model-config): 모델 제공 조건과 추론 수준을 확인해요.
- [권한 모드](https://code.claude.com/docs/ko/permission-modes): 권한 모드와 샌드박스를 확인해요.
- [Settings](https://code.claude.com/docs/ko/settings): 설정 항목과 적용 순서를 확인해요.
- [프로젝트 지침](https://code.claude.com/docs/ko/memory): 지침 적용 범위와 가져오기를 확인해요.
- [Skills](https://code.claude.com/docs/ko/skills): 설치 위치와 호출 설정을 확인해요.
