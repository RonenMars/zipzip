import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hebrew from './locales/he';

const hebrewTranslations = Object.keys(hebrew).reduce((acc, key) => {
  return Object.assign(acc, { ...hebrew[key] });
}, {});

const translations = Object.assign({}, hebrewTranslations);
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
