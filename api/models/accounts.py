from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class HttpError(BaseModel):
    detail: str


class AccountIn(BaseModel):
    username: str
    password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountToken(Token):
    account: AccountOut


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str


class AccountCreationError(Exception):
    def __init__(self, message="Account creation failed"):
        self.message = message
        super().__init__(self.message)
