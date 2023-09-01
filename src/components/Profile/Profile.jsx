import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import { JWT_TOKEN_KEY, LS_KEY_FILTRED, LS_KEY_IS_SHORT, LS_KEY_MOVIES, LS_KEY_SEARCH } from '../../utils/constants';
import UserContext from '../../contexts/userContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import validator from 'validator';

const validateName = (name) => {
    const pattern = /^[A-Za-zА-Яа-я\s-]+$/;
    return pattern.test(name);
};

const validateEmail = (email) => {
    return validator.isEmail(email);
};

function Profile({ api }) {
    const  [isSubmited, setSubmited] = useState(false)
    const [edit, setEdit] = useState(false)
    const [success, setSuccess] = useState(false)
    const { currentUser: user, setCurrentUser } = useContext(UserContext);
    const { values, handleChange, errors, setErrors, isValid, setValues } = useFormWithValidation();
    const [error, setError] = useState();

    useEffect(() => {
        if (user.name) {
            setValues({ ...user });
        }
    }, [user])

    const handleSignOut = async () => await api.signout();
    
    const isChanged = (key, val) => val[key] === values[key]

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSubmited(true);
        setError('');
        setSuccess(false);

        try {
            const resp = await api.updateProfile(values);
            if (Object.keys(resp).length) {
                setCurrentUser(resp);
                setSuccess(true);
            }
        } catch (error) {
            if (error.message) {
                if (error.message === 'Validation failed') {
                    error.validation.body.keys.map(key => {
                        setErrors(e => ({ ...e, [key]: error.validation.body.message }));
                    })
                }

                setError(error.message);
            }
        } finally {
            setSubmited(false)
        }
    }

    return (
        <>
            <header className='header header-movies'>
                <section className='header__nav header__nav-profile'>
                    <Header />
                    <NavTab />
                </section>
            </header>
            <main className='main main-profile'>
                <form onSubmit={handleUpdateProfile} className='main__profile'>
                    <h1 className='main__profile-title'>Привет, {values.name}!</h1>
                    <div className='main__profile-data'>
                        <p className='main__profile-label'>Имя</p>
                        <input
                            name="name"
                            value={values.name || ''}
                            onChange={(e) => {
                                if (!validateName(e.target.value)) {
                                    e.target.setCustomValidity("Имя может содержать только латиницу, кириллицу, пробел или дефис.");
                                } else {
                                    e.target.setCustomValidity("");
                                }
                                handleChange(e);
                            }}
                            disabled={!edit}
                            className='main__profile-value'
                            required
                        />
                    </div>
                    <p className="main__profile-form-error">{ errors.name }</p>
                    <div className='main__profile-data main__profile-data-email'>
                        <p className='main__profile-label'>E-mail</p>
                        <input
                            name="email"
                            value={values.email || ''}
                            onChange={(e) => {
                                if (!validateEmail(e.target.value)) {
                                    e.target.setCustomValidity("Введите корректный email.");
                                } else {
                                    e.target.setCustomValidity("");
                                }
                                handleChange(e);
                            }}
                            disabled={!edit}
                            className='main__profile-value'
                            required
                        />
                    </div>
                    <p className="main__profile-form-error">{ errors.email }</p>
                    <p className='main__profile-form-error'>{error}</p>
                    <p>{success ? 'Профиль успешно обновлен' : ''}</p>
                    <div className='main__profile-links'>
                        {
                            edit ? (
                                <button type='submit' 
                                disabled={!isValid || isSubmited || isChanged('name', user) && isChanged('email', user)}
                                className='main__profile-save'>Сохранить</button>
                            ) : (
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setEdit(true)
                                }} className='main__profile-link'>Редактировать</button>
                            )
                        }
                        <Link className='main__profile-link main__profile-link-signout' onClick={handleSignOut} >Выйти из аккаунта</Link>
                    </div>
                </form>
            </main>
        </>
    );
}

export default Profile;