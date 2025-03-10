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
import ProjectTimestamps from "./ProjectTimestamps";
import {useQuery} from "react-query";
import {useAuth} from "../../context/Auth";
import {getMetaSourceTables} from "../../data/APIs";

const ProjectPopup = () => {
    const {t} = useLanguage();
    const {auth} = useAuth();
    const {
        lookedUpProject,
        saveLookedUpProject,
        isLookedUpProjectSaving,
        handleProjectTableAdd,
        isProjectTableSaving,
        handleProjectInputChange,
        handleProjectCreateRequest
    } = useProject();
    const {isProjectPopupOpen, setIsProjectPopupOpen} = usePopup();

    // Check if all tables have a selected source table and at least one configTable exists
    const isFormValid = () => {
        return lookedUpProject.startTimestamp &&
            lookedUpProject.finishTimestamp &&
            lookedUpProject.configTables.length > 0
    };

    const {data: sourceTables, isLoading: isSourceTableLoading} = useQuery(
        ["sourceTables", lookedUpProject.id],
        () => getMetaSourceTables(auth),
        {enabled: !!auth.token}
    );

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
                            {/* Project Request Submit Button with Validation */}
                            {lookedUpProject.status === "WRITING" && (
                                <Button size="sm" variant="primary" onClick={() => {
                                        handleProjectCreateRequest();
                                        setIsProjectPopupOpen(false);
                                    }}
                                    disabled={!isFormValid()}
                                >
                                    {t('components.request_project_creation')}
                                </Button>
                            )}

                            {/* Project Details Save Button */}
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

                            {/* Project Details Popup Close Button */}
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
                                        type="datetime-local"
                                        value={lookedUpProject.startTimestamp}
                                        onChange={(e) => handleProjectInputChange("startTimestamp", e.target.value)}
                                    />
                                </Col>
                            </Row>
                        )}

                        {/* Project Finish At */}
                        {lookedUpProject.status === "WRITING" && (
                            <Row my="3">
                                <Col width="2" responsive="lg">
                                    <Area flex alignItems="center" gap="2">
                                        <Span fontSize="5" fontWeight="lighter">
                                            {t('components.project_finish_at')}
                                        </Span>
                                    </Area>
                                </Col>
                                <Col width="10" responsive="lg">
                                    <InputField
                                        type="datetime-local"
                                        value={lookedUpProject.finishTimestamp}
                                        onChange={(e) => handleProjectInputChange("finishTimestamp", e.target.value)}
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
                                </Area>
                            </Col>
                            <Col width="10" responsive="lg">
                                <Area border rounded p="3">
                                    {lookedUpProject.status === "WRITING" && (
                                        <Area rounded="4" shadow p="3" mb="2">
                                            <Span variant="secondary" fontSize="5" fontWeight="lighter">
                                                {t('components.source_table_list')}
                                            </Span>
                                            {sourceTables?.item.map(sourceTable => (
                                                <Area key={sourceTable.id} border rounded="2" shadow="sm" my="2" p="2">
                                                    <Row>
                                                        <Col width="4" responsive="lg" flex alignItems="center">
                                                            <Span badge="secondary-filled">
                                                                {sourceTable.name}
                                                            </Span>
                                                        </Col>
                                                        <Col width="6" responsive="lg" flex justifyContent="end"
                                                             alignItems="center" gap="2">
                                                            <Span fontWeight="lighter">
                                                                {t('components.source_table_create_at')}
                                                            </Span>
                                                            <Span badge="light">
                                                                {sourceTable?.inputTimestamp?.split("T")[0]}
                                                            </Span>
                                                            <Span fontWeight="lighter">
                                                                {t('components.source_table_update_at')}
                                                            </Span>
                                                            <Span badge="light">
                                                                {sourceTable?.updateTimestamp?.split("T")[0]}
                                                            </Span>
                                                        </Col>
                                                        <Col width="2" responsive="lg" flex justifyContent="end">
                                                            <Span variant="secondary" fontSize="4"
                                                                  onClick={() => !isProjectTableSaving && handleProjectTableAdd(lookedUpProject.id, sourceTable)}>
                                                                <Button size="sm" variant="light">
                                                                    {t('components.source_table_add')}
                                                                </Button>
                                                            </Span>
                                                        </Col>
                                                    </Row>
                                                </Area>
                                            ))}
                                        </Area>
                                    )}
                                    <ProjectPopupTablesArea tables={lookedUpProject.configTables} />
                                </Area>
                            </Col>
                        </Row>
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};
export default ProjectPopup;
