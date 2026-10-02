# Pi 명령 확인

Pi는 열린 세션의 입력창에서 쓰는 명령과 터미널에서 Pi를 시작·관리하는 명령을 구분해요.  
설치한 Extension, Skill, Prompt Template에 따라 입력창 목록은 달라질 수 있어요.

## 입력창에서 사용

입력창에 `/`를 입력해 현재 세션에서 사용할 수 있는 명령을 찾아요.

| 구분 | 입력 예 | 용도 |
| --- | --- | --- |
| 내장 명령 | `/model`, `/session`, `/trust` | 모델, 세션, 설정을 관리해요. |
| Skill | `/skill:ct-plan` | 반복 작업 절차를 호출해요. |
| Prompt Template | `/ready-pr` | 저장한 요청 문구를 펼쳐요. |
| Extension 명령 | 설치한 명령 | Extension이 추가한 기능을 써요. |

### 작업 준비와 설정

| 명령 | 용도 |
| --- | --- |
| `/login`, `/logout` | 제공자 인증을 관리해요. |
| `/model` | 사용할 모델을 선택해요. |
| `/scoped-models` | `Ctrl+P`로 순환할 모델을 정해요. |
| `/thinking` | 추론 수준을 정해요. |
| `/settings` | Pi 설정을 열어요. |
| `/reload` | 지침, Skill, Template과 Extension을 다시 읽어요. |
| `/hotkeys` | 단축키 목록을 확인해요. |

### 변경 확인과 검토

Pi 기본 기능에는 변경 검토 전용 명령이 없어요.  
입력창에서 대상과 검토 기준을 자연어로 요청해요.

```text
현재 diff에서 동작 문제, 빠진 테스트, 요청 밖 변경만 짚어줘.
파일은 수정하지 마.
```

검토 후 수정과 재검증은 [작업 흐름](./workflows.md#변경-확인과-검토)에 따라 요청해요.

### 세션과 병렬 작업

| 명령 | 용도 |
| --- | --- |
| `/session` | 현재 세션의 파일, 토큰과 비용을 확인해요. |
| `/new` | 무관한 작업을 새 세션에서 시작해요. |
| `/resume` | 저장된 세션을 다시 열어요. |
| `/name` | 세션 표시 이름을 정해요. |
| `/compact` | 확정된 맥락을 요약해 공간을 확보해요. |
| `/tree` | 세션의 이전 지점으로 이동해 이어 가요. |
| `/fork` | 이전 요청을 기준으로 새 흐름을 만들어요. |
| `/clone` | 현재 흐름을 복제해 비교해요. |
| `/copy`, `/export` | 마지막 응답을 복사하거나 세션을 내보내요. |

`/share`는 세션을 외부 서비스에 올려요.  
사내 정보와 자격증명이 없는지 확인한 뒤 사용해요.

기본 기능에 없는 병렬 실행이나 전용 명령은 [Extension과 Package](./extensions.md)로 추가해요.

### Pi의 셸 입력

입력창의 `!명령`은 셸 명령을 실행하고 출력을 모델에 보내요.  
`!!명령`은 실행하되 출력을 모델에 보내지 않아요.

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
```

Git 상태는 자연어로 확인을 요청하거나 별도 터미널에서 직접 확인해요.  
셸 출력을 세션에 바로 전달할 때는 `!git diff`처럼 Pi가 제공하는 셸 입력을 사용해요.

## 터미널에서 실행

터미널 명령은 Pi 세션을 열거나, 설치·업데이트·Package·인증을 관리하거나, 비대화형 자동화를 실행할 때 써요.

```bash
pi
pi "주문 취소 흐름을 먼저 파악해줘"
pi -c
pi --help
```

| 명령 | 용도 |
| --- | --- |
| `pi` | 대화형 세션을 열어요. |
| `pi "요청"` | 첫 요청과 함께 세션을 열어요. |
| `pi -c` | 최근 세션을 이어서 열어요. |
| `pi -r` | 세션을 선택해 다시 열어요. |
| `pi install <source>` | Package를 설치해요. |
| `pi list`, `pi config`, `pi remove <source>` | 설치한 Package를 확인·설정·제거해요. |
| `pi auth check` | 제공자 자격증명을 확인해요. |
| `pi --list-models` | 사용할 수 있는 모델을 확인해요. |
| `pi update` | Pi, Package 또는 모델 카탈로그를 갱신해요. |

`--model`, `--thinking`, `--tools`, `--extension`, `--skill` 같은 실행 옵션은 특정 세션의 시작 조건을 정할 때 사용해요.  
옵션의 현재 지원 여부는 `pi --help`로 확인해요.

## 확인 기준

- 일상 작업은 Pi 입력창에서 `/` 목록이나 자연어 요청으로 시작해요.
- 셸 명령은 Pi 입력창의 `!`와 터미널 중 출력 전달 필요 여부에 맞춰 골라요.
- Git 명령을 직접 입력할 때는 별도 터미널이나 Pi의 셸 입력을 사용하고, 조회·검토를 맡길 때는 자연어로 요청해요.
- 설치된 버전과 Extension에 따라 달라지는 명령은 현재 입력창과 `pi --help`를 우선해요.

## 공식 문서

- [Usage](https://pi.dev/docs/latest/usage)
- [CLI Reference](https://pi.dev/docs/latest/cli)
- [Sessions](https://pi.dev/docs/latest/sessions)
