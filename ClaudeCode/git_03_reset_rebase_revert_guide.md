# Git `reset`, `rebase`, `revert` 활용

## 바로 선택

| 상황 | 명령 |
|---|---|
| 최근 커밋 여러 개를 다시 묶고 싶다 | `git reset --soft` |
| 중간 커밋 하나를 빼거나 커밋 구조를 손보고 싶다 | `git rebase -i` |
| 이미 공유된 커밋을 안전하게 취소하고 싶다 | `git revert` |

## 핵심 차이

| 명령 | 무엇을 바꾸나 | 히스토리 재작성 | 기본 용도 |
|---|---|---|---|
| `git reset --soft <기준커밋>` | HEAD만 옮김 | 예 | 최근 커밋 다시 묶기 |
| `git rebase -i HEAD~N` | 커밋 구조 재작성 | 예 | drop, squash, reword |
| `git revert <커밋해시>` | 취소용 새 커밋 추가 | 아니오 | 공유된 커밋 되돌리기 |

## 명령별로 바로 쓰기

### 최근 커밋을 하나로 묶기

```bash
git log --oneline --decorate -n 8
git reset --soft <남겨둘 마지막 커밋>
git commit -m "새 커밋 메시지"
```

예:

```text
a63819c5  남겨둘 마지막 커밋
f169d84f
35ac9970
f401a7d5
```

```bash
git reset --soft a63819c5
git commit -m "결제 테스트 정리"
```

주의:
- 워킹트리가 지저분하면 먼저 정리한다
- 로컬 수정과 히스토리 정리 대상을 섞지 않는다

### 중간 커밋 하나 빼기

```bash
git rebase -i HEAD~3
```

편집기 예시:

```text
pick <aaaa해시> aaaa
drop <bbbb해시> bbbb
pick <cccc해시> cccc
```

자주 쓰는 옵션:
- `pick`: 그대로 둠
- `drop`: 커밋 제거
- `squash`: 앞 커밋과 합침
- `reword`: 메시지만 변경

주의:
- 공유 브랜치에서는 신중히 사용한다

### 공유된 커밋 되돌리기

```bash
git revert <커밋해시>
```

특징:
- 기존 커밋은 남는다
- 되돌림 커밋이 새로 생긴다

## 자주 쓰는 판단 기준

| 질문 | 답 | 명령 |
|---|---|---|
| 최근 커밋을 다시 만들고 싶은가 | 예 | `reset --soft` |
| 중간 커밋을 선택적으로 정리하고 싶은가 | 예 | `rebase -i` |
| 이미 원격에 올린 기록을 건드리면 안 되는가 | 예 | `revert` |

## push 관련 메모

`reset`이나 `rebase`로 히스토리를 바꿨고 원격 브랜치에도 이미 올라가 있다면 보통 아래 명령이 필요하다.

```bash
git push --force-with-lease
```

## 최소 확인 순서

```bash
git status --short
git log --oneline --decorate -n 8
```

## 마지막 정리

- 최근 커밋 다시 묶기: `reset --soft`
- 중간 커밋 정리: `rebase -i`
- 공유된 커밋 취소: `revert`

## 이력관리
- 2026-04-15: `reset`, `rebase`, `revert`의 차이와 실무 활용 기준 중심으로 문서를 전면 재구성
- 2026-04-15: `reset --soft` 예시에서 로컬 수정과 히스토리 정리를 섞지 않도록 작업 순서를 보완
- 2026-04-15: 설명형 구성을 줄이고 바로 참고할 수 있는 레퍼런스 형태로 재작성
