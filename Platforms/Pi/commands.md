# Pi 명령 확인

Pi 명령은 버전과 설치된 Extension에 따라 달라질 수 있어요.  
전체 목록을 문서에 복제하지 않고 현재 입력창과 공식 문서를 기준으로 확인해요.

## 네 가지가 같은 목록에 보여요

입력창에 `/`를 입력하면 성격이 다른 넷이 한 목록에 섞여 나와요.

| 구분 | 누가 관리 | 예 |
| --- | --- | --- |
| 내장 명령 | Pi가 제공 | `/model`, `/session`, `/trust` |
| Skill | 사용자와 프로젝트 | `/skill:ct-plan-work` |
| Prompt Template | 사용자와 프로젝트 | 만든 `.md` 파일 이름. 기본 제공 없음 |
| Extension 명령 | 설치한 Extension | Extension마다 달라요 |

변경 검토는 [작업 흐름](./workflows.md#구현한-변경-검토하기)을 봐요.

Skill이 명령 목록에 보이는지는 `enableSkillCommands` 설정이 정해요.  
꺼도 `/skill:이름`을 직접 입력하면 동작해요.

이 문서는 명령을 찾는 방법만 다뤄요.  
각 기능의 설정 키와 실행 옵션은 [환경 설정](./setup.md)에 기능별로 모아뒀어요.

## 현재 명령 찾기

아래는 `ct-*` 작업 중에 자주 쓰는 것만 추렸어요.  
전체 목록은 공식 문서를 봐요.

모델과 설정:

| 명령 | 용도 | 함께 볼 것 |
| --- | --- | --- |
| `/model` | 사용할 모델 선택. `Ctrl+S`로 기본값 저장 | [모델 연결](./setup.md#모델-연결) |
| `/scoped-models` | `Ctrl+P`로 순환할 모델 목록 지정 | [모델 연결](./setup.md#모델-연결) |
| `/thinking` | 추론 수준 변경. `Shift+Tab`으로도 순환 | [추론 수준](./setup.md#추론-수준) |
| `/llama` | 로컬 llama.cpp 모델 관리 | [모델 연결](./setup.md#모델-연결) |
| `/login`, `/logout` | 제공자 인증 추가와 제거 | [인증](./setup.md#인증) |
| `/settings` | 설정 열기 | [Settings](./setup.md#settings) |
| `/reload` | Extension, Skill, Prompt와 지침 파일 다시 읽기 | |
| `/hotkeys` | 단축키 전체 확인 | [화면 모드](./setup.md#화면-모드) |

세션과 컨텍스트:

| 명령 | 용도 |
| --- | --- |
| `/session` | 세션 파일, ID, 메시지 수와 비용 확인 |
| `/new` | 새 세션 시작 |
| `/resume` | 저장된 다른 세션으로 전환 |
| `/name` | 세션 표시 이름 지정 |
| `/compact` | 대화를 요약해 컨텍스트 확보 |
| `/tree` | 세션의 특정 지점으로 이동해 계속하기 |
| `/fork` | 이전 요청을 기준으로 새 세션 분기 |
| `/clone` | 현재 지점에서 세션 복제 |

결과 공유와 반입:

| 명령 | 용도 |
| --- | --- |
| `/copy` | 마지막 응답 복사 |
| `/export` | 세션을 HTML 또는 JSONL로 내보내기 |
| `/import` | JSONL 세션 가져오기 |
| `/share` | 세션을 업로드하고 열람 링크 받기 |

`/share`는 세션을 외부에 올려요. 올리기 전에 자격증명과 사내 정보가 섞이지 않았는지 확인해요.

프로젝트 준비:

| 명령 | 용도 |
| --- | --- |
| `/trust` | 현재 프로젝트의 신뢰 결정 저장. 기본 동작은 [프로젝트 신뢰](./setup.md#프로젝트-신뢰) |
| `/changelog` | 변경 내역 확인 |
| `/quit` | Pi 종료 |

## CLI에서 확인

설치된 CLI의 기본 명령과 옵션을 확인해요.

```bash
pi --help
pi <command> --help
```

| 명령 | 용도 |
| --- | --- |
| `pi` | 대화형 세션 시작 |
| `pi "요청"` | 첫 요청과 함께 세션 시작 |
| `pi @file "요청"` | 파일을 첨부해 시작 |
| `pi -p "요청"` | 비대화형 결과 출력 |
| `pi -c` | 이전 세션 계속하기 |
| `pi -r` | 세션 선택해 다시 열기 |
| `pi install <source>` | Package 설치 |
| `pi list` | 설치한 Extension과 Package 확인 |
| `pi config` | Package 자원 사용 여부 설정 |
| `pi remove <source>` | Package 제거 |
| `pi auth check` | 제공자나 모델의 자격증명 확인 |
| `pi --list-models` | 사용할 수 있는 모델 확인 |
| `pi update` | Pi만 업데이트 |
| `pi update --all` | Pi와 설치한 Package 업데이트 |
| `pi update --extensions` | 설치한 Package만 업데이트 |
| `pi update --models` | 모델 카탈로그만 갱신 |

자주 사용하는 실행 옵션:

| 옵션 | 용도 |
| --- | --- |
| `--provider`, `--model` | 사용할 제공자와 모델 지정 |
| `--models` | 세션 중 전환할 모델 목록 제한 |
| `--thinking` | thinking 수준 지정 |
| `--tools`, `-t` | 사용할 도구 목록 제한 |
| `--exclude-tools`, `-xt` | 특정 도구만 끄기 |
| `--no-tools`, `-nt` | 모든 도구 끄기 |
| `--skill <경로>` | 지정한 Skill 파일이나 디렉터리 로드 |
| `--extension <경로>` | 지정한 Extension 로드 |
| `--no-extensions` | Extension 자동 탐색 끄기 |
| `--no-context-files` | 지침 파일 로드 끄기 |
| `--mode` | 출력 방식 지정: `text`, `json`, `rpc` |
| `--session`, `--fork` | 특정 세션 사용 또는 분기 |
| `--session-id` | 정해진 세션 ID로 만들거나 이어가기 |
| `--name`, `-n` | 세션 표시 이름 지정 |
| `--no-session` | 세션을 저장하지 않고 실행 |
| `--approve`, `--no-approve` | 프로젝트 신뢰를 자동 승인 또는 거부 |
| `--export <파일>` | 세션을 HTML로 내보내고 종료 |
| `--tui-mode` | `regular` 또는 `fullscreen` 지정 |
| `--offline` | 시작할 때의 네트워크 동작 끄기 |

Extension이 실행 옵션을 추가할 수 있어요.  
설치한 뒤에는 `pi --help`를 다시 확인해요.

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령과 Skill을 찾아요.
2. 단축키는 `/hotkeys`에서 확인해요.
3. CLI 옵션은 설치된 `pi --help`에서 확인해요.
4. 동작과 지원 범위는 Pi 공식 문서에서 확인해요.

## 확인 기준

2026-09-23에 공식 문서와 설치본 `0.87.1`로 확인했어요.  
명령과 옵션은 버전마다 달라지므로 이 문서보다 현재 환경의 출력을 우선해요.

## 공식 문서

- [Slash Commands](https://pi.dev/docs/latest/slash-commands)
- [Command Line](https://pi.dev/docs/latest/cli)
- [Keybindings](https://pi.dev/docs/latest/keybindings)
- [Sessions](https://pi.dev/docs/latest/sessions)
