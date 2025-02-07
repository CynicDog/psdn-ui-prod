import {createContext, useContext, useState} from "react";

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
