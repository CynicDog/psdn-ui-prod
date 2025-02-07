import {createContext, useContext, useState} from "react";

{/* Authentication Context */}
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        username: "eunsang.lee",
        email: "eunsang.lee@metlife.com",
        language: "en",
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
