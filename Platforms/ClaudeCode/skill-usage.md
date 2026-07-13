# Claude Code Skill 사용하기

공통 Playbook을 Claude Code의 기존 `/ct:*` Command와 목표 Skill 구조에 연결한다.

## 현재와 목표 구분

현재 문서에서 확인되는 Command와 앞으로 맞출 Skill 이름을 함께 관리한다.

| 공통 작업 | 기존 Claude Code 호출 | 목표 Skill | 상태 |
| --- | --- | --- | --- |
| 프로젝트 기준 문서 준비 | `/ct:init` | `/ct-init` | 기존 Command 문서 있음 |
| 로컬 실행 환경 준비 | 없음 | `/ct-script-run` | 적용 예정 |
| 개선 우선순위 판단 | `/ct:improve-plan` | `/ct-improve-plan` | 기존 Command 문서 있음 |
| 큰 설계안 검토 | `/ct:design-review` | `/ct-design-review` | 기존 Command 문서 있음 |
| 구현 기준 문서 작성 | 없음 | `/ct-implement-plan` | 적용 예정 |
| 실제 기능 구현 | `/ct:implement` | `/ct-implement` | 기존 Command 문서 있음 |
| Java 호출 흐름 분석 | `/ct:calltree` | `/ct-calltree` | 기존 Command 문서 있음 |
| CallTree 기반 테스트 | `/ct:calltreeTest` | `/ct-calltree-test` | 기존 Command 문서 있음 |
| 구조 전환 계획 | `/ct:tran-plan` | `/ct-tran-plan` | 기존 Command 문서 있음 |

`기존 Command 문서 있음`은 이 저장소에 사용 문서가 있다는 뜻이며, 현재 사용자 환경에 설치되었다는 뜻은 아니다. 실제 사용 가능 여부는 Claude Code의 `/` 목록에서 확인한다.

## 신규 구현 기준

신규 적용은 Claude Code의 Skill 구조를 우선한다.

```text
.claude/
└── skills/
    └── ct-implement/
        ├── SKILL.md
        ├── references/
        └── scripts/
```

- 직접 호출: `/ct-implement`
- 자연 호출: Skill의 `description`과 요청 문맥으로 선택
- 기존 `/ct:*`: 전환이 끝날 때까지 호환 호출로 유지
- Plugin 배포: Plugin 이름이 붙는 네임스페이스 사용

## 공통 Playbook 연결

판단 기준은 제품 문서에 반복하지 않는다.

- 계획과 구현: [계획하고 구현하기](../../Playbooks/planning-and-implementation.md)
- 호출 분석과 테스트: [분석하고 테스트하기](../../Playbooks/analysis-and-testing.md)
- 구조 전환: [구조 전환하기](../../Playbooks/architecture-transition.md)
- 프로젝트 준비: [프로젝트 준비하기](../../Playbooks/project-setup.md)

## 적용 확인

Skill을 추가한 뒤 실제 호출과 결과를 확인한다.

- `/` 목록에 목표 이름이 노출된다.
- 자연어 요청으로 필요한 Skill이 선택된다.
- 기존 Command와 결과 형식이 일치한다.
- 공통 Playbook의 완료 기준을 충족한다.
- Skill 미적용 항목은 연결표에 상태를 갱신한다.

## 공식 문서 기준

- [Claude Code Skills](https://code.claude.com/docs/en/skills)

## 이력관리

- 2026-07-13: 기존 `/ct:*` Command와 목표 Claude Code Skill 구조의 대응 및 적용 상태 정리
