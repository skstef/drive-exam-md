import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    backend: {
      /* translation file path */
      loadPath: "/locales/{{lng}}.json",
    },
    fallbackLng: "ro",
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
