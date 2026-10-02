# 01. 권한과 Plan 모드

Grok Build의 권한 모드, 제품 Plan 모드와 Sandbox를 설명해요.  
기준 버전은 Grok Build 1.0.41이에요.

## 권한 모드

권한 모드는 도구 실행 전에 물어볼 기본 범위를 정해요.  
일상 구현 작업은 승인 범위를 검토한 뒤 `auto`를 사용할 수 있어요.

| 모드 | 동작 | 적합한 작업 |
| --- | --- | --- |
| `default` | 읽기 외 작업에 승인 여부를 물어요 | 민감한 설정, 처음 여는 저장소 |
| `plan` | 계획 파일 외 편집을 제한해요 | 구현 전 합의 |
| `acceptEdits` | 파일 편집을 포함한 일반 작업을 허용해요 | 검토한 코드 반복 수정 |
| `auto` | 안전 분류를 통과한 도구 실행을 자동 승인해요 | 구현, 테스트, 문서 수정 |
| `dontAsk` | 승인할 수 없는 호출을 거부해요 | CI와 스크립트 |
| `bypassPermissions` | 권한 검사를 우회해요 | 격리된 실행 환경 |

세션에서는 Shift+Tab으로 모드를 순환하고, `/auto`와 `/always-approve`로 자동 승인 동작을 바꿀 수 있어요.  
`deny` 규칙은 모드와 관계없이 적용해요.  
권한 우회 옵션은 격리된 환경에서만 사용해요.

## Plan 모드와 ct-plan

제품 Plan 모드는 코드 변경 전에 계획을 작성하고 승인하는 세션 모드예요.  
입력창에서 `/plan`으로 시작하고 `/view-plan`으로 저장된 계획을 다시 봐요.

`ct-plan`은 개발 문제와 선택지를 탐색하고, 요구사항을 작업·완료 조건·검증 방법에 연결하는 사용자 Skill이에요.  
제품 Plan 모드와 `ct-plan`을 함께 쓰면 계획 검토 과정과 계획 내용의 책임을 나눌 수 있어요.  
확정된 계획을 구현·검증할 때는 Plan 모드를 끄고 `ct-apply`로 넘어가요.

Plan 모드에서 만든 계획은 세션 디렉터리의 `~/.grok/sessions/<cwd>/<session-id>/plan.md`에 저장돼요.  
계획 파일 편집만 자동 승인되고 다른 파일 편집은 현재 권한 모드와 관계없이 거부돼요.  
계획을 승인하기 전에는 `/view-plan`으로 저장된 계획을 다시 열고, 필요한 수정 의견을 보낼 수 있어요.

Plan 모드는 편집 도구만 제한해요.  
셸 명령의 리디렉션 같은 파일 쓰기는 검사하지 않고, Subagent는 부모 세션의 Plan 모드 편집 제한을 상속하지 않아요.  
Plan 모드에서 Subagent를 사용할 때는 쓰기 가능한 역할이 파일을 바꿀 수 있음을 전제로 범위와 권한을 따로 확인해요.

## 권한 규칙

프로젝트 `.grok/config.toml`의 `[permission]` 규칙은 사용자 규칙과 함께 적용해요.  
같은 대상에서는 `deny`가 `ask`, `allow`보다 우선해요.  
현재 세션이 적용한 규칙은 `grok inspect`에서 확인해요.

## 폴더 신뢰

프로젝트 지침, Skill, Hook과 저장소 MCP는 폴더를 신뢰한 뒤에 실행돼요.  
`/hooks-trust` 또는 `--trust`는 이 항목에 공통으로 적용되는 신뢰 상태를 기록해요.  
현재 신뢰 상태와 적용 구성은 `grok inspect`로 확인해요.

## Sandbox

Sandbox는 파일 시스템과 네트워크 접근 범위를 제한해요.

```bash
grok --sandbox workspace
grok --sandbox read-only
```

`workspace`는 현재 작업 범위에서 변경을 허용하고, `read-only`는 조사와 검토에 맞아요.  
운영체제별 네트워크 제한 범위는 현재 설치된 도움말을 확인해요.

## 확인 기준

세션에서 현재 권한 모드를 확인하고, `grok inspect`로 적용된 권한 규칙과 신뢰 상태를 확인해요.

## 공식 문서

- [Grok Build 개요](https://docs.x.ai/build/overview)
- [Settings](https://docs.x.ai/build/settings)
