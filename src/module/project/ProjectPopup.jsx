import {useState} from "react";
import {usePopup} from "../../context/Popup";
import PopupContent from "../../component/PopupContent";
import PopupHeader from "../../component/PopupHeader";
import Area from "../../component/Area";
import Span from "../../component/Span";
import Button from "../../component/Button";
import PopupBody from "../../component/PopupBody";
import PopupOverlay from "../../component/PopupOverlay";
import {useProject} from "../../context/Project";
import {useLanguage} from "../../context/Language";
import {Col, Row} from "../../component/Grid";
import InputField from "../../component/InputField";
import TextArea from "../../component/TextArea";
import ProjectPopupTablesArea from "./ProjectPopupTablesArea";
import Icon from "../../component/Icon";
import ProjectTimestamps from "./ProjectTimestamps";
import LoadingSpinner from "../../component/LoadingSpinner";

const ProjectPopup = () => {
    const {t} = useLanguage();
    const {
        lookedUpProject,
        saveLookedUpProject,
        isLookedUpProjectSaving,
        handleProjectTableAdd,
        isProjectTableSaving,
        selectedSourceTables,
        setSelectedSourceTables,
        handleProjectInputChange,
        handleProjectCreateRequest
    } = useProject();
    const {isProjectPopupOpen, setIsProjectPopupOpen} = usePopup();

    // Check if all tables have a selected source table and at least one configTable exists
    const isFormValid = () => {
        return lookedUpProject.startTimestamp &&
            lookedUpProject.configTables.length > 0 &&
            lookedUpProject.configTables.every(table => selectedSourceTables[table.id]);
    };

    if (!isProjectPopupOpen) return null;

    return (
        <PopupOverlay setIsPopupOpen={setIsProjectPopupOpen}>
            <PopupContent>
                <PopupHeader>
                    <Area flex justifyContent="between">
                        <Span fontSize="4" fontWeight="lighter">
                            {t('components.project_detail_title')}
                        </Span>
                        <Area flex alignItems="center" gap="2">
                            {lookedUpProject.status === "WRITING" && (
                                <Button size="sm" variant="light" onClick={() => {
                                    if (!isLookedUpProjectSaving) saveLookedUpProject();
                                    setIsProjectPopupOpen(false);
                                }}>
                                    <Span>
                                        {t('components.save')}
                                    </Span>
                                </Button>
                            )}
                            <Button size="sm" variant="light" onClick={() => {
                                setIsProjectPopupOpen(false);
                            }}>
                                <Span>
                                    {t('components.close')}
                                </Span>
                            </Button>
                        </Area>
                    </Area>
                </PopupHeader>
                <PopupBody>
                    <Area border rounded shadow="sm" p="5" m="3">
                        {/* Project Timestamps */}
                        <ProjectTimestamps project={lookedUpProject}/>

                        {/* Project Name */}
                        <Row my="3">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_name')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <InputField
                                    value={lookedUpProject.name}
                                    onChange={(e) => handleProjectInputChange("name", e.target.value)}
                                />
                            </Col>
                        </Row>

                        {/* Project Explanation */}
                        <Row my="3">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_explanation')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <TextArea
                                    value={lookedUpProject.explanation}
                                    height="150px"
                                    onChange={(e) => handleProjectInputChange("explanation", e.target.value)}
                                />
                            </Col>
                        </Row>

                        {/* Project Start At */}
                        {lookedUpProject.status === "WRITING" && (
                            <Row my="3">
                                <Col width="2" responsive="lg">
                                    <Area flex alignItems="center" gap="2">
                                        <Span fontSize="5" fontWeight="lighter">
                                            {t('components.project_start_at')}
                                        </Span>
                                    </Area>
                                </Col>
                                <Col width="10" responsive="lg">
                                    <InputField
                                        type="date"
                                        value={lookedUpProject.startTimestamp}
                                        onChange={(e) => handleProjectInputChange("startTimestamp", e.target.value)}
                                    />
                                </Col>
                            </Row>
                        )}

                        {/* Project Tables */}
                        <Row my="3">
                            <Col width="2" responsive="lg">
                                <Area flex alignItems="center" gap="2">
                                    <Span fontSize="5" fontWeight="lighter">
                                        {t('components.project_tables')}
                                    </Span>
                                    {lookedUpProject.status === "WRITING" && (
                                        <Span variant="secondary" fontSize="4"
                                              onClick={() => !isProjectTableSaving && handleProjectTableAdd(lookedUpProject.id)}>
                                            <Icon name="database-fill-add"/>
                                        </Span>
                                    )}
                                </Area>
                            </Col>
                            <Col width="10" responsive="lg">
                                <ProjectPopupTablesArea
                                    tables={lookedUpProject.configTables}
                                    selectedSourceTables={selectedSourceTables}
                                    setSelectedSourceTables={setSelectedSourceTables}
                                />
                            </Col>
                        </Row>

                        {/* Submit Button with Validation */}
                        {lookedUpProject.status === "WRITING" && (
                            <Area flex justifyContent="end" mt="4">
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => {
                                        handleProjectCreateRequest();
                                        setIsProjectPopupOpen(false);
                                    }}
                                    disabled={!isFormValid()}
                                >
                                    {t('components.request_project_creation')}
                                </Button>
                            </Area>
                        )}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};
export default ProjectPopup;
