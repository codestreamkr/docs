# Git 브랜치와 원격 협업

브랜치 작업은 기준 브랜치를 최신 상태로 확인한 뒤 시작한다.

## 처음 한 번 설정

커밋 작성자와 기본 동작은 작업 환경에 맞게 설정한다.

```bash
git config --global user.name "이름"
git config --global user.email "업무 이메일"
git config --global init.defaultBranch main
```

확인:

```bash
git config --global --list
```

회사별 계정이나 저장소별 설정이 필요하면 해당 저장소에서 `--global` 없이 설정한다.

## 원격 저장소 시작

기존 저장소는 clone한 뒤 원격과 브랜치를 확인한다.

```bash
git clone <저장소주소>
cd <저장소디렉터리>
git remote -v
git status --short --branch
```

용어:

- `origin`: clone할 때 기본으로 등록되는 원격 저장소 이름
- `main`: 로컬 브랜치
- `origin/main`: 마지막 `fetch` 시점에 확인한 원격 `main` 상태
- upstream branch: 현재 로컬 브랜치가 pull과 push의 기준으로 연결한 원격 브랜치

## 작업 브랜치 만들기

최신 원격 기준을 확인하고 새 브랜치를 만든다.

```bash
git switch main
git fetch origin
git pull --ff-only
git switch -c feature/payment-validation
```

기준:

- 브랜치 이름은 팀 규칙을 따른다.
- 새 브랜치는 합의된 기준 브랜치에서 만든다.
- `git pull --ff-only`는 예상하지 않은 merge commit 생성을 막는다.

## 원격 변경 확인

`fetch`는 작업 파일을 바꾸지 않고 원격 추적 상태만 갱신한다.

```bash
git fetch --prune origin
git status --short --branch
git log --oneline --decorate --graph --all -n 20
```

선택 기준:

- 원격 상태만 먼저 확인: `git fetch`
- 현재 브랜치를 fast-forward로 갱신: `git pull --ff-only`
- 작업 브랜치에 기준 브랜치 변경 통합: 팀 기준에 따라 `merge` 또는 `rebase`

통합 절차는 [변경 통합과 충돌 해결](./git_05_integration_conflict_guide.md)을 따른다.

## 처음 push하기

새 브랜치는 원격 upstream을 함께 설정한다.

```bash
git push -u origin feature/payment-validation
```

이후에는 연결된 원격 브랜치로 push할 수 있다.

```bash
git push
```

push 전 확인:

- 현재 브랜치와 원격 연결 대상을 확인한다.
- 커밋하지 않은 변경이 남아 있는지 확인한다.
- 프로젝트 검증 명령을 실행한다.
- 원격에 올릴 커밋을 확인한다.

```bash
git status --short --branch
git log --oneline @{upstream}..HEAD
```

upstream을 아직 설정하지 않았다면 마지막 명령 대신 기준 원격 브랜치를 직접 지정한다.

```bash
git log --oneline origin/main..HEAD
```

## 작업 임시 보관

브랜치를 전환해야 하지만 아직 커밋할 수 없는 변경은 잠시 보관한다.

```bash
git stash push -u -m "결제 검증 작업 중"
git stash list
git stash show -p stash@{0}
git stash apply stash@{0}
```

기준:

- `-u`는 추적하지 않는 새 파일도 함께 보관한다.
- 복원 결과를 확인한 뒤 `git stash drop stash@{0}`으로 삭제한다.
- 장기간 보관하거나 공유할 작업은 stash 대신 브랜치와 커밋으로 남긴다.

## 작업 브랜치 정리

통합이 끝난 브랜치는 확인 후 삭제한다.

```bash
git switch main
git branch --merged
git branch -d feature/payment-validation
git push origin --delete feature/payment-validation
git fetch --prune origin
```

`git branch -d`는 통합되지 않은 커밋이 있으면 삭제를 막는다.

## 이력관리

- 2026-07-13: 브랜치 생성, 원격 동기화, push, stash와 브랜치 정리 기준 작성
