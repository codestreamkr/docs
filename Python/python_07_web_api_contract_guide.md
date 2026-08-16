# API 계약과 인증

이 문서는 요청 검증, 응답 형식, 예외 처리와 인증·인가를 일관되게 구성하는 기준을 안내한다.

API 계약이 흩어지면 클라이언트가 오류 응답을 처리하지 못한다. 검증 실패, 도메인 오류, 시스템 오류의 응답 형태를 먼저 정하고 시작한다.

## 요청·응답 모델

Pydantic 모델로 입력과 출력을 분리해 정의한다.

```python
# api/v1/schemas.py
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(ge=1, le=100)


class OrderCreate(BaseModel):
    customer_id: int
    items: list[OrderItemCreate] = Field(min_length=1)
    memo: str | None = Field(default=None, max_length=200)


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: str
    total_amount: Decimal
    created_at: datetime
```

적용 기준은 다음과 같다.

- 요청 모델과 응답 모델을 분리한다. ORM 모델을 그대로 노출하지 않는다.
- 값 범위, 길이, 필수 여부는 모델에 선언한다. 서비스 계층에서 반복 검사하지 않는다.
- 응답 모델은 노출할 필드만 선언한다. 내부 식별자와 비밀 값은 포함하지 않는다.
- ORM 객체를 응답으로 변환할 때는 `from_attributes=True`와 `model_validate()`를 사용한다.
- 여러 필드가 함께 만족해야 하는 조건은 모델 검증자(`model_validator`)에 둔다.

Django REST Framework는 같은 역할을 Serializer로 수행하며, 읽기 전용 필드와 쓰기 전용 필드를 구분해 선언한다.

## 라우터 작성

라우터는 입력을 받아 서비스에 넘기고 응답 모델로 변환하는 일만 한다.

```python
# api/v1/orders.py
from fastapi import APIRouter, Query, status

from order_api.api.deps import CurrentUser, DbSession
from order_api.api.v1.schemas import OrderCreate, OrderResponse
from order_api.services import order_service

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreate, db: DbSession, user: CurrentUser) -> OrderResponse:
    order = order_service.create_order(db, payload, actor_id=user.id)
    return OrderResponse.model_validate(order)


@router.get("", response_model=list[OrderResponse])
def list_orders(
    db: DbSession,
    user: CurrentUser,
    limit: int = Query(default=20, le=100),
    offset: int = Query(default=0, ge=0),
) -> list[OrderResponse]:
    orders = order_service.list_orders(db, user.id, limit=limit, offset=offset)
    return [OrderResponse.model_validate(order) for order in orders]
```

- 경로는 자원 이름의 복수형으로 정하고 동사를 넣지 않는다.
- 생성은 201, 조회는 200, 본문 없는 삭제는 204를 사용한다.
- 목록 조회는 `limit` 상한을 지정해 과도한 응답을 막는다.
- 버전은 경로 접두어(`/api/v1`)로 구분한다.

## 예외 처리

도메인 예외를 정의하고 응답 변환은 한 곳에서 처리한다.

```python
# core/exceptions.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


class DomainError(Exception):
    code = "DOMAIN_ERROR"
    status_code = 400

    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.message = message


class OrderNotFound(DomainError):
    code = "ORDER_NOT_FOUND"
    status_code = 404


class OrderAlreadyPaid(DomainError):
    code = "ORDER_ALREADY_PAID"
    status_code = 409


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(DomainError)
    async def handle_domain_error(request: Request, exc: DomainError) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"code": exc.code, "message": exc.message},
        )
```

응답 형식은 다음 기준으로 통일한다.

| 상황 | 상태 코드 | 응답 내용 |
| --- | --- | --- |
| 요청 형식·값 오류 | 422(FastAPI 기본) 또는 400 | 필드 위치와 사유 |
| 인증 실패 | 401 | 오류 코드만 |
| 권한 없음 | 403 | 오류 코드만 |
| 대상 없음 | 404 | 오류 코드와 메시지 |
| 상태 충돌 | 409 | 오류 코드와 메시지 |
| 서버 오류 | 500 | 오류 코드와 추적 식별자 |

