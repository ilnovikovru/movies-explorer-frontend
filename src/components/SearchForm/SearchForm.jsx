import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, searchTerm, setSearch, isShortFilm, setIsShort }) {
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setErrorMessage('');
  };

  const validateSearch = () => {
    if (!searchTerm.trim()) {
      setErrorMessage('Нужно ввести ключевое слово');
      return false;
    }

    return true
  }

  const handleCheckboxChange = (e) => {
    setIsShort(e.target.checked);
    if (validateSearch()) {
      onSearch(e.target.checked);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSearch()) {
      onSearch(isShortFilm);
    }
  };

  return (
    <section className='main__search-form'>
      <form className='main__search-form-container' onSubmit={handleSubmit}>
        <input
          className='main__search-form-title'
          placeholder='Фильм'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className='main__search-form-button'>Найти</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className='main__search-form-switch-container'>
        <label className='main__search-form-switch'>
          <input 
            type='checkbox' 
            className='main__search-form-input' 
            checked={isShortFilm}
            onChange={handleCheckboxChange}
          />
          <span className='main__search-form-slider main__search-form-slider-round'></span>
        </label>
        <p className='main__search-form-label'>Короткометражки</p>
      </div>

    </section>
  );
}

export default SearchForm;
