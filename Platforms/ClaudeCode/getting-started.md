# Claude Code 시작하기

Claude Code는 프로젝트 폴더에서 실행하고 작은 읽기 작업으로 현재 맥락을 먼저 확인한다.

## 설치와 실행

공식 설치 방법을 확인한 뒤 프로젝트에서 실행한다.

```bash
npm install -g @anthropic-ai/claude-code
cd /path/to/project
claude
```

설치 상태와 버전 문제는 다음 명령으로 진단한다.

```bash
claude doctor
```

권한 확인을 건너뛰는 옵션은 승인과 샌드박스를 별도로 보장하는 격리 환경에서만 사용한다.

## 첫 요청

처음에는 파일을 수정하지 않는 조사 요청으로 시작한다.

```text
이 저장소의 기술 스택, 주요 모듈과 빌드·테스트 명령을 찾아줘.
적용되는 CLAUDE.md와 Git 변경사항도 확인하고 아직 수정하지 마.
```

확인할 결과:

- 현재 작업 루트
- 적용된 `CLAUDE.md`
- 기술 스택과 주요 모듈
- 빌드와 테스트 명령
- Git 변경사항

## 첫 변경

범위가 작은 문서나 코드 변경을 요청한다.

```text
README의 로컬 실행 절차만 현재 스크립트에 맞게 수정해줘.
다른 섹션은 유지하고 변경과 검증 결과를 알려줘.
```

공통 작업 순서는 [안전한 작업 흐름](../../Playbooks/safe-work-cycle.md)을 따른다.

## 완료 기준

- 프로젝트 루트에서 Claude Code를 실행했다.
- 적용된 지침과 Git 상태를 확인했다.
- 읽기 요청과 변경 요청을 구분했다.
- 작은 변경의 diff와 검증 결과를 확인했다.

## 공식 문서 기준

- [Claude Code 설정과 설치](https://docs.anthropic.com/en/docs/claude-code/getting-started)
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/cli-usage)

## 이력관리

- 2026-07-13: 권한 우회 실행을 기본값에서 제외하고 공통 작업 흐름과 연결한 첫 실행 문서로 재구성
- 2026-05-11: 이력관리 섹션 정리
- 2026-04-09: 최초 생성
