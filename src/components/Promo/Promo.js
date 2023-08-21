import React from 'react';
import { Link } from 'react-router-dom';
import './Promo.css';
import logo from '../../images/logo.svg';
import landing_logo from '../../images/landing-logo.svg';

function Promo() {
  return (
    <header className='header header-landing'>
      <section className='header__nav'>
        <img src={logo} className='logo header-landing__logo' alt='Проект' />
        <div className='header-landing__sign-container'>
          <Link to='/signup' className='header-landing__signout-link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='header-landing__signin-button'>Войти</button>
          </Link>
        </div>
      </section>
      <section className='header-landing__title-container'>
        <div className='header-landing__title-inner-container'>
          <h1 className='header-landing__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='header-landing__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className='header-landing__more-button'>Узнать больше</button>
        </div>
        <img src={landing_logo} className='landing-logo' alt='Проект' />
      </section>
    </header>
  );
}

export default Promo;