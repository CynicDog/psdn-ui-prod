import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Auth";
import { fetchUserProjects } from "../data/APIs";
import {useMenu} from "./Menu";

// Project Context
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const { auth } = useAuth();
    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [isProjectLoading, setIsProjectLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!auth?.username) return;

        setIsProjectLoading(true);
        setError(null);

        fetchUserProjects(auth.username)
            .then((projects) => {
                setProjects(projects);

                // Set the first project as the current one
                if (projects.data?.length > 0) {
                    setCurrentProject(projects.data[0]);
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setIsProjectLoading(false));

    }, [auth]);

    return (
        <ProjectContext.Provider value={{ projects, currentProject, setCurrentProject, isProjectLoading }}>
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
