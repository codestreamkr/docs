# Grok Build 가이드

할 일을 고르고, 필요한 Skill을 직접 호출하면 돼요.

어떤 순서로 진행할지는 [Playbook](../../Playbooks/README.md)을 봐요.  
여기선 Grok Build에서 어떻게 실행하는지만 다뤄요.

## 이렇게 시작해요

프로젝트 폴더에서 이렇게 실행해요.  
필요할 때만 승인을 물어요.

```bash
grok --permission-mode auto
```

매번 옵션을 붙이기 번거로우면 `~/.grok/config.toml`에 넣어 두어요.

```toml
[ui]
permission_mode = "auto"
```

켜지면 Skill을 확인하고 바로 불러요.

```text
/skills
/ct-plan ?
/ct-plan impl 주문 취소의 중복 요청 방지 기능
```

- Skill은 `/ct-*`로 불러요. 작업과 대상을 한 줄에 이어서 적어요.
- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요. 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.
- 잘 붙었는지는 `grok inspect`로 확인해요.
- 권한을 전부 건너뛰는 `--dangerously-skip-permissions`는 쓰지 않아요.

설치와 로그인은 [환경 설정](./setup.md)을 봐요.

## 무엇을 하려나요?

지금 필요한 결과만 만들면 돼요.  
처음부터 끝까지 다 돌릴 필요는 없어요.

| 이런 일이면 | 이 Skill | 이렇게 시작해요 |
| --- | --- | --- |
| 제품·설계·구현·개선 계획 | `ct-plan` | `/ct-plan ?` |
| Spring 구현과 검토 | `ct-spring` | `/ct-spring ?` |
| 호출 흐름 분석·전환·테스트 | `ct-calltree` | `/ct-calltree ?` |
| QA와 회귀 검증 | `ct-qa-lucin` | `/ct-qa-lucin ?` |
| SQL 성능 분석 | `ct-query-tuner` | `/ct-query-tuner ?` |
| 외부 서비스 연동과 이관 설계 | `ct-external-architect` | `/ct-external-architect ?` |
| 실행 스크립트 생성과 검증 | `ct-script-run` | `/ct-script-run ?` |
| Confluence REST API 작업 | `ct-wiki-api` | `/ct-wiki-api ?` |
| 프로젝트 Markdown 위키 운영 | `ct-wiki-ops` | `/ct-wiki-ops ?` |

일이 이어지면, 앞에서 정한 범위와 문서 경로를 다음 호출에 넘겨요.

```text
/ct-plan impl 주문 취소의 중복 요청 방지 기능
/ct-spring 확정된 계획을 기준으로 구현하고 관련 테스트를 실행해줘
/ct-qa-lucin 주문 취소의 정상·중복·외부 실패 흐름을 검증해줘
```

입력과 결과는 [Skill 안내](./skills.md), 이어 붙이는 방법은 [작업 흐름](./workflows.md)에 있어요.

## 자주 쓰는 명령

| 명령 | 이럴 때 써요 |
| --- | --- |
| `/skills` | 쓸 수 있는 Skill을 볼 때 |
| `/model` | 모델을 고를 때 |
| `/compact` | 대화가 길어져서 요약이 필요할 때 |
| `/new` | 앞 일과 상관없는 새 작업을 시작할 때 |
| `/resume` | 이전 세션을 다시 열 때 |
| `/rewind` | 이전 요청으로 대화를 되돌릴 때. 파일은 그대로 둬요 |
| `/always-approve` | 지금 세션을 자동 승인으로 바꿀 때 |

나머지 명령은 입력창에 `/`를 치거나 [명령 확인](./commands.md)에서 찾아요.

## 더 알고 싶다면

| 궁금한 것 | 문서 |
| --- | --- |
| 설치, Skill 위치, `AGENTS.md`와 Config | [환경 설정](./setup.md) |
| 9개 Skill의 입력, 작업과 결과 | [Skill 안내](./skills.md) |
| 여러 Skill을 이어 붙이는 예제 | [작업 흐름](./workflows.md) |
| Subagent, 모델 연결, MCP와 Plugin | [확장 기능](./extensions.md) |
| 현재 환경에서 명령을 찾는 방법 | [명령 확인](./commands.md) |

프로젝트에 계속 남길 기준은 `AGENTS.md`에, 실행 설정은 `config.toml`에 둬요.  
Agent Profile, Subagent, MCP, Hook, Plugin은 [확장 기능](./extensions.md)을 봐요.

## 이것만 기억해요

- CodeStream 사용자 Skill은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요. 이 도구에서 보이는 위치는 [환경 설정](./setup.md)을 봐요.
- Skill은 `/ct-*`로 직접 불러요.
- Skill은 지금 프로젝트의 `AGENTS.md`, 코드와 설정에서 근거를 모아요.
- 입력과 결과는 [Skill 안내](./skills.md)를 따라요.
- 제품 기능과 명령은 지금 환경과 `~/.grok/README.md`, `~/.grok/docs/user-guide/`, [xAI 공식 자료](https://x.ai/news/grok-build-cli)에서 확인해요.
