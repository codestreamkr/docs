# Codex 자동화

정기 작업은 채팅으로 예약하고, 스크립트에서는 `codex exec`로 실행해요.

## 작업 예약하기

데스크톱 앱에서 프로젝트를 열고 Codex 채팅창에 작업과 실행 시간을 입력하세요.

```text
매주 월요일 오전 9시에 이 프로젝트의 지난주 변경을 요약해줘.
이 채팅에 결과를 남겨줘.
파일은 수정하지 마.
```

등록된 일정과 첫 실행 결과를 확인하세요.  
로컬 파일을 사용하는 작업은 실행 시간에 컴퓨터와 앱을 켜 두세요.

## CLI에서 실행하기

프로젝트 폴더의 터미널에서 요청을 실행하세요.

```bash
codex exec "현재 Git 변경을 요약하고 필요한 테스트 명령을 알려줘"
```

CLI는 요청을 한 번 실행하고 결과를 출력해요.  
Codex 실행 성공과 테스트 통과는 별도로 확인하세요.

## 공식 문서

- [예약 작업](https://learn.chatgpt.com/docs/automations): 일정과 실행 결과를 관리해요.
- [비대화형 실행](https://learn.chatgpt.com/docs/non-interactive-mode): 결과 저장과 로그 전달 방법을 확인해요.
- [CLI 명령 참조](https://learn.chatgpt.com/docs/developer-commands?surface=cli): `codex exec`의 옵션을 확인해요.
- [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action): GitHub CI에서 Codex를 실행해요.
- [Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview): 자체 서비스에서 Codex 세션을 연결해요.
