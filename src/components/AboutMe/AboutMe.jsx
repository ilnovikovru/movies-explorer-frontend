import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className='main__about-me'>
      <h2 className='main__about-me-section-title'>Студент</h2>
      <div className='main__about-me-container'>
        <div className='main__about-me-text'>
          <h3 className='main__about-me-subtitle'>Виталий</h3>
          <p className='main__about-me-job'>Фронтенд-разработчик, 30 лет</p>
          <p className='main__about-me-bio'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и
            дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href='https://github.com/ilnovikovru/' target='_blank' rel='noopener noreferrer'
            className='main__about-me-link'>Github</a>
        </div>
        <img src={photo} alt='Мое фото' className='main__about-me-photo' />
      </div>
    </section>
  );
}

export default AboutMe;