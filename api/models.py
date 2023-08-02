from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import date
from typing import List


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


class Error(BaseModel):
    message: str


class BucketIn(BaseModel):
    name: str


class BucketOut(BaseModel):
    account_id: int
    id: int
    name: str


class FilmOut(BaseModel):
    id: int
    title: str
    released: date | None
    poster: str | None


class FilmIn(BaseModel):
    title: str
    released: date | None
    overview: str
    poster: str | None
    vote_avr: float
    tmdb_id: int


class Films(BaseModel):
    films: List[FilmOut]


class FilmData(BaseModel):
    success: bool
    bucket_id: int
    film_data: dict
