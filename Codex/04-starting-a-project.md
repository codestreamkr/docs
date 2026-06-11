# 05. [중급]프로젝트 시작

## 프로젝트에 Codex 적용하기

새 프로젝트에서 Codex를 처음 쓸 때는 아래 순서로 준비한다.

## 사전작업

이 문서에는 기본 제공 명령과 권장 문서 구성이 함께 나온다.

### 바로 사용할 수 있는 기능

- `/init`: Codex CLI 기본 제공 명령
- `/mcp`: 연결된 MCP 서버 확인

### 준비가 필요한 기능

| 기능 | 구분 | 준비 기준 |
| --- | --- | --- |
| `.0_my/core_*.md` 자동 생성 | Skill 또는 팀 템플릿 | 자동 생성 워크플로우가 준비되어 있어야 한다 |

`.0_my/` 상세 문서는 Codex 기본 생성물이 아니다.

수동으로 작성하거나, 팀에서 쓰는 Skill 또는 템플릿을 준비한 뒤 생성한다.

## Step 1. 프로젝트 초기화

Codex CLI에서 제공하는 `/init` 명령을 실행한다.

```text
/init
```

`AGENTS.md`에는 이 프로젝트에서 작업할 때 참고할 기본 지침이 담긴다.

- 프로젝트 개요
- 자주 쓰는 빌드와 테스트 명령
- 코드 작성 시 유의사항
- 사용자가 계속 유지하고 싶은 작업 규칙

> 이 파일은 저장소 루트나 현재 작업 디렉토리에 생성되며, 이후 Codex 세션에서 작업 지침으로 읽힌다.

## Step 2. 상세 핵심 문서 생성

프로젝트 규칙이 길어지면 `AGENTS.md`는 라우팅 문서로 줄이고, 상세 기준은 별도 문서로 분리한다.

아래 구성은 권장 문서 구조다.

자동 생성하려면 사전작업에서 관련 Skill 또는 팀 템플릿을 먼저 준비한다.

| 파일 | 역할 |
| --- | --- |
| `.0_my/core_project.md` | 프로젝트 구조, 아키텍처, 기술 스택, 주요 모듈 개요 |
| `.0_my/core_code_style.md` | 네이밍 규칙, 코딩 스타일, Mapper와 로깅 작성 기준 |
| `.0_my/core_workflow.md` | 빌드, 테스트, 배포 명령, 환경 변수, 운영 절차 |

`AGENTS.md`에는 위 문서를 언제 참고할지만 남긴다.

```markdown
## 프로젝트 기준 문서
- 구조와 기술 스택: `.0_my/core_project.md`
- 코드 스타일: `.0_my/core_code_style.md`
- 작업 절차: `.0_my/core_workflow.md`
```

## Step 3. Codex 설정 확인

프로젝트별 설정이 필요할 때만 `.codex/config.toml`을 둔다.

```toml
[features]
codex_hooks = true
```

설정 기준:

- 팀 공통 설정은 프로젝트 `.codex/config.toml`에 둔다.
- 개인 설정은 `~/.codex/config.toml`에 둔다.
- 프로젝트 `.codex/` 설정은 신뢰한 프로젝트에서만 로드된다.
- 프로젝트마다 달라야 하는 값만 둔다.

## Step 4. MCP 확인

외부 문서나 도구가 필요하면 MCP를 연결한다.

```powershell
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
```

세션 안에서는 아래 명령으로 확인한다.

```text
/mcp
```

## Step 5. Skill 확인

준비된 Skill을 기준으로 작업 방식을 고른다.

| 상황 | 우선 호출 |
| --- | --- |
| 프로젝트 기준 문서 생성 | `$ct-init` |
| 개선 과제 정리 | `$ct-improve-plan` |
| 설계 검토 | `$ct-design-review` |
| 구현 | `$ct-implement` |
| Spring 컴포넌트 추가 | `$ct-spring-component <component-name>` |
| QA 검증 | `qa-lucin` |

`ct-spring-component`는 `service-log`, `jwt-auth`, `exception-handler`, `api-response`만 허용한다.

## 실행 순서 요약

```text
/init
AGENTS.md 정리
.codex/config.toml 필요 여부 확인
/mcp 확인
사용할 Skill 확인
```

## 실행 후 할 일

1. `AGENTS.md`가 실제 작업 규칙과 맞는지 확인한다.
2. `.0_my/` 상세 문서가 있다면 `AGENTS.md`에서 참조하도록 정리한다.
3. `.codex/config.toml`의 승인 정책과 샌드박스 수준을 확인한다.
4. 외부 도구가 필요하면 MCP 연결 상태를 확인한다.
5. 첫 작업 전 Git 변경사항 기준선을 확인한다.
6. 프론트엔드나 화면 검증이 필요하면 in-app browser나 Browser use 사용 여부를 확인한다.

## 공식 문서 기준

- <https://developers.openai.com/codex/quickstart/>
- <https://developers.openai.com/codex/guides/agents-md/>
- <https://developers.openai.com/codex/config-basic>
- <https://developers.openai.com/codex/mcp/>

## 이력관리

- 2026-06-10: 프로젝트별 설정 최소화와 Skill 확인 절차 추가
- 2026-05-11: Codex 프로젝트 시작 문서 추가
