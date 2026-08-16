# Grok Build 작업 흐름

여러 결과가 필요한 작업에서는 앞 단계의 확정된 결과를 다음 Skill의 입력으로 연결한다.

아래 흐름은 예시다. 현재 프로젝트에 필요하지 않은 단계는 사용하지 않는다.

## Spring 기능 개발

구현 범위가 불명확하면 계획부터 시작한다.

```text
/ct-plan impl 주문 취소의 중복 요청 방지 기능
        ↓
/ct-spring 확정된 계획을 기준으로 구현하고 관련 테스트를 실행해줘
        ↓
/ct-qa-lucin 주문 취소의 정상·중복·외부 실패 흐름을 검증해줘
```

결과 연결:

1. `ct-plan`이 변경 대상과 검증 기준을 확정한다.
2. `ct-spring`이 현재 버전과 관례에 맞춰 구현한다.
3. `ct-qa-lucin`이 사용자 결과와 실패 경로를 검증한다.

## 외부 서비스 이관

공급자 계약과 내부 영향부터 분리한다.

```text
/ct-external-architect 기존 PG를 신규 PG로 이관하는 구조를 설계해줘
        ↓
/ct-plan impl 확정된 이관 설계를 단계별 구현 계획으로 작성해줘
        ↓
/ct-spring 계획의 첫 단계인 신규 PG 어댑터를 구현해줘
        ↓
/ct-qa-lucin 병행 운영, 중복 요청과 공급자 지연을 검증해줘
```

공급자 API의 현재 계약은 `ct-external-architect`가 공식 자료에서 확인하고, 구현은 프로젝트에 적용할 단계가 확정된 뒤 진행한다.

## 호출 구조 분석과 전환

대상 심볼의 현재 흐름을 근거로 전환과 테스트를 연결한다.

```text
/ct-calltree analyze OrderService.cancel
        ↓
/ct-calltree transition OrderService.cancel
        ↓
/ct-calltree test 생성한 전환 계획
```

기존 구조를 유지한 테스트만 필요하면 `analyze` 다음에 바로 `test`를 사용할 수 있다.

## SQL 성능 개선

측정 근거를 먼저 확보하고 코드 변경이 필요한 경우에만 구현을 연결한다.

```text
/ct-query-tuner OrderMapper.findOrders의 실행 계획을 분석해줘
        ↓
/ct-plan impl 확정된 쿼리 개선안의 적용과 검증 순서를 작성해줘
        ↓
/ct-spring 계획에 따라 Mapper와 관련 코드를 수정해줘
        ↓
/ct-qa-lucin 주문 조회 결과와 회귀 범위를 검증해줘
```

쿼리나 인덱스 변경만으로 끝나면 Spring 구현 단계는 사용하지 않는다.

## 위키 수집과 반영

원격 위키 원문과 프로젝트 Markdown 위키의 책임을 나눈다.

```text
/ct-wiki-api 333 페이지와 하위 페이지를 저장해줘
        ↓
/ct-wiki-ops capture 저장한 원문
        ↓
/ct-wiki-ops ingest 저장한 원문
        ↓
/ct-wiki-ops verify 갱신된 위키 문서
```

`ct-wiki-api`는 원격 API 작업을, `ct-wiki-ops`는 저장소 안의 위키 구조와 내용 품질을 담당한다.

## 결과 전달 기준

다음 Skill을 호출할 때 앞 단계의 결과 중 필요한 항목을 지정한다.

- 확정된 범위와 제외 범위
- 변경 대상과 유지할 계약
- 근거 문서 또는 코드 경로
- 검증 기준과 미확인 사항

대화만으로 대상을 구분하기 어렵다면 앞 단계가 만든 문서나 파일 경로를 함께 전달한다.

## 긴 작업의 맥락 관리

단계가 이어지면 현재 세션에 남은 맥락을 확인한다.

- `/compact`: 확정된 결과만 남기고 대화 요약
- `/new`: 앞 단계와 무관한 새 작업 시작
- `/rewind`: 이전 요청 지점으로 대화를 되돌린다. 디스크의 파일은 그대로 둔다
- `/resume`: 중단한 이전 세션을 다시 열기

단계 사이에 맥락을 정리한 경우 다음 Skill 호출에 필요한 결과 문서와 경로를 다시 지정한다.

