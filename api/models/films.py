from pydantic import BaseModel
from datetime import date
from typing import List


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
