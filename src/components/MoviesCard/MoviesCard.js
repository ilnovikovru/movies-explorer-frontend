import React from 'react';

function MovieCard({ src, title, time }) {
  return (
    <li className='main__movies-cards-list-item'>
      <article className='main__movies-card'>
        <img src={src} alt={title} className='main__movies-card-image' />
        <div className='main__movies-cards-name'>
          <h2 className='main__movies-card-title'>{title}</h2>
          <button type='button' value='Нравится' className='main__movies-card-like' aria-label='Нравится'></button>
        </div>
        <p className='main__movies-card-time'>{time}</p>
      </article>
    </li>
  );
}

export default MovieCard;
