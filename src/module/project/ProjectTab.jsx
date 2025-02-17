import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import {useProject} from "../../context/Project";
import {useState} from "react";

const ProjectTab = ({project, order, width, onSelect, currentProject}) => {

    const {
        sourceProjectDraggable, setSourceProjectDraggable,
        targetProjectDraggable, setTargetProjectDraggable,
        handleMoveProject,
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
            flex justifyContent="center"
            bg={currentProject === project ? "primary-subtle" : ""}
            width={width}
            cursor="pointer"
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
            style={{
                whiteSpace: "nowrap",
                overflow: "hidden"
            }}
        >
            <Span fontWeight="light">
                {project.NAME}
            </Span>
        </DraggableArea>
    )
}

export default ProjectTab