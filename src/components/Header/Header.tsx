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

  const links = [
    {
      id: 1,
      title: t('home'),
      path: '/',
    },
    {
      id: 2,
      title: t('header.products'),
      path: '/products',
    },
    {
      id: 3,
      title: t('header.favorites'),
      path: '/favorites',
    },
    {
      id: 4,
      title: t('header.basket'),
      path: '/basket',
    },
  ];

  return (
    <div className={classes.wrapper}>
      <div className={`container-lg ${classes.container}`}>
        <div className={classes.header_links}>
          {links.map((link) => (
            <Link key={link.id} to={link.path}>
              {link.title}
            </Link>
          ))}
        </div>
        <div>
          {languages.map((language) => (
            <button key={language} onClick={() => changeLanguage(language)}>
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
