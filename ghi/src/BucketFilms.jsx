import { useBucketfilmsQuery } from "./app/apiSlice";

const BucketFilms = ({ bucket_Id }) => {
  const { data: films, error, isLoading } = useBucketfilmsQuery(bucket_Id);
  console.log(films)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Films in Bucket</h2>
      {
        films.map((film) => (
          <div key={film.id}>
            <h3>{film.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default BucketFilms;
