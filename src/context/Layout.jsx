import {createContext, useContext, useState} from "react";

{/* Layout Context */}
const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {

    const [menu, setMenu] = useState('configuration');
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <LayoutContext.Provider value={{
            menu, setMenu, isMenuOpen, toggleMenu,
            isPopupOpen, setIsPopupOpen
        }}>
            {children}
        </LayoutContext.Provider>
    );
}

export const useLayout = () => useContext(LayoutContext);
