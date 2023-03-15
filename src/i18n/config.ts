import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ENTranslation from './locales/EN.json';
import TRTranslation from './locales/TR.json';
i18n.use(initReactI18next).init({
  fallbackLng: 'EN',
  lng: localStorage.getItem('App_Language') || 'EN',
  resources: {
    EN: {
      translations: ENTranslation,
    },
    TR: {
      translations: TRTranslation,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['EN', 'TR'];

export default i18n;
