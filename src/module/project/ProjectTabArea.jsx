import { useProject } from "../../context/Project";
import Area from "../../component/Area";
import Span from "../../component/Span";
import {usePopup} from "../../context/Popup";
import Icon from "../../component/Icon";

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
                const isCurrent = currentProject === project;
                const width = isCurrent ? currentWidth : nonCurrentWidth;

                return (
                    <Area
                        key={index}
                        bg={isCurrent ? "primary-subtle" : ""}
                        onClick={() => setCurrentProject(project)}
                        textPosition="center"
                        width={width}
                        borderRadius="5px 5px 0 0"
                        cursor="pointer"
                    >
                        <Span fontWeight="light">
                            {project.NAME}
                        </Span>
                    </Area>
                );
            })}
            <Area
                onClick={() => setIsProjectPopupOpen(true)}
                cursor="pointer"
                mx="2"
            >
                <Icon name="arrows-fullscreen" />
            </Area>
        </Area>
    );
};

export default ProjectTabArea;
