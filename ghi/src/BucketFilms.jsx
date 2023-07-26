import React from "react";
import { useParams, Link } from "react-router-dom";
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

  return (
    <div>
      <h2>{bucketTitle}</h2>
      {films.map((film) => (
        <div key={film.id}>
          <Link to={`/films/${film.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster}`}
              alt={film.title}
              className="card-img-top"
            />
            <h3>{film.title}</h3>
          </Link>
          <button onClick={() => handleDeleteFilm(film.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BucketFilms;