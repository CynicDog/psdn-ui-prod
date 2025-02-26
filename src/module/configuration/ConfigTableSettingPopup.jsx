import {useEffect, useState} from "react";
import PopupOverlay from "../../component/PopupOverlay";
import PopupContent from "../../component/PopupContent";
import {useLanguage} from "../../context/Language";
import {usePopup} from "../../context/Popup";
import {useProject} from "../../context/Project";
import {useBaseDB} from "../../context/BaseDB";
import {useAuth} from "../../context/Auth";
import {fetchUserPermissionGivenTable} from "../../data/APIs";
import Dropdown from "../../component/Dropdown";
import Area from "../../component/Area";
import Span from "../../component/Span";
import Button from "../../component/Button";
import PopupHeader from "../../component/PopupHeader";
import PopupBody from "../../component/PopupBody";
import ConfigTableSettingCard from "./ConfigTableSettingCard";
import Icon from "../../component/Icon";
import {Col, Row} from "../../component/Grid";

const ConfigTableSettingPopup = () => {
    const {t} = useLanguage();
    const {isConfigTablePopupOpen, setIsConfigTablePopupOpen} = usePopup();
    const {auth} = useAuth();
    const {projects, setProjects, currentProject, setCurrentProject} = useProject();
    const {BaseDB, setCurrentBaseDB} = useBaseDB();

    const [availableTables, setAvailableTables] = useState([]);
    const [showSourceTables, setShowSourceTables] = useState(false);

    useEffect(() => {
        fetchUserPermissionGivenTable(auth.username).then((response) => {
            setAvailableTables(response.DATA);
        });
    }, [auth.username]);

    if (!isConfigTablePopupOpen) return null;

    const handleTableImport = (selectedTableId) => {
        if (!currentProject || !selectedTableId) return;

        const selectedTable = availableTables.find(table => table.ID === selectedTableId);
        if (!selectedTable) return;

        const newTable = {
            ID: "CT1", // TODO: Replace with Hibernate UUID
            TABLE_ID: selectedTable.ID,
            NAME: selectedTable.NAME,
            DESCRIPTION: "",
            IMPORTED_AT: new Date(Date.now()).toISOString().split("T")[0], // "YYYY-MM-DD"
            ORDER: 0
        };
        const updatedTables = [newTable, ...(currentProject.TABLES || [])];

        updatedTables.forEach((table, index) => {
            table.ORDER = index;
        });

        const updatedProject = {
            ...currentProject,
            TABLES: updatedTables
        };

        const updatedProjects = projects.data.map((project) =>
            project.ID === currentProject.ID ? updatedProject : project
        );

        setProjects({...projects, data: updatedProjects});
        setCurrentProject(updatedProject);
    };

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

                    {/* Add Table Button */}
                    <Area flex justifyContent="center" alignItems="center" gap="2" cursor="pointer" my="2"
                          onClick={() => {
                              setShowSourceTables(!showSourceTables)
                          }}>
                        <Span variant="secondary" noSelect>
                            {t('components.import_new_table')}
                        </Span>
                        <Icon name={showSourceTables? "folder-check" : "folder-plus"}/>
                    </Area>
                    {showSourceTables && (
                        <Area rounded shadow fontWeight="lighter" m="3" p="3">
                            {availableTables?.map(table => (
                                <Row border rounded mx="3" my="1" p="2">
                                    <Col width="2" responsive="lg">
                                        <Span badge="primary">
                                            {table.NAME}
                                        </Span>
                                    </Col>
                                    <Col width="3" responsive="lg" flex alignItems="center">
                                        {table.DESCRIPTION}
                                    </Col>
                                    <Col width="7" responsive="lg" flex justifyContent="end" alignItems="center">
                                        <Area flex justifyContent="center" gap="3">
                                            <Span>{t("components.source_table_created_at")}:</Span>
                                            <Span badge="light" me="3">{table.CREATED_AT}</Span>
                                            <Span>{t("components.source_table_updated_at")}:</Span>
                                            <Span badge="light" me="3">{table.UPDATED_AT}</Span>
                                            <Span>{t("components.source_table_expire_at")}:</Span>
                                            <Span badge="light" me="3">{table.EXPIRE_AT}</Span>
                                        </Area>
                                        <Area mx="3">
                                            <Button size="sm" variant="light" onClick={() => handleTableImport(table.ID)}>
                                                {t("components.source_table_import")}
                                            </Button>
                                        </Area>
                                    </Col>
                                </Row>
                            ))}
                        </Area>
                    )}
                    {/* Display Added Tables */}
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
