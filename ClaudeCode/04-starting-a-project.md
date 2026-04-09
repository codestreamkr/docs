# 04. 프로젝트 시작하기

## 프로젝트에 Claude Code 적용하기

새 프로젝트에서 Claude Code를 처음 쓸 때는 아래 두 단계를 순서대로 실행한다.

## Step 1. 프로젝트 초기화

Claude Code가 기본으로 제공하는 명령이다.

프로젝트 코드를 분석해 `CLAUDE.md` 파일을 생성한다.

```text
/init
```

`CLAUDE.md`에는 이 프로젝트에서 작업할 때 참고할 기본 지침이 담긴다.

- 프로젝트 개요와 기술 스택 요약
- 자주 쓰는 명령어
- 코드 작성 시 유의사항

> 이 파일은 프로젝트 루트에 생성되며, 이후 모든 Claude Code 세션에서 자동으로 읽힌다.

## Step 2. 상세 핵심 문서 생성

커스텀 커맨드로 `CLAUDE.md`를 라우팅 전용으로 정리하고, 실제 작업 기준이 되는 문서 3개를 `.0_my/` 폴더에 추가로 생성한다.

이 단계의 `/ct:init`은 Claude Code 기본 제공 명령이 아니라 커스텀 명령이다.

따라서 먼저 `claude-code-init` 저장소를 참고해 관련 설정을 준비해야 한다.

참고: <https://github.com/codestreamkr/claude-code-init>

```text
/ct:init
```

### 생성되는 문서

| 파일 | 역할 |
| --- | --- |
| `.0_my/core_project.md` | 프로젝트 구조, 아키텍처, 기술 스택, 주요 모듈 개요 |
| `.0_my/core_code_style.md` | 네이밍 규칙, 코딩 스타일, Mapper와 로깅 작성 기준 |
| `.0_my/core_workflow.md` | 빌드, 테스트, 배포 명령, 환경 변수, 운영 절차 |

`CLAUDE.md`는 이 3개 문서를 참조하는 라우팅 파일로 다시 정리된다.

상세 규칙은 각 core 문서에서만 관리한다.

## 실행 순서 요약

```text
/init
/ct:init
```

- `/init`: Claude Code 기본 제공 명령
- `/ct:init`: core 문서 3개 생성과 `CLAUDE.md` 정리

## 실행 후 할 일

1. `.0_my/` 아래 3개 문서를 열어 내용이 맞는지 확인한다.
2. 잘못 분석된 부분은 직접 수정한다.
3. 이후 Claude Code 작업은 이 문서를 기준으로 진행한다.

> 프로젝트가 크게 바뀌면 `/ct:init`을 다시 실행해 문서를 최신 상태로 유지한다.
