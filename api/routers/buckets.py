from fastapi import APIRouter, HTTPException
from typing import List, Union
from models.buckets import BucketIn, BucketOut
from models.films import FilmData
from queries.buckets import BucketsQueries

router = APIRouter()
bucket_queries = BucketsQueries()


@router.post("/buckets", response_model=BucketOut, status_code=201)
def create_bucket(bucket: BucketIn):
    new_bucket = bucket_queries.create_bucket(bucket)
    if not new_bucket:
        raise HTTPException(status_code=500, detail="Failed to create bucket")
    return new_bucket


@router.get("/buckets/{account_id}", response_model=List[BucketOut])
def get_buckets_by_user(account_id: str):
    buckets = bucket_queries.get_buckets_by_user(account_id)
    if not buckets:
        raise HTTPException(
            status_code=404,
            detail="No buckets found for the provided account ID",
        )
    return buckets


@router.post("/buckets/{bucket_id}/films/{film_id}", response_model=FilmData)
def add_film_to_bucket(bucket_id: str, film_id: int):
    result = bucket_queries.add_film_to_bucket(bucket_id, film_id)
    if result is None:
        raise HTTPException(
            status_code=500, detail="Failed to add film to bucket"
        )
    return result
