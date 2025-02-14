import React from "react";
import Area from "../component/Area";
import Span from "../component/Span";
import { useConfig } from "../context/Config";
import { useLanguage } from "../context/Language";

const ChartSummary = ({ rule }) => {
    const { t, getLocalizedName } = useLanguage();
    const { loadingConfigData, pseudoMasterInfo, pseudoCodeInfo, focusedRow } = useConfig();

    const getRuleName = (ruleId) => {
        const rule = pseudoMasterInfo.rules.find(r => r.ID === ruleId);
        return rule ? getLocalizedName(rule) : ruleId;
    };

    const getParameterName = (paramId) => {
        const param = pseudoMasterInfo.parameters.find(p => p.ID === paramId);
        return param ? getLocalizedName(param) : paramId;
    };

    const getCodeTranslation = (paramType, codeId) => {
        const codeList = pseudoCodeInfo[paramType] || [];
        const codeEntry = codeList.find(c => c.ID === codeId);
        return codeEntry ? getLocalizedName(codeEntry) : codeId;
    };

    return (
        rule.VRBLs.length > 0 && (
            <Area textPosition="center">
                <Span badge="light" mx="1">{focusedRow.COL_NAME}</Span>
                {t('chart.using_parameters')}
                {rule.VRBLs.map((param, index) => {
                    const paramInfo = pseudoMasterInfo.parameters.find(p => p.ID === param.id);
                    const translatedValue = paramInfo && paramInfo.TYPE.startsWith("CODE_")
                        ? getCodeTranslation(paramInfo.TYPE, param.value)
                        : String(param.value);
                    return (
                        <Span key={index} me="1">
                            <Span badge="primary-filled" mx="1">{getParameterName(param.id)}</Span>
                            <Span badge="secondary-filled" >{translatedValue}</Span>
                            {index < rule.VRBLs.length - 1 && ', '}
                        </Span>
                    );
                })}
                {t('chart.to_apply')}
                <Span className="badge-warning mx-1">{getRuleName(rule.RULE_ID)}</Span>
                {t('chart.application')}
            </Area>
        )
    );
};

export default ChartSummary;
