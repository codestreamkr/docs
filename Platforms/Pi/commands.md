# Pi 명령 확인

Pi 명령은 버전과 설치된 Extension에 따라 달라질 수 있다. 전체 목록을 문서에 복제하지 않고 현재 입력창과 공식 문서를 기준으로 확인한다.

## 현재 명령 찾기

입력창에 `/`를 입력해 현재 환경에서 제공하는 명령을 확인한다. Extension이 추가한 명령도 같은 목록에 나온다.

작업을 시작할 때 자주 확인하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/model` | 사용할 모델 선택 |
| `/settings` | thinking 수준, 테마와 전송 방식 변경 |
| `/reload` | Extension, Skill, Prompt와 지침 파일 다시 읽기 |
| `/hotkeys` | 단축키 전체 확인 |

세션을 관리할 때 사용하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/session` | 세션 파일, ID, 메시지 수와 비용 확인 |
| `/compact` | 대화를 요약해 컨텍스트 확보 |
| `/new` | 새 세션 시작 |
| `/resume` | 이전 세션 선택해 이어가기 |
| `/tree` | 세션의 특정 지점으로 이동해 계속하기 |
| `/fork` | 이전 요청을 기준으로 새 세션 분기 |
| `/export` | 세션을 HTML로 내보내기 |

사용자 Skill은 `/skill:ct-*`로, Prompt Template은 `/템플릿이름`으로 호출한다.

## CLI에서 확인

설치된 CLI의 기본 명령과 옵션을 확인한다.

```bash
pi --help
pi <command> --help
```

| 명령 | 용도 |
| --- | --- |
| `pi` | 대화형 세션 시작 |
| `pi "요청"` | 첫 요청과 함께 세션 시작 |
| `pi -p "요청"` | 비대화형 결과 출력 |
| `pi -c` | 이전 세션 계속하기 |
| `pi -r` | 세션 선택해 다시 열기 |
| `pi list` | 설치한 Extension과 Package 확인 |
| `pi config` | Package 자원 사용 여부 설정 |
| `pi --list-models` | 사용할 수 있는 모델 확인 |
| `pi update` | Pi와 설치한 Package 업데이트 |

자주 사용하는 실행 옵션:

| 옵션 | 용도 |
| --- | --- |
| `--provider`, `--model` | 사용할 제공자와 모델 지정 |
| `--thinking` | thinking 수준 지정 |
| `--skill <경로>` | 지정한 Skill 파일이나 디렉터리 로드 |
| `--extension <경로>` | 지정한 Extension 로드 |
| `--mode` | 출력 방식 지정: `text`, `json`, `rpc` |
| `--tools` | 사용할 도구 목록 제한 |
| `--no-context-files` | 지침 파일 로드 끄기 |

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령과 Skill을 찾는다.
2. 단축키는 `/hotkeys`에서 확인한다.
3. CLI 옵션은 설치된 `pi --help`에서 확인한다.
4. 동작과 지원 범위는 Pi 공식 문서에서 확인한다.

## 공식 문서

- [CLI Reference](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md)
- [Keybindings](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/keybindings.md)
- [Sessions](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sessions.md)
