import {useState} from "react";
import {Col, Row} from "../../component/Grid";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import Tooltip from "../../component/Tooltip";
import Icon from "../../component/Icon";
import Area from "../../component/Area";
import Button from "../../component/Button";
import {usePopup} from "../../context/Popup";
import {useProject} from "../../context/Project";
import {useLanguage} from "../../context/Language";
import {getProjectStatusBadgeClass} from "../../context/util";

const ProjectCard = ({project, order}) => {

    const {t} = useLanguage();

    const {
        setLookedUpProject,
        currentProject, setCurrentProject,
        sourceProjectDraggable, setSourceProjectDraggable,
        targetProjectDraggable, setTargetProjectDraggable,
        handleMoveProject, handleDeleteProject
    } = useProject();

    const {setIsProjectPopupOpen} = usePopup();

    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);

    const handleDragStart = (e) => {
        setSourceProjectDraggable(order);
        setIsDragging(true);
        e.dataTransfer.setData("text/plain", project.ID);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        const targetOrder = e.currentTarget.getAttribute("data-order");
        setTargetProjectDraggable(Number(targetOrder));

        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };

    const handleDrop = (e) => {
        setIsOver(false);
    };

    const handleDragEnd = (e) => {
        if (sourceProjectDraggable !== targetProjectDraggable && targetProjectDraggable !== null) {
            handleMoveProject(sourceProjectDraggable, targetProjectDraggable);
        }

        // Reset context after drop
        setIsDragging(false);
        setIsOver(false);
        setSourceProjectDraggable(null);
        setTargetProjectDraggable(null);
    };

    return (
        <DraggableArea
            key={order}
            order={order}
            onClick={(e) => {
                e.stopPropagation();

                if (project.status === "APPROVED") {
                    setCurrentProject(project);
                }
            }}
            isDragging={isDragging}
            isOver={isOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            bg={currentProject === project ? "primary-subtle" : "body"}
            border rounded="2" shadow="sm" my="2"
            cursor={project.status !== "APPROVED" ? "not-allowed" : "pointer"}
        >
            <Row>
                <Col width="12" responsive="lg" flex justifyContent="between">
                    {/* Delete button for the projects with WRITING status  */}
                    <Area>
                        <Span
                            key={project.id}
                            badge={getProjectStatusBadgeClass(project.status)}
                            m="2">
                            {project.status}
                        </Span>
                        {project.status === "WRITING" && (
                            <Span badge="danger" cursor="pointer" onClick={() => {
                                handleDeleteProject(project.id);
                                setIsProjectPopupOpen(false);
                            }}>
                                {t('components.delete')}
                            </Span>
                        )}
                    </Area>

                    {/* Project detail popup click icon */}
                    <Area>
                        <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLookedUpProject(project);
                                setIsProjectPopupOpen(true);
                            }}
                        >
                            <Tooltip
                                position="top"
                                content={
                                    <Area>
                                        {t('components.project_detail_title')}
                                    </Area>
                                }
                                bg="body" rounded shadow="sm" p="1" px="2" gap="3"
                            >
                                <Icon name="box-arrow-up-right"/>
                            </Tooltip>
                        </Button>
                    </Area>
                </Col>
            </Row>
            <Row key={project.id} rounded p="3" flex alignItems="center">
                {/* Project name and status */}
                <Col width="3" responsive="lg">
                    <Span fontSize="4" fontWeight="lighter">
                        {project.name}
                    </Span>
                </Col>

                {/* Project explanation */}
                <Col width="5" responsive="lg">
                    {project.status === "WRITING" ? (
                        <Span variant="secondary">
                            {t('components.project_no_explanation')}{' '}(
                            <Tooltip
                                position="top"
                                content={
                                    <Area>
                                        {t('components.project_detail_title')}
                                    </Area>
                                }
                                bg="body" rounded shadow="sm" p="1" px="2" gap="3"
                            >
                                <Icon name="box-arrow-up-right" mx="1" onClick={(e) => {
                                    e.stopPropagation();
                                    setLookedUpProject(project);
                                    setIsProjectPopupOpen(true);
                                }}/>
                            </Tooltip>).
                        </Span>
                    ) : (
                        <Span fontWeight="light">
                            {project.explanation}
                        </Span>
                    )}
                </Col>

                {/* Project's working tables */}
                <Col width="4" responsive="lg">
                    {project.configTables?.map((table) => (
                        <Span key={table.id} badge="primary-filled" mx="1">
                            {table.name}
                        </Span>
                    ))}
                </Col>
            </Row>
            <Row>
                {/* Project timestamps */}
                <Col width="12" responsive="lg" p="2" px="4" flex justifyContent="end">
                    <Area flex gap="3" fontSize="small" >
                        {project.createTimestamp && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_create_at')}
                                </Span>
                                <Span badge="light">
                                    {project.createTimestamp}
                                </Span>
                            </Area>
                        )}
                        {project.approveTimestamp && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_approve_at')}
                                </Span>
                                <Span badge="light">
                                    {project.approveTimestamp}
                                </Span>
                            </Area>
                        )}
                        {project.startTimestamp && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_start_at')}
                                </Span>
                                <Span badge="light">
                                    {project.startTimestamp}
                                </Span>
                            </Area>
                        )}
                        {project.finishTimestamp && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_finish_at')}
                                </Span>
                                <Span badge="light">
                                    {project.finishTimestamp}
                                </Span>
                            </Area>
                        )}
                    </Area>
                </Col>
            </Row>
        </DraggableArea>
    );
};

export default ProjectCard;
