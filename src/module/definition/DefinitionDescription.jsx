import Area from "../../component/Area";
import Span from "../../component/Span";
import Code from "../../component/Code";
import RuleDescription from "../../data/config/RuleDescription.json";
import { useAuth } from "../../context/Auth";
import { useLanguage } from "../../context/Language";
import Tooltip from "../../component/Tooltip";
import DefinitionParametersTooltip from "./DefinitionParametersTooltip";
import {useMeta} from "../../context/Meta";

const DefinitionDescription = ({ rule }) => {
    const { getLocalizedName } = useLanguage();
    const { auth } = useAuth();
    const { businessMeta } = useMeta();

    const parseDescription = (text) => {
        if (!text) return null;

        // Split at {P1}, {P2}, and backtick-wrapped values
        const parts = text.split(/({P\d+})|(`[^`]+`)/g);

        return parts.map((part, index) => {
            if (!part) return null;

            // Extract the localized name of parameter
            if (part.match(/{P\d+}/)) {
                const paramId = part.replace(/[{}]/g, "");
                const param = businessMeta.pseudoMasterInfo.parameters.find(p => p.ID === paramId);

                // Check if the parameter is of CODE_ type and has related pseudoCodeInfo
                let codeInfo = null;
                let typeDisplay = null;
                if (param?.TYPE && businessMeta.pseudoCodeInfo[param.TYPE]) {
                    const codeKey = param.TYPE;

                    // Get the domain values based on the code key (e.g., CODE_P2, CODE_P5, etc.)
                    const domainValues = businessMeta.pseudoCodeInfo[codeKey]?.map(codeItem => ({
                        en: codeItem.NAME_EN,
                        ko: codeItem.NAME_KO
                    })) || [];

                    codeInfo = domainValues;
                } else {
                    // Handle native types (e.g., string, boolean, float)
                    typeDisplay = param?.TYPE;
                }

                return (
                    <Tooltip
                        position="top"
                        content={
                            <DefinitionParametersTooltip
                                parameter={param}
                                codeInfo={codeInfo}
                                typeDisplay={typeDisplay}
                            />
                        }
                        bg="body" border rounded shadow="sm" p="1" px="2" gap="3"
                    >
                        <Span key={index} badge="primary-filled" noSelect>
                            {getLocalizedName(param)}
                        </Span>
                    </Tooltip>
                );
            }
            // Extract the value of parameter
            if (part.startsWith("`") && part.endsWith("`")) {
                return (
                    <Code key={index}>
                        {part.slice(1, -1)}
                    </Code>
                );
            }

            return <Span key={index}>{part}</Span>;
        });
    };

    const ruleData = RuleDescription[rule.ID]?.[auth.language];

    if (!ruleData) return <Area>No description available</Area>;

    return (
        <Area my="1">
            <Area mb="4">
                <Span fontSize="5" fontWeight="light">
                    {parseDescription(ruleData.main_description)}
                </Span>
            </Area>
            <Area>
                <Span fontWeight="light">
                    {parseDescription(ruleData.detailed_description)}
                </Span>
            </Area>
        </Area>
    );
};

export default DefinitionDescription;
