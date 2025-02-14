import { createContext, useContext, useState, useEffect } from "react";
import {useProject} from "./Project";
import { fetchProjectTable } from "../data/APIs";

{ /* BaseDB Context */ }
const BaseDBContext = createContext();

export const BaseDBProvider = ({ children }) => {
    const { projects } = useProject(); // Access user projects
    const [BaseDB, setBaseDB] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!projects?.projects?.length) return;

        // Get the first project
        const firstProject = projects.projects[0];

        setLoading(true);
        setError(null);

        fetchProjectTable(firstProject.TABLES[0])
            .then((data) => setBaseDB(data))
            .catch((err) => setError(err.message))
            .finally(() => {
                console.log(BaseDB)
                setLoading(false)
            });
    }, [projects]);

    return (
        <BaseDBContext.Provider value={{ BaseDB, loading, error }}>
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
