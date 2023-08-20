import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    const movies = [
        { src: require('../../images/card-pics/1.jpg'), title: '33 слова о дизайне', time: '1ч42м' },
        { src: require('../../images/card-pics/2.jpg'), title: 'Киноальманах «100 лет дизайна»', time: '1ч42м' },
        { src: require('../../images/card-pics/3.jpg'), title: 'В погоне за Бенкси', time: '1ч42м' },
        { src: require('../../images/card-pics/4.jpg'), title: 'Баския: Взрыв реальности', time: '1ч42м' },
        { src: require('../../images/card-pics/5.jpg'), title: 'Бег это свобода', time: '1ч42м' },
        { src: require('../../images/card-pics/6.jpg'), title: 'Книготорговцы', time: '1ч42м' },
        { src: require('../../images/card-pics/7.jpg'), title: 'Когда я думаю о Германии ночью', time: '1ч42м' },
        { src: require('../../images/card-pics/8.jpg'), title: 'Gimme Danger: История Игги и The Stooges', time: '1ч42м' },
        { src: require('../../images/card-pics/9.jpg'), title: 'Дженис: Маленькая девочка грустит', time: '1ч42м' },
        { src: require('../../images/card-pics/10.jpg'), title: 'Соберись перед прыжком', time: '1ч42м' },
        { src: require('../../images/card-pics/11.jpg'), title: 'Пи Джей Харви: A dog called money', time: '1ч42м' },
        { src: require('../../images/card-pics/12.jpg'), title: 'По волнам: Искусство звука в кино', time: '1ч42м' },
        { src: require('../../images/card-pics/13.jpg'), title: 'Рудбой', time: '1ч42м' },
        { src: require('../../images/card-pics/14.jpg'), title: 'Скейт — кухня', time: '1ч42м' },
        { src: require('../../images/card-pics/15.jpg'), title: 'Война искусств', time: '1ч42м' },
        { src: require('../../images/card-pics/16.jpg'), title: 'Зона', time: '1ч42м' },
    ];

    return (
        <section className='main__movies-cards'>
            <ul className='main__movies-cards-list'>
                {movies.map((movie, index) => (
                    <MovieCard key={index} src={movie.src} title={movie.title} time={movie.time} />
                ))}
            </ul>
            <button type='button' className='main__movies-cards-list-more'>Ещё</button>
        </section>
    );
}

export default MoviesCardList;