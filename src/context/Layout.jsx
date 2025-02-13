import { createContext, useContext, useState, useEffect } from "react";
import menuData from "../data/menu.json";
import DefinitionView from "../view/DefinitionView";
import ConfigurationView from "../view/ConfigurationView";
import HistoryView from "../view/HistoryView";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    // TODO: separate Popup state as a standalone context
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Initialize menu from JSON
    useEffect(() => {
        setMenu(menuData);
    }, []);

    const [currentMenu, setCurrentMenu] = useState('M1_1');
    const currentMenuToView = {
        "M1_1": <DefinitionView />,
        "M2_1": <ConfigurationView />,
        "M4_4": <HistoryView />,
    };

    return (
        <LayoutContext.Provider value={{
            menu, setMenu,
            isMenuOpen, toggleMenu,
            currentMenu, setCurrentMenu,
            currentMenuToView,
            isPopupOpen, setIsPopupOpen
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);
