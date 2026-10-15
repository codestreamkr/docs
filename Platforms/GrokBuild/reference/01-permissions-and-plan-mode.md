# 01. 권한과 Plan 모드

도구 실행 승인, 계획 검토와 Sandbox의 차이를 설명해요.  
기준은 2026-10-16 공식 문서예요.

## 권한 모드

| 모드 | 동작 |
| --- | --- |
| Ask | 사전에 허용하지 않은 실행은 승인을 요청해요. |
| Auto | 분류를 통과한 실행을 승인하며 위험한 실행은 물어볼 수 있어요. |
| Always-approve | 도구 실행을 자동 승인해요. |

Shift+Tab으로 모드를 바꾸세요.  
`deny` 규칙과 Hook 검사는 자동 승인 모드에서도 적용해요.

## Plan 모드와 ct-plan

제품 Plan 모드는 구현 전에 계획을 검토하는 모드예요.  
시작 예제는 [계획과 구현](../workflows.md#1-계획과-구현)을 확인하세요.

계획 화면에서 `a`로 승인하거나 `s`로 수정을 요청하세요.  
`/view-plan`으로 다시 확인하고 `q`로 계획 모드를 종료할 수 있어요.

`ct-plan`은 요구사항·완료 조건·검증 방법을 정리하는 사용자 Skill이에요.  
호출 예제는 [사용자 Skill](../skills.md#ct-plan)을 확인하세요.

Plan 모드는 계획 파일 외 편집 도구를 제한해요.  
셸의 파일 쓰기와 Subagent 편집은 같은 제한을 받지 않으므로 범위를 별도로 지정하세요.

## 권한 규칙

사용자 또는 프로젝트 `.grok/config.toml`에서 규칙을 지정해요.  
같은 실행에 여러 규칙이 있으면 `deny`가 우선해요.

```toml
[permission]
rules = [
  { action = "allow", tool = "read" },
  { action = "deny", tool = "bash", pattern = "rm -rf *" },
]
```

## 폴더 신뢰

프로젝트 Hook은 신뢰한 폴더에서 실행해요.  
구성을 검토한 뒤 CLI 채팅창에서 신뢰를 설정하세요.

```text
/hooks-trust
```

터미널의 `grok inspect`에서 적용한 구성과 출처를 확인하세요.

## Sandbox

Sandbox는 승인된 실행의 파일·네트워크 접근을 제한해요.  
조사만 할 때는 터미널에서 읽기 전용 세션을 여세요.

```bash
grok --sandbox read-only
```

코드 수정이 필요하면 `workspace`를 선택하세요.  
`strict`는 쓰기 범위를 세션 저장소로 제한해요.  
운영체제별 격리 범위는 공식 문서에서 확인하세요.

## 공식 문서

- [권한 모드와 규칙](https://docs.x.ai/build/features/permissions)
- [계획 검토와 승인](https://docs.x.ai/build/features/plan-mode)
- [Sandbox](https://docs.x.ai/build/features/sandbox)
- [Hook 신뢰](https://docs.x.ai/build/features/hooks)
- [자동화 권한과 조직 정책](https://docs.x.ai/build/enterprise)
