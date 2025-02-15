import ko from '../data/lang/ko.json';
import en from '../data/lang/en.json';

import {createContext, useContext, useState} from "react";

{/* Localization Context */}
const LanguageContext = createContext();
const translations = {
    ko,
    en,
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("ko");
    const languageTranslations = translations[language] || {};

    // Returns the item's name from config dictionary based on the selected language
    const t = (key, vars = {}) => {
        const [namespace, ...subKeys] = key.split('.');
        const section = languageTranslations[namespace];

        if (!section) {
            console.warn(`Missing translation section for key: "${key}"`);
            return key;
        }

        const translation = subKeys.reduce((obj, subKey) => obj?.[subKey], section);

        if (!translation) {
            console.warn(`Missing translation for key: "${key}"`);
            return key;
        }

        return Object.keys(vars).reduce(
            (str, varKey) => str.replace(`{${varKey}}`, vars[varKey]),
            translation
        );
    };

    // Returns the item's name from database based on the selected language
    const getLocalizedName = (item) => {
        return language === "ko" ? item.NAME_KO : item.NAME_EN;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, getLocalizedName }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
