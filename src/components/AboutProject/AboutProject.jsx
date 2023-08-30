import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='main__about-project' id='about'>
      <h2 className='main__section-title'>О проекте</h2>
      <div className='main__about-project-stages-container'>
        <div className='main__about-project-stages'>
          <h3 className='main__about-project-stages-title'>Дипломный проект включал 5 этапов</h3>
          <p className='main__about-project-stages-subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </div>
        <div className='main__about-project-time'>
          <h3 className='main__about-project-stages-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='main__about-project-stages-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='main__about-project-graph'>
        <p className='main__about-project-graph-back'>1 неделя</p>
        <p className='main__about-project-graph-front'>4 недели</p>
      </div>
      <div className='main__about-project-graph-note'>
        <p className='main__about-project-graph-note-back'>Back-end</p>
        <p className='main__about-project-graph-note-front'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;