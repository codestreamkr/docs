# Antigravity 환경 설정

Antigravity CLI의 설치와 인증을 마친 뒤, Skill·프로젝트 지침·권한·설정을 각각의 책임에 맞는 위치에 둬요.

## 설치와 첫 실행

공식 설치 절차로 CLI를 설치한 뒤 프로젝트 루트에서 대화형 세션을 열어요.  
처음 실행할 때 화면의 안내에 따라 로그인과 인증을 마쳐요.

```bash
agy
```

설치와 현재 버전·옵션은 다음 명령으로 확인해요.

```bash
agy --help
agy changelog
```

세션을 연 뒤 입력창에서 `/help`와 `/skills`를 실행해 현재 명령과 Skill을 확인해요.

## 인증

인증 상태와 제공 모델은 계정·요금제에 따라 달라져요.  
세션에서 로그인 안내가 나오면 완료한 뒤, `/usage`로 모델 사용량을 확인해요.  
계정을 연결 해제해야 하면 입력창의 `/logout`을 사용해요.

## 사용자 Skill

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 사용해요.  
CLI는 작업 공간과 전역 위치에서 Skill을 찾아 입력창의 슬래시 명령으로 제공해요.

| 범위 | 위치 |
| --- | --- |
| 현재 저장소 | `<workspace-root>/.agents/skills/<skill-folder>/` |
| 개인 전역 | `~/.gemini/antigravity-cli/skills/<skill-folder>/` |
| 설치된 Plugin | `~/.gemini/antigravity-cli/plugins/<name>/skills/` |

`ai-comm-init`가 `~/.agents/skills/`에 Skill을 설치했다면 CLI 전역 위치로 복사하거나 심볼릭 링크로 연결한 뒤 새 세션에서 `/skills`로 확인해요.  
프로젝트 팀과 공유할 Skill은 저장소의 `.agents/skills/`에 둬요.

```text
<workspace-root>/.agents/skills/
├── ct-analyze/
├── ct-apply/
├── ct-docs-md-format/
├── ct-docs-weekly-report/
├── ct-plan/
├── ct-verify/
├── ct-wiki-api/
└── ct-wiki-ops/
```

## 프로젝트 지침

프로젝트에 계속 적용할 작업 기준과 정본 위치는 `AGENTS.md` 또는 `GEMINI.md`에 적어요.  
세부 규칙을 분리해야 하면 `.agents/rules/`의 Markdown 파일을 사용해요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

규칙에는 실제로 계속 적용할 짧은 기준만 남겨요.  
반복 절차와 전문 지식은 지침 파일 대신 Skill로 분리해요.

## 권한과 실행 범위

기본 권한 정책은 입력창의 `/permissions`에서 확인하고 작업 성격에 맞게 설정해요.  
제한된 터미널 환경이 필요하면 세션을 시작할 때 `--sandbox`를 사용해요.

```bash
agy --sandbox
```

모든 도구 권한을 묻지 않고 승인하는 `--dangerously-skip-permissions`는 격리된 환경에서만 사용해요.  
자세한 적용 범위는 [샌드박스와 권한](./reference/01-sandbox-and-permissions.md)을 봐요.

## 모델과 실행 설정

세션에서 모델은 `/model`로 고르고, 시작 전에 정해야 하면 `--model <model>`을 사용해요.  
복잡한 계획은 `--mode plan`, 편집을 허용하는 세션은 `--mode accept-edits`로 시작할 수 있어요.  
추론 수준은 `--effort low|medium|high`로 지정해요.

```bash
agy --mode plan --effort high
```

사용자 CLI 설정은 `~/.gemini/antigravity-cli/settings.json`에서 관리해요.  
프로젝트의 코드 규칙과 문서 책임은 Settings가 아니라 `AGENTS.md` 또는 `GEMINI.md`에 둬요.  
비밀값은 설정 파일에 직접 적지 않고 환경 변수나 연결된 서비스의 인증 수단을 사용해요.

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `<workspace-root>/.agents/skills/` | 저장소에서 공유하는 Skill |
| `~/.gemini/antigravity-cli/skills/` | 여러 프로젝트에서 쓰는 CLI 전역 Skill |
| `AGENTS.md` 또는 `GEMINI.md` | 프로젝트 작업 기준과 정본 안내 |
| `.agents/rules/` | 세부 작업 규칙 |
| `.agents/hooks.json` | 도구 실행 전후 Hook |
| `.agents/mcp_config.json` | 저장소 공유 MCP 서버 |
| `~/.gemini/config/mcp_config.json` | 개인 전역 MCP 서버 |
| `~/.gemini/antigravity-cli/settings.json` | CLI 실행 설정과 전역 Hook |

Plugin은 Skill·Rule·Subagent·Hook·MCP 정의를 함께 배포할 때 사용해요.  
Plugin의 구성과 관리 방법은 [확장 기능](./extensions.md)을 봐요.

## 진단과 적용 확인

새 세션을 열어 다음 항목을 확인해요.

1. `/skills`에 필요한 사용자 Skill이 보여요.
2. `/permissions`에 현재 권한 정책이 보여요.
3. `/hooks`에 필요한 Hook이 로드돼요.
4. `/mcp` 또는 `agy mcp list`에 MCP 서버 상태가 보여요.
5. `agy --help`의 옵션과 이 문서의 터미널 명령이 일치해요.

## 확인 기준

2026-10-01에 설치된 Antigravity CLI `1.2.9`의 `agy --help`로 CLI 옵션과 서브명령을 확인했어요.  
인증 흐름, 계정 기능과 화면 명령은 버전·요금제에 따라 달라질 수 있으므로 현재 세션의 `/help`와 공식 문서를 함께 확인해요.

## 공식 문서

- [Antigravity CLI 설치와 인증](https://antigravity.google/docs/cli/install/)
- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
- [Antigravity Agent Skills](https://antigravity.google/docs/skills)
- [Antigravity Rules](https://antigravity.google/docs/rules)
