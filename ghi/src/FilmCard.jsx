import { Link } from "react-router-dom";

const FilmCard = ({ title, url }) => {
  return (
    <>
      <div className="col-3">
        <div className="card mb-3">
          <img src={url} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Summary</p>
            <Link
              to={`/api/films/search/${title}`}
              className="btn btn-primary">
              Get Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmCard;

