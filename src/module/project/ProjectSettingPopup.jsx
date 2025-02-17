import { useRef, useEffect } from "react";
import PopupOverlay from "../../component/PopupOverlay";
import PopupContent from "../../component/PopupContent";
import { useLanguage } from "../../context/Language";
import { usePopup } from "../../context/Popup";
import { useProject } from "../../context/Project";
import Area from "../../component/Area";
import Span from "../../component/Span";
import Button from "../../component/Button";
import LanguageSelector from "../LanguageSelector";
import ThemeSelector from "../ThemeSelector";
import AuthBadge from "../AuthBadge";
import PopupHeader from "../../component/PopupHeader";
import PopupBody from "../../component/PopupBody";
import ProjectCard from "./ProjectCard";
import Icon from "../../component/Icon";

const ProjectSettingPopup = () => {
    const { t } = useLanguage();
    const { isProjectPopupOpen, setIsProjectPopupOpen } = usePopup();
    const { projects, setProjects, currentProject, setCurrentProject } = useProject();

    // Ref to track project list container
    const projectListRef = useRef(null);

    // Scroll to top when projects change
    useEffect(() => {
        if (projectListRef.current) {
            projectListRef.current.scrollTop = 0;
        }
    }, [projects]);

    if (!isProjectPopupOpen) return null;

    const handleAddProject = () => {
        const newProject = {
            ID: Date.now().toString(),
            NAME: "New Project",
            DESCRIPTION: "",
            TABLES: [],
            ORDER: 0
        };

        setProjects((prevProjects) => {
            const updatedProjects = [newProject, ...prevProjects.data];

            // Recalculate ORDER for all projects
            updatedProjects.forEach((project, index) => {
                project.ORDER = index;
            });

            return { ...prevProjects, data: updatedProjects };
        });

        setCurrentProject(newProject);
    };

    return (
        <PopupOverlay setIsPopupOpen={setIsProjectPopupOpen}>
            <PopupContent>
                <PopupHeader>
                    <Area flex justifyContent="between">
                        <Area flex alignItems="center" gap="2">
                            <AuthBadge />
                            <LanguageSelector />
                            <ThemeSelector />
                        </Area>
                        <Area>
                            <Button size="sm" variant="light" onClick={() => setIsProjectPopupOpen(false)}>
                                {t('components.close')}
                            </Button>
                        </Area>
                    </Area>
                </PopupHeader>
                <PopupBody>
                    <Area textPosition="center" marginTop="5%">
                        <Span fontSize="3" fontWeight="lighter">
                            {t('components.select_project')}
                        </Span>
                    </Area>

                    {/* Add Project Button */}
                    <Area flex justifyContent="center" gap="2" cursor="pointer" onClick={handleAddProject} my="2">
                        <Icon name="folder-plus" />
                        <Span variant="secondary">
                            {t('components.add_new_project')}
                        </Span>
                    </Area>

                    {/* Projects list with auto-scroll */}
                    <Area ref={projectListRef} style={{ maxHeight: "60vh", overflowY: "auto" }} marginTop="5%">
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
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ProjectSettingPopup;
