import React from 'react';
import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import NavTab from '../NavTab/NavTab';
import MovieCard from '../MoviesCard/MoviesCard';

function SavedMovies() {
  const movies = [
    { src: require('../../images/card-pics/1.jpg'), title: '33 слова о дизайне', time: '1ч42м' },
    { src: require('../../images/card-pics/2.jpg'), title: 'Киноальманах «100 лет дизайна»', time: '1ч42м' },
    { src: require('../../images/card-pics/3.jpg'), title: 'В погоне за Бэнкси', time: '1ч42м' },
  ];

  return (
    <>
      <header className='header header-movies'>
        <section className='header__nav header__nav-movies'>
          <Header />
          <NavTab />
        </section>
      </header>
      <SearchForm />
      <main className='main'>
        <section className='main__movies-cards'>
          <ul className='main__saved-movies-cards-list'>
            {movies.map((movie, index) => (
              <MovieCard key={index} src={movie.src} title={movie.title} time={movie.time} />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;