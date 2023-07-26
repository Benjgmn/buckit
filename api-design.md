# APIs

## Buckets

- **Method**: `GET`, `POST`
- **Path**: `api/buckets`

Output:

```json
{
    [
        {
        "account": int,
        "id": int,
        "name": string
        },
    ]
}
```
Getting all of the buckets that are associated with a specific user, giving the chance to have personalized lists that only the owner of that account can see.

- **Method**: `PUT`, `DELETE`
- **Path**: `/api/buckets/<bucket:id>`

Output for DELETE:

```json
{
    true
}

```
Output for PUT:

```json
{
    "account_id": int,
    "id": int,
    "name": string
}
```

Having the ability to delete and or change the name of a bucket allows for for customization for the user with their lists of movies, being able to add and create as needed

- **Method**: `POST`, `DELETE`
- **Path**: `api/buckets/<bucket:id>/films/<film:id>`

Output for POST:

```json
{
    "success": true,
    "bucket_id": string,
    "film_data": {}
}
```

Output for DELETE:

```json
{
    true
}
```

Adding and deleteing films from specific bucket is the key to this entire application, giving users the freedom to define list of movies they would want to watch.

- **Method**: `GET`
- **Path**: `api/buckets/<bucket:id>/films`

Output:

```json
{
    "films": [
        {
            "id": int,
            "title": string,
            "released": string,
            "poster": string
        }
    ]
}
```

## Films

- **Method**: `GET`
- **Path**: `api/films/rank`

Output:

```json
{
    [
                {
            "adult": bool,
            "backdrop_path": string,
            "genre_ids": [
            int,
            int
            ],
            "id": int,
            "original_language": string,
            "original_title": string,
            "overview": string,
            "popularity": int,
            "poster_path": string,
            "release_date": string,
            "title": string,
            "video": bool,
            "vote_average": int,
            "vote_count": int
        },
    ]
}
```

On our home page we have access to our films that are shown on the opening page, 20 of the highest ranked films in totallity to give aqn idea of what films might be good to add to their list.

- **Method**: `GET`
- **Path**: `api/films/search`

Input:

```json
{
    "title": string
}
```

Output:

```json
{
    "page": int,
  "results": [
    {
      "adult": bool,
      "backdrop_path": string,
      "genre_ids": [
        int,
        int,
        int
      ],
      "id": int,
      "original_language": string,
      "original_title": string,
      "overview": string,
      "popularity": int,
      "poster_path": string,
      "release_date": string,
      "title": string,
      "video": bool,
      "vote_average": int,
      "vote_count": int
    },
  ]
}
```
This brings us to our more specified function which helps our user search for films by title. EBing able to do this allows them to directly find films they want to add.

- **Method**: `GET`
- **Path**: `api/films/int:id`

Input:
```json
{
    id: int
}
```

Output:

```json
{
    "adult": bool,
  "backdrop_path": string,
  "belongs_to_collection": {
    "id": int,
    "name": string,
    "poster_path": string,
    "backdrop_path": string
  },
  "budget": int,
  "genres": [
    {
      "id": int,
      "name": string
    },
    {
      "id": int,
      "name": string
    }
  ],
  "homepage": string,
  "id": int,
  "imdb_id": string,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": int,
  "poster_path": string,
  "production_companies": [
    {
      "id": int,
      "logo_path": string,
      "name": string,
      "origin_country": string
    },
    {
      "id": int,
      "logo_path": null,
      "name": string,
      "origin_country": string
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": string,
      "name": string
    }
  ],
  "release_date": string,
  "revenue": int,
  "runtime": int,
  "spoken_languages": [
    {
      "english_name": string,
      "iso_639_1": string,
      "name": string
    },
    {
      "english_name": string,
      "iso_639_1": string,
      "name": string
    },
    {
      "english_name": string,
      "iso_639_1": string,
      "name": string
    },
    {
      "english_name": string,
      "iso_639_1": string,
      "name": string
    }
  ],
  "status": string,
  "tagline": string,
  "title": string,
  "video": bool,
  "vote_average": int,
  "vote_count": int
}
```

This fucntiuonality allows our user to see the specific details of a film, from here they can make the decision if they feel that the particular film will be a fine addition to their bucket