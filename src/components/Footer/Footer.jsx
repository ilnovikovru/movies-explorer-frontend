import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__practicum'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__copyright'>
        <p className='footer__copyright-year'>© 2020</p>
        <div className='footer__copyright-link-container'>
          <a href='https://praktikum.yandex.ru' target='_blank' rel='noopener noreferrer'
            className='footer__copyright-link'>Яндекс.Практикум</a>
          <a href='https://github.com' target='_blank' rel='noopener noreferrer'
            className='footer__copyright-link'>Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;