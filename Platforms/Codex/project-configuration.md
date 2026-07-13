# Codex 프로젝트 설정

Codex의 지속 지침과 실행 설정은 `AGENTS.md`와 Config로 나눠 관리한다.

## 책임 구분

저장 위치의 역할을 먼저 정한다.

| 위치 | 책임 |
| --- | --- |
| `AGENTS.md` | 저장소 작업 규칙, 검증 기준과 공통 문서 라우팅 |
| 하위 `AGENTS.md` | 특정 모듈에 추가로 적용할 규칙 |
| `~/.codex/config.toml` | 사용자 Codex 실행 설정 |
| 프로젝트 `.codex/config.toml` | 신뢰된 저장소의 프로젝트 실행 설정 |
| `.agents/skills/` | 저장소에서 공유할 Codex Skill |

구조, 코드 스타일과 실행 절차의 상세 정본은 [프로젝트 준비하기](../../Playbooks/project-setup.md)에 따라 별도 문서로 관리한다.

## AGENTS.md 구성

지속적으로 지킬 짧은 기준과 문서 링크를 둔다.

```markdown
## 작업 기준

- 변경 전에 Git 상태와 관련 코드를 확인한다.
- 운영 코드는 기존 계층과 응답 계약을 따른다.
- 수정 후 관련 테스트를 실행한다.

## 프로젝트 문서

- 구조: `.docs/core_project.md`
- 코드 스타일: `.docs/core_code_style.md`
- 빌드와 테스트: `.docs/core_workflow.md`
```

Codex는 저장소 루트부터 현재 작업 폴더까지의 `AGENTS.md` 계층을 읽는다. 더 가까운 폴더의 지침이 구체적인 작업 기준을 제공하도록 배치한다.

## Config 구성

Codex 실행 동작과 외부 연결을 설정한다.

- 모델과 reasoning 기본값
- 승인과 샌드박스
- MCP 서버
- Hook
- 기능 플래그와 UI 설정

팀의 코드 작성 규칙은 Config가 아니라 `AGENTS.md`와 프로젝트 문서에 둔다.

## 적용 확인

새 세션에서 실제로 읽힌 지침과 설정을 확인한다.

- 현재 작업 루트
- 적용된 `AGENTS.md` 순서
- 승인과 샌드박스 수준
- Skill과 MCP 노출 상태
- 문서에 적은 빌드·테스트 명령

## 공식 문서 기준

- [AGENTS.md 설정](https://developers.openai.com/codex/guides/agents-md/)
- [Config 기본](https://developers.openai.com/codex/config-basic/)
- [Config 참조](https://developers.openai.com/codex/config-reference/)

## 이력관리

- 2026-07-13: 공통 프로젝트 문서와 분리하고 Codex 지침·Config·Skill 위치만 정리
