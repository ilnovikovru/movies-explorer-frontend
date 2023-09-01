import { useEffect, useState } from 'react';
import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import NavTab from '../NavTab/NavTab';
import MovieCard from '../MoviesCard/MoviesCard';

function SavedMovies({ loggedIn, api, movies, setMovies }) {
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [searchTerm, setSearch] = useState('');
  const [isShortFilm, setIsShort] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const resp = await api.getMovies();
        setMovies(resp);
      } catch (e) {
        console.debug(e)
      }
    }

    if (loggedIn) {
      fetchMovies()
    }
  }, [loggedIn]);

  useEffect(() => {
    handleSearch(isShortFilm)
  }, [movies])

  const handleDelete = async (movie) => {
    await api.deleteMovie(movie._id);
    setMovies(movies.filter(m => m._id !== movie._id));
  }

  const handleSearch = (isShort) => {
    const s = searchTerm.toLowerCase();
    const filtred = movies.filter(({ nameRU, nameEN, duration }) => {
      return (isShort ? duration < 40 : true) && (nameRU.toLowerCase().includes(s) || nameEN.toLowerCase().includes(s))
    })
    setFiltredMovies(filtred)
  }

  return (
    <>
      <header className='header header-movies'>
        <section className='header__nav header__nav-movies'>
          <Header />
          <NavTab />
        </section>
      </header>
      <SearchForm
        searchTerm={searchTerm}
        setSearch={setSearch}
        isShortFilm={isShortFilm}
        setIsShort={setIsShort}
        onSearch={handleSearch}
      />
      <main className='main'>
        <section className='main__movies-cards'>
          <ul className='main__saved-movies-cards-list'>
            {filtredMovies.length ? filtredMovies.map((movie) => (
              <MovieCard key={movie._id || movie.movieId} movie={movie} isSaved={() => true} onDelete={handleDelete} />
            )): ('Не найдено')}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;