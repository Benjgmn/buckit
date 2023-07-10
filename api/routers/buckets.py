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
    return queries.get_buckets_by_user(account_id=account_id)


@router.post("/buckets/{bucket_id}/films/{film_id}", response_model=FilmData)
def add_film_to_bucket(
    bucket_id: str,
    film_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: BucketsQueries = Depends(),
):
    return queries.add_film_to_bucket(bucket_id=bucket_id, film_id=film_id)


@router.put("/buckets/{bucket_id}", response_model=BucketOut)
def update_bucket_name(
    bucket_id: str,
    updated_bucket: BucketIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: BucketsQueries = Depends(),
):
    return queries.update_bucket_name(
        bucket_id=bucket_id, updated_name=updated_bucket.name
    )

# @router.delete("/api/buckets/{bucket_id}/remove_film/{film_id}", response_model=dict)
# def remove_film_from_bucket(
#     bucket_id: int,
#     film_id: int,
#     bucket_repository: BucketRepository = Depends(),
# ):
#     return bucket_repository.remove_film_from_bucket(bucket_id, film_id)