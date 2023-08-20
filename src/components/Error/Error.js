import React from 'react';
import './Error.css';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <>
            <main className='main'>
                <section className='main__error'>
                    <div className='main__error-container'>
                        <h1 className='main__error-title'>404</h1>
                        <p className='main__error-text'>Страница не найдена</p>
                    </div>
                    <Link className='main__error-link' to='/'>Назад</Link>
                </section>
            </main>
        </>
    );
}

export default Error;