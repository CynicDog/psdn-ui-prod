import Area from "../../component/Area";
import Span from "../../component/Span";
import Tooltip from "../../component/Tooltip";
import Icon from "../../component/Icon";
import {useLanguage} from "../../context/Language";
import {usePopup} from "../../context/Popup";

const ConfigTableEntry = () => {

    const {t} = useLanguage();
    const {setIsConfigTablePopupOpen} = usePopup();

    return (
        <Area>
            <Area flex justifyContent="center" alignItems="center" >
                <Span variant="secondary">
                    {t('messages.request_table_designation')}
                </Span>
                <Span
                    onClick={() => setIsConfigTablePopupOpen(true)}
                    variant="secondary"
                    fontSize="4"
                    p="3"
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
                        <Icon name="database-fill-add"/>
                    </Tooltip>
                </Span>
            </Area>
        </Area>
    )
}
export default ConfigTableEntry;