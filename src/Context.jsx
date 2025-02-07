import {createContext, useContext, useEffect, useState} from 'react';
import ko from './lang/ko.json';
import en from './lang/en.json';

{/* Dark Mode Context */}
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme : 'light';
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);


{/* Authentication Context */}
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        username: "eunsang.lee",
        email: "eunsang.lee@metlife.com",
        language: "en",
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

{/* Localization Context */}
const TranslationContext = createContext();
const translations = {
    ko,
    en,
};

export const TranslationProvider = ({ children }) => {
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
        <TranslationContext.Provider value={{ t }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);

{/* Menu Context */}
const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState('configuration');

    return (
        <MenuContext.Provider value={{ menu, setMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;