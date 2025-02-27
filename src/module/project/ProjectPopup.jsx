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
import Tooltip from "../../component/Tooltip";

const ProjectPopup = () => {

    const {t} = useLanguage();
    const {lookedUpProject, handleDeleteProject, handleProjectTableAdd, handleProjectInputChange, handleProjectCreateRequest } = useProject()
    const {isProjectPopupOpen, setIsProjectPopupOpen} = usePopup();

    if (!isProjectPopupOpen) return null;

    return (
        <PopupOverlay setIsPopupOpen={setIsProjectPopupOpen}>
            <PopupContent>
                <PopupHeader>
                    <Area>
                        <Area flex justifyContent="between">
                            <Span fontSize="4" fontWeight="lighter">
                                {t('components.project_detail_title')}
                            </Span>
                            <Button size="sm" variant="light" onClick={() => setIsProjectPopupOpen(false)}>
                                {t('components.close')}
                            </Button>
                        </Area>
                    </Area>
                </PopupHeader>
                <PopupBody>
                    <Area border rounded shadow="sm" p="5" m="3">

                        {/* Project Name */}
                        <Row my="3">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_name')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <InputField
                                    value={lookedUpProject.NAME}
                                    onChange={(e) => handleProjectInputChange("NAME", e.target.value)}
                                />
                            </Col>
                        </Row>

                        {/* Project Description */}
                        <Row my="3">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_description')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <TextArea
                                    value={lookedUpProject.DESCRIPTION}
                                    height="150px"
                                    onChange={(e) => handleProjectInputChange("DESCRIPTION", e.target.value)}
                                />
                            </Col>
                        </Row>

                        {/* Project Tables */}
                        <Row my="3">
                            <Col width="2" responsive="lg">
                                <Area flex alignItems="center" gap="2">
                                    <Span fontSize="5" fontWeight="lighter">
                                        {t('components.project_tables')}
                                    </Span>
                                    {lookedUpProject.STATUS === "WRITING" && (
                                        <Tooltip
                                            position="top"
                                            content={
                                                <Span noSelect>
                                                    {t('components.add_project_table')}
                                                </Span>
                                            }
                                            bg="body" rounded shadow="sm" p="1" px="2" gap="3"
                                        >
                                            <Span variant="secondary" fontSize="4"
                                                  onClick={() => handleProjectTableAdd(lookedUpProject.ID)}>
                                                <Icon name="database-fill-add"/>
                                            </Span>
                                        </Tooltip>
                                    )}
                                </Area>
                            </Col>
                            <Col width="10" responsive="lg">
                                <ProjectPopupTablesArea tables={lookedUpProject.TABLES}/>
                            </Col>
                        </Row>
                        {lookedUpProject.STATUS === "WRITING" && (
                            <Area flex justifyContent="end" mt="4">
                                <Span badge="primary" cursor="pointer" fontSize="6" onClick={() => {
                                    handleProjectCreateRequest();
                                    setIsProjectPopupOpen(false);
                                }}>
                                    {t('components.request_project_creation')}
                                </Span>
                            </Area>
                        )}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    )
}
export default ProjectPopup;