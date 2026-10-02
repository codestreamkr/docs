# Pi 사용자 Skill

[ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후 CodeStream 사용자 Skill을 `/skill:ct-*`로 호출해요.  
설치와 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.

## 공통 호출 형식

```text
/skill:ct-<name> <요청>
```

- Skill만 호출하면 각 Skill의 안내나 사용 예제를 확인할 수 있어요.
- 실행할 때는 대상과 원하는 결과를 지정해요.
- 명령 목록에 보이지 않으면 Settings의 `enableSkillCommands`를 확인해요.
  꺼도 직접 입력하면 동작해요.
- Skill을 추가하거나 고친 뒤에는 `/reload`로 다시 읽어요.

## 분석과 계획

### ct-analyze

현재 코드·설정·테스트를 읽기 전용으로 조사해 동작과 영향 범위를 분석해요.  
결과에는 호출·데이터 흐름, 파일·심볼 근거와 미확인 연결을 구분해요.

```text
/skill:ct-analyze OrderController.cancel의 호출과 데이터 흐름을 분석해줘
```

### ct-plan

문제와 선택지를 탐색하거나 요구사항을 작업·완료 조건·검증 방법에 연결한 계획을 작성해요.  
결과를 바꾸는 미결정 사항은 확인받고, 계획 단계에서 구현과 검증을 실행하지 않아요.

```text
/skill:ct-plan 주문 취소 기능의 구현 계획을 작성해줘
```

## 실행과 검증

### ct-apply

확정된 계획의 남은 작업을 실행하고 각 완료 조건으로 검증해요.  
계획 파일이 있으면 검증된 상태를 기록하고, 없으면 완료·미완료·막힌 항목을 보고해요.

```text
/skill:ct-apply 주문 취소 구현 계획의 남은 작업을 완료해줘
```

### ct-verify

요구사항마다 구현 근거와 정상·실패·경계 흐름의 실행 결과를 독립적으로 대조해요.  
통과·실패·미검증과 사유를 보고하며, 구현 파일과 계획의 작업 상태는 바꾸지 않아요.

```text
/skill:ct-verify 주문 취소 기능이 계획의 요구사항을 충족하는지 검증해줘
```

## 문서와 위키

### ct-docs-md-format

제공된 자료로 Markdown 파일을 만들거나 기존 Markdown의 표현과 형식을 정리해요.  
기존 문서의 사실과 의미는 유지하고 결과를 `.md` 파일로 저장해요.

```text
/skill:ct-docs-md-format README.md의 표현과 형식만 정리해줘
```

### ct-docs-weekly-report

작성자·기간·브랜치별 Git 이력으로 월별·주차별 업무 보고서를 Markdown 파일에 작성해요.  
각 브랜치를 독립 집계하고 대표 Java/JSP 파일과 `외 N개` 수치를 산출해요.

```text
/skill:ct-docs-weekly-report 2026-09 월간 업무 보고서를 현재 브랜치 기준으로 작성해줘
```

### ct-wiki-api

포함된 PowerShell 도구로 Confluence REST API 호환 위키를 검색·조회·저장하고 명시된 변경을 수행해요.  
생성·수정은 dry-run 결과와 반영 범위를 확인한 뒤 실제 변경해요.

```text
/skill:ct-wiki-api 333 페이지와 댓글을 조회해줘
```

### ct-wiki-ops

프로젝트의 `LLM-WIKI.md`, 원문·코드와 현재 Markdown 위키를 기준으로 운영해요.  
원문 보관, 반영, 조회, 통합과 근거·현재성·구조·링크 점검을 수행해요.

```text
/skill:ct-wiki-ops 지난 7일의 변경과 남은 작업을 정리해줘
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

여러 Skill의 결과를 연결할 때는 [작업 흐름](./workflows.md)을 봐요.

## 확인 기준

Skill의 역할과 입력은 현재 설치된 `SKILL.md`를 기준으로 해요.  
호출 가능 여부는 현재 세션의 목록에서 확인해요.

## 공식 문서

- [Skills](https://pi.dev/docs/latest/skills)
- [Agent Skills](https://agentskills.io)
