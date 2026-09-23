# Antigravity 명령 확인

Antigravity 명령은 제품 버전과 실행 환경에 따라 달라질 수 있어요.  
전체 목록을 문서에 복제하지 않고 현재 입력창과 공식 문서를 기준으로 확인해요.

## 현재 명령 찾기

입력창에 `/`를 입력해 현재 환경에서 제공하는 명령과 Skill을 확인해요.

작업을 시작하고 세션을 관리할 때 자주 확인하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/help` | 현재 사용할 수 있는 명령 확인 |
| `/skills` | 현재 사용할 수 있는 Skill 목록 확인 |
| `/diff` | 현재 코드 변경 내용 확인 및 `c` 키로 인라인 피드백 작성 |
| `/model` | 세션에서 사용할 모델 선택 |
| `/clear` | 대화 컨텍스트를 비우고 새 대화 시작 |
| `/exit` 또는 `/quit` | CLI 세션 종료 (`Ctrl+D Ctrl+D`) |

Antigravity 특화 자율 워크플로 슬래시 명령:

| 명령 | 용도 |
| --- | --- |
| `/goal` | 목표를 완결할 때까지 멈추지 않는 자율 실행 루프 시작 |
| `/plan` | 복잡한 작업의 다단계 구현 계획 및 아티팩트 수립 |
| `/grill-me` | 대화형 인터뷰로 기획 누락과 설계 의사결정 사전 조율 |
| `/browser` | 웹 탐색, API 포털 조회 및 웹 UI 상호작용 |
| `/schedule` | 백그라운드 타이머나 반복 크론 알림 예약 |
| `/teamwork-preview` | 복수 에이전트 간 협동 및 병렬 점검 실행 |
| `/boost` | 다각도 검토와 심층 추론을 통한 고난도 코딩·조사 |
| `/learn` | 세션에서 교정한 작업 노하우와 설정을 향후 세션으로 영속화 |

사용자 Skill은 `/ct-*`로 호출해요.  
명령이 보이지 않으면 현재 설치 버전과 실행 환경에서 제공되는 목록을 따라요.

## TUI 실행 모드 전환

Antigravity CLI 세션 중에 `Shift+Tab`을 누르면 실행 모드를 즉시 순환 변경할 수 있어요:

- **Auto mode**: 안전한 읽기/편집과 기본 명령어 실행이 자동 승인되어 빠른 반복 작업이 가능해요.
- **Interactive mode**: 파일 수정이나 터미널 실행 전 매번 사용자 승인을 확인해요.
- **Plan mode**: 코드를 직접 고치지 않고 설계 검토와 계획 아티팩트만 작성해요.

## CLI에서 확인

설치된 CLI의 기본 명령과 서브커맨드를 확인해요.

```bash
agy --help
agy <subcommand> --help
```

### 실행 옵션 플래그

| 플래그 | 용도 |
| --- | --- |
| `agy` | 대화형 세션 시작 |
| `agy -i "요청"` | 첫 프롬프트와 함께 대화형 세션 시작 |
| `agy -p "요청"` | 비대화형 단일 프롬프트 실행 및 결과 출력 |
| `agy -c` | 최근 대화 세션 이어하기 |
| `agy --conversation <id>` | 특정 대화 ID로 복귀 |
| `agy --effort <low\|medium\|high>` | 모델의 심층 추론(Reasoning) 강도 제어 |
| `agy --mode <accept-edits\|plan>` | 초기 실행 모드 지정 |
| `agy --sandbox` | 터미널 격리 샌드박스 활성화 |
| `agy --dangerously-skip-permissions` | 모든 도구 실행 권한 자동 승인 |
| `agy --add-dir <path>` | 추가 작업 디렉터리를 워크스페이스에 마운트 |

### 주요 서브커맨드

| 명령 | 용도 |
| --- | --- |
| `agy models` | 지원 모델 목록 확인 |
| `agy agent` | 사용 가능한 에이전트 목록 확인 |
| `agy mcp list` | 등록된 MCP 서버 목록 확인 |
| `agy mcp add <name> -- <cmd>` | 새 MCP 서버 등록 |
| `agy plugin list` | 설치된 플러그인 목록 확인 |
| `agy plugin import <source>` | claude 또는 gemini 플러그인 가져오기 |
| `agy plugin validate [path]` | 플러그인 구조 검증 |
| `agy update` | CLI 최신 버전 업데이트 |
| `agy changelog` | 릴리즈 노트와 변경 사항 확인 |

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령과 Skill을 찾아요.
2. CLI 옵션은 설치된 `agy --help`에서 확인해요.
3. 세부 동작과 최신 기능은 Antigravity 공식 문서에서 확인해요.

## 공식 문서

- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
- [CLI Features](https://antigravity.google/docs/cli/features)
- [CLI Best Practices](https://antigravity.google/docs/cli/best-practices)
