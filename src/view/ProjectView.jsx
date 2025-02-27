import { useLanguage } from "../context/Language";
import { useProject } from "../context/Project";
import Area from "../component/Area";
import Span from "../component/Span";
import ProjectCard from "../module/project/ProjectCard";
import Icon from "../component/Icon";

const ProjectView = () => {
    const { t } = useLanguage();
    const { projects, setProjects, currentProject, setCurrentProject, handleAddProject } = useProject();

    return (
        <>
            <Area textPosition="center" mb="3">
                <Span fontSize="3" fontWeight="lighter">
                    {t('components.select_project')}
                </Span>
            </Area>
            {/* Add Project Button */}
            <Area flex justifyContent="center" gap="2" cursor="pointer" onClick={handleAddProject} my="2">
                <Icon name="folder-plus" />
                <Span variant="secondary" noSelect>
                    {t('components.add_new_project')}
                </Span>
            </Area>
            {/* Project Cards Area */}
            <Area marginTop="5%" mx="3">
                {projects?.data?.map((project) => (
                    <ProjectCard
                        key={project.ID}
                        project={project}
                        order={project.ORDER}
                        onSelect={setCurrentProject}
                        currentProject={currentProject}
                    />
                ))}
            </Area>
        </>
    );
};

export default ProjectView;
