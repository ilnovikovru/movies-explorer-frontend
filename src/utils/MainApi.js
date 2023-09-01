import { RequestError } from "./RequestError";
import { 
  JWT_TOKEN_KEY,
  LS_KEY_FILTRED,
  LS_KEY_IS_SHORT,
  LS_KEY_MOVIES,
  LS_KEY_SEARCH,
  LS_KEY_VISIBLE,
 } from "./constants";

class MainApi {
  constructor({
    url = process.env.REACT_APP_API || 'http://localhost:3001' ,
    headers = {
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
      'Content-Type': 'application/json'
    },
    setLoggedIn
  }) {
    this.url = url
    this.headers = headers
    this.setLoggedIn = setLoggedIn
  }

  _setLoggedOut() {
        this.setLoggedIn(false);
        localStorage.removeItem(JWT_TOKEN_KEY);
        localStorage.removeItem(LS_KEY_FILTRED)
        localStorage.removeItem(LS_KEY_IS_SHORT)
        localStorage.removeItem(LS_KEY_MOVIES)
        localStorage.removeItem(LS_KEY_SEARCH)
        localStorage.removeItem(LS_KEY_VISIBLE)
  }

  async _handleResponse(response) {
    if (response.ok) {
      return await response.json()
    }

      if (response.status  === 401) {
        this._setLoggedOut()
      }

      throw new RequestError({
        status: response.status,
        ...await response.json()
      })
    }
  

getProfile = async () => {
    const response = await fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers
    })

    return this._handleResponse(response)
}

updateProfile = async (data) => {
    const response = await fetch(`${this.url}/users/me`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify(data)
  });

  return this._handleResponse(response);
  };
  
 getMovies = async () => {
    const response = await fetch(`${this.url}/movies`, {
     method: 'GET',
     headers: this.headers
   });
   return this._handleResponse(response);
  }
  
   addMovie = async (movieData) => {
    const response = await fetch(`${this.url}/movies`, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(movieData)
     });
     return this._handleResponse(response);
  }
  
  deleteMovie = async (movieId) => {
    const response = await fetch(`${this.url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        'Content-Type': 'application/json'
      }
    });
    return this._handleResponse(response);
  }
  
  signup = async (userData) => {
    const response = await fetch(`${this.url}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    return this._handleResponse(response);
  }
  
   signin = async (userData) => {
    const response = await fetch(`${this.url}/api/signin`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(userData)
     });
     return this._handleResponse(response);
  }
  
  signout = async () => {
    const response = await fetch(`${this.url}/api/signout`, {
      method: 'POST',
      headers: this.headers
    })

    this._setLoggedOut();

    return this._handleResponse(response);
  }
}

export const mainApi = (opts) => new MainApi(opts)