# 데이터 접근과 마이그레이션

이 문서는 Python 웹 백엔드에서 ORM 세션과 트랜잭션 경계를 정하고 스키마 변경을 관리하는 기준을 안내한다.

FastAPI·Flask는 SQLAlchemy를, Django는 내장 ORM을 사용한다. 세션 수명과 트랜잭션 경계를 명시하지 않으면 커넥션 누수와 예상 못 한 커밋이 발생한다.

## 도구 선택

프레임워크에 맞는 조합을 사용한다.

| 프레임워크 | ORM | 마이그레이션 도구 |
| --- | --- | --- |
| FastAPI, Flask | SQLAlchemy 2.x | Alembic |
| Django | Django ORM | `manage.py makemigrations`·`migrate` |
| 쿼리를 직접 쓰는 프로젝트 | SQLAlchemy Core, 드라이버 직접 사용 | Alembic 또는 SQL 스크립트 관리 |

## 모델 정의

SQLAlchemy 2.x는 타입 힌트 기반 매핑을 사용한다.

```python
# models/order.py
from datetime import datetime
from decimal import Decimal

from sqlalchemy import ForeignKey, String, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), index=True)
    status: Mapped[str] = mapped_column(String(20), default="CREATED")
    total_amount: Mapped[Decimal]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    items: Mapped[list["OrderItem"]] = relationship(back_populates="order")
```

적용 기준은 다음과 같다.

- 금액은 `Decimal`로 매핑한다. 부동소수 타입을 쓰지 않는다.
- 생성·수정 시각은 DB 기본값(`server_default`)으로 채운다.
- 조회 조건으로 자주 쓰는 컬럼에 인덱스를 선언한다.
- 테이블명과 컬럼명은 DB 명명 규칙을 그대로 쓴다.

## 세션과 트랜잭션 경계

세션은 요청 단위로 열고 닫는다. 트랜잭션은 서비스 계층에서 확정한다.

```python
# db.py
from collections.abc import Iterator
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from order_api.config import get_settings

engine = create_engine(
    str(get_settings().database_url),
    pool_size=10,
    max_overflow=5,
    pool_pre_ping=True,
)
SessionFactory = sessionmaker(bind=engine, expire_on_commit=False)


@contextmanager
def session_scope() -> Iterator[Session]:
    session = SessionFactory()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
```

- 커밋은 한 요청에서 한 번만 수행한다. 리포지토리 안에서 커밋하지 않는다.
- 예외가 발생하면 롤백하고 그대로 전파한다. 여기서 응답을 만들지 않는다.
- `pool_pre_ping`으로 끊긴 커넥션을 사용하기 전에 확인한다.
- 커넥션 풀 크기는 워커 수를 곱한 값이 DB 최대 연결 수를 넘지 않게 정한다.
- `expire_on_commit=False`로 두면 커밋 후 객체 속성 접근 시 추가 질의가 발생하지 않는다.

## 조회 패턴

질의는 리포지토리에 모으고 서비스는 결과만 사용한다.

```python
# repositories/order_repo.py
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from order_api.models.order import Order


def find_by_id(session: Session, order_id: int) -> Order | None:
    stmt = select(Order).where(Order.id == order_id).options(selectinload(Order.items))
    return session.scalars(stmt).one_or_none()


def find_by_customer(
    session: Session, customer_id: int, limit: int, offset: int
) -> list[Order]:
    stmt = (
        select(Order)
        .where(Order.customer_id == customer_id)
        .order_by(Order.created_at.desc())
        .limit(limit)
        .offset(offset)
    )
    return list(session.scalars(stmt))
```

- 목록 조회에는 항상 정렬과 개수 제한을 함께 지정한다.
- 연관 데이터를 함께 쓰면 `selectinload` 또는 `joinedload`로 미리 적재한다.
- 단건 조회는 `one_or_none()`을 사용하고 없음을 예외 대신 `None`으로 다룬다.

