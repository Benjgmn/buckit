import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetFilmDetailsQuery,
  useGetBucketsQuery,
  useAddFilmToBucketMutation,
} from "./app/apiSlice";

const FilmDetail = () => {
  const { id } = useParams();
  const {
    data: filmData,
    error: filmError,
    isLoading: isFilmLoading,
  } = useGetFilmDetailsQuery(id);
  const {
    data: buckets,
    error: bucketError,
    isLoading: isBucketLoading,
  } = useGetBucketsQuery();
  const [selectedBucketId, setSelectedBucketId] = useState("");

  const [addFilmToBucket, { isLoading: isAddingFilm }] =
    useAddFilmToBucketMutation();

  const handleAddToBucket = async () => {
    try {
      await addFilmToBucket({
        bucket_id: selectedBucketId,
        film_id: id,
      });

      console.log("Film added to bucket successfully!");
    } catch (error) {
      console.error("Error occurred while adding film to bucket:", error);
    }
  };

  if (isFilmLoading || isBucketLoading) return <div>Loading...</div>;

  if (filmError) return <div>Error: {filmError.message}</div>;
  if (bucketError) return <div>Error: {bucketError.message}</div>;

  if (!filmData) return null;

  const { title, runtime, release_date, overview, genres, poster_path } =
    filmData;

  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-4">
          <Link to="/">
            <button className="button is-primary">Back to Films</button>
          </Link>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="card-img-top"
          />
        </div>
        <div className="col-md-8">
          <h2>{title}</h2>
          <p>Runtime: {runtime} minutes</p>
          <p>Release Date: {release_date}</p>
          <h4>Genres:</h4>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <h4>Overview:</h4>
          <p>{overview}</p>

          <div>
            <h4>Add to Bucket:</h4>
            <select
              value={selectedBucketId}
              onChange={(e) => setSelectedBucketId(e.target.value)}
            >
              <option value="">Select a bucket</option>
              {buckets.map((bucket) => (
                <option key={bucket.id} value={bucket.id}>
                  {bucket.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddToBucket}
              disabled={!selectedBucketId || isAddingFilm}
            >
              {isAddingFilm ? "Adding..." : "Add to Bucket"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;