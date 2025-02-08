import React from "react";
import Area from "../component/Area";
import {Col, Row} from "../component/Grid";
import Span from "../component/Span";
import CheckBox from "../component/CheckBox";
import Dropdown from "../component/Dropdown";
import InputField from "../component/InputField";

const ParametersGroup = ({parameters}) => {

    // Function to determine input type based on the key
    const getInputType = (key) => {
        switch (key) {
            case 'P9':
                return 'select';
            case 'P1':
                return 'checkbox';
            default:
                return 'text';
        }
    };

    // Function to get options for select inputs
    const getSelectOptions = (key) => {
        switch (key) {
            case 'P9':
                return [
                    {value: 'ratio', label: 'ratio'},
                    {value: 'frequency', label: 'frequency'},
                ];
            case 'P10':
                return [
                    {value: 'OptionA', label: 'Option A'},
                    {value: 'OptionB', label: 'Option B'},
                ];
            default:
                return [];
        }
    };

    return (
        <Area>
            {parameters.map((param) => {

                const inputType = getInputType(param.id);
                const options = getSelectOptions(param.id);

                switch (inputType) {
                    case 'select':
                        return (
                            <Row key={param.id} my="1">
                                <Col width="3" responsive="lg" flex alignItems="center">
                                    <Span>{param.id}</Span>
                                </Col>
                                <Col width="9" responsive="lg">
                                    <Dropdown
                                        id={param.id}
                                        options={options}
                                        value={param.value}
                                        onChange={(e) =>
                                            console.log(`Parameter ${param.id} changed to ${e.target.value}`)
                                        }
                                    />
                                </Col>
                            </Row>
                        );
                    case 'checkbox':
                        return (
                            <Row key={param.id} my="1">
                                <Col width="3" responsive="lg" flex alignItems="center">
                                    <Span>{param.id}</Span>
                                </Col>
                                <Col width="9" responsive="lg">
                                    <CheckBox
                                        checked={!!param.value}
                                        onChange={(e) =>
                                            console.log(`Parameter ${param.id} changed to ${e.target.checked}`)
                                        }
                                    />
                                </Col>
                            </Row>
                        );
                    default:
                        return (
                            <Row key={param.id} my="1">
                                <Col width="3" responsive="lg" flex alignItems="center">
                                    <Span>{param.id}</Span>
                                </Col>
                                <Col width="9" responsive="lg">
                                    <InputField
                                        id={param.id}
                                        value={param.value}
                                        onChange={(e) =>
                                            console.log(`Parameter ${param.id} changed to ${e.target.value}`)
                                        }
                                    />
                                </Col>
                            </Row>
                        );
                }
            })}
        </Area>
    );
};

export default ParametersGroup;
