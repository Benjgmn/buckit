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

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://www.netlify.com/v3/img/blog/the404.png";
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

        <div className="row mt-3">
          {data?.results?.map((film) => (
            <div className="card" key={film.id}>
              <Link to={`/films/${film.id}`}>
                {film.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                    alt={film.title}
                    className="card-img-top"
                  />
                ) : (
                  <div className="placeholder-image">
                    <img src="https://www.netlify.com/v3/img/blog/the404.png" />
                  </div>
                )}
                <h5 className="card-title">{film.title}</h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmSearch;
