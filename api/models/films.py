from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List
from fastapi import HTTPException


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
    bucket_id: str
    film_data: dict


# class FilmRepository:
#     def create(self, film: FilmIn) -> FilmOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     INSERT INTO films (
#                         title
#                         , release_date
#                         , overview
#                         , poster_path
#                         , vote_average
#                         , tmdb_id
#                     )
#                     VALUES (%s, %s, %s, %s, %s, %s)
#                     RETURNING id;
#                     """,
#                     [
#                         film.title,
#                         film.released,
#                         film.overview,
#                         film.poster,
#                         film.vote_avr,
#                         film.tmdb_id,
#                     ],
#                 )
#                 film_id = db.fetchone()[0]
#                 return FilmOut(id=film_id, **film.dict())

#     def get_all(self) -> List[FilmOut]:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT *
#                     FROM films;
#                     """
#                 )
#                 films = db.fetchall()
#                 result = []
#                 for film in films:
#                     result.append(
#                         FilmOut(
#                             id=film[0],
#                             title=film[1],
#                             released=film[2],
#                             overview=film[3],
#                             poster=film[4],
#                             vote_avr=film[5],
#                             tmdb_id=film[6],
#                         )
#                     )
#                 return result

#     def get_by_id(self, film_id: int) -> FilmOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT *
#                     FROM films
#                     WHERE id = %s;
#                     """,
#                     [film_id],
#                 )
#                 film = db.fetchone()

#                 if film is None:
#                     raise HTTPException(
#                         status_code=404, detail="Film not found"
#                     )

#                 return FilmOut(
#                     id=film[0],
#                     title=film[1],
#                     released=film[2],
#                     overview=film[3],
#                     poster=film[4],
#                     vote_avr=film[5],
#                     tmdb_id=film[6],
#                 )

#     def search_by_title(self, title: str) -> List[FilmOut]:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT *
#                     FROM films
#                     WHERE title ILIKE %s;
#                     """,
#                     ["%" + title + "%"],
#                 )
#                 films = db.fetchall()
#                 result = []
#                 for film in films:
#                     result.append(
#                         FilmOut(
#                             id=film[0],
#                             title=film[1],
#                             released=film[2],
#                             overview=film[3],
#                             poster=film[4],
#                             vote_avr=film[5],
#                             tmdb_id=film[6],
#                         )
#                     )
#                 return result

#     def get_by_vote(self, vote_avr: float) -> List[FilmOut]:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 db.execute(
#                     """
#                     SELECT *
#                     FROM films
#                     WHERE vote_average = %s;
#                     """,
#                     [vote_avr],
#                 )
#                 films = db.fetchall()

#                 if not films:
#                     raise HTTPException(
#                         status_code=404, detail="Films not found"
#                     )

#                 result = []
#                 for film in films:
#                     result.append(
#                         FilmOut(
#                             id=film[0],
#                             title=film[1],
#                             released=film[2],
#                             overview=film[3],
#                             poster=film[4],
#                             vote_avr=film[5],
#                             tmdb_id=film[6],
#                         )
#                     )
#                 return result
