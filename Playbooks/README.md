# Playbook

여러 Skill의 결과를 이어서 판단해야 하는 작업 흐름만 다뤄요.

단일 Skill로 끝나는 작업과 제품별 호출 방법은 [플랫폼 문서](#실행)에서 확인해요.

## 필요한 흐름

| 상황 | Playbook |
| --- | --- |
| 확정된 계획을 구현하고 검증해야 해요 | [02 기능 구현하고 검증하기](./02-implement-and-verify.md) |
| SQL 성능 개선안을 측정하고 적용해야 해요 | [04 느린 SQL 개선하기](./04-tune-sql.md) |
| 기존 동작을 유지하며 구조를 단계적으로 옮겨야 해요 | [05 구조 전환하기](./05-transition-structure.md) |
| 외부 서비스의 계약을 확인하고 연동하거나 이관해야 해요 | [06 외부 서비스 연동하기](./06-integrate-external.md) |

## 공통 기준

- 필요한 단계만 사용해요. 앞 단계의 결과가 확정되지 않으면 다음 단계로 넘어가지 않아요.
- 전제가 달라지면 해당 단계로 돌아가요.
- 다음 단계에는 확정된 범위, 유지할 계약, 근거 경로와 미확인 사항을 전달해요.
- 검증하지 못한 범위와 남은 위험은 결과와 구분해 남겨요.

## 실행

CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
설치 절차와 호출 표기는 사용하는 플랫폼 문서를 확인해요.

- [Antigravity](../Platforms/Antigravity/workflows.md)
- [Codex](../Platforms/Codex/workflows.md)
- [Claude Code](../Platforms/ClaudeCode/workflows.md)
- [Grok Build](../Platforms/GrokBuild/workflows.md)
- [Pi](../Platforms/Pi/workflows.md)
