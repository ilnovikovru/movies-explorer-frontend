import { useState, useEffect } from 'react';
import './Movies.css';

import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { getMovies } from '../../utils/MoviesApi';
import { MOVIES_API_URL } from '../../utils/MoviesApi';
import { LS_KEY_FILTRED, LS_KEY_IS_SHORT, LS_KEY_MOVIES, LS_KEY_SEARCH, REQ_ERROR_MESSAGE } from '../../utils/constants';
import { RECEIVED_COLOR } from 'jest-matcher-utils';

function Movies({ loggedIn, api, movies, setMovies, savedMovies, setSavedMovies }) {
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
    if (movies) {
      localStorage.setItem(LS_KEY_MOVIES, JSON.stringify(movies))
    }

    if (searchTerm !== '') {
      console.debug('search')
      handleSearch(isShortFilm)
    }

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

  const fetchSavedMovies = async () => {
    try {
      setSavedMovies(await api.getMovies());
    } catch (e) {
      setError(REQ_ERROR_MESSAGE);
    }
  }

  const fetchMovies = async () => {
    setLoading(true);
    try {
      setMovies(await getMovies());
    } catch (e) {
      setError(REQ_ERROR_MESSAGE);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  }

  const handleSearch = async (isShort) => {
    console.debug({ movies, savedMovies })
    setLoading(true);
    setError('');

    if (!savedMovies.length) {
      console.debug('noSaved')
      fetchSavedMovies()
    }

    if (!movies.length) {
      console.debug('noMovies')
      return fetchMovies()
    }

    const s = searchTerm.toLocaleLowerCase();
    const filtered = movies.filter(({ duration, nameRU, nameEN }) => {
      const short = (isShort ? duration <= 40 : true)
      const ru = nameRU.toLowerCase()
      const en = nameEN.toLowerCase()
      return short && (ru.includes(s) || en.includes(s))
    });

    if (filtered.length === 0) {
      setError('Ничего не найдено');
    }

    setFiltredMovies(filtered);

    setTimeout(() => setLoading(false), 300);
  };

  const handleDelete = async (movie) => {
    const [found] = savedMovies.filter(m => m.movieId === movie.id) || [null]
    if (found) {
      try {
        await api.deleteMovie(found._id);
        setSavedMovies(savedMovies.filter(({ _id }) => _id !== found._id))
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleSave = async (movie) => {
    const { id, created_at, updated_at, ...data } = movie;
    try {
      const newMovie = await api.addMovie({
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