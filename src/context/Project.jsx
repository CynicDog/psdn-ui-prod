import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Auth";
import { fetchUserProjects } from "../data/APIs";
import {ROLES} from "./util";

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
    const [sourceProjectTableDraggable, setSourceProjectTableDraggable] = useState(null);
    const [targetProjectTableDraggable, setTargetProjectTableDraggable] = useState(null);

    useEffect(() => {
        if (!auth?.username) return;

        setIsProjectLoading(true);
        setError(null);

        // Load project data only for users with OWNER role
        if (auth.role && (auth.role === ROLES.APPLICATION || auth.role === ROLES.OWNER)) {
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
    const handleMoveProject = (sourceIndex, targetIndex) => {
        setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects.data];

            // Remove the dragged project from its original position
            const [movedProject] = updatedProjects.splice(sourceIndex, 1);

            // Insert it at the target position
            updatedProjects.splice(targetIndex, 0, movedProject);

            // Update the ORDER property to reflect the new position
            updatedProjects.forEach((project, index) => {
                project.ORDER = index;
            });

            return { ...prevProjects, data: updatedProjects };
        });
    };

    // Handle Drag-and-Drop Reordering of Project Tables
    const handleMoveProjectTable = (projectId, sourceIndex, targetIndex) => {
        setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects.data];

            // Find the project by ID
            const project = updatedProjects.find(p => p.ID === projectId);
            if (!project || !project.TABLES) return prevProjects; // Safety check

            // Remove the dragged table from its original position
            const [movedTable] = project.TABLES.splice(sourceIndex, 1);

            // Insert it at the target position
            project.TABLES.splice(targetIndex, 0, movedTable);

            // Update the ORDER property to reflect the new position
            project.TABLES.forEach((table, index) => {
                table.ORDER = index;
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
                handleMoveProject,
                sourceProjectTableDraggable, setSourceProjectTableDraggable,
                targetProjectTableDraggable, setTargetProjectTableDraggable,
                handleMoveProjectTable
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