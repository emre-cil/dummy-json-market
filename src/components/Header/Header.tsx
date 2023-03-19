import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.scss';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { selectMode, changeMode } from '@/features/user/userSlice';
import { selectCartCount } from '@/features/user/userSlice';

function Header() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const cartCount = useSelector(selectCartCount);
  const location = useLocation();
  const { i18n, t } = useTranslation();

  const changeLanguage = (code: string) => {
    localStorage.setItem('App_Language', code);
    i18n.changeLanguage(code);
  };

  const links = [
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
      title: t('header.cart'),
      path: '/cart',
      badge: true,
    },
  ];
  return (
    <div
      className={`${classes.wrapper}
    ${mode === 'dark' ? classes.dark : ''}
    `}
    >
      <div className={`container-lg ${classes.container}`}>
        <div className={classes.header_links}>
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`${classes.link} ${location.pathname === link.path ? classes.active : ''}`}
            >
              {link.title}
              {link.path === '/cart' && cartCount > 0 && (
                <span
                  style={{
                    color: 'white',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </div>
        <div className={classes.buttons}>
          <button onClick={() => dispatch(changeMode())}>
            {mode === 'light' ? (
              <MdLightMode className={classes.btn_light} />
            ) : (
              <MdDarkMode className={classes.btn_dark} />
            )}
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
