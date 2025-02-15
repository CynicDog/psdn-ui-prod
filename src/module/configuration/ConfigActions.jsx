import { useState } from "react";
import Area from "../../component/Area";
import Button from "../../component/Button";
import Dropdown from "../../component/Dropdown";
import { useLanguage } from "../../context/Language";
import { useConfig } from "../../context/Config";
import { useMeta } from "../../context/Meta";

const ConfigActions = () => {
    const { t, getLocalizedName } = useLanguage();
    const { configRows, resetFilters, handleMasterControlUpdate, selectedRule, setSelectedRule, handleDeleteAllRules } = useConfig();
    const { pseudoMaster } = useMeta();

    const [showRuleDropdown, setShowRuleDropdown] = useState(false);

    const downloadJSON = () => {
        const json = JSON.stringify(configRows, null, 2);
        const blob = new Blob([json], { type: "application/json" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "config.json";

        link.click();
    };

    return (
        <Area flex borderBottom gap="2" p="2">
            <Button size="sm" variant="light" onClick={resetFilters}>
                {t("components.reset_filters")}
            </Button>
            <Button size="sm" variant="light" onClick={() => handleMasterControlUpdate(1)}>
                {t("pseudonymization.set_APPT")} <i className="bi bi-check-square"></i>
            </Button>
            <Button size="sm" variant="light" onClick={() => handleMasterControlUpdate(0)}>
                {t("pseudonymization.set_APPT")} <i className="bi bi-x-square"></i>
            </Button>
            <Button size="sm" variant="light" onClick={() => setShowRuleDropdown(!showRuleDropdown)}>
                {t("components.apply_in_batch_rule")}
            </Button>

            {showRuleDropdown && (
                <Dropdown
                    id="rule-dropdown"
                    options={[
                        { value: "", label: t("components.select_rule") },
                        ...pseudoMaster.rules.map(rule => ({
                            value: rule.ID,
                            label: getLocalizedName(rule)
                        }))
                    ]}
                    value={selectedRule}
                    onChange={(e) => setSelectedRule(e.target.value)}
                    width="auto"
                    me="2"
                />
            )}

            <Button size="sm" variant="light" onClick={handleDeleteAllRules}>
                {t("components.delete_all_rules")}
            </Button>

            <Area ms="auto">
                <Button size="sm" variant="light" onClick={downloadJSON}>
                    {t("components.config_download")} <code className="ms-1">config.json</code>
                </Button>
            </Area>
        </Area>
    );
};

export default ConfigActions;
