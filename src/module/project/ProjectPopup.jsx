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
import ProjectTablesArea from "./ProjectTablesArea";

const ProjectPopup = () => {

    const {t} = useLanguage();
    const {lookedUpProject} = useProject()
    const {isProjectPopupOpen, setIsProjectPopupOpen} = usePopup();

    if (!isProjectPopupOpen) return null;

    console.log(lookedUpProject)

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
                    <Area p="5">

                        {/* Project Name */}
                        <Row my="1">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_name')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <InputField
                                    value={lookedUpProject.NAME}
                                />
                            </Col>
                        </Row>

                        {/* Project Description */}
                        <Row my="1">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_description')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <TextArea height="150px"/>
                            </Col>
                        </Row>

                        {/* Project Tables */}
                        <Row my="1">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_tables')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <ProjectTablesArea tables={lookedUpProject.TABLES} />
                            </Col>
                        </Row>
                    </Area>

                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    )
}
export default ProjectPopup;