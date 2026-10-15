# Pi 환경 설정

설치와 로그인부터 프로젝트 지침, 도구 범위와 업데이트까지 안내해요.

## 설치와 첫 실행

사용하는 운영체제의 설치 명령을 실행하세요.

macOS·Linux:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

Windows PowerShell:

```powershell
irm https://pi.dev/install.ps1 | iex
```

프로젝트 폴더에서 세션을 여세요.

```bash
cd /path/to/project
pi
```

## 인증

Pi 채팅창에서 제공자를 선택하고 로그인하세요.

```text
/login
```

## 모델과 추론 수준

사용할 모델을 선택하세요.

```text
/model
```

추론 수준을 바꾸려면 다음 명령을 입력하세요.

```text
/thinking
```

## 프로젝트 지침

개인 공통 지침은 `~/.pi/agent/AGENTS.md`, 프로젝트 지침은 루트의 `AGENTS.md`에 적으세요.  
Pi는 상위 폴더의 지침도 함께 읽어요.  
같은 위치의 `AGENTS.override.md`는 `AGENTS.md`와 `CLAUDE.md`를 대신해요.

```markdown
# 프로젝트 작업 기준

- README.md에서 실행 방법을 확인한다.
- 요청한 범위만 수정한다.
- 변경 후 관련 테스트를 실행한다.
- 실행하지 못한 검증을 보고한다.
```

지침과 프로젝트 구조는 [가이드의 첫 요청](./README.md#바로-시작)으로 확인하세요.

## 사용자 Skill

[ai-comm-init](https://github.com/codestreamkr/ai-comm-init)의 설치 절차를 따르세요.  
개인 Skill은 `~/.agents/skills/`, 프로젝트 Skill은 `.agents/skills/`에 두세요.  
각 Skill 폴더에 `SKILL.md`가 있어야 해요.

채팅창에서 지침과 Skill을 다시 읽으세요.

```text
/reload
```

시작 화면의 목록과 `/skill:` 자동완성에서 확인하세요.  
호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.  
`enableSkillCommands`가 꺼져 있으면 목록에는 숨지만 `/skill:이름`으로 직접 호출할 수 있어요.

## 권한과 실행 범위

프로젝트의 `.pi/`와 `.agents/skills/` 내용을 확인한 뒤 신뢰 여부를 정하세요.

```text
/trust
```

신뢰 결정을 바꾸면 Pi를 다시 실행하세요.  
프로젝트 신뢰는 자원 로드를 제어하며 파일 접근을 격리하지 않아요.

읽기 도구만 사용할 때는 터미널에서 범위를 제한하세요.

```bash
pi --tools read,grep,find,ls --no-mcp
```

이 세션에서는 Git 명령과 테스트를 직접 실행할 수 없어요.  
Pi는 도구 호출마다 승인을 묻지 않으므로 격리가 필요하면 [공식 격리 안내](https://pi.dev/docs/latest/containerization)를 따르세요.

## 기본 설정 저장

개인 설정은 `~/.pi/agent/settings.json`, 프로젝트 설정은 `.pi/settings.json`에 저장하세요.

```json
{
  "defaultThinkingLevel": "medium"
}
```

프로젝트 설정은 개인 설정보다 우선해요.  
설정 화면은 `/settings`로 여세요.

## 버전 확인과 업데이트

터미널에서 설치 버전을 확인하세요.

```bash
pi --version
```

공식 설치기로 설치했다면 다음 명령으로 업데이트하세요.

```bash
pi update
```

npm·Nix 설치의 전환과 업데이트는 [공식 설치 안내](https://pi.dev/docs/latest/quickstart)를 확인하세요.

## 문제가 생겼을 때

| 문제 | 확인할 것 |
| --- | --- |
| Skill이 보이지 않아요 | 경로와 `SKILL.md`, `/reload`, 프로젝트 `/trust` |
| 인증이나 모델 오류가 나요 | `/login`, `/model` |
| 설정이 적용되지 않아요 | 프로젝트 신뢰와 `.pi/settings.json` |
| 명령 지원 여부가 달라요 | 터미널의 `pi --help`, 채팅창의 `/` |

## 다른 환경 설정

- [Windows](https://pi.dev/docs/latest/windows): Bash·PowerShell·WSL 실행 조건을 확인해요.
- [설정 검증](https://pi.dev/docs/latest/settings): JSON Schema로 설정 키와 값을 확인해요.
- [터미널 표시](https://pi.dev/docs/latest/environment-variables): 이미지·색상·원격 클립보드를 설정해요.
- [모델 제공자](https://pi.dev/docs/latest/models): API 키, 로컬 모델과 Azure 설정을 확인해요.

## 공식 문서

- [설치와 로그인](https://pi.dev/docs/latest/quickstart)
- [지침과 설정](https://pi.dev/docs/latest/configuration)
- [도구 범위와 신뢰](https://pi.dev/docs/latest/security)
- [Skill 검색 위치](https://pi.dev/docs/latest/skills)
