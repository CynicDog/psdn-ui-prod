import {useEffect, useState} from "react";
import PopupOverlay from "../../component/PopupOverlay";
import PopupContent from "../../component/PopupContent";
import {useLanguage} from "../../context/Language";
import {usePopup} from "../../context/Popup";
import {useProject} from "../../context/Project";
import {useBaseDB} from "../../context/BaseDB";
import {useAuth} from "../../context/Auth";
import Area from "../../component/Area";
import Span from "../../component/Span";
import Button from "../../component/Button";
import PopupHeader from "../../component/PopupHeader";
import PopupBody from "../../component/PopupBody";
import ConfigTableSettingCard from "./ConfigTableSettingCard";

const ConfigTableSettingPopup = () => {
    const {t} = useLanguage();
    const {isConfigTablePopupOpen, setIsConfigTablePopupOpen} = usePopup();
    const {currentProject} = useProject();
    const {BaseDB, setCurrentBaseDB} = useBaseDB();

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

                    {/* Display Tables */}
                    <Area marginTop="5%" mx="3">
                        {currentProject.TABLES?.length > 0 && (
                            <Span variant="secondary" fontWeight="lighter" fontSize="4">
                                {t("components.project_tables")}
                            </Span>
                        )}
                        {currentProject.TABLES?.map((table, index) => (
                            <ConfigTableSettingCard
                                key={index}
                                order={table.ORDER}
                                configTable={table}
                                onSelect={() => {
                                    setCurrentBaseDB(BaseDB.find(db => db.id === table.ID) || null)
                                }}
                            />
                        ))}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ConfigTableSettingPopup;
