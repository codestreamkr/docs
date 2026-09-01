# 지식 위키로 남기기

원격 위키의 원문과 저장소 안의 Markdown 위키를 분리해 운영한다.

## 흐름

```text
ct-wiki-api            원격 페이지 조회와 저장
      ↓
ct-wiki-ops capture    원문 보관
      ↓
ct-wiki-ops ingest     위키 구조에 반영
      ↓
ct-wiki-ops verify     근거, 현재성과 링크 점검
```

원격 위키를 쓰지 않으면 `capture`부터 시작한다.

## 단계별로 확정할 것

### ct-wiki-api

원격 Confluence 호환 API 작업을 담당한다.

- 대상 페이지와 하위 페이지 범위
- 조회인지 변경인지
- 변경이면 먼저 dry-run으로 결과를 확인한다

### ct-wiki-ops capture

원문을 가공하지 않고 그대로 보관한다. 요약과 판단은 다음 단계의 일이다.

### ct-wiki-ops ingest

- 어느 주제 문서에 반영할지
- 기존 내용과 충돌하는 부분
- 원문 출처와 시점

### ct-wiki-ops verify

- 주장에 근거가 붙어 있는지
- 현재도 유효한 내용인지
- 구조와 링크가 깨지지 않았는지

중복이 쌓이면 `prune`으로 정리 후보를 확인하고, 기간별 정리가 필요하면 `log`와 `daily`를 사용한다.

## 다음 단계로 넘길 것

- 반영한 문서와 원문 출처
- 확인하지 못한 내용
- 정리 후보로 남긴 문서

## 이 Playbook을 벗어나는 경우

- 코드에서 사실을 확인해야 하면 [03](./03-understand-code.md)을 먼저 진행한다.
- 위키 기준 자체가 없으면 `init`으로 구조부터 준비한다.

## 실행

호출 표기는 [Codex](../Platforms/Codex/workflows.md), [Claude Code](../Platforms/ClaudeCode/workflows.md), [Grok Build](../Platforms/GrokBuild/workflows.md), [Pi](../Platforms/Pi/workflows.md) 문서에서 확인한다.
