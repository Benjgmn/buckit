steps = [
    [
        """
        CREATE TABLE buckets (
            id SERIAL PRIMARY KEY,
            account_id INTEGER REFERENCES accounts(id),
            name VARCHAR(255) NOT NULL
        );
        """,
        """
        DROP TABLE buckets;
        """,
    ],
    [
        """
        CREATE TABLE buckets_films (
            id SERIAL PRIMARY KEY,
            film_id INTEGER NOT NULL,
            bucket_id INTEGER REFERENCES buckets(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE buckets_films;
        """,
    ],
]