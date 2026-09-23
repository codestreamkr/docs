# Antigravity 환경 설정

사용자 공통 확장, 프로젝트 작업 기준과 Antigravity 실행 설정을 역할에 맞는 위치에 둬요.

## 설치와 실행

Antigravity CLI(`agy`)로 대화형 세션을 실행해요.

```bash
# 기본 대화형 실행
agy

# 첫 요청과 함께 대화형 세션 시작
agy -i "주문 취소 기능 구조를 분석해줘"

# 비대화형 결과 출력
agy -p "OrderService.java 요약해줘"

# 최근 대화 계속하기
agy -c

# 특정 세션 다시 열기
agy --conversation <conversation-id>

# 샌드박스 실행 (터미널 제약 활성화)
agy --sandbox

# 도구 권한 자동 승인
agy --dangerously-skip-permissions

# 추론 수준 지정 (low | medium | high)
agy --effort high

# 실행 모드 지정 (accept-edits | plan)
agy --mode plan

# 추가 작업 디렉터리 지정
agy --add-dir ../another-repo

# 그 외 관리 명령
agy update
agy changelog
agy --help
```

## 저장 위치

| 위치 | 책임 |
| --- | --- |
| `~/.gemini/config/skills/` | 여러 프로젝트에서 개인적으로 사용하는 Skill |
| `<repo>/.agents/skills/` | 저장소에서 팀과 공유하는 프로젝트 Skill |
| `<repo>/GEMINI.md` 또는 `<repo>/AGENTS.md` | 프로젝트 작업 기준과 정본 문서 안내 |
| 하위 폴더 `GEMINI.md` / `AGENTS.md` | 특정 모듈과 하위 디렉터리에 적용할 기준 |
| `<repo>/.agents/rules/` | 파일 경로와 영역별 규칙 |
| `<repo>/.agents/plugins/` | 기능 묶음 단위 Plugin |
| `<repo>/.agents/hooks.json` | 도구 실행 전후 생명주기 Hook |
| `<repo>/.agents/mcp_config.json` | 저장소 공유 MCP 서버 설정 |
| `~/.gemini/config/mcp_config.json` | 개인 머신 공통 MCP 서버 설정 |
| `~/.gemini/antigravity-cli/settings.json` | 사용자 CLI 실행 설정 |

Antigravity가 제공하는 Built-in 커스텀은 시스템이 관리하며, 사용자 커스텀과 이름이 겹치면 Workspace와 사용자 커스텀이 우선해요.

## 사용자 Skill 확인

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
`ai-comm-init`는 스킬 정본을 `~/.agents/skills/`에 내려받아요.

Antigravity는 홈 디렉터리의 `~/.agents`를 전역으로 자동 탐색하지 않고 `~/.gemini/config/skills/`를 읽어요.  
따라서 여러 프로젝트에서 전역으로 사용하려면 심볼릭 링크를 한 번 연결해 둬요.

```bash
mkdir -p ~/.gemini/config
ln -s ~/.agents/skills ~/.gemini/config/skills
```

특정 프로젝트 저장소에서만 공유할 때는 저장소 루트에 `.agents/skills/`로 배치해요.

```text
~/.gemini/config/skills/ (또는 <repo>/.agents/skills/)
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

새 세션에서 `/` 또는 `/skills`를 입력해 실제 노출 목록을 확인해요.  
Skill을 추가하거나 수정하면 세션을 다시 시작하지 않아도 반영돼요.

## 프로젝트 지침

프로젝트에 계속 적용할 짧은 기준과 정본 위치를 `GEMINI.md` 또는 `AGENTS.md`에 적어요.

```markdown
# 프로젝트 작업 기준

## 작업 시작

- 먼저 `README.md`에서 프로젝트 구조와 실행 방법을 확인한다.
- 변경 대상 영역의 기존 코드와 문서를 확인한다.

## 정본

- API 계약: `docs/api.md`
- 빌드와 테스트: `README.md`
```

작성 기준:

- 파일당 24KB(권장 200줄 이하)를 목표로 하고 매 세션에 필요한 사실만 남겨요.
- 프로젝트 디렉터리 어디서 실행하든 작업 경로에서 저장소 루트(`.git`)까지 거슬러 올라가며 모든 지침을 자동으로 로드해요.
- 저장소 루트 상위의 홈 디렉터리(`~/.agents`)는 탐색하지 않으므로 프로젝트 외부 전역 설정과 스킬은 `~/.gemini/config/`를 사용해요.
- 전체 규칙 예산(20,000 토큰)을 넘으면 본문 대신 파일 경로 참조로 축소되므로 핵심 규칙만 간결하게 유지해요.
- 여러 단계의 복잡한 절차는 지침 파일이 아니라 Skill로 나눠요.
- Antigravity는 `GEMINI.md`와 `AGENTS.md`를 모두 지원하므로 팀 표준에 맞춰 선택해요.

## Settings

`settings.json`에는 Antigravity CLI 실행에 필요한 기본 설정을 둬요.

- 기본 모델과 추론 수준(`effort`)
- 자동 권한 승인 및 샌드박스 정책
- 로깅 및 출력 포맷

우선순위는 CLI 실행 플래그, 프로젝트 설정, 사용자 전역 설정 순이에요.  
프로젝트의 코드 규칙과 문서 책임은 Settings가 아니라 `GEMINI.md` 또는 `AGENTS.md`에서 관리해요.  
비밀값은 설정 파일에 직접 적지 않고 환경 변수를 사용해요.

## 적용 확인

새 세션을 열고 다음 항목을 확인해요.

- 현재 작업 루트
- 로드된 `GEMINI.md` / `AGENTS.md` 지침
- `/` 또는 `/skills`에 표시되는 사용자 Skill
- `agy mcp list`에 표시되는 외부 도구 연결
- 현재 터미널 샌드박스 및 권한 범위

## 확인 기준

2026-09-23에 Antigravity CLI 1.2.9로 확인했어요.  
설치 경로, 명령과 옵션은 버전마다 달라지므로 공식 문서를 함께 봐요.

## 공식 문서

- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
- [Antigravity Customizations](https://antigravity.google/docs)
- [Skills Guide](https://antigravity.google/docs/skills)
- [Rules & Workflows](https://antigravity.google/docs/rules-workflows)