## N+1 질의

목록을 순회하면서 연관 객체에 접근하면 지연 로딩이 반복 실행된다.

- 증상: 목록 크기에 비례해 질의 수가 늘어난다.
- 확인: `create_engine(..., echo=True)` 또는 로깅으로 실행 질의 수를 센다.
- 조치: 조회 시점에 `selectinload`(별도 IN 질의) 또는 `joinedload`(조인)로 적재한다.
- 선택 기준: 일대다 관계는 `selectinload`, 다대일 단일 관계는 `joinedload`를 기본으로 한다.
- Django ORM은 같은 문제를 `select_related`(정방향 FK)와 `prefetch_related`(역방향·다대다)로 해결한다.

질의 실행 계획 분석과 인덱스 판단이 필요하면 [04 느린 SQL을 개선한다](../Playbooks/04-tune-sql.md)를 연결한다.

## 비동기 데이터 접근

FastAPI에서 `async def` 엔드포인트를 쓰면 DB 접근도 비동기여야 한다.

- 동기 드라이버(`psycopg2`)를 `async def` 안에서 호출하면 이벤트 루프가 멈춘다.
- 비동기로 가려면 `asyncpg` 드라이버와 `AsyncSession`을 함께 사용한다.
- 동기 ORM을 유지할 때는 엔드포인트를 `def`로 선언한다. FastAPI가 별도 스레드에서 실행한다.
- 한 프로젝트 안에서 동기·비동기 접근을 섞지 않는다.

```python
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

engine = create_async_engine(str(get_settings().database_url))
AsyncSessionFactory = async_sessionmaker(engine, expire_on_commit=False)


async def find_by_id(session: AsyncSession, order_id: int) -> Order | None:
    stmt = select(Order).where(Order.id == order_id)
    result = await session.scalars(stmt)
    return result.one_or_none()
```

실행 모델 판단 기준은 [실행과 운영](./python_08_web_runtime_operations_guide.md)에서 다룬다.

## 마이그레이션

스키마 변경은 항상 파일로 남기고 코드와 함께 리뷰한다.

Alembic 사용 절차는 다음과 같다.

```bash
uv run alembic init -t async migrations   # 최초 1회
uv run alembic revision --autogenerate -m "add order status index"
uv run alembic upgrade head               # 적용
uv run alembic downgrade -1               # 직전 버전으로 되돌리기
uv run alembic current                    # 현재 적용 버전 확인
```

Django는 다음 명령을 사용한다.

```bash
uv run python manage.py makemigrations
uv run python manage.py migrate
uv run python manage.py showmigrations
uv run python manage.py sqlmigrate orders 0003   # 실행될 SQL 확인
```

작성 기준은 다음과 같다.

- 자동 생성 결과를 그대로 쓰지 않고 생성된 SQL을 확인한 뒤 커밋한다.
- 하나의 마이그레이션에는 하나의 목적만 담는다.
- 되돌리기 경로를 정의한다. 되돌릴 수 없는 변경은 문서에 명시한다.
- 데이터 이전이 필요하면 스키마 변경과 데이터 이전을 분리한다.
- 대상 테이블이 크면 잠금 시간을 확인하고 인덱스 생성 방식을 DB별로 조정한다.

## 무중단 배포용 변경 순서

애플리케이션과 스키마가 동시에 바뀌면 배포 중 오류가 발생한다. 컬럼 변경은 여러 단계로 나눈다.

1. 새 컬럼을 nullable로 추가한다.
2. 새 컬럼에도 값을 쓰는 코드를 배포한다.
3. 기존 데이터를 새 컬럼으로 이전한다.
4. 새 컬럼만 읽는 코드를 배포한다.
5. 제약을 추가하고 기존 컬럼을 제거한다.

## 다음 단계

- 요청·응답 계약과 인증 기준을 정한다: [API 계약과 인증](./python_07_web_api_contract_guide.md)

