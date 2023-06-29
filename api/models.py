from pydantic import BaseModel
from typing import List
from jwtdown_fastapi.authentication import Token

class FilmIds(BaseModel):
    name: str
    url: str

class FilmsOut(FilmIds):
    id: int
    name: str
    username: str

class FilmList(BaseModel):
    films: list[FilmIds]

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
