import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import {useProject} from "../../context/Project";
import {useState} from "react";
import {Col, Row} from "../../component/Grid";
import Area from "../../component/Area";

const ConfigTableSettingCard = ({order, configTable, currentBaseDB, onSelect}) => {

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
            bg={currentBaseDB?.name === configTable.NAME ? "primary-subtle" : "body"}
            style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                borderRadius: "5px 5px 0 0"
            }}
            border rounded="2" shadow="sm" my="2"
        >
            <Row key={configTable.ID} rounded p="3" m="3" flex alignItems="center">
                <Col width="4" responsive="lg" my="1">
                    <Area flex justifyContent="start" alignItems="center">
                        <Span>
                            {configTable.NAME}
                        </Span>
                    </Area>
                </Col>
                <Col width="4" responsive="lg" my="1">
                    DESCRIPTION
                </Col>
                <Col width="4" responsive="lg" flex justifyContent="end" my="1">
                    EXPIRATION DATE
                </Col>
            </Row>
        </DraggableArea>
    );
}
export default ConfigTableSettingCard;