import React, { useState, useEffect } from 'react';
import { signup, signin } from '../../utils/MainApi';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation'; // Укажите путь к вашим хукам
import validator from 'validator';
import { JWT_TOKEN_KEY } from '../../utils/constants';

function Register({ loggedIn, setLoggedIn }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate('/movies');
        }
    }, [loggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isValid) return;
    
        try {
            const signupResponse = await signup(values);
            
            // После успешной регистрации пытаемся авторизовать пользователя
            if (Object.keys(signupResponse).length) {
                const signinResponse = await signin({
                    email: values.email,
                    password: values.password
                });
    
                if (Object.keys(signinResponse).length && 'token' in signinResponse) {
                    // Если у нас есть токен в ответе, сохраняем его в localStorage
                    localStorage.setItem(JWT_TOKEN_KEY, signinResponse.token);
                    setLoggedIn(true);
                }
            }
        } catch (error) {
            setApiError(error);
        }
    };    

    const validateName = (name) => {
        const pattern = /^[A-Za-zА-Яа-я\s-]+$/;
        return pattern.test(name);
    };

    return (
        <>
            <main className='main'>
                <section className='main__sign'>
                    <div className='main__sign-container'>
                        <img src={logo} alt='' className='logo main__sign-logo' />
                        <h1 className='main__sign-title'>Добро пожаловать!</h1>
                        <form className='main__sign-form' onSubmit={handleSubmit}>
                            <p className='main__sign-input-label'>Имя</p>
                            <input 
                                className='main__sign-input' 
                                name="name"
                                value={values.name || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (!validateName(e.target.value)) {
                                        e.target.setCustomValidity("Имя может содержать только латиницу, кириллицу, пробел или дефис.");
                                    } else {
                                        e.target.setCustomValidity("");
                                    }
                                }}
                                required
                            />
                            <span className='main__sign-input-error'>{errors.name}</span>

                            <p className='main__sign-input-label'>E-mail</p>
                            <input 
                                className='main__sign-input' 
                                name="email"
                                value={values.email || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (!validator.isEmail(e.target.value)) {
                                        e.target.setCustomValidity("Введите корректный email.");
                                    } else {
                                        e.target.setCustomValidity("");
                                    }
                                }}
                                required
                            />
                            <span className='main__sign-input-error'>{errors.email}</span>

                            <p className='main__sign-input-label'>Пароль</p>
                            <input 
                                className='main__sign-input' 
                                type='password' 
                                name="password"
                                value={values.password || ''}
                                onChange={handleChange}
                                required
                            />
                            <span className='main__sign-input-error'>{errors.password}</span>
                            <div className='main__sign-links'>
                                <button className={`main__sign-button ${isValid ? '' : 'main__sign-button_disabled'}`} disabled={!isValid}>
                                    Зарегистрироваться
                                </button>
                                <p className='main__sign-login'>
                                    Уже зарегистрированы? <Link to='/signin' className='main__sign-link'>Войти</Link>
                                </p>
                                {apiError && <p className='main__sign-login'><span className='main__sign-api-error'>{apiError}</span></p>}
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Register;
