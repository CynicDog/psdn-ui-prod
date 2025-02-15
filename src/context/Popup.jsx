import {createContext, useContext, useState} from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {

    const [isConfigPopupOpen, setIsConfigPopupOpen] = useState(false);
    const [isProjectPopupOpen, setIsProjectPopupOpen] = useState(true);

    return (
        <PopupContext.Provider value={{
            isConfigPopupOpen, setIsConfigPopupOpen,
            isProjectPopupOpen, setIsProjectPopupOpen
        }}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext);