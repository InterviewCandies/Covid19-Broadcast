import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import detector from "i18next-browser-languagedetector"
import translationEN from "../locales/en/translation.json"
import translationVN from "../locales/vn/translation.json"
const resources = {
  en: {
    translation: translationEN
  },
  vn : {
    translation: translationVN
  }
};
i18n
  .use(detector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",
    fallbackLng: "en", 
    keySeparator: false, 
    interpolation: {
      escapeValue: false,
    }
  });
export default i18n;