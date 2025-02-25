import {useState} from "react";
import DraggableArea from "../../component/DraggableArea";
import {useProject} from "../../context/Project";

const ConfigTableTab = ({ order, configTable, currentBaseDB, onSelect }) => {

    const {
        currentProject,
        sourceProjectTableDraggable, setSourceProjectTableDraggable,
        targetProjectTableDraggable, setTargetProjectTableDraggable,
        handleMoveProjectTable
    } = useProject();

    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);

    const handleDragStart = (e) => {
        setSourceProjectTableDraggable(order);
        setIsDragging(true);
        e.dataTransfer.setData("text/plain", configTable.ID);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        const targetOrder = e.currentTarget.getAttribute("data-order");
        setTargetProjectTableDraggable(Number(targetOrder));

        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };

    const handleDrop = (e) => {
        setIsOver(false);
    };

    const handleDragEnd = (e) => {
        if (sourceProjectTableDraggable !== targetProjectTableDraggable && targetProjectTableDraggable !== null) {
            handleMoveProjectTable(currentProject.ID, sourceProjectTableDraggable, targetProjectTableDraggable);
        }

        // Reset context after drop
        setIsDragging(false);
        setIsOver(false);
        setSourceProjectTableDraggable(null);
        setTargetProjectTableDraggable(null);
    };

    return (
        <DraggableArea
            order={order}
            flex justifyContent="center"
            bg={currentBaseDB?.name === configTable.NAME ? "primary-subtle" : "body"}
            cursor="pointer"
            onClick={(e) => {
                e.stopPropagation();
                onSelect(configTable);
            }}
            isDragging={isDragging}
            isOver={isOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            px="3"
            style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                borderRadius: "5px 5px 0 0"
            }}
        >
            {configTable.NAME}
        </DraggableArea>
    );
}
export default ConfigTableTab;