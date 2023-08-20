import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
    return (
        <>
            <main className='main'>
                <section className='main__sign'>
                    <div className='main__sign-container'>
                        <img src={logo} alt='Вход' className='logo main__sign-logo' />
                        <h1 className='main__sign-title'>Рады видеть!</h1>
                        <form className='main__sign-form'>
                            <p className='main__sign-input-label'>E-mail</p>
                            <input className='main__sign-input'></input>
                            <p className='main__sign-input-label'>Пароль</p>
                            <input className='main__sign-input'></input>
                            <span className='main__sign-input-error'></span>
                        </form>
                        <div className='main__sign-links'>
                            <button className='main__sign-button main__sign-button-login'>Войти</button>
                            <p className='main__sign-login'>
                                Ещё не зарегистрированы? <Link to='/signup' className='main__sign-link'>Регистрация</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;