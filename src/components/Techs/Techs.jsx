import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className='main__techs'>
      <h2 className='main__techs-section-title'>Технологии</h2>
      <h3 className='main__techs-title'>7 технологий</h3>
      <p className='main__techs-subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.</p>
      <div className='main__techs-container'>
        <p className='main__techs-item'>HTML</p>
        <p className='main__techs-item'>CSS</p>
        <p className='main__techs-item'>JS</p>
        <p className='main__techs-item'>React</p>
        <p className='main__techs-item'>Git</p>
        <p className='main__techs-item'>Express.js</p>
        <p className='main__techs-item'>mongoDB</p>
      </div>
    </section>
  );
}

export default Techs;