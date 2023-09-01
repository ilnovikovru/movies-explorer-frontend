import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='main__portfolio'>
      <h3 className='main__portfolio-title'>Портфолио</h3>
      <ul className='main__portfolio-list'>
        <a href='https://ilnovikovru.github.io/how-to-learn/' target='_blank' rel='noopener noreferrer'
          className='main__portfolio-link'>
          <li className='main__portfolio-list-item'>
            Статичный сайт
          </li>
        </a>
        <a href='https://ilnovikovru.github.io/russian-travel/' target='_blank' rel='noopener noreferrer'
          className='main__portfolio-link'>
          <li className='main__portfolio-list-item'>
            Адаптивный сайт
          </li>
        </a>
        <a href='https://ilnovikovru.github.io/mesto/' target='_blank' rel='noopener noreferrer'
          className='main__portfolio-link'><li className='main__portfolio-list-item'>
            Одностраничное приложение
          </li></a>
      </ul>
    </section>
  );
}

export default Portfolio;