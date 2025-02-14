import { useProject } from "../context/Project";
import Area from "../component/Area";

const ProjectArea = () => {
    const { projects, currentProject, setCurrentProject } = useProject();
    const numberOfProjects = projects.data.length;

    // Ensure there's at least one non-current project
    const nonCurrentProjects = numberOfProjects - 1;

    // Dynamically calculate widths for current and non-current projects
    const currentWidth = `${80 - (nonCurrentProjects * 2)}%`;
    const nonCurrentWidth = `${(100 - parseInt(currentWidth)) / nonCurrentProjects}%`;

    return (
        <Area flex style={{ width: "100%" }}>
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
                            cursor: "pointer",
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

export default ProjectArea;
