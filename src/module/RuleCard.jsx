import { useState } from "react";
import { useTranslation } from "../context/Translation";
import { useConfig } from "../context/Config";
import DraggableArea from "../component/DraggableArea";
import Area from "../component/Area";
import Span from "../component/Span";
import ParametersGroup from "./ParametersGroup";

const RuleCard = ({ row, rule, index }) => {
    const { t } = useTranslation();
    const { handleDeleteRule, handleMoveRule } = useConfig();

    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [targetRule, setTargetRule] = useState(null);

    const handleDragStart = (e) => {
        setIsDragging(true);
        e.dataTransfer.setData("text/plain", rule.RULE_ID);
    };

    const handleDragEnd = (e) => {
        setIsDragging(false);
        setIsOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        console.log(e);

        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };

    const handleDrop = (e) => {
        handleMoveRule(row.COL_NAME, index, row.COL_NAME, index + 1);
        setIsOver(false);
    };

    return (
        <DraggableArea
            border rounded="2" shadow="sm" bg="body" my="2" p="2"
            isDragging={isDragging}
            isOver={isOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
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
