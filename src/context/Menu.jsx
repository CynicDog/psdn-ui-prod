import { createContext, useContext, useState, useEffect } from "react";
import menuData from "../data/config/Menu.json";
import DefinitionView from "../view/DefinitionView";
import ConfigurationView from "../view/ConfigurationView";
import HistoryView from "../view/HistoryView";
import ProjectView from "../view/ProjectView";
import {useAuth} from "./Auth";
import {ROLES} from "./util";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {

    const { auth } = useAuth();

    const [menu, setMenu] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [currentMenu, setCurrentMenu] = useState();

    // Initialize menu from JSON
    useEffect(() => {
        setMenu(menuData);
    }, []);

    useEffect(() => {
        setCurrentMenu({
            CURRENT: { ID: "M0_1", NAME: "definition_description" },
            PARENT: { ID: "M0", NAME: "definition" },
        })
    }, [menu]);

    // Views mapped to each menu item
    const currentMenuToView = {
        "M0_1": <DefinitionView />,
        "M1_1": <ProjectView />,
        "M2_1": <ConfigurationView />,
        "M4_4": <HistoryView />,
    };

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
