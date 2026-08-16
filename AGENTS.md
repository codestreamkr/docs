# CodeStream 문서 저장소 작업 기준

이 저장소의 문서만 다룬다. 저장소 구조와 시작 경로는 [README.md](./README.md)에서 확인한다.

## 정본 분리

- 문제 유형별 작업 흐름과 단계별 판단 기준: `Playbooks`
- 제품별 설정, Skill, 명령과 실행 방법: `Platforms/<제품>`
- 같은 내용을 두 문서에 쓰지 않고 정본 한 곳에 두고 나머지는 링크한다.
- `Playbooks`에는 Skill 호출 표기를 쓰지 않는다. 호출 표기는 `Platforms`가 관리한다.
- 새 제품을 추가해도 작업 흐름은 복사하지 않고 `Playbooks`를 링크한다.

## 플랫폼 문서 구조

`Platforms/<제품>`은 다음 6개 문서로 고정한다.

`README.md`, `setup.md`, `skills.md`, `commands.md`, `workflows.md`, `extensions.md`

제품 전용 학습 자료는 해당 플랫폼의 `reference/`에 둔다.

## 표기

- 본문은 한국어로 작성한다.
- 코드명, 파일명, 명령, API명과 제품명은 원문 표기를 유지한다.
- 사용자 Skill 호출은 Codex `$ct-*`, Claude Code와 Grok Build `/ct-*`, Pi `/skill:ct-*`로 적는다.
- 문서에 이력관리 섹션을 두지 않는다.

## 사실 확인

- 제품 기능, 명령, 설정과 버전은 공식 문서와 현재 설치 환경으로 확인한 내용만 적는다.
- 확인되지 않은 내용은 `확인 필요`로 표시한다.

## 링크

- 내부 링크는 저장소 기준 상대 경로를 사용한다.
- 문서를 추가, 이동하거나 이름을 바꾸면 `README.md`, `index.md`와 해당 영역 `README.md`의 링크를 함께 갱신한다.
