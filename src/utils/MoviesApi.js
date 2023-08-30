export const MOVIES_API_URL = 'https://api.nomoreparties.co';

export const getMovies = () => {
  return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
};