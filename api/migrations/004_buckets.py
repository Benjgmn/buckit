steps = [
    [
        """
        CREATE TABLE buckets (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL REFERENCES accounts(id),
            name VARCHAR(255) NOT NULL
        );
        """,
        """
        DROP TABLE buckets;
        """
    ]
]