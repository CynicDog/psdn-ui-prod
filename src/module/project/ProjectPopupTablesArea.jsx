import Area from "../../component/Area";
import {Col, Row} from "../../component/Grid";
import Span from "../../component/Span";
import {useLanguage} from "../../context/Language";
import InputField from "../../component/InputField";
import TextArea from "../../component/TextArea";
import {useProject} from "../../context/Project";

const ProjectPopupTablesArea = ({ tables }) => {

    const { t } = useLanguage();
    const { lookedUpProject, handleProjectTableDelete, handleTableInputChange } = useProject();

    return (
        <>
            {tables && tables.map((table, index) => (
                <Area key={index} border rounded shadow="sm" p="3" px="5" mb="3">
                    {lookedUpProject.STATUS === "WRITING" && (
                        <Area flex justifyContent="end" my="1">
                            <Span
                                badge="danger" cursor="pointer" noSelect
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleProjectTableDelete(lookedUpProject.ID, table.ID)
                                }}
                            >
                                {t('components.delete')}
                            </Span>
                        </Area>
                    )}

                    {/* Project Table Name */}
                    <Row my="1">
                        <Col width="2" responsive="lg">
                            <Span fontSize="5" fontWeight="lighter">
                                {t('components.project_table_name')}
                            </Span>
                        </Col>
                        <Col width="10" responsive="lg">
                            <InputField
                                value={table.NAME}
                                onChange={(e) => handleTableInputChange(table.ID, "NAME", e.target.value)}
                            />
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
                            <TextArea
                                value={table.DESCRIPTION}
                                height="80px"
                                onChange={(e) => handleTableInputChange(table.ID, "DESCRIPTION", e.target.value)}
                            />
                        </Col>
                    </Row>
                </Area>
            ))}
        </>
    );
};

export default ProjectPopupTablesArea;
