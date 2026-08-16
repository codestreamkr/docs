# Grok Build 가이드

프로젝트에서 할 일을 고르고 필요한 사용자 Skill을 직접 호출한다.

업무 역할과 결과 기준은 [Masters](../../Masters/README.md), 공통 작업 흐름은 [Playbooks](../../Playbooks/README.md)를 참고한다. 이 가이드는 Grok Build의 설정, Skill 호출과 확장 기능만 다룬다.

## 바로 시작

1. 프로젝트 루트에서 `grok`을 실행한다.
2. `/skills`로 사용할 수 있는 Skill을 확인한다.
3. `/ct-plan ?`처럼 물음표를 붙여 지원 작업과 예제를 확인한다.
4. 작업과 대상을 이어서 입력해 실행한다.

```text
/ct-plan ?
/ct-plan impl 주문 취소의 중복 요청 방지 기능
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 제품·설계·구현·개선 계획 | `ct-plan` | `/ct-plan ?` |
| Spring 구현과 검토 | `ct-spring` | `/ct-spring ?` |
| 호출 흐름 분석·전환·테스트 | `ct-calltree` | `/ct-calltree ?` |
| QA와 회귀 검증 | `ct-qa-lucin` | `/ct-qa-lucin ?` |
| SQL 성능 분석 | `ct-query-tuner` | `/ct-query-tuner ?` |
| 외부 서비스 연동과 이관 설계 | `ct-external-architect` | `/ct-external-architect ?` |
| 실행 스크립트 생성과 검증 | `ct-script-run` | `/ct-script-run ?` |
| Confluence REST API 작업 | `ct-wiki-api` | `/ct-wiki-api ?` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` | `/ct-wiki-ops ?` |

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, Skill 위치와 `AGENTS.md`·Config의 책임 | [환경 설정](./setup.md) |
| 9개 Skill의 입력, 작업과 결과 | [Skill 안내](./skills.md) |
| 여러 Skill을 연결하는 실제 예제 | [작업 흐름](./workflows.md) |
| Subagent, 모델 연결, MCP와 Plugin의 차이 | [확장 기능](./extensions.md) |
| 현재 환경에서 명령을 찾는 방법 | [명령 확인](./commands.md) |

## 사용 기준

- 사용자 Skill은 `/ct-*` 이름으로 직접 호출한다.
- Skill은 현재 프로젝트의 `AGENTS.md`, 코드와 설정에서 필요한 근거를 수집한다.
- 작업별 입력과 결과는 실제 Skill 안내를 기준으로 한다.
- 제품 기능과 명령은 현재 환경과 `~/.grok/README.md`, `~/.grok/docs/user-guide/`, [xAI 공식 자료](https://x.ai/news/grok-build-cli)에서 확인한다.

계정 로그인은 SuperGrok 또는 X Premium+ 구독을 기준으로 한다. CI/CD나 브라우저 없는 환경은 `XAI_API_KEY`를 사용한다.
