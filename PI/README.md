# Pi 학습 가이드

Pi를 처음 실행하는 단계부터 프로젝트 적용, 확장과 자동화까지 순서대로 안내한다.

## 문서 기준

이 문서 묶음은 아래 공식 자료를 기준으로 관리한다.

- 기준 Pi 버전: `0.80.6`
- 최소 Node.js 버전: `22.19.0`
- 기준일: `2026-07-13`
- 공식 자료:
  - [Pi Coding Agent](https://github.com/earendil-works/pi/tree/main/packages/coding-agent)
  - [Quickstart](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/quickstart.md)
  - [Security](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md)
  - [CLI Reference](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md)
  - [Pi Packages](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md)
  - [Changelog](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md)

명령, 설정, Extension API는 기준 버전이 바뀔 때 공식 자료와 다시 대조한다.

## 권장 학습 순서

처음에는 기본 작업 흐름을 익히고 확장과 자동화는 필요한 시점에 확인한다.

| 단계 | 문서 | 완료 기준 |
|---|---|---|
| 시작 | [01. Pi 시작하기](./01-getting-started-and-key-concepts.md) | 설치, 인증, 첫 요청을 완료한다 |
| 기본 이해 | [02. Pi 기본 개념](./02-understanding-core-concepts.md) | 화면, 모델, 세션, 컨텍스트를 구분한다 |
| 명령 참조 | [06. 기본 명령](./06-basic-commands.md) | 자주 쓰는 명령과 단축키를 확인한다 |
| 프로젝트 도입 | [04. 프로젝트 시작](./04-starting-a-project.md) | 기준 상태, 지침, 설정, 검증 명령을 준비한다 |
| 일상 작업 | [05. 프로젝트 코딩](./05-project-cooking.md) | 분석, 계획, 수정, 검증, 검토 순서로 작업한다 |
| Spring/Java | [07. 분석과 테스트](./07-analysis-and-testing.md) | 호출 흐름을 분석하고 테스트 결과를 검증한다 |
| 확장과 자동화 | [03. 핵심 개념 활용](./03-applying-core-concepts.md) | Extension, Skill, package, SDK, RPC의 용도를 구분한다 |

## 예제 package

문서에서 사용하는 로컬 package는 저장소에 포함한다.

- 경로: [`examples/basic-pi-package`](./examples/basic-pi-package/)
- 포함 리소스:
  - `/ready-pr` Prompt Template
  - `/skill:project-check` Skill
- 확인 절차: [03. 핵심 개념 활용](./03-applying-core-concepts.md)의 Pi package 실습

## 문서 역할

같은 설명은 한 문서에서 관리하고 다른 문서에서는 필요한 시점과 참조만 제공한다.

- 설치, 인증, 첫 실행: `01`
- 기본 개념과 설정 의미: `02`
- Extension, Skill, package, SDK, RPC 실습: `03`
- 프로젝트 최초 준비: `04`
- 작업마다 반복하는 개발 흐름: `05`
- 명령과 단축키 기준: `06`
- Spring/Java 특화 분석과 테스트: `07`

## 갱신 완료 조건

Pi 버전을 올릴 때 아래 항목을 확인한다.

- `package.json`의 버전과 Node.js 최소 버전을 확인한다.
- 설치, 인증, Project Trust 절차를 공식 문서와 대조한다.
- `pi --help`, `/hotkeys`, `/changelog`에서 명령과 단축키를 확인한다.
- package 설치, 호출, 제거 예제가 실제 경로와 일치하는지 확인한다.
- Extension과 SDK 예제가 기준 버전에서 로드되는지 확인한다.
- 내부 상대 링크와 외부 공식 링크가 열리는지 확인한다.
- 각 문서의 `## 이력관리`에는 최종 변경 내용만 기록한다.

## 이력관리

- 2026-07-13: Pi 0.80.6 기준, 학습 순서, 문서 역할, 예제 package와 갱신 완료 조건 추가
