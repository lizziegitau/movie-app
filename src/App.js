import { useEffect, useState } from 'react';

import './App.css';
import MovieCard from './MovieCard';
import searchIcon from './search.svg';

const API_URL='http://www.omdbapi.com?apikey=7210be85';

const App = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const [movies, setMovies] = useState([]);

    const fetchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
    
        setMovies(data.Search);
    }

    useEffect(() => {
        fetchMovies('avengers');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
    
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => fetchMovies(searchMovie)}
                 />
            </div>
    
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
      );
}

export default App;
