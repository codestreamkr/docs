# Antigravity 사용자 Skill

CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 사용해요.  
설치 위치와 노출 확인은 [환경 설정](./setup.md)을 봐요.

## 공통 호출 형식

열린 Antigravity CLI 입력창에서 Skill 이름 앞에 `/`를 붙여 호출해요.

```text
/ct-<name> <요청>
```

요청 없이 호출하면 역할과 필요한 입력을 안내해요.  
실행 요청에는 대상과 원하는 결과를 적어요.

## 분석과 계획

### ct-analyze

현재 코드·설정·테스트를 읽기 전용으로 조사해 동작과 영향 범위를 분석해요.

```text
/ct-analyze OrderController.cancel의 호출과 데이터 흐름을 분석해줘
```

### ct-plan

문제와 선택지를 탐색하거나 요구사항을 작업·완료 조건·검증 방법에 연결한 계획을 작성해요.

```text
/ct-plan 주문 취소 기능의 구현 계획을 작성해줘
```

## 실행과 검증

### ct-apply

확정된 계획의 남은 작업을 실행하고 각 완료 조건으로 검증해요.

```text
/ct-apply 주문 취소 구현 계획의 남은 작업을 완료해줘
```

### ct-verify

요구사항마다 구현 근거와 정상·실패·경계 흐름의 실행 결과를 독립적으로 대조해요.

```text
/ct-verify 주문 취소 기능이 계획의 요구사항을 충족하는지 검증해줘
```

## 문서와 위키

### ct-docs-md-format

제공된 자료로 Markdown 파일을 만들거나 기존 Markdown의 표현과 형식을 정리해요.

```text
/ct-docs-md-format README.md의 표현과 형식만 정리해줘
```

### ct-docs-weekly-report

작성자·기간·브랜치별 Git 이력으로 월별·주차별 업무 보고서를 Markdown 파일에 작성해요.

```text
/ct-docs-weekly-report 2026-09 월간 업무 보고서를 현재 브랜치 기준으로 작성해줘
```

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색·조회·저장하고 명시된 변경을 수행해요.

```text
/ct-wiki-api 333 페이지와 댓글을 조회해줘
```

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`, 원문·코드와 현재 Markdown 위키를 기준으로 운영해요.

```text
/ct-wiki-ops 지난 7일의 변경과 남은 작업을 정리해줘
```

여러 Skill을 연결할 때는 [작업 흐름](./workflows.md)을 확인하세요.

## 공식 문서

- [Antigravity Agent Skills](https://antigravity.google/docs/skills)
