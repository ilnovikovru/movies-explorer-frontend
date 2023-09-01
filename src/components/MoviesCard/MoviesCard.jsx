import './MoviesCard.css';
import { MOVIES_API_URL } from '../../utils/MoviesApi';
import { useLocation } from 'react-router-dom';

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
};

function MovieCard({ movie, isSaved, onDelete, onSave }) {
  const location = useLocation();

  const handleLikeClick = () => {
    if (isSaved(movie)) {
      onDelete(movie);
    } else {
      onSave(movie);
    }
  };

  return (
    <li className='main__movies-cards-list-item'>
      <article className='main__movies-card'>
        <a className='main__movies-cards-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
          <img
            src={location.pathname == '/saved-movies' ? movie.image : `${MOVIES_API_URL}${movie.image.url}`}
            alt={movie.nameRU}
            className='main__movies-card-image' />
        </a>
        <div className='main__movies-cards-name'>
          <a className='main__movies-cards-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
            <h2 className='main__movies-card-title'>{movie.nameRU}</h2>
          </a>
          {
            location.pathname == '/movies' ? (
              <button
                type='button'
                onClick={handleLikeClick}
                className={`main__movies-card-like ${isSaved(movie) ? 'main__movies-card-like_active' : ''}`}
                aria-label='Нравится'
              >
              </button>
            ) : (
              <button
                type='button'
                value='Нравится'
                className='main__movies-card-save'
                aria-label='Нравится'
                onClick={() => onDelete(movie)}
              ></button>
            )
          }

        </div>
        <p className='main__movies-card-time'>{formatDuration(movie.duration)}</p>
      </article>
    </li>
  );
}

export default MovieCard;