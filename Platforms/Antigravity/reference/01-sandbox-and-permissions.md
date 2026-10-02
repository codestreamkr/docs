# 01. 터미널 샌드박스와 권한 정책

Antigravity CLI는 파일과 터미널 도구를 사용할 수 있어요.  
이 문서는 2026-10-01에 설치된 Antigravity CLI `1.2.9`과 공식 CLI 문서를 기준으로 샌드박스와 권한을 구분해요.

## 1. 권한 정책

도구 실행 권한은 열린 CLI 세션의 입력창에서 `/permissions`로 확인하고 조정해요.  
파일 수정, 셸 실행, 웹 도구처럼 영향 범위가 있는 작업은 현재 권한 정책에 따라 검토 또는 승인을 요구할 수 있어요.

작업을 시작하기 전에 요청 대상과 변경 범위를 명확히 적고, 변경 뒤에는 `/diff` 또는 터미널 Git 명령으로 결과를 확인해요.

## 2. 터미널 샌드박스

`--sandbox`는 에이전트가 실행하는 터미널 명령에 제한을 적용한 새 세션을 시작해요.

```bash
agy --sandbox
```

신뢰하지 않는 코드, 넓은 변경, 외부 명령을 검토할 때는 샌드박스와 기본 권한 정책을 함께 사용해요.  
샌드박스의 세부 격리 범위는 운영체제와 현재 CLI 버전에 따라 달라질 수 있으므로 실행 전에 공식 문서를 확인해요.

## 3. 자동 승인 옵션

`--dangerously-skip-permissions`는 모든 도구 권한 요청을 자동 승인해요.

```bash
agy --dangerously-skip-permissions
```

이 옵션은 격리된 테스트 환경처럼 영향 범위가 제한된 곳에서만 사용해요.  
개인 개발 환경과 공유 저장소에서는 기본 권한 정책 또는 `/permissions`의 검토 정책을 사용해요.

## 4. 확인 기준

- 세션 시작 명령에 `--sandbox`를 썼는지 확인해요.
- `/permissions`에서 현재 권한 정책을 확인해요.
- 자동 승인 옵션을 썼다면 실행 환경의 격리 범위를 확인해요.
- 변경 결과를 `/diff` 또는 `git diff`로 확인해요.

## 공식 문서

- [Antigravity Terminal Sandbox](https://antigravity.google/docs/sandbox/)
- [Antigravity Permissions](https://antigravity.google/docs/permissions/)
- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
