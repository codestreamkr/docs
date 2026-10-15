# Grok Build 사용자 Skill

CodeStream 사용자 Skill은 세션 입력창에서 `/ct-*`로 직접 호출해요.  
설치 위치와 노출 확인은 [환경 설정](./setup.md)을 봐요.

## 공통 호출 형식

```text
/ct-<name> <요청>
```

Skill만 입력하면 역할과 필요한 입력을 확인할 수 있어요.  
실행할 때는 대상, 원하는 결과와 필요한 제약을 함께 적어요.

## 분석과 계획

### ct-analyze

현재 코드·설정·테스트를 읽기 전용으로 조사해 동작과 영향 범위를 분석해요.  
호출·데이터 흐름과 근거 파일을 보고해요.

```text
/ct-analyze OrderController.cancel의 호출과 데이터 흐름을 분석해줘
```

### ct-plan

요구사항을 작업·완료 조건·검증 방법에 연결해요.  
결과를 바꾸는 미결정 사항은 확인받고, 계획 단계에서 구현과 검증을 실행하지 않아요.

```text
/ct-plan 주문 취소 기능의 구현 계획을 작성해줘
```

## 실행과 검증

### ct-apply

확정된 계획의 남은 작업을 실행하고 각 완료 조건으로 검증해요.  
계획 파일이 있으면 검증된 상태를 기록하고, 없으면 완료·미완료·막힌 항목을 보고해요.

```text
/ct-apply 주문 취소 구현 계획의 남은 작업을 완료해줘
```

### ct-verify

요구사항별 구현 근거와 정상·실패·경계 흐름을 독립 검증해요.  
통과·실패·미검증과 사유를 보고하며, 구현 파일과 계획의 작업 상태는 바꾸지 않아요.

```text
/ct-verify 주문 취소 기능이 계획의 요구사항을 충족하는지 검증해줘
```

## 문서와 위키

### ct-docs-md-format

제공된 자료로 Markdown 파일을 만들거나 기존 Markdown의 표현과 형식을 정리해요.  
기존 문서의 사실과 의미는 유지하고 결과를 `.md` 파일로 저장해요.

```text
/ct-docs-md-format README.md의 표현과 형식만 정리해줘
```

### ct-docs-weekly-report

작성자·기간·브랜치별 Git 이력으로 월별·주차별 업무 보고서를 Markdown 파일에 작성해요.  
각 브랜치를 독립 집계하고 대표 Java/JSP 파일과 `외 N개` 수치를 산출해요.

```text
/ct-docs-weekly-report 2026-09 월간 업무 보고서를 현재 브랜치 기준으로 작성해줘
```

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색·조회·저장하고 명시된 변경을 수행해요.  
생성·수정은 dry-run 결과와 반영 범위를 확인한 뒤 실제 변경해요.

```text
/ct-wiki-api 333 페이지와 댓글을 조회해줘
```

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`, 원문·코드와 현재 Markdown 위키를 기준으로 운영해요.  
원문을 반영하고 근거·현재성·구조·링크를 점검해요.

```text
/ct-wiki-ops 지난 7일의 변경과 남은 작업을 정리해줘
```

## /plan과 ct-plan

계획을 제품의 `plan.md`로 검토·승인해야 하는 작업에는 `/plan`을 사용할 수 있어요.  
CodeStream의 `ct-plan`은 요구사항, 완료 조건과 검증 방법을 정리하는 Skill이므로 두 기능의 목적을 구분해요.

## 공식 문서

- [Skill 작성과 호출](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [Plan 모드](https://docs.x.ai/build/features/plan-mode)
