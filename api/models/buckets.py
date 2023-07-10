from pydantic import BaseModel
from typing import Dict, List, Union, Optional
from queries.pool import pool
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class BucketIn(BaseModel):
    name: str
    account_id: int


class BucketOut(BaseModel):
    id: Optional [int]
    name: Optional [str]
    account_id: Optional [int]
