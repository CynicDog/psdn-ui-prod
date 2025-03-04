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
            order={order}
            onClick={(e) => {
                e.stopPropagation();

                if (project.STATUS === "APPROVED") {
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
            cursor={project.STATUS !== "APPROVED" ? "not-allowed" : "pointer"}
        >
            <Row>
                <Col width="12" responsive="lg" flex justifyContent="between">
                    <Area>
                        <Span
                            key={project.ID}
                            badge={getProjectStatusBadgeClass(project.STATUS)}
                            m="2">
                            {project.STATUS}
                        </Span>
                        {project.STATUS === "WRITING" && (
                            <Span badge="danger" cursor="pointer" onClick={() => {
                                handleDeleteProject(project.ID);
                                setIsProjectPopupOpen(false);
                            }}>
                                {t('components.delete')}
                            </Span>
                        )}
                    </Area>
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
            <Row key={project.ID} rounded p="3" flex alignItems="center">
                {/* Project name and status */}
                <Col width="3" responsive="lg">
                    {/*<Area>*/}
                    <Span fontSize="4" fontWeight="lighter">
                        {project.NAME}
                    </Span>
                    {/*</Area>*/}
                </Col>

                {/* Project description */}
                <Col width="5" responsive="lg">
                    {project.STATUS === "WRITING" ? (
                        <Span variant="secondary">
                            {t('components.project_no_description')}{' '}(
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
                            {project.DESCRIPTION}
                        </Span>
                    )}
                </Col>

                {/* Project's working tables */}
                <Col width="4" responsive="lg">
                    {project.TABLES?.map((table) => (
                        <Span key={table.ID} badge="primary-filled" mx="1">
                            {table.NAME}
                        </Span>
                    ))}
                </Col>
            </Row>
            <Row>
                {/* Project timestamps */}
                <Col width="12" responsive="lg" p="2" px="4" flex justifyContent="end">
                    <Area flex gap="3" fontSize="small" >
                        {project.CREATE_AT && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_create_at')}
                                </Span>
                                <Span badge="light">
                                    {project.CREATE_AT}
                                </Span>
                            </Area>
                        )}
                        {project.APPROVE_AT && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_approve_at')}
                                </Span>
                                <Span badge="light">
                                    {project.APPROVE_AT}
                                </Span>
                            </Area>
                        )}
                        {project.START_AT && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_start_at')}
                                </Span>
                                <Span badge="light">
                                    {project.START_AT}
                                </Span>
                            </Area>
                        )}
                        {project.FINISH_AT && (
                            <Area flex alignItems="center" gap="1">
                                <Span>
                                    {t('components.project_finish_at')}
                                </Span>
                                <Span badge="light">
                                    {project.FINISH_AT}
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
