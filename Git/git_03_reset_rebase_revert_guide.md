# Git 되돌리기와 복구

되돌리기는 공유 여부와 버릴 범위를 먼저 확인하고 선택한다.

## 바로 선택

| 상황 | 명령 | 기준 |
|---|---|---|
| add하지 않은 파일 변경 취소 | `git restore <파일>` | 로컬 수정만 제거 |
| add한 파일을 다시 내리기 | `git restore --staged <파일>` | 파일 내용은 유지 |
| 아직 공유하지 않은 최근 커밋 다시 만들기 | `git reset --soft <커밋>` | 변경을 Staging area에 유지 |
| 아직 공유하지 않은 커밋 순서·메시지 정리 | `git rebase -i HEAD~N` | 로컬 히스토리 재작성 |
| 이미 공유한 커밋 취소 | `git revert <커밋>` | 취소용 새 커밋 생성 |
| 잃어버린 커밋 위치 찾기 | `git reflog` | 로컬 HEAD 이동 기록 조회 |

## 파일 변경 되돌리기

취소할 범위를 나눠서 실행한다.

```bash
# add하지 않은 변경 취소
git restore path/to/file

# add한 상태만 취소하고 파일 변경은 유지
git restore --staged path/to/file

# 파일을 HEAD 상태로 완전히 복원
git restore --source=HEAD --staged --worktree path/to/file
```

복원 전에 필요한 변경은 별도 커밋이나 `stash`로 보관한다.

## 최근 커밋 다시 만들기

로컬 커밋을 다시 묶을 때 기준 커밋으로 HEAD를 이동한다.

```bash
git log --oneline --decorate -n 8
git reset --soft <새 커밋의 바로 이전 커밋>
git diff --staged
git commit -m "새 커밋 메시지"
```

`reset` 모드의 차이는 다음과 같다.

| 모드 | 커밋 변경 | Staging area | Working tree |
|---|---|---|---|
| `--soft` | 이동 | 유지 | 유지 |
| `--mixed` | 이동 | 초기화 | 유지 |
| `--hard` | 이동 | 초기화 | 초기화 |

`--hard`는 추적 중인 로컬 변경을 제거할 때만 사용한다.

## 중간 커밋 정리

아직 공유하지 않은 커밋은 대화형 rebase로 정리한다.

```bash
git rebase -i HEAD~3
```

편집 명령:

- `pick`: 커밋 유지
- `reword`: 메시지 변경
- `squash`: 앞 커밋과 합치기
- `fixup`: 앞 커밋과 합치고 현재 메시지 버리기
- `drop`: 커밋 제거

충돌이 발생하면 [변경 통합과 충돌 해결](./git_05_integration_conflict_guide.md)을 따른다.

## 공유된 커밋 취소

원격에 공유한 이력은 `revert`로 보존하면서 취소한다.

```bash
git revert <커밋해시>
```

결과:

- 기존 커밋은 이력에 남는다.
- 반대 변경을 담은 새 커밋이 생긴다.
- 다른 개발자가 이미 받은 이력을 다시 쓰지 않는다.

## 잃어버린 커밋 복구

`reset`이나 `rebase` 후 커밋이 보이지 않으면 `reflog`에서 찾는다.

```bash
git reflog --date=local
git show <찾은커밋>
git branch recover/work <찾은커밋>
```

복구 기준:

- 찾은 커밋의 내용을 `git show`로 확인한다.
- 바로 `reset`하지 않고 복구 브랜치를 먼저 만든다.
- 커밋하지 않은 변경과 `git clean`으로 삭제한 파일은 `reflog`로 복구할 수 없다.

## 원격 히스토리 갱신

팀이 허용한 개인 작업 브랜치의 이력을 재작성했을 때만 다음 명령을 사용한다.

```bash
git fetch origin
git push --force-with-lease
```

`--force-with-lease`는 마지막으로 확인한 원격 상태와 다르면 push를 막는다. 공유 브랜치에서는 팀 정책을 우선한다.

## 실행 전 확인

되돌리기 전에 현재 상태와 대상을 기록한다.

```bash
git status --short --branch
git log --oneline --decorate --graph -n 12
git diff
git diff --staged
```

## 이력관리

- 2026-07-13: 파일 복원, reflog 복구, reset 범위와 원격 이력 갱신 기준 보완
- 2026-04-15: 최초 작성
