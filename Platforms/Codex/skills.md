# Codex 사용자 Skill

CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
Codex에서 인식된 Skill은 `/skills`로 확인하고 필요한 작업을 `$ct-*`로 호출해요.  
설치 위치와 인식 확인은 [환경 설정](./setup.md)을 봐요.

## 공통 호출 형식

```text
$ct-<name> <요청>
```

- `ct-analyze`, `ct-plan`, `ct-apply`, `ct-verify`, `ct-wiki-api`, `ct-wiki-ops`는 `agents/openai.yaml`에서 자동 선택을 허용하지 않아요.
- `ct-docs-weekly-report`는 사용법만 요청하면 예제만 안내하고, 보고서를 요청하면 파일을 생성해요.
- `ct-docs-md-format`은 자동 선택을 허용하고 실제 문서 작업이면 결과를 `.md` 파일에 저장해요.
- 나머지 Skill은 이름만 호출하면 역할, 필요한 입력과 예제를 안내해요.
- 실행 요청에는 대상, 원하는 결과와 범위를 함께 적어요.

## 분석과 계획

### ct-analyze

현재 코드·설정·테스트에서 동작과 영향 범위를 읽기 전용으로 분석해요.  
호출·데이터 흐름, 분기와 외부 경계에 파일·심볼 근거를 붙이고 정적으로 확인할 수 없는 연결은 미확인으로 남겨요.

```text
$ct-analyze OrderController.cancel의 호출과 데이터 흐름을 분석해줘
```

### ct-plan

개발 문제를 탐색하거나 확정 요구사항을 작업·완료 조건·검증 방법에 연결한 계획을 작성해요.  
탐색만 요청하면 대화로 답하고, 계획은 요청한 위치나 프로젝트 관례에 따라 저장해요.  
결과를 바꾸는 미결정 사항은 확인받고, 계획 단계에서 구현이나 검증을 실행하지 않아요.

```text
$ct-plan 주문 취소 기능의 구현 계획을 작성해줘
$ct-plan .docs/order-cancel-plan.md를 변경된 완료 조건에 맞춰 갱신해줘
$ct-plan 기존 PG 연동을 새 공급자로 이관하는 계획을 작성해줘
```

## 실행과 검증

### ct-apply

확정된 계획의 남은 작업을 프로젝트 관례에 맞게 실행하고 각 완료 조건으로 검증해요.  
계획 파일이 있으면 검증된 항목의 상태를 기록하고, 없으면 완료·미완료·막힌 항목을 보고해요.  
요구사항이나 완료 조건이 달라지면 해당 항목을 멈추고 계획 갱신을 요청해요.

```text
$ct-apply 주문 취소 구현 계획의 남은 작업을 완료해줘
```

코드·테스트·실행 스크립트·구현 문서의 변경도 확정된 계획에 포함해 요청해요.

### ct-verify

요구사항마다 실제 구현과 실행 결과를 독립적으로 대조해 통과·실패·미검증으로 판정해요.  
정상·실패·경계 흐름을 확인하고 실패의 재현 조건과 미검증 사유를 남겨요.  
테스트 명령의 성공만으로 요구사항 전체를 통과 처리하지 않아요.

```text
$ct-verify 주문 취소 기능이 계획의 요구사항을 충족하는지 검증해줘
```

## 문서와 위키

### ct-docs-md-format

Markdown 문서를 생성하거나 기존 문서의 형식과 문체를 정리해요.  
기존 내용의 사실관계와 의미는 바꾸지 않고 결과를 `.md` 파일에 저장해요.

```text
$ct-docs-md-format Platforms/Codex/README.md의 표현만 정리해줘
```

### ct-docs-weekly-report

Git 이력에서 작성자·기간·브랜치별 주차 업무와 대표 Java/JSP 파일을 산출해 월별 보고서를 저장해요.  
브랜치가 여러 개면 각 브랜치의 보고를 독립적으로 작성해요.

```text
$ct-docs-weekly-report를 사용해서 현재 브랜치 보고서를 작성해줘
```

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색·조회·저장하거나 명시된 변경을 수행해요.  
페이지 생성·수정은 먼저 dry-run을 실행하고 반영 범위를 지정한 뒤 실제 변경해요.

```text
$ct-wiki-api 필요한 환경변수가 설정됐는지 확인해줘
$ct-wiki-api 333 페이지와 댓글을 조회해줘
```

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`와 Markdown 위키 구조를 기준으로 원문 보관, 반영, 조회, 통합과 품질 점검을 수행해요.

```text
$ct-wiki-ops 결제 개편의 결정 사항을 위키 근거로 알려줘
$ct-wiki-ops .wiki/payment.md의 근거와 현재성을 검증해줘
```

## 선택 기준

| 필요한 결과 | 선택 |
| --- | --- |
| 현재 코드의 동작과 영향 범위 분석 | `ct-analyze` |
| 개발 문제 탐색과 작업 계획 | `ct-plan` |
| 확정된 작업의 실행·검증과 완료 기록 | `ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` |
| Markdown 문서 생성과 형식 정리 | `ct-docs-md-format` |
| Git 이력의 월별·주차별 업무 보고 | `ct-docs-weekly-report` |
| 원격 Confluence API 작업 | `ct-wiki-api` |
| 저장소 안의 Markdown 위키 운영 | `ct-wiki-ops` |

Skill별 작업 단계는 [Playbook](../../Playbooks/README.md), Codex의 세션·Worktree 연결 예제는 [실전 작업 흐름](./workflows.md)을 봐요.

## 공식 문서

- [Skill 만들기와 호출 방식](https://learn.chatgpt.com/docs/build-skills)
