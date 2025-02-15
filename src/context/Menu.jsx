import { createContext, useContext, useState, useEffect } from "react";
import menuData from "../data/config/Menu.json";
import DefinitionView from "../view/DefinitionView";
import ConfigurationView from "../view/ConfigurationView";
import HistoryView from "../view/HistoryView";
import {useProject} from "./Project";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {

    const [menu, setMenu] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [currentMenu, setCurrentMenu] = useState({
        CURRENT: { ID: "M1_1", NAME: "definition_description" },
        PARENT: { ID: "M1", NAME: "definition" },
    });
    const { currentProject } = useProject();

    // Set to view first menu when project changes
    useEffect(() => {
        setCurrentMenu({
            CURRENT: { ID: "M1_1", NAME: "definition_description" },
            PARENT: { ID: "M1", NAME: "definition" },
        })
        setIsMenuOpen(true);
    }, [currentProject]);

    // Views mapped to each menu item
    const currentMenuToView = {
        "M1_1": <DefinitionView />,
        "M2_1": <ConfigurationView />,
        "M4_4": <HistoryView />,
    };

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Initialize menu from JSON
    useEffect(() => {
        setMenu(menuData);
    }, []);

    return (
        <MenuContext.Provider value={{
            menu, setMenu,
            isMenuOpen, toggleMenu,
            currentMenu, setCurrentMenu,
            currentMenuToView,
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
