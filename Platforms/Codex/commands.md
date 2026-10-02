# Codex 명령 확인

열린 CLI 입력창에서 사용하는 명령과 터미널에서 실행하는 명령을 구분해요.  
일상 작업은 입력창에서 진행하고, 설치·관리·비대화형 실행이 필요할 때 터미널 명령을 사용해요.

## 입력창에서 사용

입력창에 `/`를 입력하면 현재 환경에서 제공하는 명령을 찾을 수 있어요.

### 작업 준비와 설정

| 명령 | 용도 |
| --- | --- |
| `/status` | 작업 루트, 모델, 승인 정책과 컨텍스트 상태 확인 |
| `/permissions` | 현재 세션의 접근 범위와 승인 동작 확인·변경 |
| `/model` | 제공되는 모델과 추론 수준 선택 |
| `/plan` | 구현 전 계획 모드로 전환 |
| `/skills` | 사용할 수 있는 Skill 탐색·선택 |
| `/mcp` | 연결된 MCP 서버와 도구 확인 |
| `/apps` | App·Connector 탐색과 요청에 첨부 |
| `/plugins` | 설치된 Plugin과 사용 가능한 Plugin 탐색 |
| `/hooks` | Hook 정의 확인과 신뢰·활성화 관리 |

`/plan`은 제품의 계획 모드이고, `$ct-plan`은 CodeStream의 계획 절차를 호출해요.  
사용자 Skill의 선택 기준과 호출 예제는 [사용자 Skill](./skills.md)을 봐요.

### 변경 확인과 검토

| 명령 | 용도 |
| --- | --- |
| `/diff` | 현재 Git 변경 확인 |
| `/review` | 작업 트리 등의 변경에서 문제 검토 |
| `/mention` | 요청에 파일 첨부 |

`/diff`는 변경을 보여주고, `/review`는 변경의 문제를 검토해요.  
검토 뒤 수정과 테스트는 [변경 확인과 검토](./workflows.md#변경-확인과-검토)의 요청으로 이어가요.

### 세션과 병렬 작업

| 명령 | 용도 |
| --- | --- |
| `/resume` | 저장된 이전 세션 선택·재개 |
| `/fork` | 현재 대화에서 새 대화로 분기 |
| `/compact` | 현재 대화를 요약해 컨텍스트 확보 |
| `/new` | 같은 CLI에서 새 대화 시작 |
| `/clear` | 화면을 지우고 새 대화 시작 |
| `/rename` | 현재 세션 이름 변경 |
| `/agent`, `/subagents` | Subagent 상태 확인과 대화 전환 |
| `/ps` | 백그라운드 터미널과 최근 출력 확인 |
| `/stop` | 현재 세션의 백그라운드 터미널 중지 |
| `/quit`, `/exit` | CLI 종료 |

대화 분기는 파일을 격리하지 않아요.  
별도 작업 공간이 필요하면 [Worktree](./workflows.md#별도-작업-공간에서-구현하기)를 사용해요.

## 터미널에서 실행

아래 명령은 Codex 입력창 밖의 터미널에서 실행해요.

| 목적 | 명령 | 자세한 사용법 |
| --- | --- | --- |
| 프로젝트에서 대화형 CLI 시작 | `codex` | 프로젝트 디렉터리에서 실행 |
| 프로젝트 경로를 지정해 시작 | `codex -C /path/to/project` | [환경 설정](./setup.md) |
| 로그인 상태 확인 | `codex login status` | [인증](./setup.md#인증) |
| 시작하면서 이전 세션 선택 | `codex resume` | 열린 세션에서는 `/resume` 사용 |
| 시작하면서 최근 세션 재개 | `codex resume --last` | 최근 세션의 작업 루트 확인 |
| 저장된 대화에서 분기해 시작 | `codex fork` | 열린 세션에서는 `/fork` 사용 |
| 새 Worktree에서 시작 | `codex --worktree` | [Worktree](./workflows.md#별도-작업-공간에서-구현하기) |
| 비대화형 변경 검토 | `codex review --uncommitted` | 열린 세션에서는 `/review` 사용 |
| 기준 브랜치 대비 비대화형 검토 | `codex review --base main` | `main`을 실제 기준 브랜치로 변경 |
| 특정 커밋의 비대화형 검토 | `codex review --commit <SHA>` | `<SHA>`를 실제 커밋으로 변경 |
| MCP 설정 관리 | `codex mcp` | [확장 기능](./extensions.md) |
| Plugin 설정 관리 | `codex plugin` | [확장 기능](./extensions.md#plugin) |
| 스크립트·CI에서 실행 | `codex exec` | [자동화](./automation.md) |
| 설치·설정 진단 | `codex doctor` | [문제 해결](./setup.md#진단과-적용-확인) |
| 버전 확인 | `codex --version` | 현재 설치 버전 확인 |
| 업데이트 | `codex update` | 사용한 설치 방식에 맞게 실행 |

추가 디렉터리·샌드박스 등의 시작 옵션은 [환경 설정](./setup.md#권한과-실행-범위)을 봐요.

## 확인 기준

2026-10-01에 공식 명령 문서와 설치된 Codex CLI `0.158.0`의 도움말을 확인했어요.  
CLI 입력창 명령은 공식 문서 기준이며, 실제 제공 목록은 현재 세션을 우선해요.

1. 입력창의 `/` 목록에서 현재 제공하는 명령을 확인해요.
2. 터미널 명령과 옵션은 설치 버전의 도움말을 확인해요.
3. 앱·IDE 확장에서는 해당 화면의 메뉴와 지원 범위를 확인해요.

```bash
codex --help
codex review --help
codex exec --help
codex plugin --help
```

## 공식 문서

- [CLI 입력창 명령](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
- [승인과 샌드박스](https://learn.chatgpt.com/docs/agent-approvals-security)
