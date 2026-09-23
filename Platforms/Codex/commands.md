# Codex 명령 확인

터미널에서 실행하는 CLI 명령과 Codex 입력창의 `/` 명령을 구분해요.  
아래는 CLI `0.155.1`과 공식 문서 기준의 자주 쓰는 항목이에요.  
앱·IDE 확장에서는 해당 화면이 제공하는 메뉴와 명령을 확인해요.

## 터미널에서 실행

| 목적 | 명령 | 자세한 사용법 |
| --- | --- | --- |
| 프로젝트 열기 | `codex -C /path/to/project` | [환경 설정](./setup.md) |
| 로그인 상태 확인 | `codex login status` | [환경 설정](./setup.md) |
| 이전 세션 선택 | `codex resume` | [작업 흐름](./workflows.md) |
| 최근 세션 재개 | `codex resume --last` | [작업 흐름](./workflows.md) |
| 기존 대화에서 분기 | `codex fork` | [작업 흐름](./workflows.md) |
| 별도 Worktree에서 시작 | `codex --worktree` | [작업 흐름](./workflows.md) |
| 미커밋 변경 검토 | `codex review --uncommitted` | [변경 검토](./workflows.md#구현한-변경-검토하기) |
| 기준 브랜치 대비 검토 | `codex review --base main` | `main`을 실제 기준 브랜치로 변경 |
| 특정 커밋 검토 | `codex review --commit <SHA>` | `<SHA>`를 실제 커밋으로 변경 |
| MCP 설정 확인 | `codex mcp list`, `codex mcp get <name>` | [확장 기능](./extensions.md) |
| Plugin 목록 확인 | `codex plugin list` | [확장 기능](./extensions.md) |
| 반복 작업 실행 | `codex exec` | [자동화](./automation.md) |
| 설치·설정 진단 | `codex doctor` | [환경 설정](./setup.md) |
| 버전 확인·업데이트 | `codex --version`, `codex update` | 설치 방식에 맞는 업데이트 사용 |

## CLI 입력창에서 사용

| 목적 | 명령 | 확인할 결과 |
| --- | --- | --- |
| 현재 상태 확인 | `/status` | 작업 디렉터리와 세션 상태 |
| 권한 모드 확인·변경 | `/permissions` | 허용 범위와 승인 동작 |
| Skill 선택 | `/skills` | 현재 사용할 수 있는 Skill |
| 변경 내용 확인 | `/diff` | staged·unstaged·untracked 변경 |
| 변경 검토 요청 | `/review` | 동작 문제와 누락된 테스트 등의 지적 사항 |
| MCP 연결 확인 | `/mcp` | 서버와 노출 도구 |
| Plugin 탐색 | `/plugins` | 설치·탐색 가능한 Plugin |
| Subagent 작업 확인 | `/agent` | 전환할 에이전트 스레드 |

`/diff`는 변경을 보여주고, `/review`는 변경의 문제를 검토해요.
검토 후 수정·테스트는 별도 요청으로 이어가요.

## 현재 지원 범위 확인

1. 입력창에 `/`를 입력해 노출된 명령을 확인해요.
2. CLI 옵션은 설치된 버전의 도움말에서 확인해요.
3. 동작과 제품별 지원 범위는 공식 문서에서 확인해요.

```bash
codex --help
codex review --help
codex exec --help
codex plugin --help
```

## 공식 문서

- [CLI와 입력창 명령](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
- [승인과 샌드박스](https://learn.chatgpt.com/docs/agent-approvals-security)
