import PopupOverlay from "../../component/PopupOverlay";
import PopupContent from "../../component/PopupContent";
import { useLanguage } from "../../context/Language";
import { usePopup } from "../../context/Popup";
import { useProject } from "../../context/Project";
import Area from "../../component/Area";
import Span from "../../component/Span";
import Button from "../../component/Button";
import PopupHeader from "../../component/PopupHeader";
import PopupBody from "../../component/PopupBody";

const ConfigTableSettingPopup = () => {
    const { t } = useLanguage();
    const { isConfigTablePopupOpen, setIsConfigTablePopupOpen } = usePopup();
    const { currentProject } = useProject();

    if (!isConfigTablePopupOpen) return null;

    console.log(currentProject);

    return (
        <PopupOverlay setIsPopupOpen={setIsConfigTablePopupOpen}>
            <PopupContent>
                <PopupHeader>
                    <Area flex justifyContent="end">
                        <Button size="sm" variant="light" onClick={() => setIsConfigTablePopupOpen(false)}>
                            {t('components.close')}
                        </Button>
                    </Area>
                </PopupHeader>
                <PopupBody>
                    <Area textPosition="center" mb="3">
                        <Span fontSize="3" fontWeight="lighter">
                            {t('components.select_project_table')}
                        </Span>
                    </Area>
                    <Area>
                        {currentProject.TABLES.map((t) => {

                        })}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ConfigTableSettingPopup;
