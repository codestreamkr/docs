# Pi 환경 설정

설치와 인증부터 모델, 추론 수준, 도구 범위, 화면, 신뢰까지 Pi의 실행 조건을 여기서 정해요.

Pi는 한 기능을 보통 세 가지로 조작해요.  
세션 중 명령, 실행 옵션, 설정 키예요.  
각 절의 표에서 세 경로를 함께 봐요.

## 설치

```bash
# 맥/리눅스 설치 스크립트
curl -fsSL https://pi.dev/install.sh | sh
```

```bash
# npm ( 윈도우 포함, Node.js 22.19 이상 필요 )
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

```bash
pi --version
pi update
```

`pi update`는 Pi만 올려요.  
Package까지 올리려면 `pi update --all`, Package만은 `pi update --extensions`예요.  
`pi update --models`는 모델 카탈로그만 갱신해요.

## 인증

제공자를 직접 고르는 구조라 인증도 제공자별로 해요.

| 세션 중 | 실행할 때 | 설정으로 |
| --- | --- | --- |
| `/login`, `/logout` | `--api-key` | `~/.pi/agent/auth.json`에 저장 |

`/login`은 구독 로그인이나 API 키 저장 중 하나를 고르게 해요.  
CI처럼 자격증명을 파일로 남기면 안 되는 환경에서는 환경 변수를 써요.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
pi
```

여러 곳에 자격증명이 있으면 `--api-key`, `auth.json`, `models.json`의 `apiKey`, 환경 변수 순으로 적용해요.

실행 전에 확인하거나 외부 도구로 넘길 수 있어요.

```bash
pi auth check --provider anthropic
pi auth print-api-key --provider anthropic
```

`print-bearer-token`은 OAuth 자격증명을 갱신해 내보낼 때 써요.

## 실행

```bash
# 기본 ( 대화형 )
pi

# 첫 요청과 함께 시작
pi "주문 취소 흐름을 먼저 파악해줘"

# 이전 세션 계속하기
pi -c
```

파이프로 연결되면 자동으로 출력 모드가 돼요.  
스크립트에서는 `--mode`로 명시해요.

| 모드 | 출력 | 쓰는 상황 |
| --- | --- | --- |
| 대화형 | 터미널 UI | 사람이 직접 작업할 때 |
| `--print` | 최종 응답 텍스트 | 스크립트가 결과 문자열만 필요할 때 |
| `--mode json` | JSONL 이벤트 | 진행 상황을 구조화해 수집할 때 |
| `--mode rpc` | JSONL 명령과 이벤트 | 다른 프로그램이 Pi를 계속 제어할 때 |

## 모델 연결

| 세션 중 | 실행할 때 | 설정으로 |
| --- | --- | --- |
| `/model`에서 검색해 선택 | `--model openai/gpt-4o` | `defaultModel` |
| `/scoped-models`로 순환 목록을 정해요. `Ctrl+P`는 다음, `Shift+Ctrl+P`는 이전 | `--models "anthropic/*,openai/*"` | `enabledModels` |
| `/llama`로 로컬 모델 관리 | `pi --list-models` | `models.json` |

`/model`에서 `Ctrl+S`를 누르면 그 모델을 새 세션 기본값으로 저장해요.

연결 방법은 필요한 만큼만 고르면 돼요.

| 상황 | 방법 |
| --- | --- |
| 지원하는 구독이나 API 키가 있어요 | `/login`으로 제공자를 붙이고 `/model`로 선택 |
| 사내 게이트웨이나 호환 엔드포인트를 써요 | `models.json`에 추가 |
| 로컬 GGUF 모델을 돌려요 | llama.cpp 라우터를 연결하고 `/llama`로 관리 |
| 인증 방식이 특수해요 | Extension으로 Provider를 직접 등록 |

모델 카탈로그는 `/model`을 열 때 배경에서 갱신돼요.  
바로 새로 받으려면 `pi update --models`를 써요.

## 추론 수준

Claude Code의 effort에 해당하는 게 Pi의 thinking이에요.  
`off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max` 일곱 단계이고, 모델이 지원하는 수준만 목록에 나와요.

| 세션 중 | 실행할 때 | 설정으로 |
| --- | --- | --- |
| `/thinking`에서 선택 | `--thinking high` | `defaultThinkingLevel` |
| `Shift+Tab`으로 순환 | `--model sonnet:high` | `modelThinkingLevels` |
| `Ctrl+T`로 사고 블록 접기 | | `thinkingBudgets` |

`/thinking` 화면에서 `Ctrl+S`를 누르면 시작 수준으로 저장돼요.

```json
{
  "defaultThinkingLevel": "medium",
  "modelThinkingLevels": {
    "anthropic/claude-opus-5": "high"
  }
}
```

