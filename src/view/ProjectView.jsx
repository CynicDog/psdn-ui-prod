import { useLanguage } from "../context/Language";
import { useProject } from "../context/Project";
import Area from "../component/Area";
import Span from "../component/Span";
import ProjectCard from "../module/project/ProjectCard";
import Icon from "../component/Icon";
import ProjectPopup from "../module/project/ProjectPopup";
import {usePopup} from "../context/Popup";

const ProjectView = () => {
    const { t } = useLanguage();
    const { isProjectPopupOpen, setIsProjectPopupOpen } = usePopup();

    const { projects, setLookedUpProject, handleAddProject } = useProject();

    return (
        <>

            <Area textPosition="center" mb="3">
                <Span fontSize="3" fontWeight="lighter">
                    {t('components.select_project')}
                </Span>
            </Area>
            {/* Add Project Button */}
            <Area flex justifyContent="center" gap="2" my="2">
                <Icon name="folder-plus" />
                <Span variant="secondary" cursor="pointer" onClick={() => {
                    const newProject = handleAddProject();
                    setLookedUpProject(newProject);
                    setIsProjectPopupOpen(true);
                }} >
                    {t('components.add_new_project')}
                </Span>
            </Area>
            {/* Project Cards Area */}
            <Area marginTop="5%" mx="3">
                {projects?.item?.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        order={project.sequence}
                    />
                ))}
            </Area>

            {isProjectPopupOpen && (
                <ProjectPopup />
            )}
        </>
    );
};

export default ProjectView;
