import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import '../../index.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import UserContext from '../../contexts/userContext';
import { JWT_TOKEN_KEY, LS_KEY_MOVIES } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { mainApi } from '../../utils/MainApi';

function App() {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: ''
    });

    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem(JWT_TOKEN_KEY) || false
    )

    const api = mainApi({ setLoggedIn })    
    const [movies, setMovies] = useState(() => (
        JSON.parse(localStorage.getItem(LS_KEY_MOVIES)) || []
    ));
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        const checkUser = async () => {
            try {
              const user = await api.getProfile()
                if (user && Object.keys(user).length) {
                    setCurrentUser(user);
                }
            } catch (e) {
                console.debug({ e })
            }
        }

        if (loggedIn) {
            checkUser();
        }
    }, [loggedIn]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="page">
                <Routes>
                    <Route path="/" element={<Main loggedIn={loggedIn} />} />
                    <Route path="/signin" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} api={api} />} />
                    <Route path="/signup" element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} api={api} />} />

                    <Route path="/movies" element={
                        <ProtectedRoute
                            component={Movies}
                            movies={movies}
                            setMovies={setMovies}
                            savedMovies={savedMovies}
                            setSavedMovies={setSavedMovies}
                            loggedIn={loggedIn}
                            api={api}
                        />}
                    />
                    <Route path="/saved-movies" element={
                        <ProtectedRoute
                            component={SavedMovies}
                            movies={savedMovies}
                            setMovies={setSavedMovies}
                            loggedIn={loggedIn}
                            api={api}
                        />} />
                    <Route path="/profile" element={
                        <ProtectedRoute
                            component={Profile}
                            loggedIn={loggedIn}
                            api={api}
                        />}
                    />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;
