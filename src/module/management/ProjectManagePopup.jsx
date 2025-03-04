import {usePopup} from "../../context/Popup";
import PopupContent from "../../component/PopupContent";
import PopupHeader from "../../component/PopupHeader";
import Area from "../../component/Area";
import Button from "../../component/Button";
import PopupBody from "../../component/PopupBody";
import Span from "../../component/Span";
import {useLanguage} from "../../context/Language";
import PopupOverlay from "../../component/PopupOverlay";
import {useProject} from "../../context/Project";

const ProjectManagePopup = () => {

    const {t} = useLanguage();

    const {isProjectManagePopupOpen, setIsProjectManagePopupOpen} = usePopup();
    const {lookedUpProject} = useProject();

    if (!isProjectManagePopupOpen) return null;

    return (
        <PopupOverlay setIsPopupOpen={setIsProjectManagePopupOpen}>
            <PopupContent>
                <PopupHeader>
                    <Area flex justifyContent="end">
                        <Button size="sm" variant="light" onClick={() => setIsProjectManagePopupOpen(false)}>
                            {t('components.close')}
                        </Button>
                    </Area>
                </PopupHeader>
                <PopupBody>
                    <Area textPosition="center" mb="3">
                        <Span fontSize="3" fontWeight="lighter">
                            {t('components.project_detail_title')}
                        </Span>
                    </Area>
                    {/* Display Tables */}
                    <Area marginTop="5%" mx="3">
                        {lookedUpProject.TABLES?.length > 0 && (
                            <Span variant="secondary" fontWeight="lighter" fontSize="4">
                                {t("components.project_tables")}
                            </Span>
                        )}
                        {lookedUpProject.TABLES?.map((table, index) => (
                            <Span key={index} badge="primary-filled" m="1">
                                {table.NAME}
                            </Span>
                        ))}
                        {/*TODO: display other fields */}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    )
}
export default ProjectManagePopup;