import {Col, Row} from "../../component/Grid";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import {useState} from "react";
import {useProject} from "../../context/Project";
import Icon from "../../component/Icon";
import InputField from "../../component/InputField";
import {useLanguage} from "../../context/Language";
import Tooltip from "../../component/Tooltip";
import {PROJECT_COLORS} from "../../context/util";
import Area from "../../component/Area";
import TextArea from "../../component/TextArea";
import Button from "../../component/Button";
import {usePopup} from "../../context/Popup";

const ProjectCard = ({project, order}) => {

    const {t} = useLanguage();

    const {
        setProjects, setLookedUpProject,
        currentProject, setCurrentProject,
        sourceProjectDraggable, setSourceProjectDraggable,
        targetProjectDraggable, setTargetProjectDraggable,
        handleMoveProject,
    } = useProject();

    const {setIsProjectPopupOpen} = usePopup();

    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);
    // const [editedName, setEditedName] = useState(project.NAME);
    // const [editedDescription, setEditedDescription] = useState(project.DESCRIPTION);

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

    // const handleSave = () => {
    //     setProjects((prevProjects) => {
    //         const updatedProjects = prevProjects.data.map((p) =>
    //             p.ID === project.ID ? { ...p, NAME: editedName, DESCRIPTION: editedDescription } : p
    //         );
    //
    //         // Preserve the selected project after the update
    //         const updatedProject = updatedProjects.find((p) => p.ID === project.ID);
    //         onSelect(updatedProject);
    //
    //         return { ...prevProjects, data: updatedProjects };
    //     });
    //     setIsEditing(false);
    // };

    const getBadgeClass = (status) => {
        switch (status) {
            case "APPROVED":
                return "primary";
            case "WRITING":
                return "warning";
            default:
                return "secondary";
        }
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
                <Col width="12" responsive="lg" my="1" flex justifyContent="between">
                    <Area >
                        <Span
                            key={project.ID}
                            badge={getBadgeClass(project.STATUS)}
                            mx="2">
                            {project.STATUS}
                        </Span>
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
            <Row key={project.ID} rounded p="3" >
                {/* Project name and status */}
                <Col width="4" responsive="lg" >
                    {/*<Area>*/}
                    <Span fontSize="4" fontWeight="lighter" underline>
                        {project.NAME}
                    </Span>
                    {/*</Area>*/}
                </Col>

                {/* Project description */}
                <Col width="4" responsive="lg">
                    {project.DESCRIPTION ? (
                        project.DESCRIPTION
                    ) : (
                        <>
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
                        </>
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
                    <Area flex gap="2">
                        {project.CREATED_AT && (
                            <Area>
                                <Tooltip
                                    position="top"
                                    content={
                                        <Area>
                                            {t('components.project_created_at')}
                                        </Area>
                                    }
                                    bg="body" rounded shadow="sm" px="2" gap="3"
                                >
                                    <Span badge="light">{project.CREATED_AT}</Span>
                                </Tooltip>
                            </Area>
                        )}
                        {project.UPDATED_AT && (
                            <Area>
                                <Tooltip
                                    position="top"
                                    content={
                                        <Area>
                                            {t('components.project_approved_at')}
                                        </Area>
                                    }
                                    bg="body" rounded shadow="sm" px="2" gap="3"
                                >
                                    <Span badge="primary">{project.UPDATED_AT}</Span>
                                </Tooltip>
                            </Area>
                        )}
                    </Area>
                </Col>
            </Row>
        </DraggableArea>
    );
};

export default ProjectCard;
