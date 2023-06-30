import requests
import os

TMDB_API_KEY = os.environ["TMDB_API_KEY"]

class FilmQueries:

    def get_highest_rated_films(self):
        try:
            url = f"https://api.themoviedb.org/3/movie/top_rated?api_key={TMDB_API_KEY}"
            response = requests.get(url)
            response.raise_for_status()

            films = response.json().get("results")
            return films

        except requests.exceptions.RequestException as e:
            print(f"Error retrieving highest rated movies: {e}")

        return None

    
    def search_film_by_title(self, title: str):
        results = requests.get(
           "https://api.themoviedb.org/3/search/movie?"
            + f"api_key={TMDB_API_KEY}&query={title}"
        )
        data = results.json()
        return data


    def get_film_details(self, id: int):
        result = requests.get(
            f"https://api.themoviedb.org/3/movie/{id}?api_key={TMDB_API_KEY}"
        )
        data = result.json()
        return data




    


