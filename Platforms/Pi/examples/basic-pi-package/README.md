# Pi 로컬 예제 package

Prompt Template과 Skill을 설치하고 호출하는 로컬 예제예요.

## 예제 구성

| 파일 | 역할 |
| --- | --- |
| [package.json](./package.json) | Prompt와 Skill 경로 등록 |
| [ready-pr.md](./prompts/ready-pr.md) | 변경 요약과 PR 설명 초안 요청 |
| [project-check/SKILL.md](./skills/project-check/SKILL.md) | 프로젝트 실행·검증 명령 점검 |

## 1. 설치

위 파일의 내용을 확인한 뒤 이 저장소 루트에서 설치하세요.

```bash
pi install -l ./Platforms/Pi/examples/basic-pi-package --approve
```

`--approve`는 해당 명령에서 프로젝트 자원을 신뢰해요.  
Pi 채팅창에서 `/trust`로 신뢰 결정을 저장하고 다시 실행하세요.

## 2. 호출

설치한 템플릿을 실행하세요.

```text
/ready-pr
```

실행·검증 명령을 점검하려면 Skill을 호출하세요.

```text
/skill:project-check
```

명령이 보이지 않으면 설치 위치와 프로젝트 신뢰를 확인하세요.

## 함께 보는 문서

- [Pi 확장 기능](../../extensions.md)
- [프로젝트 시작](../../reference/04-starting-a-project.md)
- [Spring/Java 프로젝트 분석과 테스트](../../reference/07-analysis-and-testing.md)

## 공식 문서

- [Pi Package](https://pi.dev/docs/latest/packages)
