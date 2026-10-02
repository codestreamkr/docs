# Pi 환경 설정

설치와 첫 세션, 인증, 사용자 Skill, 프로젝트 지침과 실행 조건을 순서대로 설정해요.  
평소 작업은 프로젝트 루트에서 `pi`로 세션을 연 뒤 입력창에서 이어서 진행해요.

## 설치와 첫 실행

macOS와 Linux에서는 설치 스크립트를 실행해요.

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

Windows를 포함해 npm으로 설치할 수도 있어요.  
Node.js `22.19` 이상이 필요해요.

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
pi --version
```

프로젝트 루트의 터미널에서 Pi 세션을 열어요.

```bash
pi
```

첫 화면에서 로드한 지침 파일과 Skill을 확인한 뒤 입력창에 작업을 요청해요.

```text
현재 작업 루트와 적용된 지침을 확인하고,
프로젝트의 빌드·테스트 방법을 근거 파일과 함께 알려줘.
파일은 수정하지 마.
```

`pi "요청"`, `pi -c`, `--print`, `--mode json`, `--mode rpc`는 시작·재개·자동화에 쓰는 터미널 옵션이에요.  
일상 작업에서는 열린 세션의 입력창을 사용해요.

## 인증

Pi 입력창에서 `/login`으로 구독 로그인이나 API 키 저장을 선택해요.  
`/logout`으로 저장한 인증을 제거해요.

CI처럼 자격증명을 파일로 남기면 안 되는 환경에서는 환경 변수를 설정한 뒤 Pi를 실행해요.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
pi
```

`auth.json`에 저장된 값, `models.json`의 `apiKey`, 환경 변수와 `--api-key`의 우선순위는 제공자 설정에 따라 확인해요.  
자격증명 확인과 내보내기는 터미널에서 실행해요.

```bash
pi auth check --provider anthropic
pi auth print-api-key --provider anthropic
```

`print-bearer-token`은 OAuth 자격증명을 갱신해 외부 도구에 전달할 때 사용해요.

## 사용자 Skill

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
Pi는 `~/.agents/skills/`와 프로젝트 루트까지의 `.agents/skills/`를 자동으로 찾아요.

```text
~/.agents/skills/
├── ct-analyze/
├── ct-apply/
├── ct-docs-md-format/
├── ct-docs-weekly-report/
├── ct-plan/
├── ct-verify/
├── ct-wiki-api/
└── ct-wiki-ops/
```

시작 화면에서 로드된 Skill을 확인하고 입력창에 `/skill:ct-이름`을 입력해 호출해요.  
추가하거나 수정한 뒤에는 `/reload`를 입력해 다시 읽어요.

다른 도구의 Skill 디렉터리를 함께 사용하려면 사용자 Settings에 경로를 추가해요.

```json
{
  "skills": ["~/.claude/skills", "~/.codex/skills"]
}
```

호출 형식과 Skill별 예제는 [사용자 Skill](./skills.md)을 봐요.

## 프로젝트 지침

계속 적용할 작업 기준과 정본 위치는 프로젝트의 `AGENTS.md`에 적어요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

Pi는 에이전트 디렉터리, 작업 디렉터리와 상위 디렉터리의 `AGENTS.md`와 `CLAUDE.md`를 읽어요.  
같은 디렉터리의 `AGENTS.override.md`는 그 위치의 두 파일을 대신해요.  
지침 파일을 사용하지 않을 때는 `--no-context-files`를 사용해요.

`SYSTEM.md`는 시스템 프롬프트를 바꾸고 `APPEND_SYSTEM.md`는 프롬프트에 내용을 덧붙여요.  
프로젝트 `.pi/` 쪽 파일은 사용자 쪽 파일보다 우선해요.

## 권한과 실행 범위

Pi는 명령 단위가 아니라 도구 단위로 허용 범위를 정해요.

| 목적 | 시작 옵션 | Settings |
| --- | --- | --- |
| 읽기 전용 조사 | `--tools read,grep,find,ls` | `defaultTools` |
| 특정 도구 제외 | `--exclude-tools bash` | `defaultTools` |
| 모든 도구 또는 기본 도구 제외 | `--no-tools`, `--no-builtin-tools` | `defaultTools` |

