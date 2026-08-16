# Claude Code 사용자 Skill

CodeStream 사용자 Skill은 필요한 작업을 `/ct-*`로 직접 호출한다.

## 공통 호출 형식

```text
/ct-<name> ?
/ct-<name> <요청>
/ct-<name> <작업> ?
/ct-<name> <작업> <대상>
```

- `/ct-<name> ?`: 입력, 결과와 대표 예제를 확인한다.
- 작업이 있는 Skill은 `<작업> ?`로 해당 작업의 사용법을 확인한다.
- 실행할 때는 대상, 원하는 결과와 필요한 범위를 함께 지정한다.
- Skill 이름 뒤에 입력한 내용이 그대로 전달되므로 작업과 대상을 한 줄에 이어서 쓴다.
- 입력창에 `/ct`를 입력하면 자동완성 목록에서 선택할 수 있다.

각 Skill은 명시적 호출을 기준으로 동작한다. 어떤 Skill이 필요한지 모를 때는 [선택 기준](#선택-기준)에서 먼저 확인한다.

## 계획

### ct-plan

제품 기획, 설계 검토, 구현 계획과 개선 계획을 작성한다.

| 작업 | 결과 | 예제 |
| --- | --- | --- |
| `pd` | 목표, 사용자, 요구사항, 흐름과 성공 기준 | `/ct-plan pd 주문 취소 기능` |
| `review` | 근거, 발견 사항, 대안과 결정 항목 | `/ct-plan review .docs/payment-design.md` |
| `impl` | 변경 대상, 영향, 구현 순서와 검증 기준 | `/ct-plan impl 쿠폰 중복 적용 방지` |
| `improve` | 현황, 개선 과제, 우선순위와 기대 효과 | `/ct-plan improve 회원 모듈` |

## 구현과 실행

### ct-spring

현재 프로젝트의 Spring 버전, 구성과 코드 관례를 조사해 구현하거나 검토한다.

```text
/ct-spring 주문 취소 트랜잭션을 구현해줘
/ct-spring Security 설정을 검토해줘
/ct-spring component API 예외 응답 처리를 추가해줘
```

결과에는 확인한 환경, 변경 또는 검토 내용, 영향 범위와 검증 결과가 포함된다.

### ct-script-run

프로젝트의 실제 명령과 환경 구성을 조사해 요청한 운영체제용 실행 스크립트를 생성하고 검증한다.

```text
/ct-script-run macOS 개발 실행 스크립트를 만들어줘
/ct-script-run Windows에서 API와 프론트를 함께 실행하게 해줘
```

결과에는 스크립트, 필요한 환경변수 이름, 실행 방법과 검증 결과가 포함된다.

## 분석과 검증

### ct-calltree

코드의 호출 흐름을 분석하고 전환 계획 또는 테스트를 만든다.

| 작업 | 결과 | 예제 |
| --- | --- | --- |
| `analyze` | 호출과 데이터 흐름 | `/ct-calltree analyze OrderController.cancel` |
| `transition` | 현재·목표 구조와 전환 계획 | `/ct-calltree transition OrderService.cancel` |
| `test` | 호출 흐름 기반 테스트와 검증 | `/ct-calltree test .docs/order-cancel-calltree.md` |

### ct-qa-lucin

기능 흐름, 테스트 구성과 실행 환경을 조사해 QA 범위를 설계하고 가능한 검증을 수행한다.

```text
/ct-qa-lucin 주문 취소 기능을 오픈 전 검증해줘
/ct-qa-lucin 로그인 API와 화면 흐름의 회귀 범위를 정리해줘
```

결과에는 검증 범위, 위험별 시나리오, 실행 결과, 재현 방법과 미검증 범위가 포함된다.

### ct-query-tuner

데이터베이스 환경, 스키마와 실행 근거를 수집해 SQL 성능 원인을 분석하고 개선안을 검증한다.

```text
/ct-query-tuner 주문 조회 쿼리가 느린 원인을 분석해줘
/ct-query-tuner src/main/resources/mapper/OrderMapper.xml의 findOrders
```

결과에는 분석 조건, 병목 근거, 우선순위가 있는 개선안과 변경 전후 검증이 포함된다.

## 외부 연동과 지식 운영

### ct-external-architect

현재 프로젝트와 공급자의 최신 공식 자료를 조사해 외부 서비스 연동 또는 이관 구조를 설계한다.

```text
/ct-external-architect 기존 PG 연동을 새 공급자로 이관하는 계획을 작성해줘
/ct-external-architect 결제 승인·취소 연동 구조를 검토해줘
```

결과에는 현재·목표 구조, 인터페이스와 데이터 매핑, 오류 처리, 이관 순서와 검증 기준이 포함된다.

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색, 조회, 저장하거나 명시된 변경을 수행한다.

```text
/ct-wiki-api 333 페이지를 조회해줘
/ct-wiki-api 결제 개편 문서를 검색해줘
/ct-wiki-api 333 페이지 수정안을 dry-run으로 확인해줘
```

조회·검색·저장과 변경 작업은 `/ct-wiki-api <도구 작업> ?`에서 필요한 인자를 확인할 수 있다.

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`와 Markdown 위키 구조를 기준으로 위키를 운영한다.

| 작업 | 용도 |
| --- | --- |
| `init` | 위키 기준과 기본 구조 준비 |
| `capture`, `ingest` | 원문 저장과 위키 반영 |
| `search`, `synthesis` | 조회와 주제 종합 |
| `log`, `daily` | 기간별 작업 요약 |
| `verify`, `lint` | 근거, 현재성, 구조와 링크 점검 |
| `prune` | 중복·오래된 문서의 정리 후보 제안 |

```text
/ct-wiki-ops search 결제 개편 결정 사항은?
/ct-wiki-ops verify .wiki/payment.md
/ct-wiki-ops lint
```

## 선택 기준

| 필요한 결과 | 선택 |
| --- | --- |
| 실행 전 계획이나 설계 검토 | `ct-plan` |
| Spring 코드 구현 또는 검토 | `ct-spring` |
| 특정 심볼의 실제 호출 관계 | `ct-calltree` |
| 사용자 흐름과 실패 위험 검증 | `ct-qa-lucin` |
| SQL 실행 성능의 원인과 개선 | `ct-query-tuner` |
| 외부 공급자 계약을 포함한 연동 설계 | `ct-external-architect` |
| 로컬 실행 스크립트 | `ct-script-run` |
| 원격 Confluence API 작업 | `ct-wiki-api` |
| 저장소 안의 Markdown 위키 운영 | `ct-wiki-ops` |

Skill을 고정 순서로 모두 실행하지 않는다. 현재 필요한 결과를 만드는 Skill만 선택한다.

## 공식 문서

- [Skills](https://code.claude.com/docs/en/skills)

