import { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import {useLanguage} from "./Language";

{/* Authentication Context */}
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { accounts, inProgress } = useMsal();
    const { setLanguage } = useLanguage();
    const [auth, setAuth] = useState({
        // username: "JohnDoe",
        // email: "thecynicdog0328@gmail.com",
        // role: ROLES.APPLICATION
    });

    useEffect(() => {

        if (accounts.length > 0 && inProgress === InteractionStatus.None) {
            setAuth({
                username: accounts[0].username.split('@')[0],
                email: accounts[0].username,
                role: accounts[0].idTokenClaims.roles || [],
                token: accounts[0].idToken
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
