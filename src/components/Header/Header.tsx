import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
function Header() {
  const { i18n, t } = useTranslation();
  const languages = ['TR', 'EN'];

  const changeLanguage = (code: string) => {
    localStorage.setItem('App_Language', code);
    i18n.changeLanguage(code);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header_links}>
        <Link to="/">{t('home')}</Link>
        <Link to="/products">{t('header.products')}</Link>
        <Link to="/favorites">{t('header.favorites')}</Link>
        <Link to="/basket">{t('header.basket')}</Link>
      </div>
      <div>
        {languages.map((language) => (
          <button key={language} onClick={() => changeLanguage(language)}>
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Header;
