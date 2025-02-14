import { createContext, useContext, useState, useEffect } from "react";
import { useProject } from "./Project";
import { fetchProjectTable } from "../data/APIs";
import { useMenu } from "./Menu";

// BaseDB Context
const BaseDBContext = createContext();

export const BaseDBProvider = ({ children }) => {
    const { projects } = useProject();
    const { currentMenu } = useMenu();
    const [BaseDB, setBaseDB] = useState(null);
    const [isBaseDBLoading, setIsBaseDBLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!projects?.projects?.length) return;

        // Get the first project
        const firstProject = projects.projects[0];

        setIsBaseDBLoading(true);
        setError(null);

        fetchProjectTable(firstProject.TABLES[0])
            .then((data) => {
                setBaseDB(data);
            })
            .catch((err) => setError(err.message))
            .finally(() => {
                setIsBaseDBLoading(false);
            });
    }, [currentMenu]);

    return (
        <BaseDBContext.Provider value={{ BaseDB, isBaseDBLoading, error }}>
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
