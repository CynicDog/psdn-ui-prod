import Area from "../../component/Area";
import Span from "../../component/Span";
import {Col, Row} from "../../component/Grid";
import {useLanguage} from "../../context/Language";

const ProjectLists = ({ projects, currentProject, onSelect }) => {

    const { t } = useLanguage();

    return (
        <Area>
            {projects?.data?.map((project) => (
                <Row
                    key={project.ID}
                    onClick={() => onSelect(project)}
                    bg={currentProject === project ? "primary-subtle" : ""}
                    rounded p="3" m="5"
                >
                    <Col width="2" responsive="lg">
                        <Span badge="secondary-filled" fontSize="6" fontWeight="light">
                            {project.NAME}
                        </Span>
                    </Col>

                    <Col width="6" responsive="lg">
                        <Span m="1">
                            Project Description..
                        </Span>
                    </Col>

                    <Col width="4" responsive="lg">
                        {project.TABLES?.map((table) => (
                            <Span badge="primary-filled" mx="1">{table.NAME}</Span>
                        ))}
                    </Col>
                </Row>
            ))}
        </Area>
    );
};

export default ProjectLists;
