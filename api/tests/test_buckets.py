from fastapi.testclient import TestClient
from main import app
from queries.buckets import BucketsQueries, BucketOut, BucketIn
from authenticator import authenticator
from typing import List


client = TestClient(app)


def fake_get_current_account_data():
    return {'id': '1', 'username': 'fake-user'}


class FakeBucketQueries:
    def get_buckets_by_user(self, account_id: str):
        [
            {
                "account_id": account_id,
                "id": 3,
                "name": "Test1"
            },
        ]

    def list_films_in_buckets(self, bucket_id: str):
        pass

    def add_film_to_bucket(self, bucket_id: str, film_id: int):
        pass

    def delete_film_from_bucket(self, bucket_id: int, film_id: int):
        pass

    def delete_bucket(self, bucket_id: int):
        pass

    def create_bucket(self, bucket: BucketIn, account_id):
        pass

    def update_bucket_name(self, bucket_id: str, updated_name: str):
        pass


def test_get_buckets_by_user():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data

    res = client.get('/buckets/1')
    data = res.json()

    assert res.status_code == 200
    assert data == {
        [
            {
                "account_id": "test-id",
                "id": 3,
                "name": "Test1"
            },
        ]
    }


def test_list_films_in_buckets():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data
    assert 1 == 1


def test_add_film_to_bucket():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    pass


def delete_film_from_bucket():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    pass