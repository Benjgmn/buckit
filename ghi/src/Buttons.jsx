import React from "react";
import {
    useDeleteFilmFromBucketMutation,
    useAddFilmToBucketMutation,
    useSearchFilmQuery,
    useGetHighestRatedFilmsQuery,
} from "./app/apiSlice";
import { useEffect, useState } from 'react';

const Buttons = (props) => {
    const [film, setFilm] = useState(null);
    const [deleteFilmFromBucket] = useDeleteFilmFromBucketMutation();
    const [addFilmToBucket] = useAddFilmToBucketMutation();
    const highestRatedFilmsQuery = useGetHighestRatedFilmsQuery();
    const searchFilmQuery = useSearchFilmQuery();

    useEffect(() => {
        const films = highestRatedFilmsQuery.data || searchFilmQuery.data.results;
        if (films) {
            setFilm(films.find(f => f.title === props.title) || null);
        }
    }, [highestRatedFilmsQuery.data, searchFilmQuery.data.results, props.title]);

    return (
        <>
            {!film && <button
                className="btn btn-success"
                onClick={() => addFilmToBucket({title: props.title})}
            >
                Add to Bucket
            </button>}
            {film && <button
                className="btn btn-danger"
                onClick={() => deleteFilmFromBucket(film.id)}
            >
                Delete
            </button>}
        </>
    )
};

export default Buttons;