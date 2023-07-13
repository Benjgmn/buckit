steps = [
    [
        """
        CREATE TABLE films (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            released VARCHAR NOT NULL,
            poster VARCHAR NOT NULL
        );
        """,
        """
        DROP TABLE films;
        """,
    ]
]