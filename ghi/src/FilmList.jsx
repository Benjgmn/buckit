import { useGetHighestRatedFilmsQuery } from "./app/apiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./FilmList.css";

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
    <div className="container">
      {filteredFilms().map((film) => (
        <div className="col-md-4 col-sm-6 mb-4" key={film.id}>
          <Link to={`/films/${film.id}`} className="film-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.title}
              className="card-img-top"
              data-title={`${film.title} (${film.release_date.substr(0, 4)})`}
            />
            <div className="film-title-overlay">{film.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FilmList;
