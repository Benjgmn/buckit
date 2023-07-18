import { useState } from "react";
import { reset, filter } from "./app/searchSlice";
import { useDispatch } from "react-redux";

const Search = () => {
    const [searchCriteria, setSearchCriteria] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit', searchCriteria);
        dispatch(filter(searchCriteria));
    }
    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="col">
                <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="title"
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                />
            </div>
            <div className="col">
                <button className="btn btn-lg btn-success" type="submit">Search</button>
                <button
                    className="btn btn-lg btn-link"
                    type="button"
                    onClick={() => {
                        dispatch(reset())
                        setSearchCriteria('');
                    }}
                >
                    Reset
                </button>
            </div>
        </form>
    )
}

export default Search;