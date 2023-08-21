import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='main__search-form'>
      <form className='main__search-form-container'>
        <input className='main__search-form-title' placeholder='Фильм' required></input>
        <button className='main__search-form-button'>Найти</button>
      </form>
      <div className='main__search-form-switch-container'>
        <label className='main__search-form-switch'>
          <input type='checkbox' className='main__search-form-input' defaultChecked />
          <span className='main__search-form-slider main__search-form-slider-round'></span>
        </label>
        <p className='main__search-form-label'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;