from fastapi.testclient import TestClient
from main import app
from queries.films import FilmQueries

client = TestClient(app)


class FakeFilmQueries:
    # Zachary
    def get_highest_rated_films(self):
        return [
            {
                "adult": False,
                "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
                "genre_ids": [18, 80],
                "id": 238,
                "original_language": "en",
                "original_title": "The Godfather",
                "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
                "popularity": 128.804,
                "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                "release_date": "1972-03-14",
                "title": "The Godfather",
                "video": False,
                "vote_average": 8.7,
                "vote_count": 18241,
            },
        ]

    # Ben
    def search_film_by_title(self, title: str):
        return {
            "page": 1,
            "results": [
                {
                    "title": title,
                }
            ],
        }

    # Zachary
    def get_film_details(self, id: int):
        return {
            "id": id,
        }


# Zachary
def test_get_highest_rated():
    app.dependency_overrides[FilmQueries] = FakeFilmQueries

    res = client.get("/api/films/rank")
    data = res.json()
    print(res, res.status_code, data)

    assert res.status_code == 200
    assert data == [
        {
            "adult": False,
            "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
            "genre_ids": [18, 80],
            "id": 238,
            "original_language": "en",
            "original_title": "The Godfather",
            "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
            "popularity": 128.804,
            "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            "release_date": "1972-03-14",
            "title": "The Godfather",
            "video": False,
            "vote_average": 8.7,
            "vote_count": 18241,
        }
    ]


# Zachary
def test_search_film():

    app.dependency_overrides[FilmQueries] = FakeFilmQueries

    res = client.get("/api/films/search/test-title")
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "page": 1,
        "results": [
            {
                "title": "test-title",
            }
        ],
    }


# Ben
def test_get_film_details():
    app.dependency_overrides[FilmQueries] = FakeFilmQueries

    res = client.get("/api/films/1")

    assert res.status_code == 200
    assert str(res.json()["id"]) == "1"
    app.dependency_overrides = {}
