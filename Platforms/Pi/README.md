# Pi 가이드

Pi로 프로젝트를 분석하고 코드를 수정해요.  
이 가이드는 CLI 실행, 사용자 Skill과 확장 기능을 안내해요.  
여러 작업을 연결하는 순서는 [Playbook](../../Playbooks/README.md)을 확인하세요.

## 바로 시작

1. [환경 설정](./setup.md)에 따라 설치와 인증을 마치세요.  
2. 프로젝트 폴더의 터미널에서 실행하세요.

```bash
pi
```

3. Pi 채팅창에서 프로젝트 파악을 요청하세요.

```text
현재 작업 루트와 적용된 지침을 확인해줘.
빌드·테스트 방법을 근거 파일과 함께 알려줘.
파일은 수정하지 마.
```

4. 사용자 Skill을 설치했다면 필요한 작업을 요청하세요.

```text
/skill:ct-plan 주문 취소의 중복 요청 방지 계획을 작성해줘
```

## 무엇을 하려나요?

| 목적 | Skill | 시작 예제 |
| --- | --- | --- |
| 코드 분석 | `ct-analyze` | `/skill:ct-analyze 주문 취소 흐름을 분석해줘` |
| 구현 계획 | `ct-plan` | `/skill:ct-plan 주문 취소 구현 계획을 작성해줘` |
| 구현과 테스트 | `ct-apply` | `/skill:ct-apply 확정된 계획을 구현하고 테스트해줘` |
| 결과 검증 | `ct-verify` | `/skill:ct-verify 변경이 요구사항을 충족하는지 검증해줘` |

전체 호출 예제는 [사용자 Skill](./skills.md)을 확인하세요.

## 필요한 문서

| 알고 싶은 것 | 문서 |
| --- | --- |
| 설치·인증·지침·권한·업데이트 | [환경 설정](./setup.md) |
| 채팅창과 터미널 명령 | [명령 확인](./commands.md) |
| 분석부터 검토와 세션 관리 | [작업 흐름](./workflows.md) |
| 외부 도구와 반복 작업 확장 | [확장 기능](./extensions.md) |
| 주요 기능과 호환성 변경 | [릴리스](./releases.md) |

## 사용 기준

- CodeStream Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init)을 설치한 뒤 사용하세요.
- 코드 블록 헤더에서 터미널과 Pi 채팅창을 구분하세요.
- 변경 파일, 테스트 결과와 미검증 항목을 확인하세요.

## 심화 학습 자료

| 주제 | 문서 |
| --- | --- |
| 설치, 인증과 첫 세션 | [01. Pi 시작하기](./reference/01-getting-started-and-key-concepts.md) |
| 화면, 모델, 세션과 자원 | [02. Pi 기본 개념](./reference/02-understanding-core-concepts.md) |
| Extension, Package, SDK와 RPC | [03. Pi 확장과 자동화](./reference/03-applying-core-concepts.md) |
| 프로젝트 최초 준비 | [04. 프로젝트 시작](./reference/04-starting-a-project.md) |
| 반복 개발 흐름 | [05. 프로젝트 코딩](./reference/05-project-cooking.md) |
| 명령과 단축키 상세 | [06. Pi 기본 명령](./reference/06-basic-commands.md) |
| Spring·Java 분석과 테스트 | [07. Spring/Java 프로젝트 분석과 테스트](./reference/07-analysis-and-testing.md) |


[예제 Package](./examples/basic-pi-package/)로 Prompt와 Skill 설치를 실습하세요.

## 공식 문서

- [Pi 시작 안내](https://pi.dev/docs/latest/quickstart)
