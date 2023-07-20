import ErrorNotification from "./ErrorNotification";
import { useGetHighestRatedFilmsQuery } from "./app/apiSlice";
import { useSelector } from "react-redux";
import FilmCard from "./FilmCard";

const FilmList = () => {
  const searchCriteria = useSelector((state) => state.search.value);
  const {
    data: highestRatedFilms,
    error,
    isLoading,
  } = useGetHighestRatedFilmsQuery();
  const searchResults = useSelector((state) => state.search.results);

  const filmsToShow = searchCriteria ? searchResults : highestRatedFilms;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <ErrorNotification error={error} />
        <h3>
          <small className="text-body-secondary">{searchCriteria}</small>
        </h3>
        <div className="container">
          <div className="row mt-3">
            {filmsToShow && filmsToShow.length > 0 ? (
              filmsToShow.map((film) => <FilmCard key={film.id} film={film} />)
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmList;
