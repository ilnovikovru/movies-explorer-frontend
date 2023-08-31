import React, { useState } from 'react';
import './NavTab.css';
import { Link, NavLink } from 'react-router-dom';

function NavTab() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className='header-movies__menu-container'>
        <NavLink 
          to='/movies' 
          className={({ isActive })  => isActive ? 'header-movies__menu-link_active' : 'header-movies__menu-link' }
        >
          Фильмы
        </NavLink>
        <NavLink 
          to='/saved-movies' 
          className={({ isActive })  => isActive ? 'header-movies__menu-link_active' : 'header-movies__menu-link' }
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <Link to='/profile'>
        <button className='header-movies__profile-button'></button>
      </Link>
      <button className='header-movies__menu' onClick={toggleMenu}></button>
      <div className={`header-movies__menu-popup ${isMenuOpen ? 'header-movies__menu-popup_active' : ''}`}>
        <button className='header-movies__close-menu' onClick={toggleMenu}></button>
        <div className='header-movies__mobile-menu-container'>
          <Link to='/' className='header-movies__mobile-menu-link'>Главная</Link>
          <NavLink 
            to='/movies' 
            className={({ isActive })  => isActive ? 'header-movies__mobile-menu-link_active' : 'header-movies__mobile-menu-link' }
          >
            Фильмы
          </NavLink>
          <NavLink 
            to='/saved-movies' 
            className={({ isActive })  => isActive ? 'header-movies__mobile-menu-link_active' : 'header-movies__mobile-menu-link' }
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <button className='header-movies__mobile-menu-profile-button'></button>
      </div>
    </>
  );
}

export default NavTab;