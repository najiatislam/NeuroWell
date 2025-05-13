import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang); // Store language preference
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLang('en')}>🇺🇸 English</button>
      <button onClick={() => changeLang('bn')}>🇧🇩 বাংলা</button>
    </div>
  );
};

export default LanguageSelector;

