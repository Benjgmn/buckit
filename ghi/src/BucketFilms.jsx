import React from "react";
import { useParams } from "react-router-dom";
import { useBucketfilmsQuery } from "./app/apiSlice";

const BucketFilms = () => {
  const { bucket_id } = useParams();
  const { data, error, isLoading } = useBucketfilmsQuery(bucket_id);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    const films = data.films;

  return (
    <div>
      <h2>Films in Bucket</h2>
      {films.map((film) => (
        <div key={film.id}>
          <h3>{film.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default BucketFilms;
