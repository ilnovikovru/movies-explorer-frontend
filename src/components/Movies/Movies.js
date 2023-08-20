import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
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
        {/* <Preloader /> */}
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default Movies;