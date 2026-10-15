# Claude Code 명령 확인

CLI 채팅창의 명령과 터미널 명령을 구분해요.  
현재 지원하는 명령은 채팅창의 `/` 목록에서 확인해요.

## 채팅창에서 사용

채팅창에서 도움말을 열어요.

```text
/help
```

| 목적 | 명령 |
| --- | --- |
| 상태와 적용 지침 확인 | `/status`, `/context` |
| 변경 전 계획 작성 | `/plan` |
| 모델·추론·권한 선택 | `/model`, `/effort`, `/permissions` |
| 변경 내용 확인과 검토 | `/diff`, `/code-review` |
| 대화 요약과 새 작업 시작 | `/compact`, `/clear` |
| 대화 재개·분기·되돌리기 | `/resume`, `/branch`, `/rewind` |
| 작업 상태 확인 | `/tasks` |
| 세션을 백그라운드로 전환 | `/background` |
| 연결된 백그라운드 세션 중지 | `/stop` |
| 사용량과 비용 확인 | `/usage`, `/cost` |
| 외부 도구와 Plugin 관리 | `/mcp`, `/plugin` |

`/plan`은 내장 계획 모드예요.  
`/ct-plan`은 CodeStream의 작업 계획 Skill이에요.  
내장 명령·번들 Skill·사용자 Skill은 `/` 목록에 함께 표시돼요.

## 터미널에서 실행

이전 대화를 계속하려면 프로젝트 폴더에서 실행해요.

```bash
claude --continue
```

다른 대화를 선택하려면 `claude --resume`을 실행해요.  
백그라운드 세션은 `claude agents`로 찾고 `claude attach <id>`로 다시 연결해요.  
설치·업데이트·진단은 [환경 설정](./setup.md), 자동 실행은 [반복 실행](./extensions.md#반복-실행)을 확인해요.

## 추가 명령

| 기능 | 용도와 공식 안내 |
| --- | --- |
| Desktop으로 이어가기 | [Desktop 연결](https://code.claude.com/docs/en/cli-reference)로 터미널 프로젝트나 대화를 Desktop에서 열어요. |
| 프롬프트 캐시 확인 | [비용 확인](https://code.claude.com/docs/en/costs)으로 `/cost`의 캐시 정보를 확인해요. |
| 설정과 지침 관리 | [명령 참조](https://code.claude.com/docs/en/commands)에서 `/config`, `/init`, `/memory` 사용법을 확인해요. |
| 백그라운드 세션 관리 | [백그라운드 세션](https://code.claude.com/docs/en/cli-reference)으로 별도 세션을 시작하고 다시 연결해요. |

## 공식 문서

- [명령 참조](https://code.claude.com/docs/ko/commands)
- [CLI 참조](https://code.claude.com/docs/ko/cli-reference)
