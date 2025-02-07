import data from "../data/NRS2-mock.json";
import {createContext, useContext, useState} from "react";

{/* Base DB Context */}
const BaseDBContext = createContext();

export const BaseDBProvider = ({ children }) => {
    const [BaseDB] = useState(data);

    return (
        <BaseDBContext.Provider value={{ BaseDB }}>
            {children}
        </BaseDBContext.Provider>
    );
}

export const useBaseDB = () => useContext(BaseDBContext);
