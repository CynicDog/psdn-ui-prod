import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./Auth";
import {ROLES} from "./util";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [isConfigPopupOpen, setIsConfigPopupOpen] = useState(false);
    const [isProjectPopupOpen, setIsProjectPopupOpen] = useState(true);
    const [isProjectTablePopupOpen, setIsProjectTablePopupOpen] = useState(false);

    const { auth } = useAuth();

    // Project popup is shown only to users with OWNER role
    useEffect(() => {
        if (auth.role && (auth.role === ROLES.APPLICATION || auth.role === ROLES.OWNER)) {
            setIsProjectPopupOpen(true);
        } else {
            setIsProjectPopupOpen(false);
        }
    }, [auth]);

    return (
        <PopupContext.Provider value={{
            isProjectPopupOpen, setIsProjectPopupOpen,
            isProjectTablePopupOpen, setIsProjectTablePopupOpen,
            isConfigPopupOpen, setIsConfigPopupOpen,
        }}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext)