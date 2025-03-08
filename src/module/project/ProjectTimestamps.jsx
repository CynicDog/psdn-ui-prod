import {Col, Row} from "../../component/Grid";
import Area from "../../component/Area";
import Span from "../../component/Span";
import {useLanguage} from "../../context/Language";

const ProjectTimestamps = ({ project }) => {

    const { t } = useLanguage();

    return (
        <Row>
            {/* Project timestamps */}
            <Col width="12" responsive="lg" p="2" px="4" flex justifyContent="end">
                <Area flex gap="4" fontSize="small">
                    {project.createTimestamp && (
                        <Area flex alignItems="center" gap="1">
                            <Span variant="secondary">
                                {t('components.project_create_at')}
                            </Span>
                            <Span badge="light">
                                {project.createTimestamp.split("T")[0]}
                            </Span>
                        </Area>
                    )}
                    {project.approveTimestamp && (
                        <Area flex alignItems="center" gap="1">
                            <Span variant="secondary">
                                {t('components.project_approve_at')}
                            </Span>
                            <Span badge="light">
                                {project.approveTimestamp.split("T")[0]}
                            </Span>
                        </Area>
                    )}
                    {project.startTimestamp && (
                        <Area flex alignItems="center" gap="1">
                            <Span variant="secondary">
                                {t('components.project_start_at')}
                            </Span>
                            <Span badge="light">
                                {project.startTimestamp.split("T")[0]}
                            </Span>
                        </Area>
                    )}
                    {project.finishTimestamp && (
                        <Area flex alignItems="center" gap="1">
                            <Span variant="secondary">
                                {t('components.project_finish_at')}
                            </Span>
                            <Span badge="light">
                                {project.finishTimestamp.split("T")[0]}
                            </Span>
                        </Area>
                    )}
                </Area>
            </Col>
        </Row>
    );
};

export default ProjectTimestamps