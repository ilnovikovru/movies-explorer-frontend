import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Link to='/'>
      <img src={logo} className='logo header-movies__logo' alt='Фильмы' />
    </Link>
  );
}

export default Header;