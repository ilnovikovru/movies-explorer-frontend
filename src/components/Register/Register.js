import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
    return (
        <>
            <main className='main'>
                <section className='main__sign'>
                    <div className='main__sign-container'>
                        <img src={logo} alt='' className='logo main__sign-logo' />
                        <h1 className='main__sign-title'>Добро пожаловать!</h1>
                        <form className='main__sign-form'>
                            <p className='main__sign-input-label'>Имя</p>
                            <input className='main__sign-input' ></input>
                            <p className='main__sign-input-label'>E-mail</p>
                            <input className='main__sign-input'></input>
                            <p className='main__sign-input-label'>Пароль</p>
                            <input className='main__sign-input' type='password'></input>
                            <span className='main__sign-input-error'>Что-то пошло не так...</span>
                        </form>
                        <div className='main__sign-links'>
                            <button className='main__sign-button'>Зарегистрироваться</button>
                            <p className='main__sign-login'>
                                Уже зарегистрированы? <Link to='/signin' className='main__sign-link'>Войти</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Register;