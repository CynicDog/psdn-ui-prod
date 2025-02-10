import ko from '../lang/ko.json';
import en from '../lang/en.json';

import {createContext, useContext} from "react";
import {useAuth} from "./Auth";

{/* Localization Context */}
const LanguageContext = createContext();
const translations = {
    ko,
    en,
};

export const LanguageProvider = ({ children }) => {
    const { auth } = useAuth();
    const languageTranslations = translations[auth.language] || {};

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

    return (
        <LanguageContext.Provider value={{ t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
