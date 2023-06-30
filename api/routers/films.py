from fastapi import APIRouter, Depends
from queries.films import FilmQueries

router = APIRouter()


@router.get("/api/films/rank")
async def get_highest_rated_(queries: FilmQueries = Depends()):
    return queries.get_highest_rated_films()


@router.get("/api/films/search/{title}", response_model=dict)
def search_film(title: str, queries: FilmQueries = Depends()):
    return queries.search_film_by_title(title)


@router.get("/api/films/{id}", response_model=dict)
def get_film_details(id: int, queries: FilmQueries = Depends()):
    return queries.get_film_details(id)