import { useConfig } from "../../context/Config";
import { useLanguage } from "../../context/Language";
import DraggableArea from "../../component/DraggableArea";
import Area from "../../component/Area";
import Span from "../../component/Span";
import ConfigParametersGroup from "./ConfigParametersGroup";
import {useState} from "react";
import {useAuth} from "../../context/Auth";

const ConfigRuleCard = ({ row, rule, order }) => {

    const { auth } = useAuth();
    const { t, getLocalizedName } = useLanguage();
    const {
        pseudoMasterInfo,
        handleDeleteRule, handleMoveRule,
        sourceRuleDraggable, setSourceRuleDraggable,
        targetRuleDraggable, setTargetRuleDraggable
    } = useConfig();

    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);

    const handleDragStart = (e) => {
        setSourceRuleDraggable(order);
        setIsDragging(true);
        e.dataTransfer.setData("text/plain", rule.RULE_ID);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        const targetOrder = e.currentTarget.getAttribute("data-order");
        setTargetRuleDraggable(Number(targetOrder));

        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };

    const handleDrop = (e) => {
        setIsOver(false);
    };

    const handleDragEnd = (e) => {
        // TODO: Verify if the DND is happening in a row, not between rows
        if (sourceRuleDraggable !== targetRuleDraggable && targetRuleDraggable !== null) {
            handleMoveRule(row.COL_NAME, sourceRuleDraggable, row.COL_NAME, targetRuleDraggable);
        }

        // Reset context after drop
        setIsDragging(false);
        setIsOver(false);
        setSourceRuleDraggable(null);
        setTargetRuleDraggable(null);
    };

    const ruleInfo = pseudoMasterInfo.rules.find(r => r.ID === rule.RULE_ID);
    return (
        <DraggableArea
            order={order}
            border rounded="2" shadow="sm" bg="body" my="2" p="2"
            isDragging={isDragging}
            isOver={isOver}
            onClick={(e) => e.stopPropagation()}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Area flex justifyContent="between" className="mb-2">
                <Span fontSize="6">{getLocalizedName(ruleInfo)}</Span>
                <Area flex alignItems="center">
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
            </Area>
            <ConfigParametersGroup row={row} rule={rule} parameters={rule.VRBLs} />
        </DraggableArea>
    );
};

export default ConfigRuleCard;
