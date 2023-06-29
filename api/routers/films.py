from fastapi import APIRouter, Depends
from models import FilmList, FilmsOut
from queries.films import FilmQueries

router = APIRouter()

@router.get('/api/films', response_model=FilmList)
def list_films(
    queries: FilmQueries = Depends()
):
    return {
        "films": queries.list_films()
    }

@router.get('/api/films/{name}', response_model=FilmsOut)
def get_film_by_name(
    name: str,
    queries: FilmQueries = Depends()
):
    return queries.get_one_by_name(name)