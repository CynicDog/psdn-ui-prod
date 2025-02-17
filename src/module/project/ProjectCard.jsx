import { Col, Row } from "../../component/Grid";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import {useState} from "react";
import {useProject} from "../../context/Project";

const ProjectCard = ({ project, order, onSelect, currentProject }) => {

    const {
        sourceProjectDraggable, setSourceProjectDraggable,
        targetProjectDraggable, setTargetProjectDraggable,
        handleMoveProject
    } = useProject();
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
            handleMoveProject(project.ID, sourceProjectDraggable, project.ID, targetProjectDraggable);
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
            bg={currentProject === project ? "primary-subtle" : ""}
            border rounded="2" shadow="sm" my="2"
            onClick={(e) => {
                e.stopPropagation();
                onSelect(project)
            }}
            isDragging={isDragging}
            isOver={isOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Row key={project.ID} rounded p="3" m="3">
                <Col width="2" responsive="lg">
                    <Span badge="secondary-filled" fontWeight="light">
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
                        <Span key={table.ID} badge="primary-filled" mx="1">{table.NAME}</Span>
                    ))}
                </Col>
            </Row>
        </DraggableArea>
    );
};

export default ProjectCard;
