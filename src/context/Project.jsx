import {createContext, useState, useEffect, useContext} from "react";
import {useAuth} from "./Auth";
import {
    deleteProject,
    deleteProjectTable,
    getUserProjects,
    saveProject,
    saveProjects,
    saveProjectTable
} from "../data/APIs";
import {ROLES} from "./util";

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

    // Save states
    const [isProjectTableSaving, setIsProjectTableSaving] = useState(false);
    const [isLookedUpProjectSaving, setIsLookedUpProjectSaving] = useState(false);

    // Store selected source tables for validation
    const [selectedSourceTables, setSelectedSourceTables] = useState({});

    useEffect(() => {
        if (!auth?.username) return;

        setIsProjectLoading(true);
        setError(null);

        // Load project data only for users with OWNER role
        if (auth.role && auth.role.some(role => role === ROLES.APPLICATION || role === ROLES.OWNER)) {
             getUserProjects(auth)
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
    const handleMoveProject = async (sourceIndex, targetIndex) => {
        setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects.item];

            // Remove dragged project from original position
            const [movedProject] = updatedProjects.splice(sourceIndex, 1);

            // Insert it at the target position
            updatedProjects.splice(targetIndex, 0, movedProject);

            // Recalculate sequences (highest at the top)
            updatedProjects.forEach((project, index) => {
                project.sequence = index;
            });

            return {...prevProjects, item: updatedProjects};
        });

        await saveProjects(auth, projects);
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

    const handleAddProject = async () => {
        let newProject = {
            id: null,
            name: "New Project",
            username: auth.username,
            explanation: "",
            configTables: [],
            sequence: projects.item.length,
            status: "WRITING",
            createTimestamp: null,
            approveTimestamp: null,
            startTimestamp: null,
            finishTimestamp: null
        };
        newProject = await saveProject(auth, newProject);

        setProjects((prevProjects) => {
            const prevData = prevProjects?.item ?? [];
            const updatedProjects = [...prevData, newProject.item];

            return {...prevProjects, item: updatedProjects};
        });
        setLookedUpProject(newProject.item);

        return newProject;
    };

    const handleDeleteProject = async (projectId) => {
        setProjects((prevProjects) => {
            const updatedProjects = prevProjects.item.filter(project => project.id !== projectId);
            updatedProjects.forEach((project, index) => {
                project.sequence = index;
            });

            return {...prevProjects, item: updatedProjects};
        });

        if (lookedUpProject && lookedUpProject.id === projectId) {
            setLookedUpProject(null);
        }

        await deleteProject(auth, projectId);
    };

    const handleProjectTableAdd = async (projectId) => {
        setIsProjectTableSaving(true);

        let newTable = {
            id: null,
            tableId: null,
            name: null,
            projectId: projectId,
            logicalName: "New Table",
            explanation: "Description of the new table",
            sequence: 0,
            iteration: 0
        };

        setProjects((prevProjects) => {
            if (!prevProjects) return prevProjects;

            const updatedProjects = [...prevProjects.item];
            const project = updatedProjects.find(p => p.id === projectId);
            if (!project) return prevProjects;

            newTable.sequence = project.configTables.length;

            return prevProjects;
        });

        try {
            const savedTable = await saveProjectTable(auth, newTable);

            // Now update state with the saved table
            setProjects((prevProjects) => {
                if (!prevProjects) return prevProjects;

                const updatedProjects = [...prevProjects.item];
                const project = updatedProjects.find(p => p.id === projectId);
                if (!project) return prevProjects;

                project.configTables.push(savedTable.item);
                setLookedUpProject(project);

                return { ...prevProjects, item: updatedProjects };
            });
        } finally {
            setIsProjectTableSaving(false);
        }
    };

    const handleSourceTableSelect = async (projectTableId, sourceTable) => {

        if (lookedUpProject.status === "WRITING") {
            setSelectedSourceTables(prev => ({
                ...prev,
                [projectTableId]: sourceTable
            }));
        }
        const projectTable = lookedUpProject.configTables.find(table => table.id === projectTableId);
        if (!projectTable) {
            console.error(`Project table with ID ${projectTableId} not found.`);
            return;
        }

        // Update the existing project table with new source table data
        Object.assign(projectTable, {
            tableId: sourceTable.id,
            name: sourceTable.name,
        });

        await saveProjectTable(auth, projectTable);
    };

    const handleProjectTableDelete = async (projectId, tableId) => {
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.item.map(project => {
                if (project.id === projectId) {
                    // Update the project tables by filtering out the deleted table
                    const updatedTables = project.configTables.filter(table => table.id !== tableId);
                    return {...project, configTables: updatedTables};
                }
                return project;
            });
            return {...prevProjects, item: updatedProjects};
        });

        setLookedUpProject(prevProject => ({
            ...prevProject,
            configTables: prevProject.configTables.filter(table => table.id !== tableId)
        }));

        await deleteProjectTable(auth, {
            id: tableId,
            projectId: projectId
        })
    };

    const handleProjectInputChange = (field, value) => {

        if (lookedUpProject.status !== "WRITING") return

        setLookedUpProject(prev => ({...prev, [field]: value}));

        // Sync with projects array
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.item.map(p =>
                p.id === lookedUpProject.id ? {...p, [field]: value} : p
            );
            return {...prevProjects, item: updatedProjects};
        });
    };

    // TODO: persist systematically
    const handleTableInputChange = (tableId, field, value) => {

        if (lookedUpProject.status !== "WRITING") return

        setLookedUpProject(prev => ({
            ...prev,
            configTables: prev.configTables.map(table =>
                table.id === tableId ? {...table, [field]: value} : table
            )
        }));

        // Sync with projects array
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.item.map(p =>
                p.id === lookedUpProject.id
                    ? {
                        ...p,
                        configTables: p.configTables.map(table =>
                            table.id === tableId ? {...table, [field]: value} : table
                        )
                    }
                    : p
            );
            return {...prevProjects, item: updatedProjects};
        });
    };

    const saveLookedUpProject = async () => {
        if (!lookedUpProject || lookedUpProject.status !== "WRITING") {
            return;
        }

        try {
            setIsLookedUpProjectSaving(true);
            await saveProject(auth, lookedUpProject);
        } catch (error) {
            console.error("Failed to save project:", error);
        } finally {
            setIsLookedUpProjectSaving(false);
        }
    };

    const handleProjectCreateRequest = async () => {
        if (!lookedUpProject?.id || lookedUpProject.status !== "WRITING") return;

        setProjects((prevProjects) => ({
            ...prevProjects,
            item: prevProjects.item.map((project) =>
                project.id === lookedUpProject.id ? { ...project, status: "PENDING" } : project
            ),
        }));

        await saveProject(auth, {
            id: lookedUpProject.id,
            username: auth.username,
            name: lookedUpProject.name,
            explanation: lookedUpProject.explanation,
            startTimestamp: `${lookedUpProject.startTimestamp}T00:00:00`,
            status: "PENDING"
        });
    };

    return (
        <ProjectContext.Provider
            value={{
                projects, setProjects,
                currentProject, setCurrentProject,
                isProjectLoading,

                /* Project Card Drag and Drop methods */
                handleMoveProject,
                sourceProjectDraggable, setSourceProjectDraggable,
                targetProjectDraggable, setTargetProjectDraggable,

                /* Writing Project methods */
                lookedUpProject, setLookedUpProject, saveLookedUpProject, isLookedUpProjectSaving,
                handleAddProject,
                selectedSourceTables, setSelectedSourceTables, handleSourceTableSelect,
                handleDeleteProject,

                handleProjectTableAdd, isProjectTableSaving, handleProjectTableDelete,
                handleProjectInputChange, handleTableInputChange,
                handleProjectCreateRequest,

                handleMoveProjectTable,
                sourceProjectTableDraggable, setSourceProjectTableDraggable,
                targetProjectTableDraggable, setTargetProjectTableDraggable
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