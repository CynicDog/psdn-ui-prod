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

const ConfigTableSettingPopup = () => {
    const {t} = useLanguage();
    const {isConfigTablePopupOpen, setIsConfigTablePopupOpen} = usePopup();
    const {auth} = useAuth();
    const {projects, setProjects, currentProject, setCurrentProject} = useProject();
    const {BaseDB, setCurrentBaseDB} = useBaseDB();

    const [availableTables, setAvailableTables] = useState([]);

    useEffect(() => {
        fetchUserPermissionGivenTable(auth.username).then((response) => {
            setAvailableTables(response.DATA);
        });
    }, [auth.username]);

    if (!isConfigTablePopupOpen) return null;

    const handleTableSelect = (selectedTableId) => {
        if (!currentProject || !selectedTableId) return;

        const selectedTable = availableTables.find(table => table.ID === selectedTableId);
        if (!selectedTable) return;

        const newTable = {
            ID: selectedTable.ID,
            NAME: selectedTable.NAME,
            DESCRIPTION: "",
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
                    <Area flex justifyContent="center" alignItems="center" gap="2" cursor="pointer" my="2">
                        {/* Button to toggle dropdown */}
                        <Span variant="secondary" noSelect>
                            {t('components.designate_new_table')}
                        </Span>

                        {/* Dropdown appears when button is clicked */}
                        <Dropdown
                            id="table-dropdown"
                            options={[
                                {value: "", label: t("components.select_table")},
                                ...availableTables.map(table => ({
                                    value: table.ID,
                                    label: table.NAME
                                }))
                            ]}
                            onChange={(e) => handleTableSelect(e.target.value)}
                            width="auto"
                        />
                    </Area>

                    {/* Display Added Tables */}
                    <Area marginTop="5%" mx="3">
                        {currentProject.TABLES?.map((table, index) => (
                            <ConfigTableSettingCard
                                key={index}
                                order={table.ORDER}
                                configTable={table}
                                currentBaseDB={BaseDB}
                                onSelect={() => setCurrentBaseDB(BaseDB.find(db => db.id === table.ID) || null)}
                            />
                        ))}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ConfigTableSettingPopup;
