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
import Icon from "../../component/Icon";
import {useBaseDB} from "../../context/BaseDB";
import ConfigTableSettingCard from "./ConfigTableSettingCard";

const ConfigTableSettingPopup = () => {
    const { t } = useLanguage();
    const { isConfigTablePopupOpen, setIsConfigTablePopupOpen } = usePopup();
    const { currentProject } = useProject();
    const {BaseDB, currentBaseDB, setCurrentBaseDB} = useBaseDB();

    if (!isConfigTablePopupOpen) return null;

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

                    {/* Add Project Button */}
                    <Area flex justifyContent="center" gap="2" cursor="pointer" onClick={() => {console.log("designate a new table")}} my="2">
                        <Icon name="folder-plus" />
                        <Span variant="secondary" noSelect>
                            {t('components.designate_new_table')}
                        </Span>
                    </Area>
                    <Area marginTop="5%" mx="3">
                        {currentProject.TABLES?.map((table, index) => (
                            <ConfigTableSettingCard
                                key={index}
                                order={table.ORDER}
                                configTable={table}
                                currentBaseDB={currentBaseDB}
                                onSelect={() => setCurrentBaseDB(BaseDB.find(db => db.id === table.ID))}
                            />
                        ))}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ConfigTableSettingPopup;
