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
import ProjectLists from "./ProjectLists";
import PopupHeader from "../../component/PopupHeader";
import PopupBody from "../../component/PopupBody";

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
                    {/* Projects list */}
                    <Area marginTop="5%">
                        <ProjectLists
                            projects={projects}
                            currentProject={currentProject}
                            onSelect={setCurrentProject}
                        />
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ProjectSettingPopup;