- 클라이언트 분기에 쓰는 값은 메시지가 아니라 `code`로 제공한다.
- 예외 메시지에 SQL, 스택 트레이스, 비밀 값을 넣지 않는다.
- 서비스 계층은 HTTP 상태를 모른다. 도메인 예외만 발생시킨다.
- 예상하지 못한 예외는 500으로 변환하고 서버 로그에 추적 식별자와 함께 남긴다.

## 인증

토큰 검증은 의존성 하나로 모으고 각 라우터에서 재사용한다.

```python
# api/deps.py
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from order_api.config import get_settings

bearer_scheme = HTTPBearer(auto_error=True)


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)],
) -> AuthUser:
    settings = get_settings()
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.jwt_secret,
            algorithms=["HS256"],
            options={"require": ["exp", "sub"]},
        )
    except jwt.PyJWTError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="INVALID_TOKEN") from None
    return AuthUser(id=int(payload["sub"]), roles=payload.get("roles", []))


CurrentUser = Annotated[AuthUser, Depends(get_current_user)]
```

적용 기준은 다음과 같다.

- 서명 알고리즘을 명시하고 토큰이 지정한 값을 그대로 쓰지 않는다.
- 만료(`exp`)와 주체(`sub`) 검증을 필수로 둔다.
- 액세스 토큰은 짧게 유지하고 갱신은 리프레시 토큰으로 처리한다.
- 비밀번호는 해시로만 저장한다. 알고리즘은 bcrypt 또는 Argon2를 사용한다.
- 세션 기반 인증이 필요하면 Django의 내장 인증을 사용한다.

## 인가

권한 확인은 두 단계로 나눈다.

- 경로 단위: 역할로 접근 가능한 API를 제한한다. 의존성으로 검사한다.
- 자원 단위: 요청자가 해당 자원의 소유자인지 서비스 계층에서 확인한다.

```python
def require_roles(*roles: str):
    def checker(user: CurrentUser) -> AuthUser:
        if not set(roles) & set(user.roles):
            raise HTTPException(status.HTTP_403_FORBIDDEN, detail="FORBIDDEN")
        return user

    return checker


@router.delete("/{order_id}", status_code=204)
def delete_order(
    order_id: int,
    db: DbSession,
    user: Annotated[AuthUser, Depends(require_roles("ADMIN"))],
) -> None:
    order_service.delete_order(db, order_id, actor_id=user.id)
```

- 소유자 확인 없이 식별자만으로 자원에 접근하지 않는다.
- 권한 없는 자원은 404와 403 중 어느 쪽으로 응답할지 정하고 전체에 동일하게 적용한다.

## 공통 보호 항목

API 전면에 적용할 항목을 배포 전에 확인한다.

- CORS: 허용 출처를 명시적으로 지정한다. 자격 증명을 함께 쓸 때 와일드카드를 사용하지 않는다.
- 요청 크기 제한: 업로드와 본문 크기 상한을 리버스 프록시 또는 앱에서 지정한다.
- 속도 제한: 인증·검색처럼 비용이 큰 엔드포인트에 적용한다.
- 로그 마스킹: 토큰, 비밀번호, 개인정보를 로그에서 제외한다.
- 문서 노출: OpenAPI 문서 공개 범위를 환경별로 정한다.

## API 문서

FastAPI는 OpenAPI 문서를 자동 생성한다. 품질은 선언 내용에 따라 결정된다.

- 라우터에 `tags`, `summary`, `response_model`을 지정한다.
- 오류 응답은 `responses`에 상태 코드와 형식을 선언한다.
- 예시 값이 필요한 필드는 모델에 `examples`를 추가한다.
- 문서 경로는 `/docs`와 `/openapi.json`이며 운영 환경 노출 여부를 설정으로 제어한다.

## 다음 단계

- 실행 모델, 테스트와 배포 기준을 정한다: [실행과 운영](./python_08_web_runtime_operations_guide.md)

