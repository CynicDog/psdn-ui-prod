import Area from "../../component/Area";
import { Col, Row } from "../../component/Grid";
import Span from "../../component/Span";
import { useLanguage } from "../../context/Language";
import InputField from "../../component/InputField";
import TextArea from "../../component/TextArea";
import { useProject } from "../../context/Project";
import { useQuery } from "react-query";
import { useAuth } from "../../context/Auth";
import { getMetaSourceTables } from "../../data/APIs";
import LoadingSpinner from "../../component/LoadingSpinner";

const ProjectPopupTablesArea = ({ tables, selectedSourceTables, setSelectedSourceTables }) => {
    const { t } = useLanguage();
    const { auth } = useAuth();
    const { lookedUpProject, handleProjectTableDelete, handleTableInputChange } = useProject();

    const { data: sourceTables, isLoading: isSourceTableLoading } = useQuery(
        ["sourceTables", lookedUpProject.id],
        () => getMetaSourceTables(auth),
        { enabled: !!auth.token }
    );

    const handleSourceTableSelect = (projectTableId, sourceTable) => {
        if (lookedUpProject.status === "WRITING") {
            setSelectedSourceTables(prev => ({
                ...prev,
                [projectTableId]: sourceTable
            }));
        }
    };

    return (
        <>
            {tables?.map((table) => {
                const selectedSourceTable = selectedSourceTables[table.id] || null;

                return (
                    <Area key={table.id} rounded="4" shadow p="3" px="5" mb="5">
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

                        {/* Source Table Selection */}
                        {isSourceTableLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <Row my="1">
                                <Col width="2" responsive="lg">
                                    <Span fontSize="5" fontWeight="lighter">
                                        {t('components.source_table')}
                                    </Span>
                                </Col>
                                <Col width="10" responsive="lg">
                                    {lookedUpProject.status === "WRITING" ? (
                                        <Area border rounded p="3" mb="2">
                                            {sourceTables?.item.map(sourceTable => (
                                                <Area
                                                    key={sourceTable.id}
                                                    onClick={() => handleSourceTableSelect(table.id, sourceTable)}
                                                    bg={selectedSourceTable?.id === sourceTable.id ? "primary-subtle" : "body"}
                                                    border rounded="2" shadow="sm" my="2" p="2" cursor="pointer"
                                                >
                                                    <Row>
                                                        <Col width="4" responsive="lg" flex alignItems="center">
                                                            <Span badge={selectedSourceTable?.id === sourceTable.id ? "primary-filled" : "secondary"}>
                                                                {sourceTable.name}
                                                            </Span>
                                                        </Col>
                                                        <Col width="4" responsive="lg" flex justifyContent="end" alignItems="center" gap="2">
                                                            <Span fontWeight="lighter">
                                                                {t('components.source_table_create_at')}
                                                            </Span>
                                                            <Span badge="light">
                                                                {sourceTable?.inputTimestamp?.split("T")[0]}
                                                            </Span>
                                                        </Col>
                                                        <Col width="4" responsive="lg" flex justifyContent="end" alignItems="center" gap="2">
                                                            <Span fontWeight="lighter">
                                                                {t('components.source_table_update_at')}
                                                            </Span>
                                                            <Span badge="light">
                                                                {sourceTable?.updateTimestamp?.split("T")[0]}
                                                            </Span>
                                                        </Col>
                                                    </Row>
                                                </Area>
                                            ))}
                                        </Area>
                                    ) : (
                                        <Span badge="primary-filled">
                                            {table.name}
                                        </Span>
                                    )}
                                </Col>
                            </Row>
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
