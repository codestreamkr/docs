# Git 상태와 변경 확인

Git 작업은 현재 상태를 정확히 읽는 것부터 시작한다.

## 먼저 알아야 할 구성

| 구성 | 의미 | 확인 예시 |
|---|---|---|
| Working tree | 파일 시스템에 있는 현재 작업 내용 | 수정했지만 아직 `add`하지 않은 파일 |
| Staging area | 다음 커밋에 포함하기로 선택한 변경 | `git add`로 올린 변경 |
| HEAD | 현재 체크아웃한 커밋 | 보통 현재 브랜치의 마지막 커밋 |
| Branch | 특정 커밋을 가리키는 작업선 | `main`, `feature/login` |
| Remote-tracking branch | 마지막으로 확인한 원격 브랜치 상태 | `origin/main` |

변경은 보통 다음 순서로 이동한다.

```text
파일 수정 → Working tree → git add → Staging area → git commit → HEAD
```

## 상태 확인

작업 전후에는 저장소 상태를 먼저 확인한다.

```bash
git status --short --branch
```

자주 보는 파일 상태는 다음과 같다.

| 표시 | 의미 |
|---|---|
| `?? app.js` | Git이 아직 추적하지 않는 파일 |
| ` M app.js` | Working tree에서 수정한 파일 |
| `M  app.js` | Staging area에 올린 파일 |
| `MM app.js` | 올린 뒤 다시 수정한 파일 |
| `A  app.js` | 새로 추가해 Staging area에 올린 파일 |
| `D  app.js` | 삭제한 파일 |

앞쪽 열은 Staging area, 뒤쪽 열은 Working tree 상태를 나타낸다.

## 변경 내용 확인

커밋할 범위는 `diff`로 확인한다.

```bash
# 아직 add하지 않은 변경
git diff

# 다음 커밋에 들어갈 변경
git diff --staged

# 특정 파일의 변경
git diff -- path/to/file

# 현재 브랜치의 최근 이력
git log --oneline --decorate --graph -n 12
```

확인 기준:

- `git diff`: 빠진 변경과 의도하지 않은 변경을 찾는다.
- `git diff --staged`: 실제 커밋 범위를 최종 확인한다.
- `git log`: 현재 브랜치와 기준 브랜치의 위치를 확인한다.

## 명령별 변경 범위

| 명령 | Working tree | Staging area | HEAD |
|---|---|---|---|
| `git add <파일>` | 유지 | 변경 반영 | 유지 |
| `git restore <파일>` | Staging area 기준으로 복원 | 유지 | 유지 |
| `git restore --staged <파일>` | 유지 | HEAD 기준으로 복원 | 유지 |
| `git commit` | 유지 | 커밋 후 비워짐 | 새 커밋으로 이동 |
| `git reset --soft <커밋>` | 유지 | 유지 | 지정 커밋으로 이동 |
| `git reset --mixed <커밋>` | 유지 | 지정 커밋 기준으로 복원 | 지정 커밋으로 이동 |
| `git reset --hard <커밋>` | 지정 커밋 기준으로 복원 | 지정 커밋 기준으로 복원 | 지정 커밋으로 이동 |

`reset --hard`는 추적 중인 로컬 변경을 제거하므로 실행 전에 상태와 대상 커밋을 확인한다.

## 작업 시작 확인 순서

다음 순서로 현재 위치와 변경 범위를 확인한다.

```bash
git status --short --branch
git log --oneline --decorate --graph -n 12
git diff
git diff --staged
```

완료 기준:

- 현재 브랜치를 설명할 수 있다.
- 수정한 변경과 커밋할 변경을 구분할 수 있다.
- 명령이 Working tree, Staging area, HEAD 중 어디를 바꾸는지 확인할 수 있다.

