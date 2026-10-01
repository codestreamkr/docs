# Antigravity 사용자 Skill

CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요.  
설치 위치와 노출 확인은 [환경 설정](./setup.md)을 봐요.

## 공통 호출 형식

입력창에서 Skill 이름 앞에 `/`를 붙여 호출해요.

```text
/ct-<name> <요청>
```

요청 없이 호출하면 역할과 필요한 입력을 안내해요.  
실행 요청에는 대상과 원하는 결과를 적어요.

## 개발 작업

### ct-analyze

코드·설정·테스트를 근거로 호출, 분기, 데이터 흐름과 영향 범위를 읽기 전용으로 분석해요.  
결론마다 파일과 심볼 근거를 붙이고 확인할 수 없는 연결을 구분해요.

```text
/ct-analyze OrderController.cancel의 호출과 데이터 흐름을 분석해줘
```

### ct-plan

개발 문제와 선택지를 탐색하고 요구사항을 작업·완료 조건·검증 방법에 연결해요.  
계획 문서 외의 파일은 변경하지 않고 구현·검증을 실행하지 않아요.

```text
/ct-plan 주문 취소 기능의 구현 계획을 작성해줘
/ct-plan .docs/order-cancel-plan.md를 변경된 완료 조건에 맞춰 갱신해줘
```

결과를 바꾸는 미결정 사항은 확인받아요.  
확정된 계획은 `ct-apply`에 넘겨요.

### ct-apply

확정된 계획의 남은 작업을 프로젝트 환경과 관례에 맞게 실행하고 완료 조건별로 검증해요.  
검증된 항목만 완료로 표시해요.  
계획 파일이 있으면 상태를 기록하고, 없으면 완료·미완료·막힌 항목을 보고해요.

```text
/ct-apply 주문 취소 구현 계획의 남은 작업을 완료해줘
```

변경 결과와 검증 근거를 `ct-verify`에 넘겨요.

### ct-verify

요구사항마다 구현 근거와 정상·실패·경계 흐름의 실행 결과를 독립적으로 대조해요.  
통과·실패·미검증을 근거와 함께 보고해요.  
구현 파일과 계획의 작업 상태는 변경하지 않아요.

```text
/ct-verify 주문 취소 기능이 계획의 요구사항을 충족하는지 검증해줘
```

## 문서와 위키

### ct-docs-md-format

제공된 자료로 Markdown 파일을 만들거나 기존 Markdown의 문장과 형식을 정리해요.  
기존 문서의 의미를 보존하며 사실 오류의 수정이나 내용 검토는 수행하지 않아요.  
결과는 반드시 `.md` 파일로 저장해요.

```text
/ct-docs-md-format Platforms/Antigravity/README.md의 표현만 정리해줘
```

### ct-docs-weekly-report

Git 커밋 이력을 근거로 월간·주간 업무 보고서를 Markdown 파일로 작성해요.  
작성자, 기간과 브랜치를 지정할 수 있고, 여러 브랜치는 각각 집계해요.

```text
/ct-docs-weekly-report 9월 보고서를 현재 브랜치 기준으로 작성해줘
```

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색·조회·저장해요.  
명시된 생성·수정은 dry-run 결과와 반영 범위를 확인한 뒤 실행해요.

```text
/ct-wiki-api 333 페이지와 댓글을 조회해줘
```

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`, 확인 가능한 원문·코드와 현재 Markdown 위키를 기준으로 운영해요.  
원문 보관, 반영, 조회, 통합, 근거·현재성·링크 점검을 처리해요.

```text
/ct-wiki-ops 지난 7일의 변경과 남은 작업을 정리해줘
```

## 선택 기준

| 필요한 결과 | Skill |
| --- | --- |
| 현재 코드의 동작과 영향 범위 | `ct-analyze` |
| 개발 문제 탐색과 실행 계획 | `ct-plan` |
| 확정된 계획의 실행과 완료 기록 | `ct-apply` |
| 요구사항별 독립 검증 | `ct-verify` |
| Markdown 생성과 형식 정리 | `ct-docs-md-format` |
| Git 이력 기반 주간·월간 보고 | `ct-docs-weekly-report` |
| 원격 Confluence API 작업 | `ct-wiki-api` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` |

현재 필요한 결과에 맞는 Skill을 선택해요.
