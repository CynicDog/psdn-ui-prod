import { createContext, useContext, useState, useEffect } from "react";
import { useProject } from "./Project";
import { fetchProjectTable } from "../data/APIs";
import { useMenu } from "./Menu";

// BaseDB Context
const BaseDBContext = createContext();

export const BaseDBProvider = ({ children }) => {
    const { currentProject } = useProject();
    const { currentMenu } = useMenu();
    const [BaseDB, setBaseDB] = useState(null);
    const [isBaseDBLoading, setIsBaseDBLoading] = useState(true);

    useEffect(() => {
        if (!currentProject) return;

        setIsBaseDBLoading(true);

        if (currentProject.TABLES.length === 0) {
            setBaseDB(null);
            setIsBaseDBLoading(true);
        } else {
            fetchProjectTable(currentProject.TABLES[0])
                .then((data) => {
                    setBaseDB(data);
                })
                .catch((err) => {
                    setBaseDB(null);
                    setIsBaseDBLoading(true);
                })
                .finally(() => {
                    setIsBaseDBLoading(false);
                });
        }
    }, [currentProject, currentMenu]);

    return (
        <BaseDBContext.Provider value={{ BaseDB, isBaseDBLoading }}>
            {children}
        </BaseDBContext.Provider>
    );
};

export const useBaseDB = () => {
    const context = useContext(BaseDBContext);
    if (!context) {
        throw new Error("useBaseDB must be used within a BaseDBProvider");
    }
    return context;
};
