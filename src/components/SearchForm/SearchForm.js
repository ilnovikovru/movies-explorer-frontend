import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='main__search-form'>
      <div className='main__search-form-container'>
        <h1 className='main__search-form-title'>Фильм</h1>
        <button className='main__search-form-button'>Найти</button>
      </div>
      <div className='main__search-form-switch-container'>
        <label className='main__search-form-switch'>{/* надо исправить */}
          <input type='checkbox' className='main__search-form-input' defaultChecked />
          <span className='main__search-form-slider main__search-form-slider-round'></span>{/* надо исправить */}
        </label>
        <p className='main__search-form-label'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;