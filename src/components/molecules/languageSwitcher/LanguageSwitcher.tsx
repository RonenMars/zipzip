import React, { useEffect } from 'react';
import { languages, LanguageType } from '@utils/constants/languages.ts';
import { useTranslation } from 'react-i18next';
import { PersistentStorage } from '@utils/localStorage/localStorage.ts';

export const LanguageSwitcher = () => {
  useEffect(() => {
    document.getElementsByTagName('html')[0].dir = PersistentStorage.getItem('languageDirection');
  }, []);

  const { i18n } = useTranslation();

  const changeLanguage = (language: LanguageType) => {
    document.getElementsByTagName('html')[0].dir = language.direction;
    PersistentStorage.setItem('language', language.short);
    PersistentStorage.setItem('languageDirection', language.direction);
    i18n.changeLanguage(language.short);
  };

  return (
    <div className="absolute top-8 left-8">
      {languages.map((language) => (
        <div className="" onClick={() => changeLanguage(language)}>
          {language.name}
        </div>
      ))}
    </div>
  );
};
