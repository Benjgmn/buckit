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
