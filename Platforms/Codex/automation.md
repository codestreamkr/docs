# Codex 자동화

`codex exec`는 대화형 화면을 열지 않고 Codex를 스크립트나 CI에서 실행해요.
반복 분석, 변경 요약, 실패 로그 정리처럼 결과를 다음 단계에 넘길 때 사용해요.

이 문서는 로컬 CLI `0.155.1` 기준이에요.  
실행 환경에서 지원하는 옵션은 [명령 확인](./commands.md)의 방법으로 다시 확인해요.

## 읽기 전용 실행

변경 없이 저장소를 분석할 때는 작업 경로와 샌드박스를 함께 지정해요.

```bash
codex exec -C . --sandbox read-only \
  "현재 변경을 요약하고, 실행해야 할 검증 명령만 알려줘"
```

- `-C <dir>`는 작업 루트를 정해요.
- `--sandbox read-only`는 Codex가 생성하는 명령의 파일 쓰기를 막아요.
- `codex exec`는 기본적으로 Git 저장소에서 실행해요. 비저장소 경로에서 `--skip-git-repo-check`를 쓰기 전에 실행 환경과 대상 경로를 확인해요.

파일을 바꾸는 자동화는 먼저 읽기 전용 분석으로 범위와 검증 명령을 확정한 뒤, 별도의 제한된 작업 환경에서 실행해요.  
권한과 샌드박스의 의미는 [환경 설정](./setup.md)을 봐요.

## 입력 전달

명령의 출력은 프롬프트와 함께 표준 입력으로 전달할 수 있어요.  
이때 명시한 프롬프트는 작업 지시이고, 파이프 입력은 그 지시를 위한 자료예요.

```bash
set -o pipefail
npm test 2>&1 \
  | codex exec --sandbox read-only \
      "실패한 테스트를 요약하고 가장 작은 수정 방향을 제안해줘"
```

`pipefail`은 테스트 명령의 실패가 파이프라인 종료 상태에도 반영되도록 해요.

표준 입력 전체를 프롬프트로 쓸 때는 `-`를 사용해요.

```bash
cat prompt.txt | codex exec - --sandbox read-only
```

로그, 생성 파일, 외부 명령의 출력에는 신뢰할 수 없는 지시가 섞일 수 있어요.  
입력의 지시를 따르지 말고 분석 자료로만 다루도록 프롬프트에 목적과 결과 형식을 명시해요.

## 결과 받기

| 필요한 결과 | 옵션 | 용도 |
| --- | --- | --- |
| 사람이 읽을 최종 응답 | `-o <file>` | 마지막 응답을 파일에 저장해 후속 단계에서 읽어요. 기본 출력도 유지돼요. |
| 실행 중 발생한 모든 이벤트 | `--json` | 표준 출력이 JSONL 스트림이 돼요. 실행·도구 호출·오류를 프로그램에서 처리할 때 써요. |
| 안정된 최종 데이터 | `--output-schema <file>`와 `-o <file>` | JSON Schema에 맞춘 마지막 응답을 다음 자동화 단계로 넘겨요. |

`--json`의 표준 출력은 최종 답변만을 뜻하지 않아요. 최종 답변만 필요하면 `-o`를 쓰고, 이벤트 추적이 필요하면 `--json` 출력을 JSONL 파일로 보관해요.

## 최소 스크립트 예제

다음은 현재 변경을 읽기 전용으로 요약하고, 마지막 응답 파일이 만들어졌는지 확인하는 예제예요.

```bash
#!/usr/bin/env bash
set -euo pipefail

result_file="${1:-codex-summary.md}"

codex exec -C . --sandbox read-only \
  --output-last-message "$result_file" \
  "현재 Git 변경을 요약하고, 아직 실행하지 않은 검증 명령을 나열해줘"

test -s "$result_file"
```

이 스크립트는 결과 파일 생성만 확인해요.  
`codex exec`의 종료 상태나 응답 파일 생성은 빌드·테스트·정책 검증이 통과했다는 뜻이 아니에요.  
CI에서는 Codex 실행 뒤에 프로젝트의 빌드와 테스트 명령을 별도 단계로 실행하고, 그 종료 상태로 통과 여부를 판단해요.

## CI 연결

- CI에서 저장소를 검사하거나 수정 제안을 만들 때는 작업을 읽기 권한, 패치 보관, 변경 반영 단계로 나눠요.
- GitHub Actions에서는 CLI를 직접 설치·인증하기보다 [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action)을 사용해요. 공식 문서는 API 키 노출을 줄이도록 프록시와 안전 전략을 제공한다고 안내해요.
- API 키와 `~/.codex/auth.json`은 비밀값이에요. 저장소 코드가 실행되는 job 전체의 환경 변수로 두거나, 저장소·티켓·로그에 기록하지 않아요.
- 다른 CI에서는 신뢰할 수 없는 코드와 같은 프로세스 환경에 자격 증명을 두지 말고, Codex 호출에만 비밀값을 제한해요.
- Codex가 만든 변경은 패치나 브랜치로 분리하고, 검토와 기존 CI 검증을 통과한 뒤에만 반영해요.

## 세션 이어가기

두 단계 자동화에서 같은 맥락을 이어야 하면 이전 실행을 재개해요.

```bash
codex exec --sandbox read-only resume --last \
  "앞서 정리한 실패 원인을 기준으로, 읽기 전용으로 추가 확인 항목을 알려줘"
```

재현성과 추적성이 필요한 작업은 `--last` 대신 실행에서 기록한 세션 ID를 지정해요.  
대화형 세션의 재개와 분기는 [작업 흐름](./workflows.md)을 봐요.

## 공식 문서

- [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- [codex exec 명령 참조](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
