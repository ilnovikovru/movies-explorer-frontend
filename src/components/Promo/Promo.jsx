import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Promo.css';
import logo from '../../images/logo.svg';
import landing_logo from '../../images/landing-logo.svg';



function Promo({ loggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header header-landing'>
      <section className='header__nav'>
        <img src={logo} className='logo header-landing__logo' alt='Проект' />
        {
          !loggedIn ? (
            <div className='header-landing__sign-container'>
              <Link to='/signup' className='header-landing__signout-link'>Регистрация</Link>
              <Link to='/signin'>
                <button className='header-landing__signin-button'>Войти</button>
              </Link>
            </div>
          ) : (
            <>
              <div className='header-landing__sign-container'>
                <Link to='/movies' className='header-landing__signout-link'>Фильмы</Link>
                <Link to='/saved-movies' className='header-landing__signout-link'>Сохранённые фильмы</Link>
              </div>
              <Link to='/profile'>
                <button className="header-landing__profile-button"></button>
              </Link>
              <button className='header-movies__menu header-movies__menu_main' onClick={toggleMenu}></button>
              <div className={`header-movies__menu-popup ${isMenuOpen ? 'header-movies__menu-popup_active' : ''}`}>
                <button className='header-movies__close-menu' onClick={toggleMenu}></button>
                <div className='header-movies__mobile-menu-container'>
                  <Link to='/' className='header-movies__mobile-menu-link'>Главная</Link>
                  <Link to='/movies' className='header-movies__mobile-menu-link'>Фильмы</Link>
                  <Link to='/saved-movies' className='header-movies__mobile-menu-link'>Сохранённые фильмы</Link>
                </div>
                <button className='header-movies__mobile-menu-profile-button'></button>
              </div>
            </>
          )
        }
      </section>
      <section className='header-landing__title-container'>
        <div className='header-landing__title-inner-container'>
          <h1 className='header-landing__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='header-landing__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <Link to='#about'>
            <button className='header-landing__more-button'>Узнать больше</button>
          </Link>
        </div>
        <img src={landing_logo} className='landing-logo' alt='Проект' />
      </section>
    </header>
  );
}

export default Promo;