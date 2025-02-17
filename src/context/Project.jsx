import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Auth";
import { fetchUserProjects } from "../data/APIs";

{/* Project Context */}
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const { auth } = useAuth();
    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [isProjectLoading, setIsProjectLoading] = useState(true);
    const [error, setError] = useState(null);

    // DND State for Dragging Projects
    const [sourceProjectDraggable, setSourceProjectDraggable] = useState(null);
    const [targetProjectDraggable, setTargetProjectDraggable] = useState(null);

    useEffect(() => {
        if (!auth?.username) return;

        setIsProjectLoading(true);
        setError(null);

        // Load project data only for users with OWNER role
        if (auth.role && (auth.role === "DEV" || auth.role === "OWNER")) {
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
        } else {
            setIsProjectLoading(false);
        }
    }, [auth]);

    // Handle Drag-and-Drop Reordering of Projects
    const handleMoveProject = (sourceProjectId, sourceIndex, targetProjectId, targetIndex) => {
        setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects.data];

            // Remove the dragged project from its original position
            const [movedProject] = updatedProjects.splice(sourceIndex, 1);

            // Recalculate the new target index after removal
            const newTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;

            // Insert it at the target position
            updatedProjects.splice(newTargetIndex, 0, movedProject);

            // Update the ORDER property
            updatedProjects.forEach((project, index) => {
                project.ORDER = index; // Ensures correct order after reordering
            });

            return { ...prevProjects, data: updatedProjects };
        });
    };

    return (
        <ProjectContext.Provider
            value={{
                projects, setProjects,
                currentProject, setCurrentProject,
                isProjectLoading,
                sourceProjectDraggable, setSourceProjectDraggable,
                targetProjectDraggable, setTargetProjectDraggable,
                handleMoveProject
            }}
        >
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