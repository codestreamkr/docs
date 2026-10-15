# 06. Pi 기본 명령

Pi 1.x 공식 문서 기준으로 입력·파일 참조·셸 실행의 기본 조작을 안내해요.  
모델과 세션 명령은 [명령 확인](../commands.md)에서 관리해요.

## 입력과 단축키

| 조작 | 용도 |
| --- | --- |
| Enter | 요청 제출 |
| Shift+Enter | 여러 줄 입력 |
| `@` | 프로젝트 파일 검색과 첨부 |
| Tab | 경로 완성 |
| Ctrl+G | 외부 편집기로 요청 작성 |
| Escape | 실행 중단 또는 선택 취소 |
| Ctrl+O | 긴 도구 출력 접기·펼치기 |
| Alt+Enter | 현재 작업 뒤에 처리할 요청 추가 |
| Ctrl+D | 빈 채팅창에서 종료 |

터미널의 기본 단축키와 충돌하면 `/hotkeys`와 터미널 설정을 확인하세요.

## 파일을 지정한 요청

```text
@src/order/OrderService.java의 취소 흐름을 분석해줘.
관련 테스트를 찾고 근거 파일을 알려줘.
파일은 수정하지 마.
```

`@` 뒤 파일 검색에서 실제 프로젝트 경로를 선택하세요.

## 셸 실행

`!`는 명령 결과를 모델에 전달하고, `!!`는 전달하지 않아요.  
사용 예제는 [셸 입력](../commands.md#셸-입력)을 확인하세요.

## 자동화와 확장

- [반복 실행](../workflows.md#반복-작업-실행): `pi -p`로 한 번 실행하고 결과를 받아요.
- [Package](../extensions.md#pi-package): 프로젝트에 공통 자원을 설치해요.
- [실행 모드](../extensions.md#실행-모드와-내장): JSON·RPC·SDK 방식의 차이를 확인해요.

## 공식 문서

- [채팅창 사용법](https://pi.dev/docs/latest/usage)
- [단축키](https://pi.dev/docs/latest/keybindings)
- [CLI 연동](https://pi.dev/docs/latest/cli-integration)
