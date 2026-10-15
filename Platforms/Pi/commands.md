# Pi 명령 확인

이 문서의 `/` 명령은 Pi CLI 채팅창 기준이에요.  
설치한 Extension과 Skill에 따라 명령 목록이 달라져요.

## 입력창에서 사용

`/`를 입력해 사용할 수 있는 명령을 확인하세요.

| 명령 | 용도 |
| --- | --- |
| `/login`, `/logout` | 인증 관리 |
| `/model`, `/thinking` | 모델과 추론 수준 선택 |
| `/settings` | 설정 화면 열기 |
| `/trust` | 프로젝트 신뢰 결정 |
| `/reload` | 지침과 확장 자원 다시 읽기 |
| `/mcp` | 외부 도구 연결 확인 |
| `/hotkeys` | 단축키 확인 |

작업을 이어가거나 다른 접근을 비교할 때 세션 명령을 사용하세요.

| 명령 | 용도 |
| --- | --- |
| `/session` | 세션 경로, 토큰과 비용 확인 |
| `/name` | 세션 이름 지정 |
| `/resume` | 이전 세션 열기 |
| `/compact` | 대화 요약 |
| `/new` | 새 세션 시작 |
| `/tree` | 이전 지점으로 이동 |
| `/fork`, `/clone` | 과거 요청에서 분기하거나 현재 흐름 복제 |
| `/copy`, `/export` | 응답 복사 또는 세션 파일 내보내기 |

분기해도 작업 파일은 격리되지 않아요.  
변경 검토는 [작업 흐름](./workflows.md#변경-확인과-검토)의 자연어 요청을 사용하세요.

## 셸 입력

채팅창의 `!`는 명령 결과를 Pi에 전달해요.

```text
!./gradlew test --tests "com.example.order.OrderServiceTest"
```

결과를 전달하지 않을 때는 `!!`를 사용하세요.

```text
!!pwd
```

## 터미널에서 실행

종료한 최근 세션을 다시 여세요.

```bash
pi -c
```

현재 버전의 옵션은 도움말에서 확인하세요.

```bash
pi --help
```

Package 관리는 [확장 기능](./extensions.md#pi-package), 설치와 업데이트는 [환경 설정](./setup.md)을 확인하세요.

## 공식 문서

- [채팅창 사용법](https://pi.dev/docs/latest/usage)
- [명령 목록](https://pi.dev/docs/latest/slash-commands)
- [단축키](https://pi.dev/docs/latest/keybindings)
- [세션 관리](https://pi.dev/docs/latest/sessions)
