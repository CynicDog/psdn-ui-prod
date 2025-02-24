import { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import {useLanguage} from "./Language";

{/* Authentication Context */}
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { accounts, inProgress } = useMsal();
    const { setLanguage } = useLanguage();
    const [auth, setAuth] = useState({});

    useEffect(() => {
        if (accounts.length > 0 && inProgress === InteractionStatus.None) {

            setAuth({
                username: accounts[0].name,
                email: accounts[0].username,
                role: accounts[0].idTokenClaims.roles[0]
            });
        }
    }, [accounts, inProgress]);

    console.log(auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
