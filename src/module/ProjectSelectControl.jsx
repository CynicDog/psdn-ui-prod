import { useProject } from "../context/Project";
import Area from "../component/Area";

const ProjectSelectControl = () => {

    // TODO:
    //  1. Color System
    //  2. DND to order
    //  3. In-line editing for project name
    //  4. Add / Delete projects

    const { projects, currentProject, setCurrentProject } = useProject();
    const numberOfProjects = projects.data.length;

    // Ensure there's at least one non-current project
    const nonCurrentProjects = numberOfProjects - 1;

    // Dynamically calculate widths for current and non-current projects
    const currentWidth = `${80 - (nonCurrentProjects * 2)}%`;
    const nonCurrentWidth = `${(100 - parseInt(currentWidth)) / nonCurrentProjects}%`;

    return (
        <Area flex style={{ width: "100%", fontSize: "smaller" }}>
            {/* Render all projects */}
            {projects.data.map((project, index) => {
                const isCurrent = currentProject === project;
                const width = isCurrent ? currentWidth : nonCurrentWidth;

                return (
                    <Area
                        key={index}
                        bg={isCurrent ? "danger-subtle" : "secondary-subtle"}
                        onClick={() => setCurrentProject(project)}
                        textPosition="center"
                        style={{
                            width: width,
                        }}
                    >
                        {project.NAME}
                    </Area>
                );
            })}
        </Area>
    );
};

export default ProjectSelectControl;
