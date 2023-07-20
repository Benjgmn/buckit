import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, filter } from "./app/searchSlice";
import { useSearchFilmQuery } from "./app/apiSlice";
import FilmCard from "./FilmCard";

const SearchFilm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(filter(searchTerm));
    setSearchTerm("");
  };

  const { data, error, isLoading } = useSearchFilmQuery(searchTerm);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Search films"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">
            Search
          </button>
          <button
                    className="btn btn-lg btn-link"
                    type="button"
                    onClick={() => {
                        dispatch(reset())
                        setSearchTerm('');
                    }}
                >
                    Reset
            </button>
        </div>
      </div>

      <div className="row mt-3">
        {data?.results.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </form>
  );
};

export default SearchFilm;