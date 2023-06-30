from pydantic import BaseModel
from typing import Dict, List
from queries.pool import pool
from fastapi import HTTPException
from .films import FilmRepository


class BucketIn(BaseModel):
    name: str
    account_id: int

class BucketOut(BaseModel):
    id: int
    name: str
    account_id: int


class BucketRepository:
    def __init__(self, film_repository: FilmRepository):
        self.film_repository = film_repository

    def create(self, bucket: BucketIn) -> BucketOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO buckets (name, account_id, film_ids)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [bucket.name, bucket.account_id, []],
                )
                bucket_id = db.fetchone()[0]
                return BucketOut(id=bucket_id, name=bucket.name, account_id=bucket.account_id, film_ids=[])

    def get(self) -> List[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT * FROM buckets;
                    """
                )
                result = []
                for record in db:
                    bucket = BucketOut(id=record[0], name=record[1], account_id=record[2], film_ids=record[3])
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
                return BucketOut(id=record[0], name=record[1], account_id=record[2], film_ids=record[3])

    def update(self, bucket_id: int, bucket: BucketIn) -> BucketOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE buckets SET name = %s, account_id = %s WHERE id = %s;
                    """,
                    [bucket.name, bucket.account_id, bucket_id],
                )
                return BucketOut(id=bucket_id, name=bucket.name, account_id=bucket.account_id, film_ids=[])

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

    def add_film_to_bucket(self, bucket_id: int, film_id: int):
        bucket = self.get_by_id(bucket_id)
        film = self.film_repository.get_by_id(film_id)
        if film.id in bucket.film_ids:
            raise HTTPException(status_code=400, detail="Film already exists in the bucket")
        bucket.film_ids.append(film.id)
        self.update(bucket_id, bucket)

    def remove_film_from_bucket(self, bucket_id: int, film_id: int):
        bucket = self.get_by_id(bucket_id)
        if film_id not in bucket.film_ids:
            raise HTTPException(status_code=404, detail="Film does not exist in the bucket")
        bucket.film_ids.remove(film_id)
        self.update(bucket_id, bucket)
    