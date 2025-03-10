import Area from "../../component/Area";
import { Col, Row } from "../../component/Grid";
import Span from "../../component/Span";
import { useLanguage } from "../../context/Language";
import InputField from "../../component/InputField";
import TextArea from "../../component/TextArea";
import { useProject } from "../../context/Project";

const ProjectPopupTablesArea = ({ tables }) => {
    const { t } = useLanguage();
    const { lookedUpProject, handleProjectTableDelete, handleTableInputChange } = useProject();

    return (
        <>
            {tables?.map((table) => {
                return (
                    <Area key={table.id} border rounded shadow="sm" p="3" px="5" my="3">
                        {lookedUpProject.status === "WRITING" && (
                            <Area flex justifyContent="end" my="2">
                                <Span
                                    badge="danger"
                                    cursor="pointer"
                                    noSelect
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProjectTableDelete(lookedUpProject.id, table.id);
                                    }}
                                >
                                    {t('components.delete')}
                                </Span>
                            </Area>
                        )}

                        {/* Selected Source Table Name */}
                        <Row my="1">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.source_table')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <Span badge="primary-filled">
                                    {table.name}
                                </Span>
                            </Col>
                        </Row>

                        {/* Project Table Name */}
                        <Row my="1">
                            <Col width="2" responsive="lg">
                                <Span fontSize="5" fontWeight="lighter">
                                    {t('components.project_table_name')}
                                </Span>
                            </Col>
                            <Col width="10" responsive="lg">
                                <InputField
                                    value={table.logicalName}
                                    onChange={(e) => handleTableInputChange(table.id, "logicalName", e.target.value)}
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
                                    value={table.explanation}
                                    height="80px"
                                    onChange={(e) => handleTableInputChange(table.id, "explanation", e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Area>
                );
            })}
        </>
    );
};

export default ProjectPopupTablesArea;
