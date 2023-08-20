import React from 'react';
import './Main.css';

import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <>
      <Promo />
      <main className='main'>
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;