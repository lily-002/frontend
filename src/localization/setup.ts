/* eslint-disable @typescript-eslint/no-floating-promises */
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"

i18next.use(initReactI18next).use(LanguageDetector).use(Backend).init({
    // lng: "en",
    fallbackLng: "en",
    // debug: true,
    cache: ["cookie"],
    detection: {
        order: ["queryString", "cookie", "htmlTag", "path", "localStorage"],
        caches: ["cookie"]
    },
    backend: {
        loadPath: "/locales/{{lng}}/translation.json"
    }
})

export default i18next;