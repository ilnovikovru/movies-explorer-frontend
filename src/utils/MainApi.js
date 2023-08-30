import { JWT_TOKEN_KEY } from "./constants";
const MAIN_API_URL = process.env.REACT_APP_API || 'http://localhost:3001';

const handleResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
};

export const getProfile = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse);
};

export const updateProfile = (data) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(handleResponse);
};

export const getMovies = () => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse);
};

export const addMovie = (movieData) => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieData)
  })
  .then(handleResponse);
};

export const deleteMovie = (movieId) => {
  return fetch(`${MAIN_API_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse);
};

export const signup = (userData) => {
  return fetch(`${MAIN_API_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(handleResponse);
};

export const signin = (userData) => {
  return fetch(`${MAIN_API_URL}/api/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(handleResponse);
};

export const signout = () => {
  return fetch(`${MAIN_API_URL}/api/signout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse);
};
