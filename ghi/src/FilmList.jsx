import ErrorNotification from './ErrorNotification';
import { useGetHighestRatedFilmsQuery } from './app/apiSlice';
import { useSelector } from 'react-redux';
import FilmCard from './FilmCard';


const FilmList = () => {
    const searchCriteria = useSelector((state) => state.search.value)
    const { data, error, isLoading } = useGetHighestRatedFilmsQuery();
    console.log(data)

    const filteredFilms = () => {
        if (searchCriteria) {
            return data.filter(film => film.title.includes(searchCriteria))
        } else {
            return data;
        }
    }
        if (isLoading) return <div>Loading...</div>
    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <ErrorNotification error={error} />
                <h1>Films</h1>
                <h3>
                    <small className='text-body-secondary'>{searchCriteria}</small>
                </h3>
                <div className="container">
                    <div className="row mt-3">
                        {filteredFilms().map((film) => (
                            <FilmCard key={film.id} film={film} />
                                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default FilmList;
