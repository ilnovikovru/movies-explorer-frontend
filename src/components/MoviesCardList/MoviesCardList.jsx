import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard'
import { LS_KEY_VISIBLE } from '../../utils/constants';

const LG_INITIAL_CARD_COUNT = 16;
const MD_INITIAL_CARD_COUNT = 8;
const SM_INITIAL_CARD_COUNT = 5;

const LG_LOAD_MORE_COUNT = 4;
const MD_LOAD_MORE_COUNT = 2;
const SM_LOAD_MORE_COUNT = 2;

function MoviesCardList({ movies, savedMovies, onDelete, onSave }) {
    const [visibleCardCount, setVisibleCardCount] = useState(() => 
        JSON.parse(localStorage.getItem(LS_KEY_VISIBLE)) || SM_INITIAL_CARD_COUNT
    );
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        localStorage.setItem(LS_KEY_VISIBLE, visibleCardCount)
    }, [visibleCardCount])

    useEffect(() => {
        let resizeTimer;

        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 100);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateCardCount = () => {
        if (windowWidth >= 1280) {
            return visibleCardCount + LG_LOAD_MORE_COUNT;
        }

        if (windowWidth >= 768) {
            return visibleCardCount + MD_LOAD_MORE_COUNT;
        }

        return visibleCardCount + SM_LOAD_MORE_COUNT;
    };

    const handleClick = () => {
        setVisibleCardCount(calculateCardCount());
    };

    useEffect(() => {
        if (windowWidth >= 1280) {
            setVisibleCardCount(LG_INITIAL_CARD_COUNT);
        } else if (windowWidth >= 768) {
            setVisibleCardCount(MD_INITIAL_CARD_COUNT);
        } else {
            setVisibleCardCount(SM_INITIAL_CARD_COUNT);
        }
    }, [windowWidth]);

    const isSaved = ({ id }) => {
        if (Array.isArray(savedMovies)) {
            return savedMovies.filter(({ movieId }) => movieId === id).length
        }

        return false
    }
    

    return (
        <section className='main__movies-cards'>
            <ul className='main__movies-cards-list'>
                {movies.slice(0, visibleCardCount).map((movie) => (
                    <MovieCard key={movie.id || movie.title} movie={movie} isSaved={isSaved}
                    onDelete={onDelete}
                    onSave={onSave}
                     />
                ))}
            </ul>
            {movies.length > visibleCardCount && (
                <button 
                    type='button' 
                    className='main__movies-cards-list-more' 
                    onClick={handleClick}
                >
                    Ещё
                </button>
            )}
        </section>
    );
}

export default MoviesCardList;
