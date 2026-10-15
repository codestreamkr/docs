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
| `--effort low\|medium\|high\|xhigh\|max` | 모델이 지원하는 추론 수준을 지정해요 |
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

## 추가 기능 활용

### Skill 새로고침

CLI 1.2.4부터 Skill을 추가한 뒤 세션을 재시작하지 않고 다시 찾을 수 있어요.

```text
/skills reload
/skills
```

첫 명령은 Skill과 슬래시 명령 탐색을 다시 실행해요.  
두 번째 명령으로 필요한 Skill이 표시되는지 확인해요.

### 보조 질문

`/btw`로 현재 작업을 중단하지 않고 보조 질문을 요청해요.  
CLI 1.2.3부터 `/copy btw`로 보조 질문의 전체 답변을 복사해요.

```text
/btw 현재 코드에서 멱등성 키는 어디에서 검증해?
/copy btw
```

### 음성 입력

CLI 1.1.21부터 `/voice` 또는 `F5`로 음성 입력을 전환해요.  
`Enter` 또는 `F5`로 녹음을 끝내고 전사된 텍스트를 확인해요.  
텍스트를 확인한 뒤 요청을 전송해요.

```text
/voice
```

음성 입력은 대화형 세션에서만 지원해요.  
Business·Enterprise 계정은 지원하지 않아요.  
인증 권한 오류가 나면 `/logout` 후 다시 로그인해요.

SSH 환경의 마이크 연결은 [공식 음성 입력 문서](https://www.antigravity.google/docs/cli/commands/voice/)에서 확인해요.

### 출력 상세 수준

CLI 1.3.0의 기본 `Verbosity`는 `medium`이에요.  
개별 도구 호출과 사고 과정을 모두 확인하려면 `/config`에서 `Verbosity`를 `high`로 설정해요.

### 비대화형 상태 조회

CLI 1.1.11부터 조회용 슬래시 명령은 에이전트 호출 없이 print 모드에서 결과를 반환해요.  
CLI 1.1.12부터 설정·권한·Hook 조회도 지원해요.

```bash
agy -p "/help"
agy -p "/permissions" --output-format json
agy -p "/hooks" --output-format json
```

이 조회는 모델 사용량을 소비하거나 대화를 만들지 않아요.  
인증을 먼저 준비하고 `/help`가 나열하는 지원 명령만 사용해요.  
대화형 전용 명령은 print 모드에서 거부할 수 있어요.

### 비대화형 자동화

CLI 1.1.15부터 NDJSON 요청을 한 프로세스의 대화에 순서대로 전달할 수 있어요.  
`--input-format stream-json`에는 `--output-format stream-json`이 필요해요.

```bash
printf '%s\n' \
  '{"event":"user","message":{"content":"현재 프로젝트의 테스트 명령을 확인해줘"}}' \
  '{"event":"user","message":{"content":"앞서 확인한 테스트 명령을 요약해줘"}}' \
  | agy --input-format stream-json --output-format stream-json
```

자동화 프로그램은 현재 요청의 `result` 이벤트를 받은 뒤 다음 요청을 전송해요.  
인증은 먼저 마치고, 실행할 도구의 권한을 설정해요.

CLI 1.2.14부터 `--json-schema`의 루트는 `"type": "object"`여야 해요.  
원시 타입 이름, 일반 텍스트와 없는 스키마 파일은 시작 오류로 처리해요.

```bash
agy -p "현재 변경을 한 문장으로 요약해줘" --output-format json \
  --json-schema '{"type":"object","properties":{"summary":{"type":"string"}},"required":["summary"]}'
```

자동화 결과는 `status`와 `structured_output`을 확인해요.  
명령 성공만으로 테스트나 요청한 도구 실행이 완료됐다고 판단하지 않아요.

## 확인 기준

1. 입력창에서 `/` 또는 `/help`로 현재 명령을 확인해요.
2. `/skills`로 사용할 수 있는 사용자 Skill을 확인해요.
3. 터미널 옵션과 서브명령은 `agy --help`와 `agy <subcommand> --help`로 확인해요.
4. 현재 설치 버전에 없는 명령은 사용하지 않아요.

## 공식 문서

- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
- [Antigravity CLI Features](https://antigravity.google/docs/cli/features)
- [비대화형 자동화](https://www.antigravity.google/docs/cli/headless/)
- [CLI 변경 기록](https://www.antigravity.google/docs/changelog?tab=cli)
