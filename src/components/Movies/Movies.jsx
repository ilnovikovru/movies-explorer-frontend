import { useState, useEffect } from 'react';
import './Movies.css';

import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { getMovies as getMainMovies, deleteMovie, addMovie } from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { MOVIES_API_URL } from '../../utils/MoviesApi';
import { LS_KEY_FILTRED, LS_KEY_IS_SHORT, LS_KEY_MOVIES, LS_KEY_SEARCH } from '../../utils/constants';

function Movies({ loggedIn, movies, setMovies, savedMovies, setSavedMovies }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearch] = useState(() => 
    localStorage.getItem(LS_KEY_SEARCH) || ''
  );
  const [isShortFilm, setIsShort] = useState(() => 
    JSON.parse(localStorage.getItem(LS_KEY_IS_SHORT)) || false
  );
  const [filteredMovies, setFiltredMovies] = useState(() => {
    return JSON.parse(localStorage.getItem(LS_KEY_FILTRED)) || []
  })

  useEffect(() => {
    const fetchSavedMovies = async () => {
      const resp = await getMainMovies();
      setSavedMovies(resp);
    }

    const fetchMovies = async () => {
      const resp = await getMovies();
      setMovies(resp);
    }

    if (loggedIn) {
      fetchSavedMovies()
      if (!movies.length) {
        fetchMovies()
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem(LS_KEY_MOVIES, JSON.stringify(movies))
  }, [movies])

  useEffect(() => {
    localStorage.setItem(LS_KEY_FILTRED, JSON.stringify(filteredMovies))
  }, [filteredMovies])

  useEffect(() => {
    localStorage.setItem(LS_KEY_SEARCH, searchTerm)
  }, [searchTerm])

  useEffect(() => {
    localStorage.setItem(LS_KEY_IS_SHORT, isShortFilm)
  }, [isShortFilm])

  useEffect(() => {
    if (searchTerm !== '') {
      handleSearch(isShortFilm)
    }
  }, [movies])

  const handleSearch = async (isShort) => {
    setLoading(true);
    setError('');

    try {
      const s = searchTerm.toLocaleLowerCase()
      const filtered = movies.filter(({ duration, nameRU, nameEN }) => {
        const short = (isShort ? duration <= 40 : true)
        const ru = nameRU.toLowerCase()
        const en = nameEN.toLowerCase()
        return short && (ru.includes(s) || en.includes(s))
      });

      setFiltredMovies(filtered);

      if (filtered.length === 0) {
        setError('Ничего не найдено');
      }
    } catch (e) {
      setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movie) => {
    const [found] = savedMovies.filter(m => m.movieId === movie.id) || [null]
    if (found) {
      try {
        await deleteMovie(found._id);
        setSavedMovies(savedMovies.filter(({ _id }) => _id !== found._id))
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleSave = async (movie) => {
    const { id, created_at, updated_at, ...data } = movie;
    try {
      const newMovie = await addMovie({
        ...data,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: id
      })
      setSavedMovies([...savedMovies, newMovie]);
    } catch (err) {
      console.log(`Ошибка: ${err}`);
    }
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
        {loading && <Preloader />}
        {error && !loading && <section className='main__movies-cards'><p className='main__movies-error'>{error}</p></section>}
        {!loading && !error && movies.length > 0 && <MoviesCardList
          movies={filteredMovies}
          savedMovies={savedMovies}
          onSave={handleSave}
          onDelete={handleDelete} />}
      </main>
      <Footer />
    </>
  );
}

export default Movies;