import { useState } from "react";
import Area from "../../component/Area";
import Button from "../../component/Button";
import Dropdown from "../../component/Dropdown";
import { useLanguage } from "../../context/Language";
import { useConfig } from "../../context/Config";
import { useMeta } from "../../context/Meta";
import Code from "../../component/Code";

const ConfigActions = () => {
    const { t, getLocalizedName } = useLanguage();
    const { configRows, selectedRule, setSelectedRule, handleDeleteAllRules } = useConfig();
    const { pseudoMaster } = useMeta();
    const [showRuleDropdown, setShowRuleDropdown] = useState(false);

    return (
        <Area flex gap="2">
            {/* Assign a Rule Button */}
            <Button size="sm" variant="light" onClick={() => setShowRuleDropdown(!showRuleDropdown)}>
                {t("action.apply_in_batch_rule")}
            </Button>
            {showRuleDropdown && (
                <Dropdown
                    id="rule-dropdown"
                    options={[
                        { value: "", label: t("action.select_rule") },
                        ...pseudoMaster.rules.map(rule => ({
                            value: rule.ID,
                            label: getLocalizedName(rule)
                        }))
                    ]}
                    value={selectedRule}
                    onChange={(e) => setSelectedRule(e.target.value)}
                    width="90px"
                    me="2"
                />
            )}
            {/* Delete All Rules Button */}
            <Button size="sm" variant="light" onClick={handleDeleteAllRules}>
                {t("action.delete_all_rules")}
            </Button>
            {/* Config Download Button */}
            <Button size="sm" variant="light" onClick={() => {
                const json = JSON.stringify(configRows, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "config.json";
                link.click();
            }}>
                {t("action.config_download")}
                <Code bgColor="light">config.json</Code>
            </Button>
        </Area>
    );
};

export default ConfigActions;
