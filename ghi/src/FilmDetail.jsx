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
  const [buttonText, setButtonText] = useState("Add Film to Bucket");
  const handleClick = async () => {
    setButtonText("Film Added to bucket!!");
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

  const [addFilmToBucket, { isLoading: isAddingFilm }] =
    useAddFilmToBucketMutation();

  const handleImageError = (e) => {
    e.target.src = "/placeholder-poster.jpg";
  };

  if (isFilmLoading || isBucketLoading) return <div>Loading...</div>;

  if (filmError) return <div>Error: {filmError.message}</div>;
  if (bucketError) return <div>Error: {bucketError.message}</div>;

  if (!filmData) return null;

  const { title, runtime, release_date, overview, genres, poster_path } =
    filmData;

  const releaseYear = new Date(release_date).getFullYear();

  return (
    <div>
      <div className="film-detail-container">
        <div className="film-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="card-img-top"
            onError={handleImageError}
          />
        </div>
        <div className="film-details">
          <h2 style={{ fontWeight: "bold", fontSize: "28px" }}>
            {title} ({releaseYear})
          </h2>
          <p style={{ maxWidth: "600px", whiteSpace: "wrap" }}>
            Runtime: {runtime} minutes
          </p>
          <h4>Overview:</h4>
          <p style={{ maxWidth: "600px", whiteSpace: "wrap" }}>{overview}</p>
          <div>
            <h4>Genres:</h4>
            <ul>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Add to Bucket:</h4>
            <div className="custom-select-wrapper">
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
              <div className="select-icon">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
            <button
              onClick={handleClick}
              disabled={!selectedBucketId || isAddingFilm}
              className="add-to-bucket-button"
            >
              {buttonText}
            </button>
            <div className="row mt-3">
              <div className="col-md-4">
                <Link to="/">
                  <button className="button is-primary">Back to Films</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
