import PopupOverlay from "../../component/PopupOverlay";
import PopupContent from "../../component/PopupContent";
import {useLanguage} from "../../context/Language";
import {usePopup} from "../../context/Popup";
import {useProject} from "../../context/Project";
import Area from "../../component/Area";
import Span from "../../component/Span";
import Button from "../../component/Button";
import LanguageSelector from "../LanguageSelector";
import ThemeSelector from "../ThemeSelector";
import AuthBadge from "../AuthBadge";

const ProjectSettingPopup = () => {

    // TODO:
    //  1. Color System
    //  2. DND to order
    //  3. In-line editing for project name
    //  4. Add / Delete projects

    const {t} = useLanguage();
    const {isProjectPopupOpen, setIsProjectPopupOpen} = usePopup();
    const {projects, currentProject, setCurrentProject} = useProject();

    if (!isProjectPopupOpen) return null;

    return (
        <PopupOverlay setIsPopupOpen={setIsProjectPopupOpen}>
            <PopupContent>
                {/* Popup Header */}

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


                <Area textPosition="center" style={{marginTop: "10%"}}>
                    <Span fontSize="3" fontWeight="lighter">
                        {t('components.select_project')}
                    </Span>
                </Area>

                {/* Project Cards */}
                <Area flex justifyContent="center" gap="3" style={{marginTop: "10%"}}>
                    {projects?.data?.map((project) => (
                        <Area
                            key={project.ID}
                            bg={currentProject === project ? "primary-subtle" : "secondary"}
                            border rounded p="2" shadow="sm"
                            style={{
                                cursor: "pointer",
                                textAlign: "center",
                            }}
                            onClick={() => setCurrentProject(project)}
                        >
                            <Span fontWeight="bold">{project.NAME}</Span>
                        </Area>
                    ))}
                </Area>

            </PopupContent>
        </PopupOverlay>
    );
};

export default ProjectSettingPopup;