읽기 전용 모드에서는 `bash`가 없어 Pi가 Git 상태나 테스트를 직접 실행할 수 없어요.  
더 강한 격리가 필요하면 [확장 기능](./extensions.md#격리-실행)을 봐요.

프로젝트의 `.pi/` 자원과 `.agents/skills/`는 신뢰 승인 뒤에만 로드돼요.

| 세션에서 입력 | 시작 옵션 | Settings |
| --- | --- | --- |
| `/trust` | `--approve`, `--no-approve` | `defaultProjectTrust` |

신뢰하면 `.pi/settings.json`, `.pi/extensions/`, `.pi/skills/`, `.pi/prompts/`, `.pi/themes/`, `.pi/SYSTEM.md`, `.pi/APPEND_SYSTEM.md`, `.agents/skills/`를 읽어요.  
`AGENTS.md`와 `CLAUDE.md`는 신뢰와 관계없이 컨텍스트 파일 설정에 따라 읽어요.  
결정은 `~/.pi/agent/trust.json`에 저장돼요.  
낯선 저장소에서는 먼저 `.pi/`와 `.agents/skills/`의 내용을 확인해요.

## 모델과 실행 설정

### 모델과 추론 수준

입력창에서 `/model`로 모델을 선택하고 `/thinking` 또는 `Shift+Tab`으로 추론 수준을 바꿔요.  
`/scoped-models`와 `Ctrl+P`는 세션에서 순환할 모델을 정해요.  
`/llama`는 로컬 llama.cpp 모델을 관리해요.

| 목적 | 시작 옵션 | Settings |
| --- | --- | --- |
| 모델 지정 | `--model openai/gpt-4o` | `defaultModel` |
| 순환 목록 제한 | `--models "anthropic/*,openai/*"` | `enabledModels` |
| 추론 수준 지정 | `--thinking high` | `defaultThinkingLevel` |

thinking은 `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max` 중 지원 모델의 수준만 선택할 수 있어요.  
`modelThinkingLevels`와 `thinkingBudgets`로 모델별 기본 수준과 예산을 정해요.  
모델 카탈로그는 `pi update --models`로 갱신해요.

### 화면, 세션과 맥락

`/settings`으로 화면과 동작 설정을 바꾸고 `/hotkeys`로 단축키를 확인해요.  
`--tui-mode fullscreen` 또는 `tuiMode`는 전사와 입력창의 화면 배치를 정해요.  
`--use-theme` 또는 `theme`은 테마를 정해요.

`/session`으로 토큰과 비용을 확인하고 `/compact`로 현재 대화를 요약해요.  
`compaction.enabled`, `compaction.keepRecentTokens`, `cacheWarming`, `showCacheMissNotices`는 긴 세션의 요약과 캐시 표시를 조정해요.  
세션 분기와 재개는 [작업 흐름](./workflows.md#세션과-맥락-관리)을 봐요.

## 저장 위치

사용자 설정 기준 디렉터리는 `~/.pi/agent/`예요.

| 위치 | 책임 |
| --- | --- |
| `~/.agents/skills/` | 여러 도구에서 공유하는 사용자 Skill |
| `~/.pi/agent/skills/` | Pi 전용 사용자 Skill |
| `<repo>/.agents/skills/`, `<repo>/.pi/skills/` | 프로젝트 Skill |
| `<repo>/AGENTS.md` | 프로젝트 작업 기준과 정본 문서 안내 |
| `~/.pi/agent/AGENTS.md` | 모든 프로젝트에 적용할 개인 지침 |
| `~/.pi/agent/settings.json` | 사용자 실행 설정 |
| `<repo>/.pi/settings.json` | 프로젝트 실행 설정 |
| `~/.pi/agent/auth.json` | 제공자 자격증명 |
| `~/.pi/agent/trust.json` | 디렉터리별 신뢰 결정 |
| `~/.pi/agent/extensions/`, `<repo>/.pi/extensions/` | TypeScript Extension |
| `~/.pi/agent/prompts/`, `<repo>/.pi/prompts/` | Prompt Template |
| `~/.pi/agent/themes/`, `<repo>/.pi/themes/` | Theme |

프로젝트 Settings는 사용자 Settings보다 우선하고 추가 자원 경로 목록은 합쳐져요.  
`sessionDir`, `skills`, `extensions`, `prompts`, `themes`, `enableSkillCommands`, `externalEditor`, `httpProxy`는 자주 쓰는 설정이에요.  
코드 규칙과 문서 책임은 Settings가 아니라 `AGENTS.md`에서 관리해요.

```json
{
  "defaultThinkingLevel": "medium",
  "skills": ["~/.claude/skills"]
}
```

`auth.json`과 API 키는 저장소에 넣지 않아요.

## 진단과 적용 확인

| 확인할 것 | 방법 |
| --- | --- |
| 설치 버전 | `pi --version` |
| 불러온 지침 파일과 Skill | 시작 화면 |
| 현재 제공자와 모델 | `/model`, `pi --list-models` |
| 자격증명 | `pi auth check --provider <이름>` |
| 세션 상태와 비용 | `/session` |
| 설치한 Extension과 Package | `pi list` |
| 프로젝트 신뢰 상태 | `/trust` |
| 현재 옵션 | `pi --help` |

## 확인 기준

설치본 Pi `0.87.1`과 공식 문서를 기준으로 확인했어요.  
옵션과 입력창 명령은 설치 버전과 Extension에 따라 달라지므로 `pi --help`와 현재 `/` 목록을 우선해요.

## 공식 문서

- [Quickstart](https://pi.dev/docs/latest/quickstart)
- [Configuration](https://pi.dev/docs/latest/configuration)
- [Settings](https://pi.dev/docs/latest/settings)
- [Choose a Model](https://pi.dev/docs/latest/models)
- [Keybindings](https://pi.dev/docs/latest/keybindings)
- [Security](https://pi.dev/docs/latest/security)
