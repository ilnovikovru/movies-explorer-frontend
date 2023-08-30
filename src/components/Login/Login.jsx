import { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation'; 
import { signin } from '../../utils/MainApi';
import validator from 'validator';
import { JWT_TOKEN_KEY } from '../../utils/constants';


function Login({ loggedIn, setLoggedIn }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate('/movies');
        }
    }, [loggedIn])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isValid) return;
    
        try {
            const response = await signin(values);
            
            if (response.token) {
                localStorage.setItem(JWT_TOKEN_KEY, response.token);
                setLoggedIn(true);
            } else {
                setApiError(response.message || 'Что-то пошло не так!');
            }
        } catch (error) {
            setApiError(error.message || 'Произошла ошибка');
        }
    };

    return (
        <>
            <main className='main'>
                <section className='main__sign'>
                    <div className='main__sign-container'>
                        <img src={logo} alt='Вход' className='logo main__sign-logo' />
                        <h1 className='main__sign-title'>Рады видеть!</h1>
                        <form className='main__sign-form' onSubmit={handleSubmit}>
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
                                <button className={`main__sign-button main__sign-button-login ${isValid ? '' : 'main__sign-button_disabled'}`} disabled={!isValid}>
                                    Войти
                                </button>
                                <p className='main__sign-login'>
                                    Ещё не зарегистрированы? <Link to='/signup' className='main__sign-link'>Регистрация</Link>
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

export default Login;