import { Link } from "react-router-dom";

const FilmCard = ({ film }) => {
  const { id, title, poster_path } = film;

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card">
        <Link to={`/films/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
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
