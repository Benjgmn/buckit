import { useGetHighestRatedFilmsQuery } from "./app/apiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FilmList = () => {
  const searchCriteria = useSelector((state) => state.search.value);
  const { data, isLoading, isError } = useGetHighestRatedFilmsQuery();

  const filteredFilms = () => {
    if (searchCriteria) {
      return data.filter((film) => film.title.includes(searchCriteria));
    } else {
      return data;
    }
  };

  if (isLoading) {
    return <p>Loading films...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching films.</p>;
  }

  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <h1>Films</h1>
        <h3>
          <small className="text-body-secondary">{searchCriteria}</small>
        </h3>
        <div className="container">
          <div className="row mt-3">
            {filteredFilms().map((film) => (
              <div className="col-md-4 col-sm-6 mb-4" key={film.id}>
                <div className="card">
                  <Link to={`/films/${film.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                      alt={film.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{film.title}</h5>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmList;