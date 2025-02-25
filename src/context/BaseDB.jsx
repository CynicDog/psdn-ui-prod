import { createContext, useContext, useState, useEffect } from "react";
import { useProject } from "./Project";
import { fetchProjectTable } from "../data/APIs"; // Assuming this can return multiple tables
import { useMenu } from "./Menu";

const BaseDBContext = createContext();

export const BaseDBProvider = ({ children }) => {
    const { currentProject } = useProject();
    const { currentMenu } = useMenu();
    const [BaseDB, setBaseDB] = useState([]); // TODO: name change to ConfigTable
    const [currentBaseDB, setCurrentBaseDB] = useState(null);
    const [isCurrentBaseDBLoading, setIsCurrentBaseDBLoading] = useState(false);

    useEffect(() => {
        if (!currentProject) {
            setBaseDB([]);
            setIsCurrentBaseDBLoading(false);
            setCurrentBaseDB(null);
            return;
        }

        // Set loading for currentBaseDB only
        setIsCurrentBaseDBLoading(true);

        if (currentProject.TABLES.length === 0) {
            setBaseDB([]);
            setIsCurrentBaseDBLoading(false);
            setCurrentBaseDB(null);
        } else {
            Promise.all(currentProject.TABLES.map(table => fetchProjectTable(table.ID)))
                .then((tables) => {
                    setBaseDB(tables);
                    // Set the first table as the current BaseDB
                    setCurrentBaseDB(tables[0]);
                })
                .catch((err) => {
                    console.error("Failed to fetch BaseDBs:", err);
                    setBaseDB([]);
                    setCurrentBaseDB(null);
                })
                .finally(() => {
                    setIsCurrentBaseDBLoading(false);
                });
        }
    }, [currentProject, currentMenu]);

    return (
        <BaseDBContext.Provider value={{ BaseDB, isCurrentBaseDBLoading, currentBaseDB, setCurrentBaseDB }}>
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
