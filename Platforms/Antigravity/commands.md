# Antigravity 명령 확인

Antigravity CLI 명령은 버전과 로그인한 요금제에 따라 달라질 수 있어요.  
일상 작업은 열린 세션의 입력창에서 하고, 터미널 명령은 세션 시작·재개·자동화와 관리에 사용해요.

## 입력창에서 사용

입력창에 `/`를 입력하면 현재 세션에서 사용할 수 있는 명령과 Skill을 선택할 수 있어요.

### 작업 준비와 설정

| 명령 | 용도 |
| --- | --- |
| `/help` | 명령과 단축키 도움말 확인 |
| `/skills` | 로드된 사용자 Skill 확인 |
| `/plan` | 복잡한 작업의 다중 턴 계획 생성 |
| `/model` | 세션 모델 선택 |
| `/permissions` | 도구 권한 설정 |
| `/mcp` | MCP 서버 관리 |
| `/hooks` | 로드된 Hook 확인 |

### 변경 확인과 검토

| 명령 | 용도 |
| --- | --- |
| `/artifact` | 아티팩트 검토 패널 열기 |
| `/diff` | 변경·턴·커밋 검토 패널 열기 |

확인한 문제의 수정과 재검증은 [작업 흐름](./workflows.md#변경-확인과-검토)에 따라 요청해요.

### 세션과 병렬 작업

| 명령 | 용도 |
| --- | --- |
| `/resume` | 이전 대화 선택·재개 |
| `/clear`, `/new` | 현재 대화 맥락 초기화 |
| `/boost <작업>` | 여러 에이전트의 심층 추론 요청 |
| `/teamwork-preview <작업>` | 협업 에이전트 팀 시작 |
| `/agents` | 에이전트 전환과 백그라운드 Subagent 확인 |
| `/exit`, `/quit` | CLI 종료 |

사용자 Skill은 `/ct-plan`처럼 이름 앞에 `/`를 붙여 호출해요.  
Git 명령을 입력창 명령처럼 쓰지 말고, Git 상태·차이·수정 의도를 자연어로 요청하거나 터미널에서 `git` 명령을 실행해요.

## 터미널에서 실행

프로젝트 루트의 터미널에서 아래 명령으로 세션을 시작하거나 관리해요.

```bash
# 대화형 세션 시작
agy

# 첫 요청과 함께 대화형 세션 시작
agy -i "주문 취소 기능 구조를 분석해줘"

# 최근 대화 이어가기
agy -c

# 특정 대화 다시 열기
agy --conversation <conversation-id>

# 비대화형 단일 요청 실행
agy -p "OrderService.java 요약해줘"

# 설치된 옵션과 서브명령 확인
agy --help
agy mcp --help
agy plugin --help
```

| 옵션 또는 서브명령 | 용도 |
| --- | --- |
| `--mode accept-edits\|plan` | 시작할 세션의 실행 모드를 지정해요 |
| `--effort low\|medium\|high` | 세션 추론 수준을 지정해요 |
| `--model <model>` | 세션 모델을 지정해요 |
| `--sandbox` | 터미널 제한이 있는 샌드박스에서 실행해요 |
| `--add-dir <path>` | 작업 공간에 추가 디렉터리를 넣어요 |
| `--dangerously-skip-permissions` | 모든 도구 권한 요청을 자동 승인해요 |
| `agy models` | 지원 모델을 확인해요 |
| `agy agent` | 사용할 수 있는 에이전트를 확인해요 |
| `agy mcp list` | MCP 서버 상태를 확인해요 |
| `agy plugin list` | 설치된 Plugin을 확인해요 |
| `agy update` | CLI를 업데이트해요 |
| `agy changelog` | 변경 사항을 확인해요 |

`--dangerously-skip-permissions`는 격리된 환경에서만 사용해요.  
권한과 샌드박스의 적용 범위는 [샌드박스와 권한](./reference/01-sandbox-and-permissions.md)에서 확인해요.

## 확인 기준

1. 입력창에서 `/` 또는 `/help`로 현재 명령을 확인해요.
2. `/skills`로 사용할 수 있는 사용자 Skill을 확인해요.
3. 터미널 옵션과 서브명령은 `agy --help`와 `agy <subcommand> --help`로 확인해요.
4. 현재 설치 버전에 없는 명령은 사용하지 않아요.

## 공식 문서

- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
- [Antigravity CLI Features](https://antigravity.google/docs/cli/features)
