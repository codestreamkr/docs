# 06. Pi 기본 명령

Pi 입력창의 단축키와 셸 입력, Package 관리, 비대화형 출력 모드를 정리해요.  
설치·인증·모델·신뢰의 기본 설정은 [Pi 환경 설정](../setup.md)에서, 입력창 명령의 최신 목록은 [Pi 명령 확인](../commands.md)에서 확인해요.  
이 문서는 설치본 Pi `0.87.1`과 공식 문서를 기준으로 확인했어요.

## 1. 입력창 단축키

| 단축키 | 용도 |
| --- | --- |
| Enter | 입력을 제출해요. |
| Shift+Enter | 여러 줄 요청을 작성해요. |
| Ctrl+G | `$VISUAL` 또는 `$EDITOR` 외부 편집기로 긴 요청을 작성해요. |
| Ctrl+C | 입력을 비우거나 선택한 내용을 복사해요. |
| Ctrl+D | 빈 입력창에서 Pi를 종료해요. |
| Escape | 실행을 중단하거나 선택을 취소해요. |
| Ctrl+O | 긴 도구 출력을 접거나 펼쳐요. |
| Alt+Enter | 현재 작업 뒤에 처리할 요청을 예약해요. |
| Alt+Up | 예약한 요청을 입력창으로 되돌려 수정해요. |

Windows Terminal에서는 Alt+Enter가 전체 화면 전환에 묶일 수 있어 터미널 설정이 필요해요.

## 2. 파일과 셸 입력

입력창에서 `@`를 입력하면 프로젝트 파일을 찾아 요청에 첨부할 수 있어요.  
Tab은 경로를 완성해요.

```text
@src/order/OrderService.java의 cancelOrder 흐름을 분석해줘.
관련 테스트도 찾아줘.
파일은 수정하지 마.
```

`!명령`은 셸 명령을 실행하고 결과를 Pi에 전달해요.  
`!!명령`은 실행 결과를 Pi에 전달하지 않아요.

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
!!pwd
```

Git 상태는 터미널에서 직접 확인하거나 Pi 입력창에 자연어로 확인을 요청해요.  
명령 출력이 필요할 때만 `!git diff`를 사용해요.

## 3. 세션과 모델 빠른 조작

세션에서 `/`을 입력해 현재 가능한 명령을 확인해요.

| 조작 | 용도 |
| --- | --- |
| `/model`, Ctrl+L | 모델을 선택해요. |
| `/scoped-models`, Ctrl+P | 순환할 모델을 정하고 다음 모델로 바꿔요. |
| `/thinking`, Shift+Tab | 추론 수준을 바꿔요. |
| `/session` | 세션 경로, 토큰과 비용을 확인해요. |
| `/compact` | 대화를 요약해 맥락을 확보해요. |
| `/resume`, `/new` | 이전 세션을 열거나 새 세션을 시작해요. |
| `/tree`, `/fork`, `/clone` | 세션의 다른 지점을 비교해요. |
| `/reload` | 지침, Skill, Prompt와 Extension을 다시 읽어요. |
| `/hotkeys` | 현재 버전의 단축키를 확인해요. |

## 4. Package 관리

Package는 Extension, Skill, Prompt Template, Theme를 묶어 배포하는 단위예요.  
출처와 코드를 확인한 뒤 터미널에서 설치·관리해요.

```bash
pi install -l ./Platforms/Pi/examples/basic-pi-package --approve
pi list --approve
pi config -l
pi remove <source>
```

`-l`은 현재 프로젝트에만 설치해요.  
`--approve`는 검토한 프로젝트 로컬 자원을 그 명령에서 신뢰해요.  
설치한 Package의 Prompt와 Skill은 Pi를 다시 열거나 `/reload` 뒤 입력창에서 호출해요.

```text
/ready-pr
/skill:project-check
```

## 5. 비대화형 출력

스크립트와 CI처럼 Pi 세션을 열지 않고 한 번 실행할 때는 터미널에서 출력 모드를 사용해요.

| 모드 | 용도 |
| --- | --- |
| `pi -p "요청"` | 최종 응답 텍스트만 받아요. |
| `pi --mode json "요청"` | 진행 이벤트를 JSONL로 받아요. |
| `pi --mode rpc` | 다른 프로그램이 JSONL로 계속 제어해요. |

```bash
pi -p "현재 변경을 요약하고 아직 실행하지 않은 검증만 알려줘"
pi --mode json "빌드하고 실패 원인을 정리해줘"
```

도구 범위를 제한해 읽기 전용 자동화를 만들 수 있어요.

```bash
pi --tools read,grep,find,ls -p "src의 변경을 검토해줘"
pi --exclude-tools bash,write,edit -p "코드를 검토해줘"
```

## 6. 확인 기준

- 일상 작업은 열린 Pi 세션의 입력창에서 진행해요.
- 터미널 명령은 설치·Package 관리·자동화처럼 세션 밖에서 실행해야 할 작업에 사용해요.
- 입력창 명령은 설치한 Extension과 현재 버전에 따라 달라질 수 있으므로 `/`와 `/hotkeys`를 우선해요.

## 공식 문서

- [Usage](https://pi.dev/docs/latest/usage)
- [Keybindings](https://pi.dev/docs/latest/keybindings)
- [Packages](https://pi.dev/docs/latest/packages)
- [CLI Integration](https://pi.dev/docs/latest/cli-integration)
