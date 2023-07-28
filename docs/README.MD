# Project Bucket List

- Ben Weiss
- Elena Woltman
- Zachary Loftis
- SamaDiba Younis

Project Bucket allows you to make your own bucket list of movies you'd like to watch.

## Design

- [API Design](docs/api-design.md)
- [Wireframe](docs/wireframe-design.png)

## Intended Market

We are targeting movie watchers and binge-watchers who want a convenient way to keep track of the movies they enjoy. Our platform will provide vital information such as an overview, runtime, and genres, offering users an informed look at the films they may potentially enjoy.

## Functionality

- User Signup and Authentication:

- Visitors can sign up and create their unique user accounts.
  Users can log in using their credentials.

- The website displays a list of movies fetched from a 3rd party API.
  Users can browse through the movie collection.

- Clicking on a movie provides more detailed information about the movie.
  Users can view the title, description, cast, and other relevant details.

- Logged-in users can create multiple favorites lists, which are called "buckets."
  Each bucket has a unique name assigned to it by the user.
  Adding Movies to Buckets:
- Users can add movies to a specific bucket from the movie details page.
- Users can assign a movie to one or more buckets.

## Project Initialization

In order utilize this amazing application

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create project-gamma-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it fastapi-1 bash`
