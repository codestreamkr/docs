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

## 4. 기존 권한 규칙 이전

CLI 1.2.2는 폐기 예정인 `unsandboxed` 규칙의 설정 경로와 이전 방법을 시작 경고로 안내해요.  
기존 규칙을 사용하는 저장소에서는 CLI·공유·프로젝트 설정을 함께 확인해요.

1. 시작 경고가 지목한 설정 파일과 규칙을 확인해요.
2. 안내에 따라 필요한 명령만 `command` 규칙으로 옮겨요.
3. `/permissions`에서 실제 적용된 허용·검토·차단 규칙을 확인해요.
4. 샌드박스 안에서 필요한 명령을 실행하고 제한 범위를 확인해요.

`command` 허용을 샌드박스 밖 실행 허용과 동일하게 해석하지 않아요.  
공식 권한 참조에 남은 `unsandboxed` 예제보다 설치 CLI의 이전 경고를 먼저 확인해요.

## 5. 확인 기준

- 세션 시작 명령에 `--sandbox`를 썼는지 확인해요.
- `/permissions`에서 현재 권한 정책을 확인해요.
- 자동 승인 옵션을 썼다면 실행 환경의 격리 범위를 확인해요.
- 변경 결과를 `/diff` 또는 `git diff`로 확인해요.

## 공식 문서

- [Antigravity Terminal Sandbox](https://antigravity.google/docs/sandbox/)
- [Antigravity Permissions](https://antigravity.google/docs/permissions/)
- [Antigravity CLI Reference](https://antigravity.google/docs/cli/reference)
