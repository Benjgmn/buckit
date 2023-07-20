import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "./app/searchSlice";
import { useSearchFilmQuery } from "./app/apiSlice";
import FilmCard from "./FilmCard";

const FilmSearch = () => {
  const dispatch = useDispatch();
  const searchCriteria = useSelector((state) => state.search.value);
  const { data } = useSearchFilmQuery(searchCriteria);

  const handleSearch = (e) => {
    e.preventDefault();
    // No need to dispatch the filter action on each character change
    // It will be handled automatically by the useSearchFilmQuery hook
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Search films"
              value={searchCriteria}
              onChange={(e) => dispatch(filter(e.target.value))}
            />
          </div>
          <div className="control">
            <button className="button is-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>

      <div className="row mt-3">
        {data?.results.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
};

export default FilmSearch;
