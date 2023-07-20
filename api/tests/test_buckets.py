from fastapi.testclient import TestClient
from main import app
from queries.buckets import BucketsQueries
from models.buckets import BucketIn
from authenticator import authenticator



client = TestClient(app)


def fake_get_current_account_data():
    return {'id': 1, 'username': 'fake-user'}


class FakeBucketQueries:
    def get_buckets_by_user(self, account_id: int):
        return [
            {
                "account_id": account_id,
                "id": 3,
                "name": "Test1",
            }
        ]

    def list_films_in_buckets(self, bucket_id: str, account_id: int):
        return {
            "films": [ {
                "id": 33, 
                "title": "test", 
                "released": "2023-07-23", 
                "poster": "url",

            } ]

        }

    def add_film_to_bucket(self, bucket_id: str, film_id: int, account_id: int):
        return {
                "success": True,
                "bucket_id": bucket_id,
                "film_data": {}, 
                }

    def delete_film_from_bucket(self, bucket_id: int, film_id: int):
        return True

    def delete_bucket(self, bucket_id: int):
        return True

    def create_bucket(self, bucket_in: BucketIn, account_id: int):
        bucket = bucket_in.dict()
        bucket["id"] = "5"
        bucket["account_id"] = account_id
        return bucket

    def update_bucket_name(self, bucket_id: str, updated_name: str, account_id: int):

        if not hasattr(self, "buckets"):
            self.buckets = []

        for bucket in self.buckets:
            if bucket["id"] == bucket_id:
                bucket["name"] = updated_name
                bucket["account_id"] = account_id

                return {
                    "id": bucket_id,
                    "account_id": account_id,
                    "name": updated_name,
                }
        return None


def test_get_buckets_by_user():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data

    res = client.get('/buckets')
    data = res.json()

    assert res.status_code == 200
    assert data == [
        {
            "account_id": 1,
            "id": 3,
            "name": "Test1",
        }
    ]


def test_list_films_in_buckets():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data
    
    res = client.get('/buckets/1/films')
    data = res.json()
    print(data)

    assert res.status_code == 200
    assert data == {
        "films": [
            {
            "id": 33, 
            "title": "test", 
            "released": "2023-07-23", 
            "poster": "url",

        }
        ]

    }


def test_add_film_to_bucket():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    film_data = {}

    res = client.post("/buckets/1/films/33", json=film_data)

    assert res.status_code == 200
    data = res.json()
    assert data == {
        "success": True,
        "bucket_id": "1",
        "film_data": {},
    }



def delete_film_from_bucket():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    res = client.delete("/buckets/1/films/33")
    data = res.json()

    assert res.status_code == 200
    assert {"success": True} == data


def delete_bucket():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    res = client.delete("/buckets/1")
    data = res.json()

    assert res.status_code == 200
    assert {"success": True} == data


def create_bucket():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    bucket_in = {"name": "tim"}

    res = client.post("/buckets", json=bucket_in)
    data = res.json()

    assert data == {
        "id": "5",
        "account_id": 1,
        "name": "tim",
    }
    assert res.status_code == 200


def update_bucket_name():
    app.dependency_overrides[BucketsQueries] = FakeBucketQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    updated_bucket = {
        "id": "1",
        "name": "todd",
    }

    res = client.put("/buckets/1", json=updated_bucket)
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "id": "1",
        "account_id": 1,  
        "name": "todd",
    }