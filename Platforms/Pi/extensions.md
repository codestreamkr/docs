# Pi 확장 기능

반복 문구는 Prompt Template, 작업 절차는 Skill, 실행 기능은 Extension으로 추가해요.

## 선택 기준

| 필요한 것 | 선택 |
| --- | --- |
| 프로젝트 공통 규칙 | `AGENTS.md` |
| 반복 요청 문구 | Prompt Template |
| 절차와 참고 자료 | Skill |
| 도구·명령·이벤트 처리 | Extension |
| 외부 도구 연결 | MCP |
| 여러 자원 설치와 배포 | Pi Package |

Skill 설치는 [환경 설정](./setup.md#사용자-skill), 호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## Prompt Template

반복할 요청을 `.pi/prompts/ready-pr.md`에 저장하세요.

```markdown
---
description: PR 설명 초안을 작성한다
---
현재 Git 변경을 읽고 변경 요약, 테스트 결과와 PR 설명 초안을 작성해줘.
파일은 수정하지 마.
```

채팅창에서 `/reload` 후 파일 이름으로 호출하세요.

```text
/ready-pr
```

## MCP 연결

터미널에서 서버를 등록하세요.  
`https://example.com/mcp`를 사용할 서버 주소로 바꾸세요.

```bash
pi mcp add docs --url https://example.com/mcp
```

채팅창에서 `/reload` 후 연결을 확인하세요.

```text
/mcp
```

OAuth 인증이 필요한 서버는 먼저 로그인하세요.

```text
/mcp login docs
```

인증이 필요하지 않으면 바로 도구 사용을 요청하세요.

```text
연결한 docs MCP로 프로젝트의 API 문서를 찾아줘.
요청과 응답 형식을 공식 링크와 함께 알려줘.
```

## Pi Package

[로컬 예제 Package](./examples/basic-pi-package/)의 파일을 확인한 뒤 저장소 루트에서 설치하세요.

```bash
pi install -l ./Platforms/Pi/examples/basic-pi-package --approve
pi list --approve
```

`-l`은 프로젝트 설치, `--approve`는 해당 명령에서 프로젝트 자원을 신뢰하는 옵션이에요.  
채팅창에서 `/trust`로 신뢰 결정을 저장하고 Pi를 다시 실행하세요.

```text
/skill:project-check
```

Package를 조정하려면 터미널의 `pi config -l`, 제거하려면 `pi remove -l <source>`를 사용하세요.

## 실행 모드와 내장

| 방식 | 용도 | 공식 문서 |
| --- | --- | --- |
| `pi -p` | 한 번 실행하고 최종 텍스트 받기 | [CLI 연동](https://pi.dev/docs/latest/cli-integration) |
| `pi --mode json` | 진행 이벤트를 JSONL로 받기 | [JSON 이벤트](https://pi.dev/docs/latest/json) |
| RPC | 다른 프로세스에서 지속 제어 | [RPC](https://pi.dev/docs/latest/rpc) |
| SDK | Node.js 프로그램에 내장 | [SDK](https://pi.dev/docs/latest/sdk) |

간단한 실행은 [작업 흐름](./workflows.md#반복-작업-실행)의 예제를 사용하세요.

## 다른 확장 기능

- [Extension](https://pi.dev/docs/latest/extensions): TypeScript로 도구·명령·이벤트 처리를 추가해요.
- [모델 제공자](https://pi.dev/docs/latest/custom-provider): 사내 API나 로컬 모델을 연결해요.
- [Theme](https://pi.dev/docs/latest/themes): 터미널 화면 색상을 바꿔요.
- [Codemode](https://pi.dev/docs/latest/codemode): 여러 도구를 호출하고 필요한 결과만 모델에 전달해요.
- [가상 모델](https://pi.dev/docs/latest/virtual-models): 요청마다 실제 모델과 추론 수준을 선택해요.
- [Pi Durable](https://earendil.com/posts/pi-durable/): 재시작 후 복구할 장기 실행 서비스를 만들어요.
- [격리 실행](https://pi.dev/docs/latest/containerization): 컨테이너나 샌드박스로 파일·네트워크 범위를 제한해요.
- [Extension 호환성](https://pi.dev/changelog): 업데이트 전 이벤트와 SDK 변경사항을 확인해요.

직접 만드는 절차는 [확장 실습](./reference/03-applying-core-concepts.md)을 확인하세요.

## 공식 문서

- [Prompt Template](https://pi.dev/docs/latest/prompt-templates)
- [MCP 연결](https://pi.dev/docs/latest/mcp)
- [Package 설치와 배포](https://pi.dev/docs/latest/packages)
