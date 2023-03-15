import Header from '@/components/Header/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      {t('home.title')}
    </div>
  );
};

export default Home;
