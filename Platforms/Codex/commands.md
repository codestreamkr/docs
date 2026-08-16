# Codex 명령 확인

Codex 명령은 제품과 실행 환경에 따라 달라질 수 있다. 전체 목록을 문서에 복제하지 않고 현재 입력창과 공식 문서를 기준으로 확인한다.

## 현재 명령 찾기

입력창에 `/`를 입력해 현재 환경에서 제공하는 명령을 확인한다.

작업을 시작할 때 자주 확인하는 명령:

| 명령 | 용도 |
| --- | --- |
| `/skills` | 현재 사용할 수 있는 Skill을 선택한다 |
| `/diff` | Git의 staged, unstaged와 untracked 변경을 확인한다 |
| `/mcp` | 현재 연결된 MCP 서버와 도구를 확인한다 |

명령이 보이지 않으면 현재 제품, 설치 버전과 실행 환경에서 제공되는 목록을 따른다.

## CLI에서 확인

설치된 CLI의 기본 명령과 옵션을 확인한다.

```bash
codex --help
codex <command> --help
```

MCP 연결을 확인할 때는 다음 명령을 사용할 수 있다.

```bash
codex mcp list
codex mcp get <name>
```

코드 검토 대상과 옵션은 `codex review --help`에서 현재 지원 범위를 확인한다.

## 확인 순서

1. 입력창의 `/` 목록에서 현재 명령을 찾는다.
2. CLI 옵션은 설치된 `codex --help`에서 확인한다.
3. 동작과 지원 범위는 OpenAI 공식 문서에서 확인한다.

## 공식 문서

- [Codex 개발자 명령](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
- [Skill 호출](https://learn.chatgpt.com/docs/build-skills)
