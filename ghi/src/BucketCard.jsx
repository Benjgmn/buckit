import { Link } from "react-router-dom";

const BucketCard = ({ buckets }) => {
  const { id, name,} = buckets;

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card">
        <Link to={`/buckets/${id}`}>
            <div>{name}</div>
        </Link>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </div>
  );
};

export default BucketCard;