import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  useBucketfilmsQuery,
  useDeleteFilmFromBucketMutation,
  useGetBucketsQuery,
} from "./app/apiSlice";

const BucketFilms = () => {
  const { bucket_id } = useParams();
  const { data, error, isLoading } = useBucketfilmsQuery(bucket_id);
  const { data: bucketData } = useGetBucketsQuery();
  const [deleteFilmFromBucket] = useDeleteFilmFromBucketMutation();

  const handleDeleteFilm = async (filmId) => {
    try {
      await deleteFilmFromBucket({ bucket_id, film_id: filmId });
      console.log("Film deleted from bucket successfully!");
    } catch (error) {
      console.error(
        "Error occurred while deleting film from the bucket:",
        error
      );
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder-poster.jpg";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const films = data.films;
  const bucketTitle = bucketData?.find(
    (bucket) => bucket.id === parseInt(bucket_id)
  )?.name;

  if (films.length === 0) {
    return (
      <div className="bucket-title">
        <h2 className="bucket-title">{bucketTitle}</h2>
        <div>
          <Link to="/">
            <button>You have no films in this bucket</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="centered-container">
      <h2 className="bucket-title">{bucketTitle}</h2>
      <div className={`container`}>
        {films.map((film) => (
          <div className="col-md-4 col-sm-6 mb-4" key={film.id}>
            <div className="card" data-title={film.title}>
              <Link to={`/films/${film.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster}`}
                  alt={film.title}
                  className="card-img-top"
                  onError={handleImageError}
                />
              </Link>
            </div>
            <button onClick={() => handleDeleteFilm(film.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BucketFilms;
