import {createContext, useState, useEffect, useContext} from "react";
import {useAuth} from "./Auth";
import {fetchUserProjects} from "../data/APIs";
import {ROLES} from "./util";
import {usePopup} from "./Popup";

{/* Project Context */}
const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    const {auth} = useAuth();
    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [lookedUpProject, setLookedUpProject] = useState(null);
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
        if (auth.role && auth.role.some(role => role === ROLES.APPLICATION || role === ROLES.OWNER)) {
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

            return {...prevProjects, data: updatedProjects};
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

            return {...prevProjects, data: updatedProjects};
        });
    };

    const handleAddProject = () => {
        const newProject = {
            ID: Date.now().toString(), // TODO: Replace with Hibernate UUID
            NAME: "New Project",
            DESCRIPTION: "",
            TABLES: [],
            ORDER: 0,
            STATUS: "WRITING",
            CREATE_AT: new Date(Date.now()).toISOString().split("T")[0], // "YYYY-MM-DD"
            APPROVE_AT: null,
            START_AT: null,
            FINISH_AT: null
        };

        setProjects((prevProjects) => {
            const prevData = prevProjects?.data ?? [];
            const updatedProjects = [newProject, ...prevData];

            // Recalculate ORDER for all projects
            updatedProjects.forEach((project, index) => {
                project.ORDER = index;
            });

            return {...prevProjects, data: updatedProjects};
        });

        return newProject;
    };

    const handleDeleteProject = (projectId) => {
        setProjects((prevProjects) => {
            const updatedProjects = prevProjects.data.filter(project => project.ID !== projectId);

            updatedProjects.forEach((project, index) => {
                project.ORDER = index;
            });

            return { ...prevProjects, data: updatedProjects };
        });

        if (lookedUpProject && lookedUpProject.ID === projectId) {
            setLookedUpProject(null);
        }
    };

    const handleProjectTableAdd = (projectId) => {
        setProjects((prevProjects) => {
            if (!prevProjects) return prevProjects;

            const updatedProjects = [...prevProjects.data];

            // Find the project by ID
            const project = updatedProjects.find(p => p.ID === projectId);
            if (!project) return prevProjects;

            // Create a new empty table entry
            const newTable = {
                ID: `CT${Date.now()}`, // TODO: Replace with Hibernate UUID
                TABLE_ID: "",
                NAME: "New Table",
                DESCRIPTION: "Description of the new table",
                IMPORTED_AT: new Date(Date.now()).toISOString().split("T")[0],
                ORDER: project.TABLES.length,
            };

            // Append the new table to the project
            project.TABLES.push(newTable);

            setLookedUpProject(project);

            return {...prevProjects, data: updatedProjects};
        });
    };

    const handleProjectTableDelete = (projectId, tableId) => {
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.data.map(project => {
                if (project.ID === projectId) {
                    // Update the project tables by filtering out the deleted table
                    const updatedTables = project.TABLES.filter(table => table.ID !== tableId);
                    return {...project, TABLES: updatedTables};
                }
                return project;
            });
            return {...prevProjects, data: updatedProjects};
        });

        setLookedUpProject(prevProject => ({
            ...prevProject,
            TABLES: prevProject.TABLES.filter(table => table.ID !== tableId)
        }));
    };

    const handleProjectInputChange = (field, value) => {

        if (lookedUpProject.STATUS !== "WRITING") return

        setLookedUpProject(prev => ({...prev, [field]: value}));

        // Sync with projects array
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.data.map(p =>
                p.ID === lookedUpProject.ID ? {...p, [field]: value} : p
            );
            return {...prevProjects, data: updatedProjects};
        });
    };

    const handleTableInputChange = (tableId, field, value) => {

        if (lookedUpProject.STATUS !== "WRITING") return

        setLookedUpProject(prev => ({
            ...prev,
            TABLES: prev.TABLES.map(table =>
                table.ID === tableId ? {...table, [field]: value} : table
            )
        }));

        // Sync with projects array
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.data.map(p =>
                p.ID === lookedUpProject.ID
                    ? {
                        ...p,
                        TABLES: p.TABLES.map(table =>
                            table.ID === tableId ? {...table, [field]: value} : table
                        )
                    }
                    : p
            );
            return {...prevProjects, data: updatedProjects};
        });
    };

    const handleProjectCreateRequest = () => {
        if (!lookedUpProject || lookedUpProject.STATUS !== "WRITING") {
            return;
        }

        setProjects((prevProjects) => {
            const updatedProjects = prevProjects.data.map((project) =>
                project.ID === lookedUpProject.ID
                    ? { ...project, STATUS: "PENDING" } // Change status of the updated project
                    : project
            );
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
                handleMoveProjectTable,
                handleAddProject, handleDeleteProject,
                lookedUpProject, setLookedUpProject,
                handleProjectTableAdd, handleProjectTableDelete,
                handleProjectInputChange, handleTableInputChange,
                handleProjectCreateRequest
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