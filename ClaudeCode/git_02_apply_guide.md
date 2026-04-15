# Git 적용 빠른 선택 가이드

## 바로 선택

| 상황 | 명령 |
|---|---|
| 지금 수정한 내용을 내 브랜치에 기본 커밋으로 남기고 싶다 | `git add` + `git commit` |
| 다른 브랜치의 특정 커밋만 가져오고 싶다 | `git cherry-pick` |
| 브랜치 전체를 이력과 함께 합치고 싶다 | `git merge` |
| 브랜치 변경만 가져와 한 커밋으로 넣고 싶다 | `git merge --squash` |

## 핵심 차이

| 명령 | 가져오는 단위 | 결과 | 이력 특징 |
|---|---|---|---|
| `git add <파일>` + `git commit -m "메시지"` | working tree 변경 | 현재 브랜치에 새 커밋 생성 | 내가 만든 변경을 기록 |
| `git cherry-pick <커밋해시>` | 커밋 | 현재 브랜치에 새 커밋 생성 | 원래 커밋을 복제해서 반영 |
| `git merge <브랜치명>` | 브랜치 | 브랜치 전체 반영 | 브랜치 이력 연결 |
| `git merge --squash <브랜치명>` | 브랜치 | 현재 브랜치에 새 커밋 1개로 정리 | merge 관계를 남기지 않음 |

## 명령별로 바로 쓰기

### 기본 커밋 만들기

```bash
git status --short
git add <파일>
git commit -m "커밋 메시지"
```

예:

```bash
git add src/payment.js test/payment.test.js
git commit -m "결제 검증 로직 보완"
```

주의:
- `git add .` 전에는 불필요한 파일이 없는지 확인한다
- 커밋 전에 `git status --short`로 범위를 다시 본다

### 커밋 하나만 가져오기

```bash
git checkout target-branch
git cherry-pick <커밋해시>
```

예:

```bash
git checkout release
git cherry-pick abc1234
```

주의:
- 의존성 있는 커밋이면 충돌하거나 깨질 수 있다
- 일부 수정만 급하게 옮길 때 적합하다

### 브랜치 전체 합치기

```bash
git checkout main
git merge <브랜치명>
```

예:

```bash
git checkout main
git merge feature/order-tests
```

특징:
- fast-forward 또는 merge commit으로 반영된다
- 브랜치 작업 흐름을 남기고 싶을 때 적합하다

### 브랜치 변경만 한 커밋으로 가져오기

```bash
git checkout main
git merge --squash <브랜치명>
git commit -m "새 커밋 메시지"
```

예:

```bash
git checkout main
git merge --squash feature/test-upgrade
git commit -m "테스트케이스 고도화 반영"
```

특징:
- 변경 내용은 가져온다
- 원래 브랜치의 개별 커밋은 남기지 않는다
- merge commit이나 merge 관계도 남기지 않는다

## 빠른 판단 기준

| 질문 | 답 | 명령 |
|---|---|---|
| 내 변경을 먼저 현재 브랜치에 기록하고 싶은가 | 예 | `git add` + `git commit` |
| 일부 커밋만 필요한가 | 예 | `cherry-pick` |
| 브랜치 작업 흐름까지 남겨야 하는가 | 예 | `merge` |
| 결과만 한 커밋으로 정리하고 싶은가 | 예 | `merge --squash` |

## 최소 확인 순서

```bash
git status --short
git log --oneline --decorate --graph -n 12
```

## 마지막 정리

- 내 변경을 기본 커밋으로 남기기: `git add` + `git commit`
- 커밋 하나만 가져오기: `cherry-pick`
- 브랜치 이력까지 합치기: `merge`
- 결과만 한 커밋으로 반영하기: `merge --squash`

## 이력관리
- 2026-04-15: 다시 반영하기와 가져오기 범주의 Git 명령 비교 문서를 신규 작성
- 2026-04-15: `merge --squash`가 merge 관계를 남기지 않는다는 점과 추적성 차이를 보완
- 2026-04-15: 설명형 구성을 줄이고 바로 참고할 수 있는 레퍼런스 형태로 재작성
- 2026-04-15: 기본 `add`/`commit` 흐름을 포함하고 `reapply` 표현을 `apply`로 정리
