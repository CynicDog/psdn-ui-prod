import { useState } from "react";
import { useTranslation } from "../context/Translation";
import { useConfig } from "../context/Config";
import DraggableArea from "../component/DraggableArea";
import Area from "../component/Area";
import Span from "../component/Span";
import ParametersGroup from "./ParametersGroup";

const RuleCard = ({ row, rule, index, isDragging }) => {
    const { t } = useTranslation();
    const { handleDeleteRule, handleMoveRule } = useConfig();

    const [dragging, setDragging] = useState(false);

    const handleDragStart = (e) => {
        // Custom drag start logic
        console.log("Dragging started", e);
        setDragging(true);  // Indicate that this card is being dragged
        e.dataTransfer.setData("text/plain", rule.RULE_ID);
    };

    const handleDragEnd = (e) => {
        // Handle drag end logic
        console.log("Dragging ended", e);
        setDragging(false);  // Reset dragging state
    };

    const handleDragOver = (e) => {
        // Custom drag over logic
        console.log("Dragging over", e);
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e) => {
        // Handle drop logic
        console.log("Dropped", e);
        // Reorder the rules after drop
        handleMoveRule(row.COL_NAME, index, row.COL_NAME, index + 1);
    };

    return (
        <DraggableArea
            onClick={() => {}}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            border
            rounded="2"
            shadow="sm"
            my="2"
            p="2"
            draggable={true}
            style={{
                opacity: isDragging ? 1 : 0.3
            }}
        >
            <Area flex justifyContent="between" className="mb-2">
                <Span>{rule.RULE_ID}</Span>
                <Span
                    badge="danger"
                    size="sm"
                    outline
                    variant="danger"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRule(row.COL_NAME, rule.RULE_ID);
                    }}
                >
                    {t('components.delete')}
                </Span>
            </Area>
            <ParametersGroup parameters={rule.VRBLs} />
        </DraggableArea>
    );
};

export default RuleCard;
