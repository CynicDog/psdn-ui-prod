import { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import {ROLES} from "./util";
import {useLanguage} from "./Language";

{/* Authentication Context */}
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { accounts, inProgress } = useMsal();
    const { setLanguage } = useLanguage();
    const [auth, setAuth] = useState({
        username: "JohnDoe",
        email: "thecynicdog0328@gmail.com",
        role: ROLES.DEV
    });

    useEffect(() => {
        if (accounts.length > 0 && inProgress === InteractionStatus.None) {

            console.log(accounts[0]);

            setAuth({
                username: accounts[0].name,
                email: accounts[0].username,
                role: "" // TODO: integrate with Azure EntraID App Registration's `App Roles`
            });
        }
        // setLanguage based on User's locale information from EntraId
    }, [accounts, inProgress]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
