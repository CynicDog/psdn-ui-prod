import { useProject } from "../../context/Project";
import Area from "../../component/Area";
import {usePopup} from "../../context/Popup";
import Icon from "../../component/Icon";
import ProjectTab from "./ProjectTab";

const ProjectTabArea = () => {

    const { projects, currentProject, setCurrentProject } = useProject();
    const { isProjectPopupOpen, setIsProjectPopupOpen  } = usePopup();

    // If ProjectSettingPopup is open, render none.
    if (isProjectPopupOpen) return null;

    const numberOfProjects = projects.data.length;

    // Ensure there's at least one non-current project
    const nonCurrentProjects = numberOfProjects - 1;

    // Dynamically calculate widths for current and non-current projects
    const currentWidth = `${80 - (nonCurrentProjects * 2)}%`;
    const nonCurrentWidth = `${(100 - parseInt(currentWidth)) / nonCurrentProjects}%`;

    return (
        <Area flex borderTop bg="body" width="100%" fontSize="smaller"
            style={{
                position: "fixed",
                bottom: "0"
        }}>
            {/* Render all projects */}
            {projects.data.map((project, index) => {
                const width = currentProject === project ? currentWidth : nonCurrentWidth;

                return (
                    <ProjectTab
                        key={index}
                        order={project.ORDER}
                        project={project}
                        currentProject={currentProject}
                        onSelect={() => setCurrentProject(project)}
                        width={width}
                    />
                );
            })}
            <Area
                onClick={() => setIsProjectPopupOpen(true)}
                cursor="pointer" ms="2" me="4"
            >
                <Icon name="arrows-fullscreen" />
            </Area>
        </Area>
    );
};

export default ProjectTabArea;
