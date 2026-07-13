# Codex 시작하기

Codex는 작업 위치에 맞는 환경을 선택한 뒤 작은 읽기 작업부터 시작한다.

## 환경 선택

작업 위치와 필요한 상호작용을 기준으로 고른다.

- ChatGPT desktop app의 Codex: 계획, 검토와 로컬 파일 작업
- Codex CLI: 터미널 중심의 로컬 저장소 작업
- Codex IDE extension: 편집 중인 코드와 선택 영역 중심 작업
- Codex cloud: 연결한 저장소의 백그라운드 작업

이 문서는 Codex CLI의 로컬 저장소 작업을 기준으로 한다.

## 설치와 실행

현재 공식 설치 안내를 확인한 뒤 프로젝트 루트에서 실행한다.

```bash
npm install -g @openai/codex
cd /path/to/project
codex
```

설치 방식과 인증 지원 범위는 버전에 따라 달라질 수 있다.

## 첫 요청

처음에는 파일을 수정하지 않는 조사 요청으로 프로젝트 인식을 확인한다.

```text
이 저장소의 기술 스택, 주요 모듈과 빌드·테스트 명령을 찾아줘.
아직 파일은 수정하지 마.
```

확인할 결과:

- 현재 작업 루트
- 적용된 `AGENTS.md`
- 기술 스택과 주요 모듈
- 빌드와 테스트 명령
- Git 변경사항

## 첫 변경

범위가 작은 문서나 코드 변경을 요청한다.

```text
README의 로컬 실행 절차만 현재 스크립트에 맞게 수정해줘.
다른 섹션은 유지하고 변경 후 diff를 확인해줘.
```

공통 작업 순서는 [안전한 작업 흐름](../../Playbooks/safe-work-cycle.md)을 따른다.

## 완료 기준

- 프로젝트 루트에서 Codex를 실행했다.
- 적용된 지침과 Git 상태를 확인했다.
- 읽기 요청과 변경 요청을 구분했다.
- 작은 변경의 diff와 검증 결과를 확인했다.

## 공식 문서 기준

- [Codex Quickstart](https://developers.openai.com/codex/quickstart/)
- [Codex CLI](https://developers.openai.com/codex/cli/)

## 이력관리

- 2026-07-13: 공통 작업 흐름을 분리하고 Codex 설치, 환경 선택과 첫 실행만 남김
