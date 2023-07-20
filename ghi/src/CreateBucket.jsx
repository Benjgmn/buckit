import React, { useState } from "react";
import { useCreateBucketMutation } from "./app/apiSlice";

const CreateBucketPage = () => {
  const [bucketName, setBucketName] = useState("");
  const [create] = useCreateBucketMutation();

  const handleCreateBucket = async (e) => {
    e.preventDefault();

    try {
      await create({ name: bucketName });

      console.log("Bucket created successfully!");
    } catch (error) {
      console.error("Error occurred while creating the bucket:", error);
    }
  };

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
