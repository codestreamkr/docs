# Git 변경 통합과 충돌 해결

변경을 합칠 때는 필요한 이력 형태와 공유 여부를 기준으로 명령을 선택한다.

## 통합 방법 선택

| 목적 | 명령 | 결과 |
|---|---|---|
| 브랜치 작업 흐름을 유지해 합치기 | `git merge <브랜치>` | fast-forward 또는 merge commit |
| 개인 작업 브랜치를 최신 기준 위로 재배치 | `git rebase <기준브랜치>` | 커밋 해시를 새로 생성 |
| 특정 커밋만 가져오기 | `git cherry-pick <커밋>` | 선택한 변경을 새 커밋으로 적용 |
| 브랜치 변경을 한 커밋으로 정리 | `git merge --squash <브랜치>` | 변경을 Staging area에 반영 |

적용 기준:

- 공유 브랜치의 기존 이력은 유지한다.
- 개인 작업 브랜치는 팀 기준에 따라 rebase할 수 있다.
- `cherry-pick`은 대상 커밋의 선행 변경이 필요한지 확인한다.
- 프로젝트의 PR 병합 방식이 정해져 있으면 그 방식을 따른다.

## 통합 전 확인

현재 변경을 정리하고 최신 원격 상태를 확인한다.

```bash
git status --short --branch
git fetch origin
git log --oneline --decorate --graph --all -n 20
```

준비 기준:

- Working tree와 Staging area가 의도한 상태다.
- 합칠 기준 브랜치와 대상 브랜치를 확인했다.
- 필요한 로컬 변경은 커밋하거나 stash에 보관했다.

## 기본 실행

목적에 맞는 명령 하나를 선택한다.

```bash
# 현재 브랜치에 다른 브랜치 합치기
git merge <브랜치>

# 현재 개인 작업 브랜치를 최신 기준 브랜치 위로 재배치
git rebase origin/main

# 특정 커밋만 현재 브랜치에 적용
git cherry-pick <커밋해시>

# 다른 브랜치의 최종 변경을 한 커밋으로 준비
git merge --squash <브랜치>
git diff --staged
git commit -m "통합 결과를 설명하는 메시지"
```

## 충돌 해결 절차

충돌이 나면 Git이 멈춘 작업과 충돌 파일을 먼저 확인한다.

```bash
git status
git diff --name-only --diff-filter=U
```

처리 순서:

1. 각 충돌 파일에서 양쪽 변경의 의도를 확인한다.
2. 최종 코드가 되도록 충돌 표시를 제거하고 파일을 수정한다.
3. 빌드, 테스트, 정적 분석 등 프로젝트 검증을 실행한다.
4. 해결한 파일을 `git add <파일>`로 표시한다.
5. 진행 중인 작업에 맞는 continue 명령을 실행한다.

충돌 표시는 다음 형태다. 아래 예시의 기호 사이 공백은 검사 도구가 실제 충돌로 오인하지 않도록 넣었다.

```text
< < < < < < < HEAD
현재 쪽 변경
= = = = = = =
합치려는 쪽 변경
> > > > > > > branch-name
```

한쪽 내용을 기계적으로 선택하지 않고 최종 요구사항에 맞게 합친다.

## 계속하거나 중단하기

진행 중인 명령과 같은 종류의 명령으로 마무리한다.

| 작업 | 계속 | 전체 중단 |
|---|---|---|
| merge | `git commit` | `git merge --abort` |
| rebase | `git rebase --continue` | `git rebase --abort` |
| cherry-pick | `git cherry-pick --continue` | `git cherry-pick --abort` |
| revert | `git revert --continue` | `git revert --abort` |

현재 작업 종류가 불분명하면 `git status` 안내를 따른다.

## 통합 후 확인

충돌 해결은 파일 저장이 아니라 동작 검증까지 끝나야 완료된다.

```bash
git status --short --branch
git log --oneline --decorate --graph -n 12
git diff <통합전기준>..HEAD
```

완료 기준:

- 충돌 표시와 미해결 파일이 없다.
- 양쪽 변경의 요구사항이 유지된다.
- 프로젝트 검증 명령이 통과한다.
- 커밋 이력이 선택한 통합 방식과 일치한다.

