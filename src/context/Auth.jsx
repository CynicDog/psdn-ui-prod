import { createContext, useContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

{/* Authentication Context */}
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { accounts, inProgress } = useMsal();
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        if (accounts.length > 0 && inProgress === InteractionStatus.None) {
            setAuth({
                username: accounts[0].name,
                email: accounts[0].username,
                language: "en",
            });
        }
    }, [accounts, inProgress]);

    const authValue = auth || { username: "", email: "", language: "en" };

    return (
        <AuthContext.Provider value={{ auth: authValue, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
