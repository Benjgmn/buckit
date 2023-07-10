import requests
import os
from models.buckets import BucketIn, BucketOut
from models.films import FilmData
from queries.pool import pool
from typing import Optional, List

TMDB_API_KEY = os.environ["TMDB_API_KEY"]


class BucketsQueries:
    def get_buckets_by_user(self, account_id: str) -> List[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name, account_id
                    FROM buckets
                    WHERE account_id = %s;
                    """,
                    (account_id,),
                )
                rows = cursor.fetchall()
                buckets = [
                    BucketOut(
                        id=str(row[0]),
                        name=row[1],
                        account_id=row[2],
                    )
                    for row in rows
                ]
                return buckets

    def create_bucket(self, bucket: BucketIn) -> Optional[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO buckets (name, account_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    (bucket.name, bucket.account_id),
                )
                bucket_id = cursor.fetchone()[0]
                new_bucket = BucketOut(
                    id=str(bucket_id),
                    name=bucket.name,
                    account_id=bucket.account_id,
                )
                return new_bucket

    def add_film_to_bucket(
        self, bucket_id: str, film_id: int
    ) -> Optional[FilmData]:
        url = f"https://api.themoviedb.org/3/movie/{film_id}?api_key={TMDB_API_KEY}"
        response = requests.get(url)

        if response.status_code == 200:
            film_data = response.json()
            if "id" in film_data:
                with pool.connection() as conn:
                    with conn.cursor() as cursor:
                        cursor.execute(
                            """
                            INSERT INTO buckets_films (bucket_id, film_id)
                            VALUES (%s, %s);
                            """,
                            (bucket_id, film_data["id"]),
                        )
                        conn.commit()
                        film_data = FilmData(
                            bucket_id=bucket_id,
                            film_data=film_data,
                            success=True,
                        )
                        return film_data
