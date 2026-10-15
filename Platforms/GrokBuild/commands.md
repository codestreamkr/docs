# Grok Build 명령 확인

슬래시 명령은 Grok Build CLI 채팅창 기준이에요.  
터미널 명령과 구분해서 사용하세요.

## CLI 채팅창 명령

`/help`에서 현재 버전이 지원하는 명령을 확인하세요.

```text
/help
```

| 목적 | 명령 |
| --- | --- |
| 로그인 | `/login` |
| 모델과 추론 수준 선택 | `/model`, `/effort` |
| 설정과 권한 변경 | `/settings`, `/auto`, `/always-approve` |
| 계획 작성과 확인 | `/plan`, `/view-plan` |
| Skill과 외부 연결 확인 | `/skills`, `/mcps`, `/plugins`, `/hooks` |
| 대화 정리와 사용량 확인 | `/compact`, `/context` |
| 새 작업과 이전 작업 열기 | `/new`, `/resume` |
| 세션 분기와 대화 되돌리기 | `/fork`, `/rewind` |
| 세션과 백그라운드 작업 확인 | `/dashboard`, `/tasks` |
| 대화 내보내기 | `/export` |

실행 중인 요청은 `Ctrl+C`로 중지하세요.  
`/rewind`는 대화만 되돌리며 수정 파일은 복원하지 않아요.

## 터미널 명령

프로젝트 폴더에서 새 세션을 여세요.

```bash
grok
```

| 목적 | 명령 |
| --- | --- |
| 최근 세션 이어가기 | `grok --continue` |
| 특정 세션 복원 | `grok --resume <session-id>` |
| 적용된 구성 확인 | `grok inspect` |
| 사용 가능한 모델 확인 | `grok models` |
| 옵션 확인 | `grok --help` |

설치와 업데이트는 [환경 설정](./setup.md), 작업 분리와 자동화는 [작업 흐름](./workflows.md)을 확인하세요.

## 표시 설정

변경 코드에 집중하려면 CLI 채팅창에서 표시 밀도를 선택하세요.

```text
/density Diff focus
```

시간 표시는 `/timestamps minimal`로 켤 수 있어요.

## 공식 문서

- [CLI 채팅창 명령](https://docs.x.ai/build/modes-and-commands)
- [터미널 명령과 옵션](https://docs.x.ai/build/cli/reference)
- [키보드 단축키](https://docs.x.ai/build/keyboard-shortcuts)
