# Claude Code 사용자 Skill

CodeStream 사용자 Skill은 필요한 작업에서 `/ct-*`로 직접 호출해요.  
설치와 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.

## 공통 호출 형식

```text
/ct-<name> <요청>
```

- Skill만 호출하면 각 Skill의 안내나 사용 예제를 확인할 수 있어요.
- 실행할 때는 대상과 원하는 결과를 지정해요.

## 분석과 계획

### ct-analyze

현재 코드·설정·테스트를 근거로 동작과 영향 범위를 읽기 전용으로 분석해요.  
결론마다 파일·심볼 근거를 붙이고 미확인 연결을 구분해요.

```text
/ct-analyze OrderController.cancel의 호출과 데이터 흐름을 분석해줘
```

### ct-plan

문제와 선택지를 탐색하고 요구사항을 작업·완료 조건·검증 방법에 연결해요.  
계획 문서 외의 파일을 바꾸거나 구현·검증을 실행하지 않아요.

```text
/ct-plan 주문 취소 기능의 구현 계획을 작성해줘
```

## 실행과 검증

### ct-apply

확정된 계획의 남은 작업을 실행하고 완료 조건에 맞게 검증해요.  
계획 파일이 있으면 검증된 항목의 상태를 기록해요.

```text
/ct-apply 주문 취소 구현 계획의 남은 작업을 완료해줘
```

### ct-verify

요구사항마다 구현 근거와 실행 결과를 독립적으로 대조해 통과·실패·미검증을 판정해요.  
구현 파일과 계획의 작업 상태는 바꾸지 않아요.

```text
/ct-verify 주문 취소 기능이 계획의 요구사항을 충족하는지 검증해줘
```

## 문서와 위키

### ct-docs-md-format

제공된 자료로 Markdown 파일을 만들거나 기존 Markdown의 표현과 형식을 정리해요.  
기존 문서의 사실과 의미는 유지해요.

```text
/ct-docs-md-format Platforms/ClaudeCode/README.md의 표현만 정리해줘
```

### ct-docs-weekly-report

Git 커밋 이력으로 월별·주차별 업무 보고서를 Markdown 파일에 작성해요.  
여러 브랜치는 각각 집계해요.

```text
/ct-docs-weekly-report 2026-09 월간 업무 보고서를 작성해줘
```

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색·조회·저장하고 명시된 변경을 수행해요.  
변경은 dry-run으로 범위를 확인해요.

```text
/ct-wiki-api 333 페이지와 댓글을 조회해줘
```

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`와 확인 가능한 근거로 Markdown 위키를 운영하고 점검해요.

```text
/ct-wiki-ops 지난 7일의 변경과 남은 작업을 정리해줘
```

## 선택 기준

필요한 결과에 맞는 Skill만 선택해요.  
여러 결과를 연결할 때는 [작업 흐름](./workflows.md)을 봐요.

## 번들 Skill과 겹칠 때

Claude Code의 번들 Skill도 `/` 목록에 보여요.  
요구사항별 독립 검증에는 `ct-verify`를 사용해요.

## 확인 기준

Skill의 역할과 입력은 현재 설치된 `SKILL.md`를 기준으로 해요.  
호출 가능 여부는 현재 세션의 목록에서 확인해요.
