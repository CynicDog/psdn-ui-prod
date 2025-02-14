import React from "react";
import Area from "../../component/Area";
import { Col, Row } from "../../component/Grid";
import Span from "../../component/Span";
import CheckBox from "../../component/CheckBox";
import Dropdown from "../../component/Dropdown";
import InputField from "../../component/InputField";
import { useConfig } from "../../context/Config";
import { useLanguage } from "../../context/Language";
import { useMeta } from "../../context/Meta";

const ConfigParametersGroup = ({ row, rule, parameters }) => {
    const { pseudoMaster, pseudoCode } = useMeta();
    const { getLocalizedName } = useLanguage();
    const { updateParameterValue } = useConfig();

    // Function to determine input type dynamically
    const getInputType = (key) => {
        const param = pseudoMaster.parameters.find(p => p.ID === key);
        if (!param) return "text";

        switch (param.TYPE) {
            case "Boolean":
                return "checkbox";
            case "CODE_P2":
            case "CODE_P5":
            case "CODE_P9":
            case "CODE_P10":
            case "CODE_P16":
            case "CODE_P17":
                return "select";
            default:
                return "text";
        }
    };

    // Function to get options for select inputs dynamically from config
    const getSelectOptions = (key) => {
        const param = pseudoMaster.parameters.find(p => p.ID === key);
        if (!param || !pseudoCode[param.TYPE]) return [];

        return pseudoCode[param.TYPE].map(option => ({
            value: option.ID,
            label: getLocalizedName(option)
        }));
    };

    return (
        <Area>
            {parameters.map((param) => {
                const inputType = getInputType(param.id);
                const options = getSelectOptions(param.id);
                const paramInfo = pseudoMaster.parameters.find(p => p.ID === param.id);
                const paramName = paramInfo ? getLocalizedName(paramInfo) : param.id;

                // Retrieve the current value from the row's rule
                const currentValue = row.RULES
                    .find(r => r.RULE_ID === rule.RULE_ID)
                    ?.VRBLs.find(vrbl => vrbl.id === param.id)?.value || "";

                return (
                    <Row key={param.id} my="1">
                        <Col width="7" responsive="lg" flex alignItems="center">
                            <Span fontWeight="lighter">{paramName}</Span>
                        </Col>
                        <Col width="5" responsive="lg">
                            {inputType === "select" ? (
                                <Dropdown
                                    id={param.id}
                                    options={options}
                                    value={currentValue}
                                    onChange={(e) => updateParameterValue(row.COL_NAME, rule.RULE_ID, param.id, e.target.value)}
                                    border="primary-subtle"
                                />
                            ) : inputType === "checkbox" ? (
                                <CheckBox
                                    checked={!!currentValue}
                                    onChange={(e) => updateParameterValue(row.COL_NAME, rule.RULE_ID, param.id, e.target.checked)}
                                />
                            ) : (
                                <InputField
                                    id={param.id}
                                    value={currentValue}
                                    onChange={(e) => updateParameterValue(row.COL_NAME, rule.RULE_ID, param.id, e.target.value)}
                                    border="primary-subtle"
                                />
                            )}
                        </Col>
                    </Row>
                );
            })}
        </Area>
    );
};

export default ConfigParametersGroup