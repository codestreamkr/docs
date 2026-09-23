# Antigravity 사용자 Skill

CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
필요한 작업은 `/ct-*`로 직접 호출해요.  
이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.

## 공통 호출 형식

```text
/ct-<name> <요청>
```

- Skill만 호출하면 역할, 필요한 입력과 대표 예제를 안내해요.
- 실행할 때는 대상, 원하는 결과와 필요한 범위를 함께 지정해요.

## 계획

### ct-plan-work

제품 기획, 설계 검토, 구현·구조 전환 계획과 개선 계획을 작성해요.

```text
/ct-plan-work 주문 취소 기능의 사용자 흐름과 성공 기준을 정리해줘
/ct-plan-work .docs/payment-design.md의 근거와 위험을 검토해줘
/ct-plan-work 회원 모듈의 구조 전환 계획을 작성해줘
```

## 구현과 실행

### ct-code-spring

현재 프로젝트의 Spring 버전, 구성과 코드 관례를 조사해 구현하거나 검토해요.

```text
/ct-code-spring 주문 취소 트랜잭션을 구현해줘
/ct-code-spring Security 설정을 읽기 전용으로 검토해줘
/ct-code-spring 기존 방식에 맞는 API 예외 응답 컴포넌트를 추가해줘
```

결과에는 확인한 환경, 변경 또는 검토 내용, 영향 범위와 검증 결과가 포함돼요.

### ct-run-script

프로젝트의 실제 명령과 환경 구성을 조사해 요청한 운영체제용 실행 스크립트를 생성하고 검증해요.

```text
/ct-run-script macOS 개발 실행 스크립트를 만들어줘
/ct-run-script Windows에서 API와 프론트를 함께 실행하게 해줘
```

결과에는 스크립트, 필요한 환경변수 이름, 실행 방법과 검증 결과가 포함돼요.

## 분석과 검증

### ct-code-tree

현재 코드의 실제 호출과 데이터 흐름을 읽기 전용으로 분석해요.

```text
/ct-code-tree OrderController.cancel의 호출 흐름을 분석해줘
```

### ct-code-tree-test

호출 흐름과 현재 코드를 근거로 동작을 고정하는 테스트를 작성하고 검증해요.

```text
/ct-code-tree-test .docs/callTree-OrderController-cancel.md를 근거로 테스트를 작성해줘
```

### ct-qa-flow

기능 흐름, 테스트 구성과 실행 환경을 조사해 QA 범위를 설계하고 가능한 검증을 수행해요.

```text
/ct-qa-flow 주문 취소 기능을 오픈 전 검증해줘
/ct-qa-flow 로그인 API와 화면 흐름의 회귀 범위를 정리해줘
```

결과에는 검증 범위, 위험별 시나리오, 실행 결과, 재현 방법과 미검증 범위가 포함돼요.

### ct-data-query

데이터베이스 환경, 스키마와 실행 근거를 모아 SQL 성능 원인을 분석하고 개선안을 검증해요.

```text
/ct-data-query 주문 조회 쿼리가 느린 원인을 분석해줘
/ct-data-query src/main/resources/mapper/OrderMapper.xml의 findOrders
```

결과에는 분석 조건, 병목 근거, 우선순위가 있는 개선안과 변경 전후 검증이 포함돼요.

## 외부 연동과 지식 운영

### ct-plan-ext

현재 프로젝트와 공급자의 최신 공식 자료를 조사해 외부 서비스 연동 또는 이관 구조를 설계해요.

```text
/ct-plan-ext 기존 PG 연동을 새 공급자로 이관하는 계획을 작성해줘
/ct-plan-ext 결제 승인·취소 연동 구조를 검토해줘
```

결과에는 현재·목표 구조, 인터페이스와 데이터 매핑, 오류 처리, 이관 순서와 검증 기준이 포함돼요.

### ct-docs-impl

코드와 설정을 정본으로 구현·조회·검증에 필요한 내용만 담은 Markdown 문서를 만들어요.

```text
/ct-docs-impl OrderService.cancel의 현재 구현 문서를 만들어줘
/ct-docs-impl .docs/order-cancel.md를 현재 코드에 맞춰줘
/ct-docs-impl .docs/order-*.md를 하나의 구현 문서로 합쳐줘
```

미반영 변경은 기존 문서를 고치지 않고 신규 문서에만 둬요.

### ct-docs-md-format

Markdown 문서의 문장, 목록, 표, 코드 블록과 줄바꿈만 정리해요.  
사실, 요구사항, 경로는 바꾸지 않아요.

```text
/ct-docs-md-format Platforms/Antigravity/README.md의 표현만 정리해줘
```

내용 검토나 사실 수정, 새 요구사항 추가는 이 Skill의 범위가 아니에요.

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색, 조회, 저장하거나 명시된 변경을 수행해요.

```text
/ct-wiki-api 필요한 환경변수가 설정됐는지 확인해줘
/ct-wiki-api 결제 개편 문서를 검색해줘
/ct-wiki-api 333 페이지와 댓글을 조회해줘
/ct-wiki-api 333 페이지의 승인 정책 문단을 수정해줘
```

`write`의 첫 호출은 항상 dry-run이고, 반영 범위를 지정한 뒤에만 실제로 반영해요.

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`와 Markdown 위키 구조를 기준으로 위키를 운영해요.

```text
/ct-wiki-ops 결제 개편의 결정 사항을 위키 근거로 알려줘
/ct-wiki-ops .wiki/payment.md의 근거와 현재성을 검증해줘
/ct-wiki-ops 지난 7일의 변경과 남은 작업을 정리해줘
```

## 선택 기준

| 필요한 결과 | 선택 |
| --- | --- |
| 실행 전 계획이나 설계 검토 | `ct-plan-work` |
| Spring 코드 구현 또는 검토 | `ct-code-spring` |
| 특정 심볼의 실제 호출 관계 | `ct-code-tree` |
| 호출 흐름을 고정하는 테스트 | `ct-code-tree-test` |
| 사용자 흐름과 실패 위험 검증 | `ct-qa-flow` |
| SQL 실행 성능의 원인과 개선 | `ct-data-query` |
| 외부 공급자 계약을 포함한 연동 설계 | `ct-plan-ext` |
| 로컬 실행 스크립트 | `ct-run-script` |
| 코드 정본의 구현 문서 작성과 갱신 | `ct-docs-impl` |
| Markdown 문서의 형식만 정리 | `ct-docs-md-format` |
| 원격 Confluence API 작업 | `ct-wiki-api` |
| 저장소 안의 Markdown 위키 운영 | `ct-wiki-ops` |

Skill을 고정 순서로 모두 실행하지 않아요.  
현재 필요한 결과를 만드는 Skill만 선택해요.

## Antigravity Skill 동작 특성

Antigravity는 점진적 공개(Progressive Disclosure) 방식으로 Skill을 다뤄요.

- 평소에는 Skill의 이름(`name`)과 설명(`description`)만 인지하고 있어 토큰을 절약해요.
- 사용자가 `/ct-*`로 직접 호출하거나 작업 요청과 일치할 때 `SKILL.md` 본문과 관련 리소스를 활성화해요.
- 세부 지침이나 대용량 매뉴얼은 `references/` 디렉터리에 두고 필요할 때만 참조하도록 링크해요.

## 공식 문서

- [Skills Guide](https://antigravity.google/docs/skills)
