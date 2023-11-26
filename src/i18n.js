import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hebrew from './locales/he';
import english from './locales/en';
import { PersistentStorage } from './utils/localStorage/localStorage';

const hebrewTranslations = Object.keys(hebrew).reduce((acc, key) => {
  return Object.assign(acc, { ...hebrew[key] });
}, {});
const englishTranslations = Object.keys(english).reduce((acc, key) => {
  return Object.assign(acc, { ...english[key] });
}, {});

const hebrewTranslationsCopy = Object.assign({}, hebrewTranslations);
const hebrewResources = {
  he: {
    translation: hebrewTranslationsCopy,
  },
};

const englishTranslationsCopy = Object.assign({}, englishTranslations);
const englishResources = {
  en: {
    translation: englishTranslationsCopy,
  },
};

await i18n.use(initReactI18next).init({
  resources: {
    ...hebrewResources,
    ...englishResources,
  },
  lng: PersistentStorage.getItem('language') || 'he',
  fallbackLng: 'he',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
