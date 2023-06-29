import React from 'react';
import css from './HomePage.module.css';

const homePage = () => {
  return (
    <div className={css.homePage_container}>
      <h1 className={css.homePage_title}>Phonebook</h1>
    </div>
  );
};

export default homePage;
