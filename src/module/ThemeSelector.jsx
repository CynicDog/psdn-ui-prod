import React, {useEffect} from 'react';
import {useTheme} from "../context/Theme";
import Switch from "../component/Switch";

const ThemeSelector = () => {
    const {theme, toggleTheme} = useTheme();
    const isDarkMode = theme === 'dark';

    const handleToggleTheme = () => {
        toggleTheme();
    };

    useEffect(() => {
        updateHtmlTheme(theme);
    }, [theme]);

    const updateHtmlTheme = (mode) => {
        const htmlElement = document.querySelector('html');

        if (mode === 'dark') {
            // Bootstrap 다크모드 설정
            htmlElement.setAttribute('data-bs-theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-bs-theme');
        }
    };

    return (
        <Switch
            id="dark-mode-switch"
            isChecked={isDarkMode}
            onChange={handleToggleTheme}
        />
    );
};

export default ThemeSelector;