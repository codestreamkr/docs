# Pi 로컬 예제 package

Prompt template과 Skill을 설치하고 호출하는 로컬 예제예요.

## 예제 구성

| 파일 | 역할 |
| --- | --- |
| [package.json](./package.json) | `prompts`와 `skills` 디렉터리를 Pi package에 등록해요. |
| [ready-pr.md](./prompts/ready-pr.md) | 변경 상태를 읽고 PR 제목과 본문 초안을 작성해요. |
| [project-check/SKILL.md](./skills/project-check/SKILL.md) | 프로젝트의 기술 스택과 실행·검증 명령을 읽기 전용으로 점검해요. |

## 1. 설치

이 저장소의 루트에서 터미널 명령을 실행해요.

```bash
pi install -l ./Platforms/Pi/examples/basic-pi-package
```

## 2. 호출

열린 Pi 세션의 입력창에서 예제를 호출해요.

```text
/ready-pr
/skill:project-check
```

## 함께 보는 문서

- [Pi 확장과 자동화](../../extensions.md)
- [04. 새 프로젝트 만들기](../../reference/04-starting-a-project.md)
- [07. Spring/Java 프로젝트 분석과 테스트](../../reference/07-analysis-and-testing.md)
