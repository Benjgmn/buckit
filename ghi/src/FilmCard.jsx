import React from "react";
import { Link } from "react-router-dom";

const FilmCard = ({ film }) => {
  const { id, title, poster_path } = film;

  const getImageUrl = () => {
    if (poster_path) {
      return `https://image.tmdb.org/t/p/w500/${poster_path}`;
    } else {
      // Return your default 404 image URL here
      return "https://www.netlify.com/v3/img/blog/the404.png";
    }
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card">
        <Link to={`/films/${id}`}>
          <img
            src={getImageUrl()} // Use the getImageUrl function to get the image URL
            alt={title}
            className="card-img-top"
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
