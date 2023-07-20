import React from "react";
import { useGetBucketsQuery } from "./app/apiSlice";

const BucketList = () => {
  const { data: buckets, isLoading, isError } = useGetBucketsQuery();

  if (isLoading) {
    return <p>Loading buckets...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching buckets.</p>;
  }

  if (!buckets || buckets.length === 0) {
    return <p>No buckets found.</p>;
  }

  return (
    <div>
      <h2>Bucket List</h2>
      <ul>
        {buckets.map((bucket) => (
          <li key={bucket.id}>{bucket.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BucketList;
