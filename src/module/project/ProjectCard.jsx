import { Col, Row } from "../../component/Grid";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import {useState} from "react";
import { useProject } from "../../context/Project";
import Icon from "../../component/Icon";
import InputField from "../../component/InputField";
import {useLanguage} from "../../context/Language";
import Tooltip from "../../component/Tooltip";
import {PROJECT_COLORS} from "../../context/util";
import Area from "../../component/Area";

const ProjectCard = ({ project, order, onSelect, currentProject }) => {
    const { t } = useLanguage();
    const {
        sourceProjectDraggable, setSourceProjectDraggable,
        targetProjectDraggable, setTargetProjectDraggable,
        handleMoveProject,
        setProjects
    } = useProject();
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(project.NAME);
    const [editedDescription, setEditedDescription] = useState(project.DESCRIPTION);

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

    const handleSave = () => {
        setProjects((prevProjects) => {
            const updatedProjects = prevProjects.data.map((p) =>
                p.ID === project.ID ? { ...p, NAME: editedName, DESCRIPTION: editedDescription } : p
            );

            // Preserve the selected project after the update
            const updatedProject = updatedProjects.find((p) => p.ID === project.ID);
            onSelect(updatedProject);

            return { ...prevProjects, data: updatedProjects };
        });
        setIsEditing(false);
    };

    return (
        <DraggableArea
            order={order}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
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
        >
            <Row key={project.ID} rounded p="3" m="3" flex alignItems="center">
                {/* Project name */}
                <Col width="3" responsive="lg" my="1">
                    {isEditing ? (
                        <InputField
                            id={`name-${project.ID}`}
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    ) : (
                        <Area flex justifyContent="start" alignItems="center" gap="1">
                            <Span badge="secondary-filled" fontWeight="light">
                                {project.NAME}
                            </Span>
                        </Area>
                    )}
                </Col>

                {/* Project description */}
                <Col width="4" responsive="lg" my="1">
                    {isEditing ? (
                        <InputField
                            id={`desc-${project.ID}`}
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                    ) : (
                        <Span m="1">
                            {project.DESCRIPTION || t('components.project_no_description')}
                        </Span>
                    )}
                </Col>

                {/* Project's working tables */}
                <Col width="4" responsive="lg" my="1">
                    {project.TABLES?.map((table) => (
                        <Span key={table.ID} badge="primary-filled" mx="1">
                            {table.NAME}
                        </Span>
                    ))}
                </Col>

                {/* Edit button */}
                <Col width="1" responsive="lg" flex justifyContent="end" my="1">
                    <Icon
                        name={isEditing ? "check-lg" : "pencil-fill"}
                        onClick={(e) => {
                            e.stopPropagation();
                            isEditing ? handleSave() : setIsEditing(true);
                        }}
                        variant="secondary"
                    />
                </Col>

            </Row>
        </DraggableArea>
    );
};

export default ProjectCard;
