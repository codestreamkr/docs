# Codex 가이드

Codex로 프로젝트를 분석하고 코드를 수정해요.  
이 가이드는 CLI 실행과 CodeStream 사용자 Skill 호출을 안내해요.  
여러 작업을 연결하는 순서는 [Playbook](../../Playbooks/README.md)을 확인하세요.

## 바로 시작

1. [환경 설정](./setup.md)에 따라 설치와 인증을 마치세요.  
2. 프로젝트 루트의 터미널에서 실행하세요.

```bash
codex
```

3. Codex 채팅창에서 프로젝트 파악을 요청하세요.

```text
현재 작업 루트와 적용된 AGENTS.md를 확인해줘.
프로젝트의 빌드·테스트 방법을 근거 파일과 함께 알려줘.
파일은 수정하지 마.
```

4. 사용자 Skill을 설치했다면 대상과 원하는 결과를 지정하세요.

```text
$ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 코드 분석 | `ct-analyze` | `$ct-analyze 주문 취소 처리 흐름을 분석해줘` |
| 구현 계획 | `ct-plan` | `$ct-plan 주문 취소의 중복 요청 방지 기능 구현 계획을 작성해줘` |
| 구현과 테스트 | `ct-apply` | `$ct-apply 확정된 주문 취소 구현 계획을 실행하고 테스트해줘` |
| 결과 검증 | `ct-verify` | `$ct-verify 주문 취소 변경이 요구사항을 충족하는지 검증해줘` |

전체 Skill과 입력 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치와 설정 | [환경 설정](./setup.md) |
| 채팅창·터미널 명령 | [명령 확인](./commands.md) |
| 검토·세션·Worktree 사용 | [작업 흐름](./workflows.md) |
| 외부 도구 연결 | [확장 기능](./extensions.md) |
| 스크립트와 CI 실행 | [자동화](./automation.md) |

## 사용 기준

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init)을 설치한 뒤 사용하세요.
- 코드 블록 헤더에서 터미널과 Codex 채팅창을 구분하세요.
- 작업 결과에서 변경 파일, 테스트 결과, 미검증 항목을 확인하세요.

## 공식 문서

- [시작 안내](https://learn.chatgpt.com/docs/quickstart): 실행 환경별 시작 절차를 확인하세요.
- 전체 CLI 옵션은 터미널에서 `codex --help`로 확인하세요.
