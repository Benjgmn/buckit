import React from "react";
import { useGetBucketsQuery, useDeleteBucketMutation } from "./app/apiSlice";
import { Link } from "react-router-dom";



const BucketList = () => {
  const { data: buckets, isLoading, isError } = useGetBucketsQuery();
  const [deleteBucketMutation] = useDeleteBucketMutation();

  const handleDeleteBucket = async (bucket_id) => {
    try {
      await deleteBucketMutation(bucket_id);
    } catch (error) {
      console.error("Error occurred while deleting the bucket:", error);
    }
    console.log(deleteBucketMutation(bucket_id))
  };


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
      <Link to="/buckets/create">
        <button>Create a Bucket!</button>
      </Link>
      <h2>Bucket List</h2>
      <ul>
        {buckets.map((bucket) => (
          <li key={bucket.id}>
            {console.log(bucket.id)}
            {bucket.name}
            <button onClick={() => handleDeleteBucket(bucket.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BucketList;
