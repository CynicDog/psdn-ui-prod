import {useBaseDB} from "../../context/BaseDB";
import Area from "../../component/Area";
import {useProject} from "../../context/Project";
import LoadingSpinner from "../../component/LoadingSpinner";
import ConfigTableTab from "./ConfigTableTab";
import Icon from "../../component/Icon";
import {usePopup} from "../../context/Popup";
import Tooltip from "../../component/Tooltip";
import {useLanguage} from "../../context/Language";
import Span from "../../component/Span";

const ConfigTableTabArea = () => {

    const { t } = useLanguage();
    const { setIsProjectTablePopupOpen } = usePopup();
    const {currentProject, isProjectLoading} = useProject();
    const {BaseDB, currentBaseDB, setCurrentBaseDB} = useBaseDB();


    if (isProjectLoading) {
        return <LoadingSpinner/>
    }
    if (currentProject?.TABLES.length === 0) {
        return;
    }

    return (
        <Area flex borderBottom width="100%">
            {currentProject.TABLES.map((table, index) => (
                <ConfigTableTab
                    key={index}
                    order={table.ORDER}
                    configTable={table}
                    currentBaseDB={currentBaseDB}
                    onSelect={() => setCurrentBaseDB(BaseDB.find(db => db.id === table.ID))}
                />
            ))}

            <Area
                onClick={() => setIsProjectTablePopupOpen(true)}
                cursor="pointer" mx="3"
            >
                <Tooltip
                    position="top"
                    content={
                        <Area>
                            {t('components.configure_project_tables')}
                        </Area>
                    }
                    bg="body" rounded shadow="sm" p="1" px="2" gap="3"
                >
                    <Span variant="secondary" fontSize="6">
                        <Icon name="database-fill-add" />
                    </Span>
                </Tooltip>
            </Area>
        </Area>
    );
};

export default ConfigTableTabArea;
