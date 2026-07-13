# Claude Code에서 Masters 사용하기

Claude Code에서도 Codex와 같은 이름, 역할, 입력과 완료 기준으로 Masters를 사용한다.

Master의 정본은 [Masters](../../Masters/README.md)이며 이 문서는 Claude Code Skill의 목표 이름과 현재 적용 상태만 관리한다.

## 연결 목표

아직 적용되지 않은 Master는 `적용 예정`으로 표시한다.

| Master | 공통 역할 | 목표 Claude Code Skill | 현재 상태 |
| --- | --- | --- | --- |
| 잡스형 | 서비스·제품 기획 | `pd` | 적용 예정 |
| 대부님 | 쿼리 튜닝 | `query-tuner` | 적용 예정 |
| 로드형 | Spring 개발 | `spring` | 적용 예정 |
| 호페형 | 외부 연동 설계 | `external-architect` | 적용 예정 |
| 루신 | QA와 회귀 검증 | `qa-lucin` | 적용 예정 |

적용 여부는 실제 Claude Code 환경의 `/` 목록과 `.claude/skills/` 또는 Plugin 설치 상태로 확인한다.

## 구현 기준

Codex Skill의 결과를 그대로 복사하지 않고 공통 Master 문서를 기준으로 Claude Code 형식에 맞춘다.

- 위치: `.claude/skills/<skill-name>/SKILL.md` 또는 사용자 Skill 위치
- `description`: Master 이름, 전문 분야와 자연 호출 조건
- 본문: 실행 절차와 Claude Code 도구 사용 기준
- references: 공통 Master 문서 또는 필요한 전문 자료
- 완료 조건: 공통 Master 문서와 동일

## 자연어 호출

Skill 적용 뒤 사용자는 같은 방식으로 시작한다.

```text
호페형, 기존 PG와 신규 PG의 병행 운영 구조를 설계해줘.
현재 상태, 목표 상태, 전환 단계와 롤백 기준이 필요해.
```

```text
루신, 로드형이 구현한 주문 취소 기능을 검증해줘.
권한, 중복 요청과 외부 PG 지연을 우선 확인해줘.
```

직접 호출이 필요한 경우 Claude Code에서는 `/skill-name`을 사용한다.

## 동등성 확인

Master 적용이 끝나면 Codex와 같은 입력으로 결과를 비교한다.

- 같은 Master가 선택된다.
- 필수 입력과 확인 순서가 같다.
- 결과의 필수 섹션이 같다.
- 완료 조건과 남은 위험 형식이 같다.
- 호출 문법과 도구 차이만 플랫폼 문서에 남는다.

## 이력관리

- 2026-07-13: 다섯 Master의 Claude Code 적용 목표와 미적용 상태를 명시한 연결표 생성
