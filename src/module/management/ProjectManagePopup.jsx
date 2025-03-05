import {usePopup} from "../../context/Popup";
import PopupContent from "../../component/PopupContent";
import PopupHeader from "../../component/PopupHeader";
import Area from "../../component/Area";
import Button from "../../component/Button";
import PopupBody from "../../component/PopupBody";
import Span from "../../component/Span";
import {useLanguage} from "../../context/Language";
import PopupOverlay from "../../component/PopupOverlay";
import {useProject} from "../../context/Project";
import {Col, Row} from "../../component/Grid";

const ProjectManagePopup = ({ setManageProjects }) => {

    const {t} = useLanguage();

    const {isProjectManagePopupOpen, setIsProjectManagePopupOpen} = usePopup();
    const {lookedUpProject, setLookedUpProject} = useProject();

    const handleApproveProject = async () => {
        if (lookedUpProject.STATUS !== "PENDING") return;

        const approvedDate = new Date().toISOString().split("T")[0];

        // Update lookedUpProject state
        setLookedUpProject((prevProject) => ({
            ...prevProject,
            STATUS: "APPROVED",
            APPROVE_AT: approvedDate,
        }));

        // Update manageProjects state
        setManageProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.ID === lookedUpProject.ID
                    ? {...project, STATUS: "APPROVED", APPROVE_AT: approvedDate}
                    : project
            )
        );

        setIsProjectManagePopupOpen(false);
    }

    if (!isProjectManagePopupOpen) return null;

    return (
        <PopupOverlay setIsPopupOpen={setIsProjectManagePopupOpen}>
            <PopupContent>
                <PopupHeader>
                    <Area>
                        <Area flex justifyContent="between">
                            <Span fontSize="4" fontWeight="lighter">
                                {t('components.project_detail_title')}
                            </Span>
                            <Button size="sm" variant="light" onClick={() => setIsProjectManagePopupOpen(false)}>
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
                                <Span>
                                    {lookedUpProject.NAME}
                                </Span>
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
                                <Span>
                                    {lookedUpProject.DESCRIPTION}
                                </Span>
                            </Col>
                        </Row>

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
                                {lookedUpProject.TABLES.map((table, index) => (
                                    <Area key={index} border rounded shadow="sm" p="3" px="5" mb="3">
                                        {/* Project Table Name */}
                                        <Row my="1">
                                            <Col width="2" responsive="lg">
                                                <Span fontSize="5" fontWeight="lighter">
                                                    {t('components.project_table_name')}
                                                </Span>
                                            </Col>
                                            <Col width="10" responsive="lg">
                                                <Span>
                                                    {table.NAME}
                                                </Span>
                                            </Col>
                                        </Row>

                                        {/* Project Table Description */}
                                        <Row my="1">
                                            <Col width="2" responsive="lg">
                                                <Span fontSize="5" fontWeight="lighter">
                                                    {t('components.project_table_purpose_of_use')}
                                                </Span>
                                            </Col>
                                            <Col width="10" responsive="lg">
                                                <Span>
                                                    {table.DESCRIPTION}
                                                </Span>
                                            </Col>
                                        </Row>
                                    </Area>
                                ))}
                            </Col>
                        </Row>
                        {lookedUpProject.CREATE_AT && (
                            <Row my="3">
                                <Col width="2" responsive="lg">
                                    <Area flex alignItems="center" gap="2">
                                        <Span fontSize="5" fontWeight="lighter">
                                            {t('components.project_create_at')}
                                        </Span>
                                    </Area>
                                </Col>
                                <Col width="10" responsive="lg">
                                    <Span>
                                        {lookedUpProject.CREATE_AT}
                                    </Span>
                                </Col>
                            </Row>
                        )}
                        {lookedUpProject.APPROVE_AT && (
                            <Row my="3">
                                <Col width="2" responsive="lg">
                                    <Area flex alignItems="center" gap="2">
                                        <Span fontSize="5" fontWeight="lighter">
                                            {t('components.project_approve_at')}
                                        </Span>
                                    </Area>
                                </Col>
                                <Col width="10" responsive="lg">
                                    <Span>
                                        {lookedUpProject.APPROVE_AT}
                                    </Span>
                                </Col>
                            </Row>
                        )}
                        {lookedUpProject.START_AT && (
                            <Row my="3">
                                <Col width="2" responsive="lg">
                                    <Area flex alignItems="center" gap="2">
                                        <Span fontSize="5" fontWeight="lighter">
                                            {t('components.project_start_at')}
                                        </Span>
                                    </Area>
                                </Col>
                                <Col width="10" responsive="lg">
                                    <Span>
                                        {lookedUpProject.START_AT}
                                    </Span>
                                </Col>
                            </Row>
                        )}
                        {lookedUpProject.FINISH_AT && (
                            <Row my="3">
                                <Col width="2" responsive="lg">
                                    <Area flex alignItems="center" gap="2">
                                        <Span fontSize="5" fontWeight="lighter">
                                            {t('components.project_finish_at')}
                                        </Span>
                                    </Area>
                                </Col>
                                <Col width="10" responsive="lg">
                                    <Span>
                                        {lookedUpProject.FINISH_AT}
                                    </Span>
                                </Col>
                            </Row>
                        )}
                        {lookedUpProject.STATUS === "PENDING" && (
                            <Area flex justifyContent="end">
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={handleApproveProject}
                                >
                                    {t('components.approve_project')}
                                </Button>
                            </Area>
                        )}
                    </Area>
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    )
}
export default ProjectManagePopup;