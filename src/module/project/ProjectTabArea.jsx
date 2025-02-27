import {useProject} from "../../context/Project";
import Area from "../../component/Area";
import {usePopup} from "../../context/Popup";
import Icon from "../../component/Icon";
import ProjectTab from "./ProjectTab";

const ProjectTabArea = () => {

    const {projects, currentProject, setCurrentProject} = useProject();
    const {isProjectPopupOpen, setIsProjectPopupOpen} = usePopup();

    // If ProjectSettingPopup is open, render none.
    if (isProjectPopupOpen) return null;

    // Filter out only approved projects
    const approvedProjects = projects?.data.filter((project) => project.STATUS === "APPROVED");

    const numberOfProjects = approvedProjects.length;
    const nonCurrentProjects = numberOfProjects - 1;

    const currentWidth = `${80 - (nonCurrentProjects * 2)}%`;
    const nonCurrentWidth = nonCurrentProjects > 0
        ? `${(100 - parseInt(currentWidth)) / nonCurrentProjects}%`
        : "100%";

    return (
        <Area
            flex justifyContent="between" borderTop bg="body" width="100%" fontSize="smaller"
            style={{
                position: "fixed",
                bottom: "0",
            }}>
            {approvedProjects.map((project, index) => {
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
            <Area onClick={() => setIsProjectPopupOpen(true)} cursor="pointer" ms="auto" me="3" ps="2">
                <Icon name="arrows-fullscreen"/>
            </Area>
        </Area>
    );
};

export default ProjectTabArea;
