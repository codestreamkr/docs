# 개발자를 위한 Git 필수 가이드

이 문서는 개발자가 일상적인 협업을 안전하게 수행하는 데 필요한 Git 기준을 안내한다.

## 학습 순서

다음 순서대로 읽으면 상태 확인부터 협업과 복구까지 연결된다.

| 순서 | 문서 | 익혀야 할 내용 |
|---|---|---|
| 1 | [Git 상태와 변경 확인](./git_01_worktree_guide.md) | Working tree, Staging area, HEAD, `status`, `diff` |
| 2 | [Git 변경 확인과 커밋](./git_02_apply_guide.md) | 커밋 범위, `add -p`, staged diff, 커밋 메시지 |
| 3 | [Git 브랜치와 원격 협업](./git_04_branch_remote_guide.md) | branch, upstream, `fetch`, `pull`, `push`, stash |
| 4 | [Git 변경 통합과 충돌 해결](./git_05_integration_conflict_guide.md) | merge, rebase, cherry-pick, 충돌 해결 |
| 5 | [Git 되돌리기와 복구](./git_03_reset_rebase_revert_guide.md) | restore, reset, revert, reflog |

## 매일 사용하는 안전한 흐름

작업 전, 커밋 전, push 전에 같은 기준으로 상태를 확인한다.

```bash
# 작업 시작
git status --short --branch
git switch <기준브랜치>
git fetch origin
git pull --ff-only origin <기준브랜치>
git switch -c <작업브랜치>

# 변경 확인과 커밋
git diff
git add <파일>
git diff --staged
git commit -m "변경 이유가 드러나는 메시지"

# 공유
git status --short --branch
git push -u origin <작업브랜치>
```

작업 중인 변경은 커밋하거나 `git stash`로 보관한 뒤 기준 브랜치로 전환한다. 기준 브랜치, 브랜치 이름, 검증 명령, PR 병합 방식은 프로젝트 규칙을 따른다.

## 개발자 필수 완료 기준

다음 작업을 설명하고 직접 수행할 수 있어야 한다.

- 현재 브랜치와 파일 상태를 `status`로 확인한다.
- Working tree 변경과 Staging area 변경을 `diff`로 구분한다.
- 커밋 범위를 파일 또는 변경 조각 단위로 선택한다.
- 원격 변경을 `fetch`한 뒤 로컬과의 차이를 확인한다.
- 작업 브랜치를 만들고 upstream을 설정해 push한다.
- merge, rebase, cherry-pick의 용도를 구분한다.
- 충돌 파일을 해결하고 진행 중인 작업을 완료하거나 중단한다.
- 공유 전후에 맞춰 reset과 revert를 구분한다.
- `reflog`에서 잃어버린 로컬 커밋을 찾아 복구 브랜치를 만든다.
- 민감정보와 불필요한 생성 파일을 커밋에서 제외한다.

## 팀에서 별도로 정할 기준

프로젝트마다 다음 항목을 명시한다.

- 기준 브랜치와 브랜치 이름 규칙
- 커밋 메시지와 이슈 연결 형식
- merge, squash merge, rebase merge 중 PR 병합 방식
- push 전 필수 빌드, 테스트, 정적 분석 명령
- 보호 브랜치와 force push 허용 범위
- 대용량 파일과 Git LFS 적용 기준

## 이력관리

- 2026-07-13: Git 필수 학습 순서, 일상 작업 흐름과 완료 기준을 작성하고 기준 브랜치 전환 후 최신화하도록 작업 시작 순서 수정
