import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard'
import { 
    LS_KEY_VISIBLE, 
    SM_LOAD_MORE_COUNT,
    SM_INITIAL_CARD_COUNT,
    MD_LOAD_MORE_COUNT,
    MD_INITIAL_CARD_COUNT,
    LG_LOAD_MORE_COUNT,
    LG_INITIAL_CARD_COUNT,
    LG_WIDTH,
    MD_WIDTH,
 } from '../../utils/constants';

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
        if (windowWidth >= LG_WIDTH) {
            return visibleCardCount + LG_LOAD_MORE_COUNT;
        }

        if (windowWidth >= MD_WIDTH) {
            return visibleCardCount + MD_LOAD_MORE_COUNT;
        }

        return visibleCardCount + SM_LOAD_MORE_COUNT;
    };

    const handleClick = () => {
        setVisibleCardCount(calculateCardCount());
    };

    useEffect(() => {
        if (windowWidth >= LG_WIDTH) {
            setVisibleCardCount(LG_INITIAL_CARD_COUNT);
        } else if (windowWidth >= MD_WIDTH) {
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
