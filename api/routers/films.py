from fastapi import APIRouter, Depends
from queries.films import FilmQueries
from typing import Optional

router = APIRouter()


@router.get("/api/films/rank")
async def get_highest_rated_films(queries: FilmQueries = Depends()):
    return queries.get_highest_rated_films()


@router.get("/api/films/search", response_model=dict)
def search_film(title: Optional[str] = None, queries: FilmQueries = Depends()):
    if title is not None:
        return queries.search_film_by_title(title)
    else:
        return {"results": []}


@router.get("/api/films/{id}", response_model=dict)
def get_film_details(id: int, queries: FilmQueries = Depends()):
    return queries.get_film_details(id)
