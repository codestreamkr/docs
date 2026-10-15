# Codex 사용자 Skill

CodeStream Skill은 반복 작업을 정해진 절차로 실행해요.  
설치는 [환경 설정](./setup.md)을 확인하세요.

## 호출 방법

Codex 채팅창에 Skill 이름, 대상과 원하는 결과를 입력하세요.  
설치 확인은 [환경 설정](./setup.md#6-사용자-skill)을 확인하세요.

## 코드 분석과 계획

`ct-analyze`는 코드를 읽고 동작과 영향 범위를 분석해요.

```text
$ct-analyze OrderController.cancel의 호출 흐름과 영향 범위를 분석해줘
```

분석 결과로 구현 범위를 정한 뒤 `ct-plan`으로 작업 계획을 만들어요.

```text
$ct-plan 주문 취소 기능의 구현 계획을 작성해줘
```

## 구현과 검증

계획이 정해지면 `ct-apply`로 남은 작업을 실행해요.

```text
$ct-apply 주문 취소 구현 계획의 남은 작업을 완료해줘
```

구현 후 `ct-verify`로 요구사항 충족 여부를 검증해요.

```text
$ct-verify 주문 취소 기능이 계획의 요구사항을 충족하는지 검증해줘
```

여러 Skill을 연결하는 예제는 [작업 흐름](./workflows.md)을 확인하세요.

## 문서 작성과 정리

`ct-docs-md-format`은 자료를 Markdown으로 만들거나 기존 문서의 형식을 정리해요.

```text
$ct-docs-md-format README.md의 표현과 형식만 정리해줘
```

Git 이력으로 업무 보고서를 만들 때는 `ct-docs-weekly-report`를 사용해요.

```text
$ct-docs-weekly-report 2026-09 월간 업무 보고서를 현재 브랜치 기준으로 작성해줘
```

## 위키 조회와 운영

원격 위키의 페이지와 댓글은 `ct-wiki-api`로 조회해요.

```text
$ct-wiki-api 333 페이지와 댓글을 조회해줘
```

저장소 안의 Markdown 위키는 `ct-wiki-ops`로 관리해요.

```text
$ct-wiki-ops 지난 7일의 변경과 남은 작업을 정리해줘
```

## 공식 문서

- [Skill 작성과 호출](https://learn.chatgpt.com/docs/build-skills): Skill 파일 형식과 호출 방식을 확인해요.
