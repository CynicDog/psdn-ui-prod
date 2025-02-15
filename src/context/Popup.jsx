import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./Auth";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [isConfigPopupOpen, setIsConfigPopupOpen] = useState(false);
    const [isProjectPopupOpen, setIsProjectPopupOpen] = useState(true);

    const { auth } = useAuth();

    useEffect(() => {
        setIsProjectPopupOpen(true);
    }, [auth]);

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