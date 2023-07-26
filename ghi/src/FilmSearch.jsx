import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "./app/searchSlice";
import { useSearchFilmQuery } from "./app/apiSlice";
import { Link } from "react-router-dom";

const FilmSearch = () => {
  const dispatch = useDispatch();
  const searchCriteria = useSelector((state) => state.search.value);
  const { data } = useSearchFilmQuery(searchCriteria);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const [isSearchIconVisible, setSearchIconVisible] = useState(true);

  const toggleSearchBar = () => {
    setSearchIconVisible(false);
  };

  return (
    <div>
      <div>
        {isSearchIconVisible && (
          <div className="search-icon" onClick={toggleSearchBar}>
            <img src="/searchicon.png" alt="Search" />
          </div>
        )}
        <form
          onSubmit={handleSearch}
          className={`search-bar ${isSearchIconVisible ? "" : "active"}`}
        >
          <div className="field has-addons">
            <div className="control has-icons-left">
              <input
                className={`input ${isSearchIconVisible ? "" : "expanded"}`}
                type="text"
                placeholder="Search films"
                value={searchCriteria}
                onChange={(e) => dispatch(filter(e.target.value))}
              />
              <span className="icon is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div className="control">
              <button
                className={`button is-primary ${
                  isSearchIconVisible ? "" : "expanded"
                }`}
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        <div className={`container ${isSearchIconVisible ? "hidden" : ""}`}>
          {data?.results?.map((film) => (
            <div className="col-md-4 col-sm-6 mb-4" key={film.id}>
              <div className="card" data-title={film.title}>
                <Link to={`/films/${film.id}`}>
                  {film.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                      alt={film.title}
                      className="card-img-top"
                    />
                  ) : (
                    <div className="placeholder-image">
                      <img src="/placeholder-poster.jpg" />
                    </div>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmSearch;
