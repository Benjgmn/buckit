import Search from "./Search";
import FilmList from "./FilmList";
import SearchFilm from "./SearchFilm";

const Home = () => {
    return (
        <>
            <SearchFilm />
            {/* <Search /> */}
            <FilmList />
        </>
    )
}

export default Home;