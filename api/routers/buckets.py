from fastapi import APIRouter, HTTPException, Depends
from authenticator import authenticator
from typing import List
from models.buckets import BucketIn, BucketOut, BucketRepository

router = APIRouter()

@router.get('/api/buckets/mine', response_model=BucketOut)
def list_buckets_for_current_account(
    account_data: dict = Depends(authenticator.get_current_account_data),
    bucket_repository: BucketRepository = Depends()
):
    print("account_data:", account_data)
    return bucket_repository.list_all_for_account(account_id=account_data['id'])

@router.post("/api/buckets/", response_model=BucketOut)
def create_bucket(
    bucket: BucketIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    bucket_repository: BucketRepository = Depends()
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")

    return bucket_repository.create(bucket=bucket, account_id=account_data['id'])


@router.put("/api/buckets/{bucket_id}", response_model=BucketOut)
def update_bucket(
    bucket_id: int,
    bucket_in: BucketIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    bucket_repository: BucketRepository = Depends(),
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif not bucket_repository.get_by_id(bucket_id):
        raise HTTPException(status_code=404, detail="Bucket not found")
    elif account_data["id"] != bucket_repository.get_by_id(bucket_id).account_id:
        raise HTTPException(
            status_code=401, detail="Not authorized to modify this bucket"
        )

    updated_bucket = bucket_repository.update(bucket_id, bucket_in)
    if not updated_bucket:
        raise HTTPException(status_code=404, detail="Bucket not found")

    return updated_bucket


@router.delete("/api/buckets/{bucket_id}")
def delete_bucket(
    bucket_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    bucket_repository: BucketRepository = Depends(),
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in")
    elif not bucket_repository.get_by_id(bucket_id):
        raise HTTPException(status_code=404, detail="Bucket not found")
    elif account_data["id"] != bucket_repository.get_by_id(bucket_id).account_id:
        raise HTTPException(
            status_code=401, detail="Not authorized to modify this bucket"
        )

    bucket_repository.delete(bucket_id)
    return f"Deleted bucket {bucket_id}"


# @router.put("/api/buckets/{bucket_id}/add_film/{film_id}", response_model=dict)
# def add_film_to_bucket(
#     bucket_id: int,
#     film_id: int,
#     bucket_repository: BucketRepository = Depends(),
# ):
#     return bucket_repository.add_film_to_bucket(bucket_id, film_id)


# @router.delete("/api/buckets/{bucket_id}/remove_film/{film_id}", response_model=dict)
# def remove_film_from_bucket(
#     bucket_id: int,
#     film_id: int,
#     bucket_repository: BucketRepository = Depends(),
# ):
#     return bucket_repository.remove_film_from_bucket(bucket_id, film_id)