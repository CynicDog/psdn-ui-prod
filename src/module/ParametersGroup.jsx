import React from "react";
import Area from "../component/Area";
import { Col, Row } from "../component/Grid";
import Span from "../component/Span";
import CheckBox from "../component/CheckBox";
import Dropdown from "../component/Dropdown";
import InputField from "../component/InputField";
import { useConfig } from "../context/Config";
import { useAuth } from "../context/Auth";

const ParametersGroup = ({ parameters }) => {

    const { pseudoMasterInfo, pseudoCodeInfo } = useConfig();
    const { auth } = useAuth();

    // Function to determine input type dynamically
    const getInputType = (key) => {
        const param = pseudoMasterInfo.parameters.find(p => p.ID === key);
        if (!param) return "text";

        switch (param.TYPE) {
            case "Boolean":
                return "checkbox";
            case "CODE_P9":
            case "CODE_P10":
            case "CODE_P5":
            case "CODE_P16":
            case "CODE_P2":
                return "select";
            default:
                return "text";
        }
    };

    // Function to get the name dynamically based on language
    const getName = (item) => auth.language === "ko" ? item.NAME_KO : item.NAME_EN;

    // Function to get options for select inputs dynamically from config
    const getSelectOptions = (key) => {
        const param = pseudoMasterInfo.parameters.find(p => p.ID === key);
        if (!param || !pseudoCodeInfo[param.TYPE]) return [];

        return pseudoCodeInfo[param.TYPE].map(option => ({
            value: option.VALUE,
            label: getName(option)
        }));
    };

    return (
        <Area>
            {parameters.map((param) => {
                const inputType = getInputType(param.id);
                const options = getSelectOptions(param.id);
                const paramInfo = pseudoMasterInfo.parameters.find(p => p.ID === param.id);
                const paramName = paramInfo ? getName(paramInfo) : param.id;

                return (
                    <Row key={param.id} my="1">
                        <Col width="7" responsive="lg" flex alignItems="center">
                            <Span>{paramName}</Span>
                        </Col>
                        <Col width="5" responsive="lg">
                            {inputType === "select" ? (
                                <Dropdown
                                    id={param.id}
                                    options={options}
                                    value={param.value}
                                    onChange={(e) => console.log(`Parameter ${param.id} changed to ${e.target.value}`)}
                                />
                            ) : inputType === "checkbox" ? (
                                <CheckBox
                                    checked={!!param.value}
                                    onChange={(e) => console.log(`Parameter ${param.id} changed to ${e.target.checked}`)}
                                />
                            ) : (
                                <InputField
                                    id={param.id}
                                    value={param.value}
                                    onChange={(e) => console.log(`Parameter ${param.id} changed to ${e.target.value}`)}
                                />
                            )}
                        </Col>
                    </Row>
                );
            })}
        </Area>
    );
};

export default ParametersGroup;
