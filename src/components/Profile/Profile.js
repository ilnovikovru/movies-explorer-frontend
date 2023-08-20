import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';

function Profile() {
    return (
        <>
            <header className='header header-movies'>
                <section className='header__nav header__nav-profile'>
                    <Header />
                    <NavTab />
                </section>
            </header>
            <main className='main main-profile'>
                <section className='main__profile'>
                    <h1 className='main__profile-title'>Привет, Виталий!</h1>
                    <div className='main__profile-data'>
                        <p className='main__profile-label'>Имя</p>
                        <p className='main__profile-value'>Виталий</p>
                    </div>
                    <div className='main__profile-data main__profile-data-email'>
                        <p className='main__profile-label'>E-mail</p>
                        <p className='main__profile-value'>pochta@yandex.ru</p>
                    </div>
                    <div className='main__profile-links'>
                        <Link className='main__profile-link' to='/profile'>Редактировать</Link>
                        <Link className='main__profile-link main__profile-link-signout' to='/'>Выйти из аккаунта</Link>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Profile;