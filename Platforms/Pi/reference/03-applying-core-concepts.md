# 03. [중급] Pi 확장과 자동화

Pi 1.x 공식 문서 기준으로 반복 문구, 작업 절차와 실행 기능을 나눠 확장해요.  
처음에는 프로젝트의 로컬 자원으로 확인하세요.

## 1. Prompt Template 만들기

반복할 요청을 파일에 저장하고 파일 이름으로 호출해요.  
작성과 호출은 [Prompt Template 예제](../extensions.md#prompt-template)를 따르세요.  
실행 결과에 변경 요약과 테스트 상태가 포함되는지 확인하세요.

## 2. Skill로 절차 묶기

`.pi/skills/project-check-local/SKILL.md`에 절차를 작성하세요.

```markdown
---
name: project-check-local
description: 프로젝트의 실행·검증 명령을 읽기 전용으로 점검한다.
---

# 프로젝트 점검

1. README와 빌드 설정을 읽는다.
2. 정의된 실행·테스트 명령과 근거 파일을 정리한다.
3. 파일을 수정하거나 명령을 실행하지 않는다.
```

`/reload` 후 호출하세요.

```text
/skill:project-check-local
```

근거가 없는 명령을 추측하지 않았는지 확인하세요.

## 3. Package 설치와 확인

[로컬 예제 Package](../examples/basic-pi-package/)에는 Prompt와 Skill이 들어 있어요.  
설치와 신뢰 절차는 [Pi Package](../extensions.md#pi-package)를 따르세요.

설치한 뒤 채팅창에서 템플릿을 실행하세요.

```text
/ready-pr
```

여러 프로젝트에서 같은 자원을 사용한다면 Package로 배포하세요.  
배포 파일의 `pi` 항목으로 자원 경로를 지정해요.

```json
{
  "pi": {
    "prompts": ["./prompts"],
    "skills": ["./skills"]
  }
}
```

## 4. 실행 코드를 추가할 때

| 목적 | 수단 | 공식 예제 |
| --- | --- | --- |
| 요청 전처리와 도구 결과 후처리 | Extension 이벤트 | [Extension](https://pi.dev/docs/latest/extensions) |
| 사내 API·로컬 스크립트 호출 | 사용자 도구 | [도구 등록](https://pi.dev/docs/latest/extensions) |
| 모델 게이트웨이와 인증 연결 | Provider Extension | [모델 제공자](https://pi.dev/docs/latest/custom-provider) |
| 터미널 선택창과 상태 UI | TUI Component | [TUI](https://pi.dev/docs/latest/tui) |

Extension 파일은 `.pi/extensions/`에 두고 `/reload`로 읽어요.  
공식 예제의 입력·출력 형식을 사용하고 실제 도구 실행 결과를 확인하세요.  
반복 로그 처리는 원본을 남긴 뒤 필요한 결과만 모델에 전달하세요.

## 5. 다른 프로그램에서 실행하기

최종 응답만 필요하면 터미널에서 한 번 실행하세요.

```bash
pi -p "현재 변경을 요약하고 필요한 테스트 명령을 알려줘"
```

진행 이벤트가 필요하면 JSON 모드를 사용하세요.

```bash
pi --mode json "프로젝트 구조를 요약해줘"
```

지속 통신은 [RPC](https://pi.dev/docs/latest/rpc), Node.js 내장은 [SDK](https://pi.dev/docs/latest/sdk)를 사용하세요.  
CLI·Extension·SDK의 API 호환성은 설치 버전의 변경 기록에서 확인하세요.

## 6. 다른 해결 방향 비교하기

세션 트리에서 이전 요청을 선택하세요.

```text
/tree
```

다른 방향으로 요청하고 기존 결과와 비교하세요.  
현재 흐름을 별도 세션으로 복제하려면 `/clone`을 사용하세요.  
세션 분기와 파일 격리는 [작업 흐름](../workflows.md#pi-고유-작업)을 확인하세요.

## 공식 문서

- [Prompt Template](https://pi.dev/docs/latest/prompt-templates)
- [Skill](https://pi.dev/docs/latest/skills)
- [Package](https://pi.dev/docs/latest/packages)
- [CLI 연동](https://pi.dev/docs/latest/cli-integration)
- [변경 기록](https://pi.dev/changelog)
