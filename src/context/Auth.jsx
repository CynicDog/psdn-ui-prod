import { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import {ROLES} from "./util";

{/* Authentication Context */}
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { accounts, inProgress } = useMsal();
    const [auth, setAuth] = useState({
        // TODO: goes null for production env
        username: "JohnDoe",
        email: "thecynicdog0328@gmail.com",
        language: "en",
        role: ROLES.DEV
    });

    useEffect(() => {
        if (accounts.length > 0 && inProgress === InteractionStatus.None) {
            setAuth({
                username: accounts[0].name,
                email: accounts[0].username,
                language: "en",
                role: "" // TODO: integrate with Azure EntraID App Registration's `App Roles`
            });
        }
    }, [accounts, inProgress]);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
