import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from './locales/en.json';
import idJson from './locales/id.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJson },
    id: { ...idJson },
  }, // Where we're gonna put translations' files
  lng: 'en',     // Set the initial language of the App
});
