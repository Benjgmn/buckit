import requests


class FilmQueries:
    def list_films(self):
        url = "https://api.themoviedb.org/3/account/null"
        headers = {"accept": "application/json"}
        response = requests.get(url, headers=headers)
        data = response.json
        return data['result']
    
    def get_one_by_name(self, name: str):
        pass

