import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Auth";
import { fetchUserProjects } from "../data/APIs"; // Import the API function

{/*.Project Context */}
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const { auth } = useAuth();
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!auth?.username) return;

        setLoading(true);
        setError(null);

        fetchUserProjects(auth.username)
            .then((data) => setProjects(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [auth]);

    return (
        <ProjectContext.Provider value={{ projects, loading, error }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
