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
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif not queries.get_buckets_by_user(bucket_id):
        raise HTTPException(status_code=404, detail="Bucket not found")
    elif account_data["id"] != queries.get_buckets_by_user(bucket_id).account_id:
        raise HTTPException(status_code=401, detail="Not authorized to modify this bucket")
    return queries.update_bucket_name(
        bucket_id=bucket_id, updated_name=updated_bucket.name
    )

@router.delete("/buckets/{bucket_id}", response_model=bool)
def delete_bucket(bucket_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: BucketsQueries = Depends(),
    ):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif not queries.get_buckets_by_user(bucket_id):
        raise HTTPException(status_code=404, detail="Bucket not found")
    elif account_data["id"] != queries.get_buckets_by_user(bucket_id).account_id:
        raise HTTPException(status_code=401, detail="Not authorized to delete this bucket")
    buckets = queries.delete_bucket(bucket_id)
    return buckets

@router.get("/buckets/{bucket_id}/films", response_model=Films)
def list_films_in_buckets(
    bucket_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: BucketsQueries = Depends(),
):
    return queries.list_films_in_buckets(bucket_id=bucket_id)