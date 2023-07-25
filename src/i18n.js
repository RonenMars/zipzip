import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import login from './locales/he/login.json';

const translations = Object.assign({}, login);
const resources = {
  he: {
    translation: translations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'he',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
