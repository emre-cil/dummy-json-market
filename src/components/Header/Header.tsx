import React from 'react';
import { useTranslation } from 'react-i18next';

function Header() {
  const { i18n, t } = useTranslation();
  const languages = ['TR', 'EN'];

  const changeLanguage = (code: string) => {
    localStorage.setItem('App_Language', code);
    i18n.changeLanguage(code);
  };

  return (
    <div>
      {languages.map((language) => (
        <button key={language} onClick={() => changeLanguage(language)}>
          {language}
        </button>
      ))}
    </div>
  );
}

export default Header;
