# Git 워크트리 빠른 이해

## 먼저 잡아야 할 3가지

| 구역 | 뜻 | 대표 상태 |
|---|---|---|
| Working tree | 지금 파일 시스템에 보이는 실제 파일 | 수정했지만 아직 add 안 한 상태 |
| Staging area | 다음 커밋에 넣기로 고른 변경 | `git add` 후 상태 |
| HEAD | 현재 브랜치가 가리키는 마지막 커밋 | 이미 커밋된 상태 |

## 한 줄로 이해하기

- 파일을 수정하면 working tree가 바뀐다
- `git add`를 하면 working tree의 변경이 staging area로 올라간다
- `git commit`을 하면 staging area가 HEAD에 기록된다

## 가장 자주 쓰는 흐름

```bash
파일 수정
git add <파일>
git commit -m "메시지"
```

## 명령이 어느 구역을 건드리는지

| 명령 | Working tree | Staging area | HEAD |
|---|---|---|---|
| `git add <파일>` | 그대로 | 변경 반영 | 그대로 |
| `git restore <파일>` | 변경 취소 | 그대로 | 그대로 |
| `git restore --staged <파일>` | 그대로 | 스테이징 해제 | 그대로 |
| `git reset --soft <커밋>` | 그대로 | 그대로 | 이동 |
| `git reset --mixed <커밋>` | 그대로 | 초기화 | 이동 |
| `git reset --hard <커밋>` | 초기화 | 초기화 | 이동 |

## 상태별로 바로 보기

### 파일만 수정한 상태

```bash
git status --short
```

예:

```text
 M app.js
```

의미:
- working tree만 바뀜

### add까지 한 상태

```text
M  app.js
```

의미:
- staging area에 올라감

### 수정도 하고 add도 다시 안 한 상태

```text
MM app.js
```

의미:
- staging area에 한 번 올라간 변경이 있고
- 그 뒤 working tree에 추가 수정이 더 있음

## 자주 하는 실수

| 상황 | 실제 문제 | 먼저 볼 것 |
|---|---|---|
| `commit` 했는데 일부만 들어갔다 | add 안 한 변경이 working tree에 남아 있음 | `git status --short` |
| `reset --soft` 했는데 파일이 안 사라진다 | HEAD만 옮긴 것 | staging 상태 확인 |
| `restore --staged` 했는데 수정 내용은 남아 있다 | staging만 내린 것 | working tree 확인 |
| `reset --hard` 후 파일이 사라졌다 | working tree까지 버린 것 | 실행 전 상태 확인 |

## 최소 확인 순서

```bash
git status --short
git diff
git diff --staged
```

## 마지막 정리

- working tree: 지금 손대고 있는 파일
- staging area: 다음 커밋에 넣을 변경
- HEAD: 이미 커밋된 기준점

## 이력관리
- 2026-04-15: Git 워크트리, 스테이징, HEAD 차이를 빠르게 볼 수 있는 레퍼런스 문서 신규 작성
