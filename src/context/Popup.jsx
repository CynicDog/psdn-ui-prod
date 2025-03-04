import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./Auth";
import {ROLES} from "./util";
import {useProject} from "./Project";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [isConfigPopupOpen, setIsConfigPopupOpen] = useState(false);
    const [isConfigTablePopupOpen, setIsConfigTablePopupOpen] = useState(false);
    const [isProjectPopupOpen, setIsProjectPopupOpen] = useState(false);
    const [isProjectManagePopupOpen, setIsProjectManagePopupOpen] = useState(false);

    return (
        <PopupContext.Provider value={{
            isConfigTablePopupOpen, setIsConfigTablePopupOpen,
            isConfigPopupOpen, setIsConfigPopupOpen,
            isProjectPopupOpen, setIsProjectPopupOpen,
            isProjectManagePopupOpen, setIsProjectManagePopupOpen
        }}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext)