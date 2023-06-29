from psycopg_pool import ConnectionPool
import os

DATABASE_URL = os.environ.get("DATABASE_URL")

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
