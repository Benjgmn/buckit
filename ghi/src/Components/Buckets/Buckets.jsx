import React, { useState } from "react";
import {
  useGetBucketsQuery,
  useDeleteBucketMutation,
  useUpdateBucketMutation,
} from "../../app/apiSlice";
import { Link } from "react-router-dom";
import "./Buckets.css";

const BucketList = () => {
  const { data: buckets, isLoading, isError } = useGetBucketsQuery();
  const [deleteBucketMutation] = useDeleteBucketMutation();
  const [updateBucketMutation] = useUpdateBucketMutation();
  const [editMode, setEditMode] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [newBucketName, setNewBucketName] = useState("");

  const handleDeleteBucket = async (bucket_id) => {
    try {
      await deleteBucketMutation(bucket_id);
    } catch (error) {
      console.error("Error occurred while deleting the bucket:", error);
    }
  };

  const handleUpdateBucketName = async (bucket_id) => {
    try {
      await updateBucketMutation({ bucket_id, name: newBucketName });
      setEditMode(false);
      setSelectedBucket(null);
      setNewBucketName("");
    } catch (error) {
      console.error("Error occurred while updating the bucket:", error);
    }
  };

  if (isLoading) {
    return <p>Loading buckets...</p>;
  }

  if (isError) {
    return <p>You Are not logged in. Please Log in to view your buckets</p>;
  }

  if (!buckets || buckets.length === 0) {
    return (
      <div className="bucket-title">
        <Link to="/buckets/create">
          <button>Let's make some buckets!</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="buckets_1">
      <Link to="/buckets/create">
        <button className="buckets_button">Create a Bucket!</button>
      </Link>
      <h2 className="buckets_list_h">Bucket List</h2>
      <ul>
        {buckets.map((bucket) => (
          <li key={bucket.id}>
            {editMode && selectedBucket === bucket.id ? (
              <div>
                <input
                  type="text"
                  value={newBucketName}
                  onChange={(e) => setNewBucketName(e.target.value)}
                />
                <button
                  onClick={() => handleUpdateBucketName(bucket.id)}
                  className="bucket_save_button"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to={`/buckets/${bucket.id}/films`}
                  className="Bucket_item"
                >
                  {bucket.name}
                </Link>
                <button
                  onClick={() => handleDeleteBucket(bucket.id)}
                  className="buckets_delete_button"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditMode(true);
                    setSelectedBucket(bucket.id);
                    setNewBucketName(bucket.name);
                  }}
                  className="buckets_edit_button"
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BucketList;
