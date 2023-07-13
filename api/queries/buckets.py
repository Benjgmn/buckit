import requests
import os
from models.buckets import BucketIn, BucketOut
from models.films import FilmData, Films, FilmOut
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


    def list_films_in_buckets(self, bucket_id: str) -> Optional[List[Films]]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT films.id, films.title
                    FROM buckets_films
                    INNER JOIN films ON films.id = buckets_films.film_id
                    WHERE bucket_id = %s;
                    """,
                    (bucket_id,),
                )
                rows = cursor.fetchall()
                films_in_buckets = [
                    FilmOut(
                        id=row[0],
                        title=row[1],
                    )
                    for row in rows
                ]
                return Films(films=films_in_buckets)

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
                        # Update films table
                        cursor.execute(
                            """
                            INSERT INTO films (id, title)
                            VALUES (%s, %s)
                            ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;
                            """,
                            (film_data["id"], film_data["title"]),
                        )

                        # Insert into buckets_films table
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

    def delete_bucket(self, bucket_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                            DELETE FROM buckets
                            WHERE id = %s
                            """,
                        [bucket_id],
                    )

                    return True
        except Exception as e:
            print(e)
            return False

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

    def update_bucket_name(
        self, bucket_id: str, updated_name: str
    ) -> Optional[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE buckets
                    SET name = %s
                    WHERE id = %s
                    RETURNING id, name, account_id;
                    """,
                    (updated_name, bucket_id),
                )
                result = cursor.fetchone()
                if result:
                    return BucketOut(
                        id=str(result[0]),
                        name=result[1],
                        account_id=result[2],
                    )
                else:
                    return None
