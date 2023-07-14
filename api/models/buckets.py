from pydantic import BaseModel


class Error(BaseModel):
    message: str


class BucketIn(BaseModel):
    name: str


class BucketOut(BaseModel):
    account_id: int
    id: int
    name: str
