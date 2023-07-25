import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCreateBucketMutation } from "./app/apiSlice";

const CreateBucketPage = () => {
  const [bucketName, setBucketName] = useState("");
  const [create] = useCreateBucketMutation();
  const [isBucketCreated, setBucketCreated] = useState(false);

  const handleCreateBucket = async (e) => {
    e.preventDefault();

    if (bucketName.trim() === "") {
      return console.log("Empty field invalid");
    }

    try {
      await create({ name: bucketName });

      console.log("Bucket created successfully!");
      setBucketCreated(true);
    } catch (error) {
      console.error("Error occurred while creating the bucket:", error);
    }
  };

  if (isBucketCreated) {
    return <Navigate to="/buckets" />;
  }

  return (
    <div>
      <h2>Create Bucket</h2>
      <form onSubmit={handleCreateBucket}>
        <label>
          Bucket Name:
          <input
            type="text"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBucketPage;