- `modelThinkingLevels`는 `provider/modelId`를 정확히 적어요.
- `thinkingBudgets`는 `minimal`부터 `high`까지의 토큰 예산을 직접 정할 때 써요.

긴 분석에는 높게, 반복 수정에는 낮게 두는 편이 비용과 속도에 맞아요.

## 도구 범위

Pi는 명령 단위 허용·차단 규칙이 없어요.  
도구 단위로 제한해요.

| 세션 중 | 실행할 때 | 설정으로 |
| --- | --- | --- |
| 없음 | `--tools read,grep,find,ls` | `defaultTools` |
| | `--exclude-tools bash` | |
| | `--no-tools`, `--no-builtin-tools` | |

파일 내용만 조사할 때는 `--tools read,grep,find,ls`로 읽기 전용으로 돌려요.  
이 제한은 `bash`가 없어 `git diff`를 실행하지 못해요.  
변경 검토는 [작업 흐름](./workflows.md#구현한-변경-검토하기)을 봐요.  
더 강한 격리가 필요하면 [확장 기능](./extensions.md)의 격리 실행을 봐요.

## 화면 모드

| 세션 중 | 실행할 때 | 설정으로 |
| --- | --- | --- |
| `/settings`에서 변경 | `--tui-mode fullscreen` | `tuiMode` |
| `/hotkeys`로 단축키 확인 | `--use-theme <이름>` | `theme`, `outputPad` |

`regular`가 기본이에요. `fullscreen`은 입력창을 고정하고 전사를 따로 스크롤해요.

fullscreen에서 쓰는 조작이에요.

| 키 | 하는 일 |
| --- | --- |
| `Ctrl+Shift+F` | 전사 검색. 윈도우와 WSL은 `Ctrl+F` |
| `Enter`, `Shift+Enter` | 다음·이전 검색 결과 |
| `Ctrl+Shift+Up`, `Ctrl+Shift+Down` | 이전·다음 메시지로 이동 |
| `Ctrl+X` | 선택 영역 또는 마지막 응답 복사 |

## 프로젝트 신뢰

Pi는 작업 폴더가 제공하는 설정과 자원을 신뢰 승인 뒤에만 읽어요.

| 세션 중 | 실행할 때 | 설정으로 |
| --- | --- | --- |
| `/trust`로 결정 저장 | `--approve`, `--no-approve` | `defaultProjectTrust` |

| 구분 | 대상 |
| --- | --- |
| 신뢰 후 로드 | `.pi/settings.json`, `.pi/extensions/`, `.pi/skills/`, `.pi/prompts/`, `.pi/themes/`, `.pi/SYSTEM.md`, `.pi/APPEND_SYSTEM.md`, `.agents/skills/` |
| 신뢰 없이 로드 | 작업 디렉터리와 상위의 `AGENTS.md`, `CLAUDE.md` |

- 결정은 `~/.pi/agent/trust.json`에 남아요.
- `defaultProjectTrust`는 `ask`가 기본이고 `always`, `never`를 쓸 수 있어요. 이 키는 사용자 설정에서만 지정돼요.

낯선 저장소는 신뢰를 주기 전에 `.pi/`와 `.agents/skills/`의 내용을 먼저 봐요.

## 컨텍스트와 비용

| 세션 중 | 실행할 때 | 설정으로 |
| --- | --- | --- |
| `/compact`로 즉시 요약 | 없음 | `compaction.enabled` |
| `/session`으로 토큰과 비용 확인 | | `compaction.keepRecentTokens` |
| | | `cacheWarming`, `showCacheMissNotices` |

- 컨텍스트가 넘치면 Pi가 자동으로 요약해요. `compaction.keepRecentTokens`로 남길 최근 분량을 정해요.
- `cacheWarming`은 기본이 `streaming`이에요. `idle`로 두면 작업 사이에도 캐시를 유지하고, `off`로 끌 수 있어요.
- `showCacheMissNotices`를 켜면 캐시가 깨진 시점이 전사에 표시돼요.

## 저장 위치

사용자 설정 기준 디렉터리는 `~/.pi/agent/`예요.

| 위치 | 책임 |
| --- | --- |
| `~/.agents/skills/` | 여러 도구에서 공유하는 사용자 Skill |
| `~/.pi/agent/skills/` | Pi 전용 사용자 Skill |
| `<repo>/.agents/skills/`, `<repo>/.pi/skills/` | 저장소에서 공유하는 프로젝트 Skill |
| `<repo>/AGENTS.md` | 프로젝트 작업 기준과 정본 문서 안내 |
| `~/.pi/agent/AGENTS.md` | 모든 프로젝트에 적용할 개인 지침 |
| `~/.pi/agent/settings.json` | 사용자 실행 설정 |
| `<repo>/.pi/settings.json` | 프로젝트 실행 설정 |
| `~/.pi/agent/auth.json` | 저장한 제공자 자격증명 |
| `~/.pi/agent/trust.json` | 디렉터리별 신뢰 결정 |
| `~/.pi/agent/extensions/`, `<repo>/.pi/extensions/` | TypeScript Extension |
| `~/.pi/agent/prompts/`, `<repo>/.pi/prompts/` | Prompt Template |
| `~/.pi/agent/themes/`, `<repo>/.pi/themes/` | Theme |

`auth.json`은 저장소에 두지 않아요. API 키도 설정 본문이 아니라 환경 변수로 넘겨요.

## 사용자 Skill 확인

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
clone과 배치 절차는 해당 저장소를 따라요.

Pi는 `~/.agents/skills/`를 별도 설정 없이 찾고, 프로젝트의 `.agents/skills/`는 저장소 루트까지 거슬러 올라가며 찾아요.

```text
~/.agents/skills/
├── ct-code-spring/
├── ct-code-tree/
├── ct-code-tree-test/
├── ct-data-query/
├── ct-docs-impl/
├── ct-docs-md-format/
├── ct-plan-ext/
├── ct-plan-work/
├── ct-qa-flow/
├── ct-run-script/
├── ct-wiki-api/
└── ct-wiki-ops/
```

Pi를 실행하면 시작 화면에 불러온 Skill이 표시돼요.  
세션 중에 Skill을 추가하거나 수정했다면 `/reload`로 다시 읽어요.

다른 도구의 Skill 디렉터리를 함께 쓰려면 Settings에 경로를 추가해요.

```json
{
  "skills": ["~/.claude/skills", "~/.codex/skills"]
}
```

## 프로젝트 지침 파일

프로젝트에 계속 적용할 짧은 기준과 정본 위치를 `AGENTS.md`에 적어요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

적용 기준:

- Pi는 `AGENTS.md`와 `CLAUDE.md`를 모두 읽어요. 대문자 이름 `AGENTS.MD`, `CLAUDE.MD`도 같이 읽어요.
- 에이전트 디렉터리, 작업 디렉터리, 상위 디렉터리에서 찾은 파일을 함께 읽어요.
- `AGENTS.override.md`는 같은 디렉터리의 `AGENTS.md`와 `CLAUDE.md`만 대체해요. 다른 디렉터리의 지침은 그대로 읽어요.
- 지침 파일을 쓰지 않을 때는 `--no-context-files`로 꺼요.

시스템 프롬프트 자체를 바꾸려면 `SYSTEM.md`로 대체하고, 덧붙이려면 `APPEND_SYSTEM.md`를 써요.  
둘 다 프로젝트의 `.pi/` 쪽이 사용자 쪽보다 우선해요.

프레임워크 일반 지식이나 Pi가 현재 환경에서 확인할 수 있는 기능 목록은 반복하지 않아요.

## Settings

프로젝트 설정이 사용자 설정보다 우선하고, 자원 경로 목록은 합쳐져요.

앞 절에서 다룬 키 외에 자주 쓰는 것이에요.

| 키 | 하는 일 |
| --- | --- |
| `sessionDir` | 세션 저장 위치 |
| `skills`, `extensions`, `prompts`, `themes` | 추가로 읽을 자원 경로 |
| `enableSkillCommands` | Skill을 명령 목록에 보일지 여부 |
| `externalEditor` | `Ctrl+G`로 열 편집기 |
| `httpProxy` | Pi가 쓰는 HTTP 프록시 |

```json
{
  "skills": ["~/.claude/skills"],
  "defaultThinkingLevel": "medium"
}
```

프로젝트의 코드 규칙과 문서 책임은 Settings가 아니라 `AGENTS.md`에서 관리해요.

## 적용 확인

| 확인할 것 | 방법 |
| --- | --- |
| 설치 버전 | `pi --version` |
| 불러온 지침 파일과 Skill | 시작 화면 |
| 현재 제공자와 모델 | `/model`, `pi --list-models` |
| 자격증명 | `pi auth check --provider <이름>` |
| 세션 상태와 비용 | `/session` |
| 설치한 Extension과 Package | `pi list` |
| 프로젝트 신뢰 상태 | `/trust` |
| 바뀐 옵션 | `pi --help` |

## 확인 기준

2026-09-23에 공식 문서와 설치본 `0.87.1`로 확인했어요.  
옵션과 명령은 버전마다 달라지므로 현재 환경의 `pi --help`를 우선해요.

## 공식 문서

- [Quickstart](https://pi.dev/docs/latest/quickstart)
- [Configuration](https://pi.dev/docs/latest/configuration)
- [Settings](https://pi.dev/docs/latest/settings)
- [Choose a Model](https://pi.dev/docs/latest/models)
- [Keybindings](https://pi.dev/docs/latest/keybindings)
- [Security](https://pi.dev/docs/latest/security)
