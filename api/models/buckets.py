from pydantic import BaseModel
from typing import Dict, List, Union, Optional
from queries.pool import pool
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class BucketIn(BaseModel):
    name: str

class BucketOut(BaseModel):
    id: Optional [int]
    name: Optional [str]
    account_id: Optional [int]

class Buckets(BaseModel):
    buckets: List[BucketOut]

class BucketRepository:

    def get(self) -> List[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT * FROM buckets;
                    """
                )
                result = []
                for record in db.fetchall():
                    bucket = BucketOut(id=record[0], name=record[1], account_id=record[2])
                    result.append(bucket)
                return result

    def get_by_id(self, bucket_id: int) -> BucketOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT * FROM buckets WHERE id = %s;
                    """,
                    [bucket_id],
                )
                record = db.fetchone()
                if record is None:
                    raise HTTPException(status_code=404, detail="Bucket not found")
                return BucketOut(id=record[0], name=record[1], account_id=record[2])

    def list_all_for_account(self, account_id: int) -> Union[Error, List[BucketOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM buckets WHERE account_id = %s;
                        """,
                        [account_id],
                    )
                    results = []
                    for record in db.fetchall():
                        bucket = BucketOut(id=record[0], name=record[1], account_id=record[2])
                        results.append(bucket)
                    return results
        except Exception:
            return {"message": "You don't have a bucket yet."}


    def create(self, bucket: BucketIn, account_id) -> BucketOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO buckets (name, account_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [bucket.name, account_id],
                )
                bucket_id = db.fetchone()[0]
                return BucketOut(
                    id=bucket_id, name=bucket.name, account_id=account_id
                )

    def update(self, bucket_id: int, bucket: BucketIn) -> Union[Error, List[BucketOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE buckets SET name = %s WHERE id = %s;
                        """,
                        [bucket.name, bucket_id],
                    )
                    return BucketOut(
                        id=bucket_id, name=bucket.name
                    )
        except Exception:
            return {"message": "You don't have a bucket yet."}

    def delete(self, bucket_id: int) -> Dict[str, int]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM buckets WHERE id = %s;
                    """,
                    [bucket_id],
                )
                return {"id": bucket_id}

    # def add_film_to_bucket(self, bucket_id: int, film_id: int):
    #     bucket = self.get_by_id(bucket_id)
    #     film = self.film_repository.get_by_id(film_id)
    #     if film.id in bucket.film_ids:
    #         raise HTTPException(status_code=400, detail="Film already exists in the bucket")
    #     bucket.film_ids.append(film.id)
    #     self.update(bucket_id, bucket)

    # def remove_film_from_bucket(self, bucket_id: int, film_id: int):
    #     bucket = self.get_by_id(bucket_id)
    #     if film_id not in bucket.film_ids:
    #         raise HTTPException(status_code=404, detail="Film does not exist in the bucket")
    #     bucket.film_ids.remove(film_id)
    #     self.update(bucket_id, bucket)
    