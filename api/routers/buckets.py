from fastapi import APIRouter, Depends
from models.buckets import *
from authenticator import authenticator
from models.films import FilmData
from queries.buckets import BucketsQueries

router = APIRouter()


@router.post("/buckets", response_model=BucketOut)
def create_bucket(
    bucket: BucketIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: BucketsQueries = Depends(),
):
    return queries.create_bucket(bucket=bucket)


@router.get("/buckets/{account_id}", response_model=List[BucketOut])
def get_buckets_by_user(
    account_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: BucketsQueries = Depends(),
):
    return queries.get_buckets_by_user(account_id)


@router.post("/buckets/{bucket_id}/films/{film_id}", response_model=FilmData)
def add_film_to_bucket(
    bucket_id: str,
    film_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: BucketsQueries = Depends(),
):
    return queries.add_film_to_bucket(bucket_id, film_id)
