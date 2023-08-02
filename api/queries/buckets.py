import requests
import os
from models.buckets import BucketIn, BucketOut
from models.films import FilmData, Films, FilmOut
from queries.pool import pool
from typing import Optional, List

TMDB_API_KEY = os.environ["TMDB_API_KEY"]


class BucketsQueries:
    def get_buckets_by_user(self, account_id: int) -> List[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name, account_id
                    FROM buckets
                    WHERE account_id = %s;
                    """,
                    [account_id],
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

    def list_films_in_buckets(
        self, bucket_id: int, account_id: int
    ) -> Optional[List[Films]]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT films.id, films.title, films.released, films.poster
                    FROM buckets_films
                    INNER JOIN films ON films.id = buckets_films.film_id
                    INNER JOIN buckets ON buckets.id = buckets_films.bucket_id
                    WHERE buckets.id = %s AND buckets.account_id = %s;
                    """,
                    (
                        bucket_id,
                        account_id,
                    ),
                )
                rows = cursor.fetchall()
                films_in_buckets = [
                    FilmOut(
                        id=row[0], title=row[1], released=row[2], poster=row[3]
                    )
                    for row in rows
                ]
                return Films(films=films_in_buckets)

    def add_film_to_bucket(
        self, bucket_id: int, film_id: int, account_id: int
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
                            SELECT EXISTS (
                                SELECT 1 FROM buckets_films
                                WHERE bucket_id = %s AND film_id = %s
                            );
                            """,
                            (bucket_id, film_data["id"]),
                        )
                        film_exists = cursor.fetchone()[0]

                        if film_exists:
                            return FilmData(
                                success=False,
                                bucket_id=bucket_id,
                                film_data={},
                                message="Film already exists in the bucket",
                            )
                        cursor.execute(
                            """
                            INSERT INTO films (id, title, released, poster)
                            VALUES (%s, %s, %s, %s)
                            ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;
                            """,
                            (
                                film_data["id"],
                                film_data["title"],
                                film_data["release_date"],
                                film_data["poster_path"],
                            ),
                        )

                        cursor.execute(
                            """
                            INSERT INTO buckets_films (bucket_id, film_id)
                            VALUES (%s, %s);
                            """,
                            (bucket_id, film_data["id"]),
                        )

                        cursor.execute(
                            """
                            SELECT account_id
                            FROM buckets
                            WHERE id = %s;
                            """,
                            (bucket_id,),
                        )
                        account_id = cursor.fetchone()[0]

                        conn.commit()

                        film_data = FilmData(
                            bucket_id=bucket_id,
                            film_data=film_data,
                            success=True,
                            account_id=account_id,
                        )
                        return film_data

    def delete_film_from_bucket(
        self, bucket_id: int, film_id: int, account_id: int
    ) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    DELETE
                    FROM buckets_films
                    WHERE bucket_id = %s AND film_id = %s AND bucket_id IN (
                        SELECT id FROM buckets WHERE account_id = %s
                    )
                    RETURNING true;
                    """,
                    (
                        bucket_id,
                        film_id,
                        account_id,
                    ),
                )
                conn.commit()

                deleted_row = cursor.fetchone()
                if deleted_row:
                    return True
                else:
                    return False

    def delete_bucket(self, bucket_id: int, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT COUNT(*)
                        FROM buckets
                        WHERE id = %s AND account_id = %s;
                        """,
                        [bucket_id, account_id],
                    )
                    count = db.fetchone()[0]

                    if count == 0:
                        return False

                    db.execute(
                        """
                        DELETE FROM buckets
                        WHERE id = %s AND account_id = %s;
                        """,
                        [bucket_id, account_id],
                    )

                    return True
        except Exception as e:
            print(e)
            return False

    def create_bucket(
        self, bucket: BucketIn, account_id: int
    ) -> Optional[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO buckets (name, account_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    (bucket.name, account_id),
                )
                bucket_id = cursor.fetchone()[0]
                new_bucket = BucketOut(
                    id=bucket_id,
                    name=bucket.name,
                    account_id=account_id,
                )
                return new_bucket

    def update_bucket_name(
        self, bucket_id: int, updated_name: str, account_id: int
    ) -> Optional[BucketOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE buckets
                    SET name = %s
                    WHERE id = %s AND account_id = %s
                    RETURNING id, name, account_id;
                    """,
                    (updated_name, bucket_id, account_id),
                )
                result = cursor.fetchone()
                if result:
                    return BucketOut(
                        id=result[0],
                        name=result[1],
                        account_id=result[2],
                    )
                else:
                    return None
