# Antigravity 확장 기능

필요한 책임에 맞는 확장 수단을 선택해요.

## 선택표

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트에서 계속 적용할 작업 기준 | `GEMINI.md` 또는 `AGENTS.md` |
| 특정 디렉터리와 모듈에만 적용할 기준 | 하위 디렉터리 `GEMINI.md` / `AGENTS.md` |
| 파일 경로와 영역별 세부 규칙 | `.agents/rules/*.md` |
| 반복 가능한 작업 절차, 전문 지식과 자원 | Skill |
| 분리 가능한 작업의 별도 컨텍스트 | Subagent |
| 외부 API, 서비스와 실시간 데이터 | MCP |
| 도구 실행 전후의 결정적 자동 검사 | Hook |
| 여러 구성요소를 묶어 배포하는 단위 | Plugin |

## Rules

Rules는 프로젝트와 디렉터리에서 작업할 때 에이전트가 지켜야 할 원칙과 제약을 명시해요.

- 파일 위치: 저장소 루트 및 하위 디렉터리의 `GEMINI.md`, `AGENTS.md`, `.agents/rules/*.md`
- 자동 탐색: 현재 작업 디렉터리(CWD)에서 저장소 루트(`.git`)까지 거슬러 올라가며 모든 지침 파일을 자동으로 찾아 적용해요.
- 크기 제한: 파일당 24KB 이하(권장 200줄 이하)로 유지해요.
- 컨텍스트 예산 관리: 전체 Rules는 20,000 토큰 예산을 공유해요. 규칙 파일이 예산을 넘으면 에이전트에게 전체 텍스트 대신 파일 경로 포인터로 축소 제공되어 컨텍스트 폭발을 방지해요.
- 자동 중복 제거: 하위 폴더나 중첩 경로에서 동일 파일이 여러 번 발견되더라도 세션 턴당 단 한 번만 주입돼요.
- 포맷 호환: Antigravity는 Google 표준인 `GEMINI.md`와 업계 표준인 `AGENTS.md`를 모두 동등하게 인식하므로 기존 프로젝트 형식을 그대로 활용할 수 있어요.

## Skill

Skill은 반복 가능한 작업의 입력, 절차, 결과와 필요한 자원을 묶어요.

- 개인 위치: `~/.gemini/config/skills/<name>/SKILL.md` (홈 디렉터리의 `~/.agents`는 전역으로 읽지 않으므로 심볼릭 링크로 연결해요)
- 프로젝트 위치: `<repo>/.agents/skills/<name>/SKILL.md`
- 직접 호출: `/skill-name` 또는 `/ct-*`
- 점진적 공개(Progressive Disclosure): 평소에는 이름과 설명(`description`)만 시스템에 주입되고, 호출 시에만 `SKILL.md` 본문과 관련 리소스를 읽어 토큰을 절약해요.
- 부속 디렉터리: 복잡한 문서는 `references/`, 실행 유틸리티는 `scripts/`, 예제는 `examples/`에 분리해 보관해요.

현재 사용자 Skill과 호출 예제는 [Skill 안내](./skills.md)에서 확인해요.

## Subagent

서로 독립된 조사, 검증이나 대규모 구현을 별도 컨텍스트로 나눌 때 사용해요.

- 메인 대화의 컨텍스트 윈도우를 소모하지 않고 독립된 서브 프로세스(Subagent Trajectory)로 작업을 위임해요.
- 역할별로 특화된 도구 권한(읽기 전용, 편집 가능 등)과 모델을 지정해 병렬 탐색이나 백엔드/프론트엔드 모듈별 동시 구현을 진행할 수 있어요.
- 서브에이전트가 백그라운드 작업을 마치면 시스템이 자동으로 상위 에이전트를 깨우므로 별도의 대기 루프가 필요하지 않아요.

## Plugin과 플랫폼 호환

Skills, Rules, Hooks, MCP Server 설정을 하나의 배포 단위로 패키징할 때 사용해요.

- 디렉터리 위치: `<repo>/.agents/plugins/<name>/`
- 필수 매니페스트: `plugin.json`
- CLI 관리 명령:
  ```bash
  # 설치된 플러그인 목록 확인
  agy plugin list

  # 플러그인 설치 및 유효성 검증
  agy plugin install <target>
  agy plugin validate [path]
  ```
- **타 플랫폼 플러그인 가져오기(Import)**: Claude Code나 Gemini에서 사용하던 기존 플러그인을 바로 가져오는 명령을 지원해요:
  ```bash
  agy plugin import claude
  agy plugin import gemini
  ```

## Hook

에이전트의 생명주기 이벤트(도구 실행 전후, 세션 시작 등)에 연결해 스크립트를 자동으로 실행해요.

- 설정 파일: `<repo>/.agents/hooks.json`
- 파일 편집 전 자동 백업, 코드 수정 직후 자동 린트 검사, 금지된 명령어 필터링 등 결정론적 검증을 안전하게 강제할 때 유용해요.

## MCP

외부 시스템의 최신 데이터를 읽거나 외부 도구를 연결할 때 사용해요.

- 프로젝트 설정: `<repo>/.agents/mcp_config.json`
- 개인 설정: `~/.gemini/config/mcp_config.json`
- CLI 관리:
  ```bash
  # MCP 서버 등록
  agy mcp add <name> -- <command> [args...]

  # 목록 조회 및 상태 변경
  agy mcp list
  agy mcp enable <name>
  agy mcp disable <name>
  ```

IntelliJ IDEA MCP나 데이터베이스 MCP를 붙이면 디버거 세션 상태 조회 및 실시간 스키마 분석 도구가 에이전트에 자연스럽게 노출돼요.

## 공식 문서

- [Antigravity Customization System](https://antigravity.google/docs)
- [Skills Guide](https://antigravity.google/docs/skills)
- [Rules & Workflows](https://antigravity.google/docs/rules-workflows)
- [Plugins Guide](https://antigravity.google/docs/plugins)
- [Hooks Guide](https://antigravity.google/docs/hooks)
- [MCP Guide](https://antigravity.google/docs/mcp)
