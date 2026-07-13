# Codex 확장 기능

반복 절차, 외부 연결, 독립 작업과 자동 검사는 서로 다른 확장 수단으로 구성한다.

## 선택 기준

필요한 책임에 맞는 가장 작은 단위를 선택한다.

| 필요한 것 | Codex 기능 |
| --- | --- |
| 저장소에서 계속 지킬 기준 | `AGENTS.md` |
| 반복 작업 절차와 전문 지식 | Skill |
| 외부 데이터와 도구 | MCP 또는 App·Connector |
| 독립 작업의 별도 컨텍스트 | Subagent |
| 결정적인 생명주기 검사 | Hook |
| 실행 명령 허용 정책 | Rules |
| 여러 구성요소의 설치 단위 | Plugin |

## Skill

Skill은 반복 절차, 참조 자료와 스크립트를 묶는다.

- 필수 진입 파일: `SKILL.md`
- 저장소 위치: 현재 작업 폴더부터 저장소 루트까지의 `.agents/skills/`
- 사용자 위치: `~/.agents/skills/`
- 호출: Skill 이름 또는 설명과 일치하는 자연어 요청

Master 역할과 결과 기준은 [Masters](../../Masters/README.md)를 참조하고 Skill에는 Codex 실행 지침만 둔다.

## MCP와 App

실시간 외부 데이터와 작업이 필요할 때 사용한다.

- MCP: 외부 도구와 API 연결
- App·Connector: 인증된 개인·조직 데이터 연결
- Config 또는 `codex mcp` 명령으로 MCP 설정
- 현재 세션에서 연결과 사용 가능 도구 확인

## Subagent

독립적인 조사와 검증을 별도 컨텍스트에서 처리한다.

- 서로 다른 모듈의 읽기 중심 분석
- 보안, 품질, 성능처럼 독립된 관점의 검토
- 분리 가능한 테스트와 로그 분석

같은 파일을 동시에 수정하는 작업은 책임을 먼저 나눈다.

## Hook과 Rules

기계적으로 판단할 수 있는 검사를 자동화한다.

- Hook: 도구 실행, 승인, 종료 등 생명주기 이벤트에 연결
- Rules: 명령의 허용, 확인과 차단 정책

사람의 판단이 필요한 기준은 `AGENTS.md`나 Skill에 둔다.

## Plugin

Skill과 관련 구성요소를 설치 가능한 단위로 배포한다.

- 여러 Skill
- MCP와 App 연결 정보
- Hook과 자산
- 팀 배포와 버전 관리 정보

## 공식 문서 기준

- [Skill 만들기](https://developers.openai.com/codex/skills/)
- [Subagents](https://developers.openai.com/codex/subagents/)
- [Hooks](https://developers.openai.com/codex/hooks/)
- [Plugins](https://developers.openai.com/codex/plugins/)

## 이력관리

- 2026-07-13: Master·Playbook 정본과 분리된 Codex 확장 기능 선택 기준으로 재구성
