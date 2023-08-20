import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <img src={logo} className='logo header-movies__logo' alt='Фильмы' />
  );
}

export default Header;