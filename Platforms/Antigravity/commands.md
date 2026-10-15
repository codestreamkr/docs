# Antigravity 명령 확인

슬래시 명령은 Antigravity CLI 채팅창에서 사용해요.  
터미널 명령은 세션 시작과 자동화에 사용해요.

## 명령 찾기

현재 세션이 제공하는 명령을 확인하세요.

```text
/help
```

| 목적 | 명령 |
| --- | --- |
| 모델·추론 수준 선택 | `/model`, `/effort` |
| 도구 권한 확인 | `/permissions` |
| 설정 변경 | `/config` |
| 변경·아티팩트 검토 | `/diff`, `/artifact` |
| 이전 대화 재개 | `/resume` |
| 새 대화 시작 | `/clear` 또는 `/new` |
| 맥락 사용량 확인 | `/context` |
| 서브에이전트·백그라운드 작업 확인 | `/agents`, `/tasks` |
| 사용량·로그아웃 | `/usage`, `/logout` |
| 종료 | `/exit` 또는 `/quit` |

설치와 Skill 확인은 [환경 설정](./setup.md), 작업 예제는 [작업 흐름](./workflows.md)을 확인하세요.

## 세션 시작과 재개

프로젝트 폴더에서 세션을 시작하세요.

```bash
agy
```

최근 대화를 이어가세요.

```bash
agy -c
```

특정 대화를 지정할 때는 `agy --conversation <conversation-id>`를 사용해요.  
전체 옵션은 `agy --help`에서 확인하세요.

## 비대화형 자동화

스크립트에서 한 번 실행하려면 `-p`를 사용하세요.

```bash
agy -p "현재 변경을 요약하고 필요한 테스트를 알려줘"
```

명령 종료만으로 요청 완료를 판단하지 마세요.  
응답에서 실행한 작업과 미완료 항목을 확인하세요.  
자동화에는 필요한 도구 권한을 미리 설정해야 해요.

구조화 결과와 연속 요청은 [비대화형 실행 공식 문서](https://www.antigravity.google/docs/cli/headless/)를 확인하세요.  
`--json-schema`를 사용하면 루트가 `"type": "object"`인 스키마를 지정해야 해요.

## 추가 명령

### Skill 새로고침

Skill 추가 후 목록을 다시 읽는 절차는 [환경 설정](./setup.md#5-사용자-skill)을 확인하세요.

### 보조 질문

진행 중인 작업을 유지하면서 짧은 질문을 보내세요.

```text
/btw 현재 코드에서 멱등성 키는 어디에서 검증해?
```

답변을 복사할 때는 `/copy btw`를 사용해요.

### 음성 입력

`/voice` 또는 `F5`로 음성을 입력해요.  
전송 전에 변환된 텍스트를 확인하세요.  
계정·SSH 지원 조건은 [음성 입력](https://www.antigravity.google/docs/cli/commands/voice/)을 확인하세요.

### 출력 상세 수준

`/config`의 `Verbosity`에서 도구 실행 표시 수준을 선택해요.  
[설정 안내](https://antigravity.google/docs/cli/settings)에서 값을 확인하세요.

### 비대화형 상태 조회

에이전트를 실행하지 않고 지원 명령을 조회해요.  
[비대화형 실행](https://www.antigravity.google/docs/cli/headless/)에서 조회 가능한 명령을 확인하세요.

## 공식 문서

- [CLI 명령과 단축키](https://antigravity.google/docs/cli/reference)
- [실행 모드](https://antigravity.google/docs/cli/modes/)
- [비대화형 실행](https://www.antigravity.google/docs/cli/headless/)
