import { useTranslation } from "../context/Translation";
import { useConfig } from "../context/Config";
import { useState } from "react";
import Area from "../component/Area";
import Button from "../component/Button";
import Dropdown from "../component/Dropdown";

const ConfigActions = () => {
    const { t } = useTranslation();
    const { configRows, resetFilters, handleMasterControlUpdate, selectedRule, setSelectedRule, handleDeleteAllRules } = useConfig();

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
        <>
            <Button size="sm" variant="light" onClick={resetFilters}>
                {t("components.reset_filters")}
            </Button>
            <Button size="sm" variant="light" onClick={() => handleMasterControlUpdate(1)}>
                {t("pseudonymization.set_APPT")} <i className="bi bi-check-square"></i>
            </Button>
            <Button size="sm" variant="light" onClick={() => handleMasterControlUpdate(0)}>
                {t("pseudonymization.set_APPT")} <i className="bi bi-x-square"></i>
            </Button>
            <Button size="sm" variant="light" onClick={handleDeleteAllRules}>
                {t("components.delete_all_rules")}
            </Button>
            <Button size="sm" variant="light" onClick={() => setShowRuleDropdown(!showRuleDropdown)}>
                {t("components.apply_in_batch_rule")}
            </Button>
            {showRuleDropdown && (
                <Dropdown
                    id="rule-dropdown"
                    options={[
                        { value: "", label: t("components.select_rule") },
                        { value: "R4", label: "R4" },
                        { value: "R9", label: "R9" }
                    ]}
                    value={selectedRule}
                    onChange={(e) => setSelectedRule(e.target.value)}
                    border="secondary"
                    width="auto"
                    me="2"
                />
            )}

            <Area ms="auto">
                <Button size="sm" variant="light" onClick={downloadJSON}>
                    {t("components.download")} <code className="ms-1">config.json</code>
                </Button>
            </Area>
        </>
    );
};

export default ConfigActions;
