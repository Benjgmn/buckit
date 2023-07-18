import ErrorNotification from './ErrorNotification';
import { useSearchFilmQuery } from './app/apiSlice';
import { useSelector } from 'react-redux';
import FilmCard from './FilmCard';


const FilmList = () => {
    const searchCriteria = useSelector((state) => state.search.value)
    const { data, error, isLoading } = useSearchFilmQuery();

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
                        {filteredFilms().map(p => <FilmCard key={p.title} name={p.title} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmList;
