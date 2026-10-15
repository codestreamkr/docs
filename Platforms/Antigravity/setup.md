# Antigravity 환경 설정

CLI 설치부터 로그인, 지침과 Skill 설정까지 순서대로 진행해요.

## 1. 설치와 첫 실행

macOS·Linux 터미널에서 설치하세요.

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

Windows PowerShell에서는 다음 명령을 실행하세요.

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
```

프로젝트 폴더에서 실행한 뒤 첫 로그인 안내를 따르세요.

```bash
cd /path/to/project
agy
```

## 2. 모델과 권한 선택

Antigravity CLI 채팅창에서 모델과 도구 권한을 선택하세요.

```text
/model
/permissions
```

추론 수준은 `/effort`, 남은 사용량은 `/usage`에서 확인해요.  
샌드박스가 필요하면 [샌드박스와 권한](./reference/01-sandbox-and-permissions.md)을 확인하세요.

## 3. 기본 설정 저장

개인 기본값은 `~/.gemini/antigravity-cli/settings.json`에 저장하세요.  
다음 예제는 새 세션을 계획 모드로 시작해요.

```json
{
  "agentMode": "plan"
}
```

실행 중인 세션의 설정은 `/config`에서 확인해요.

## 4. 프로젝트 지침

개인 공통 지침은 `~/.gemini/AGENTS.md`에 적으세요.  
프로젝트 지침은 루트의 `AGENTS.md` 또는 `GEMINI.md`에 적으세요.  
하위 폴더 지침은 해당 경로에 적용되며, 충돌하면 더 가까운 지침을 따라요.

```markdown
# 프로젝트 작업 기준

- 먼저 README.md에서 실행 방법을 확인한다.
- 요청한 범위만 수정한다.
- 변경 후 관련 테스트를 실행한다.
- 실행하지 못한 검증을 보고한다.
```

경로별 세부 규칙은 [Rules](./extensions.md#rules)로 분리해요.

## 5. 사용자 Skill

[ai-comm-init](https://github.com/codestreamkr/ai-comm-init)의 설치 절차를 따르세요.  
각 Skill 폴더에는 `SKILL.md`가 있어야 해요.

| 범위 | 위치 |
| --- | --- |
| 프로젝트 | `.agents/skills/` |
| 개인 전역 | `~/.gemini/antigravity-cli/skills/` |

`~/.agents/skills/`에 설치했다면 CLI 전역 위치로 복사하거나 심볼릭 링크로 연결하세요.  
채팅창에서 목록을 다시 읽고 필요한 Skill이 보이는지 확인하세요.

```text
/skills reload
/skills
```

호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## 6. 버전 확인과 업데이트

터미널에서 버전을 확인하고 업데이트하세요.

```bash
agy --version
agy update
```

명령을 찾지 못하면 `agy --help`와 채팅창의 `/help`를 확인하세요.

## 다른 인증 방식

### Gemini API 키 인증

브라우저 로그인 없는 자동화에 사용해요.  
`modelProvider` 설정과 `GEMINI_API_KEY`가 모두 필요해요.  
[API 키 인증](https://antigravity.google/docs/cli/install/#using-a-gemini-api-key)에서 설정과 별도 API 결제를 확인하세요.

### Gemini Enterprise 인증

조직 계정으로 로그인할 때 `Business account`를 선택해요.  
WIF·ADC 인증은 [Enterprise 안내](https://www.antigravity.google/docs/enterprise)를 따라요.

### 모델 선택과 제공 조건

구독과 인증 방식에 따라 제공 모델이 달라져요.  
[모델 안내](https://www.antigravity.google/docs/models/)에서 제공 조건과 종료 예정 모델을 확인하세요.

## 공식 문서

- [설치와 인증](https://antigravity.google/docs/cli/install/)
- [기본 설정](https://antigravity.google/docs/cli/settings)
- [프로젝트·전역 지침](https://antigravity.google/docs/rules)
- [Skill 위치](https://www.antigravity.google/docs/cli/plugins/)
- [문제 해결](https://antigravity.google/docs/cli-troubleshooting)
