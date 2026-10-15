# Pi 작업 흐름

프로젝트 파악, 계획, 구현과 검토를 같은 세션에서 이어가요.  
단계별 완료 조건은 [Playbook](../../Playbooks/README.md)을 확인하세요.

## 프로젝트 파악하기

Pi 채팅창에서 수정 대상과 테스트 방법을 확인하세요.

```text
주문 취소의 진입점, 상태 변경과 외부 연동을 찾아줘.
관련 파일과 테스트 명령을 알려줘. 파일은 수정하지 마.
```

## 호출과 연결

계획 파일을 다음 요청에 전달하세요.

```text
/skill:ct-plan 주문 취소의 중복 요청 방지 계획을 .docs/order-cancel-plan.md에 작성해줘
```

완료 조건을 확인한 뒤 구현하세요.

```text
/skill:ct-apply .docs/order-cancel-plan.md의 남은 작업을 구현하고 관련 테스트를 실행해줘
```

구현 후 계획의 완료 조건으로 검증하세요.

```text
/skill:ct-verify 주문 취소 변경이 .docs/order-cancel-plan.md의 완료 조건을 충족하는지 검증해줘
```

## 변경 확인과 검토

Pi에는 변경 검토 전용 명령이 없어요.  
대상과 검토 기준을 자연어로 요청하세요.

```text
현재 Git 변경에서 동작 문제, 빠진 테스트, 요청 밖 변경을 검토해줘.
파일은 수정하지 마.
```

지적 사항을 확인한 뒤 수정과 테스트를 요청하세요.

```text
확인한 중복 취소 문제를 수정하고 관련 테스트를 실행해줘.
변경 파일, 테스트 결과와 미검증 항목을 알려줘.
```

## 세션과 맥락 관리

중단한 작업은 이전 세션에서 재개하세요.

```text
/resume
```

현재 파일과 남은 작업을 대조하세요.

```text
이전 작업의 완료·미완료 항목을 현재 Git 상태와 대조해줘.
남은 구현과 관련 테스트를 진행해줘.
```

대화가 길어지면 `/compact`, 별개 작업은 `/new`를 사용하세요.

## Pi 고유 작업

다른 접근을 비교할 때 세션 트리를 사용하세요.

| 목적 | 명령 |
| --- | --- |
| 이전 지점으로 돌아가 이어가기 | `/tree` |
| 이전 요청에서 새 세션 시작 | `/fork` |
| 현재 흐름을 복제해 비교 | `/clone` |

세션 분기는 파일을 격리하지 않아요.  
파일도 나누려면 [Git Worktree](../../Git/git_01_worktree_guide.md)를 사용하세요.

## 반복 작업 실행

터미널에서 한 번 실행하고 결과를 받으세요.

```bash
pi -p "현재 변경을 요약하고 필요한 테스트 명령을 알려줘"
```

Pi 실행 성공과 테스트 통과를 별도로 확인하세요.  
세부 출력 방식은 [실행 모드](./extensions.md#실행-모드와-내장)를 확인하세요.

## 다른 작업

- [세션 공유](https://pi.dev/docs/latest/sessions): `/share`로 외부에 공유하거나 `/export`로 파일을 만들어요.
- [공유 위치 선택](https://pi.dev/docs/latest/settings#sessions-and-context): Radius와 GitHub gist 중 업로드 위치를 정해요.
- [프로젝트 실습](./reference/05-project-cooking.md): 예제 Package로 반복 작업을 실행해요.

## 공식 문서

- [채팅창 사용법](https://pi.dev/docs/latest/usage)
- [세션 트리](https://pi.dev/docs/latest/session-tree)
- [CLI 자동화](https://pi.dev/docs/latest/cli-integration)
