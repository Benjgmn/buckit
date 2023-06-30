steps = [
    [
        """
        CREATE TABLE films (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            release_date DATE,
            overview TEXT NOT NULL,
            poster_path VARCHAR(1000),
            vote_average FLOAT NOT NULL,
            tmdb_id INT NOT NULL
        );
        """,
        """
        DROP TABLE films;
        """
    ]
    ]