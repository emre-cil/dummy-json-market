import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.scss';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { selectMode, changeMode } from '@/features/user/userSlice';

function Header() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const location = useLocation();
  const { i18n, t } = useTranslation();

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
            <Link key={link.id} to={link.path} className={location.pathname === link.path ? classes.active : ''}>
              {link.title}
            </Link>
          ))}
        </div>
        <div className={classes.buttons}>
          <button onClick={() => dispatch(changeMode())}>
            {mode === 'light' ? <MdLightMode className={classes.light} /> : <MdDarkMode className={classes.dark} />}
          </button>
          <button onClick={() => changeLanguage(i18n.language === 'TR' ? 'EN' : 'TR')}>
            {i18n.language === 'TR' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
