import React from "react";
import Area from "../component/Area";
import Span from "../component/Span";
import { useConfig } from "../context/Config";
import { useLanguage } from "../context/Language";
import { useMeta } from "../context/Meta";

const ChartSummary = ({ rule }) => {
    const { t, getLocalizedName } = useLanguage();
    const { focusedRow } = useConfig();
    const { businessMeta } = useMeta();

    if (businessMeta.isLoading) return null;

    const getRuleName = (ruleId) => {
        const rule = businessMeta.rules?.find(r => r.ID === ruleId);
        return rule ? getLocalizedName(rule) : ruleId;
    };

    const getParameterName = (paramId) => {
        const param = businessMeta.pseudoMasterInfo?.parameters?.find(p => p.ID === paramId);
        return param ? getLocalizedName(param) : paramId;
    };

    const getCodeTranslation = (paramType, codeId) => {
        const codeList = businessMeta.pseudoCodeInfo?.[paramType] || [];
        const codeEntry = codeList.find(c => c.ID === codeId);
        return codeEntry ? getLocalizedName(codeEntry) : codeId;
    };

    return (
        rule.VRBLs.length > 0 && (
            <Area textPosition="center">
                <Span badge="light" mx="1">{focusedRow.COL_NAME}</Span>
                {t('chart.using_parameters')}
                {rule.VRBLs.map((param, index) => {
                    const paramInfo = businessMeta.pseudoMasterInfo?.parameters?.find(p => p.ID === param.id);
                    const translatedValue = paramInfo?.TYPE?.startsWith("CODE_")
                        ? getCodeTranslation(paramInfo.TYPE, param.value)
                        : String(param.value);
                    return (
                        <Span key={index} me="1">
                            <Span badge="primary-filled" mx="1">{getParameterName(param.id)}</Span>
                            <Span badge="secondary-filled">{translatedValue}</Span>
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
