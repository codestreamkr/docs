# Pi 가이드

프로젝트에서 할 일을 고르고 필요한 사용자 Skill을 직접 호출한다.

문제 유형별 작업 흐름은 [Playbook](../../Playbooks/README.md)에서 관리한다. 이 가이드는 Pi의 설정, Skill 호출과 확장 기능만 다룬다.

## 바로 시작

1. 프로젝트 루트에서 `pi`를 실행한다.
2. 시작 화면에서 불러온 Skill과 지침 파일을 확인한다.
3. `/skill:ct-plan ?`처럼 물음표를 붙여 지원 작업과 예제를 확인한다.
4. 작업과 대상을 이어서 입력해 실행한다.

```text
/skill:ct-plan ?
/skill:ct-plan impl 주문 취소의 중복 요청 방지 기능
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 제품·설계·구현·개선 계획 | `ct-plan` | `/skill:ct-plan ?` |
| Spring 구현과 검토 | `ct-spring` | `/skill:ct-spring ?` |
| 호출 흐름 분석·전환·테스트 | `ct-calltree` | `/skill:ct-calltree ?` |
| QA와 회귀 검증 | `ct-qa-lucin` | `/skill:ct-qa-lucin ?` |
| SQL 성능 분석 | `ct-query-tuner` | `/skill:ct-query-tuner ?` |
| 외부 서비스 연동과 이관 설계 | `ct-external-architect` | `/skill:ct-external-architect ?` |
| 실행 스크립트 생성과 검증 | `ct-script-run` | `/skill:ct-script-run ?` |
| Confluence REST API 작업 | `ct-wiki-api` | `/skill:ct-wiki-api ?` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` | `/skill:ct-wiki-ops ?` |

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치, Skill 위치와 `AGENTS.md`·Settings의 책임 | [환경 설정](./setup.md) |
| 9개 Skill의 입력, 작업과 결과 | [Skill 안내](./skills.md) |
| 여러 Skill을 연결하는 실제 예제 | [작업 흐름](./workflows.md) |
| Extension, Prompt Template, Provider와 Package의 차이 | [확장 기능](./extensions.md) |
| 현재 환경에서 명령을 찾는 방법 | [명령 확인](./commands.md) |

## 사용 기준

- 사용자 Skill은 `/skill:ct-*` 이름으로 직접 호출한다.
- Skill은 현재 프로젝트의 `AGENTS.md`, 코드와 설정에서 필요한 근거를 수집한다.
- 작업별 입력과 결과는 실제 Skill 안내를 기준으로 한다.
- 제품 기능과 명령은 현재 환경과 [Pi 공식 문서](https://github.com/earendil-works/pi/tree/main/packages/coding-agent)에서 확인한다.

Pi는 모델 제공자를 직접 선택하고, 필요한 기능을 TypeScript Extension으로 만들어 붙일 수 있다. 에이전트 자체를 확장하거나 다른 프로그램에 내장하는 방법은 [확장 기능](./extensions.md)에서 다룬다.

## 심화 학습 자료

Extension, package, SDK와 RPC를 직접 만들어 볼 때는 `reference/`의 실습 문서를 사용한다.

| 주제 | 문서 |
| --- | --- |
| 설치, 인증과 첫 요청 | [시작하기](./reference/01-getting-started-and-key-concepts.md) |
| 화면, 모델, 세션과 컨텍스트 | [기본 개념](./reference/02-understanding-core-concepts.md) |
| Extension·package·SDK·RPC 실습 | [핵심 개념 활용](./reference/03-applying-core-concepts.md) |
| 프로젝트 최초 준비 | [프로젝트 시작](./reference/04-starting-a-project.md) |
| 반복하는 개발 흐름 | [프로젝트 코딩](./reference/05-project-cooking.md) |
| 명령과 단축키 상세 | [기본 명령](./reference/06-basic-commands.md) |
| Spring·Java 분석과 테스트 | [분석과 테스트](./reference/07-analysis-and-testing.md) |

예제 package는 [`examples/basic-pi-package`](./examples/basic-pi-package/)에 있다. 실습 문서는 Pi `0.80.6` 기준으로 작성했다.
