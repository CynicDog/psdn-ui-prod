import Area from "../../component/Area";
import Span from "../../component/Span";
import Code from "../../component/Code";
import RuleDescription from "../../data/config/RuleDescription.json";
import {useLanguage} from "../../context/Language";
import Tooltip from "../../component/Tooltip";
import DefinitionParametersTooltip from "./DefinitionParametersTooltip";
import {useMeta} from "../../context/Meta";

const DefinitionDescription = ({ rule }) => {
    const { getLocalizedName } = useLanguage();
    const { language } = useLanguage();
    const { pseudoRules, pseudoParameters, pseudoCode } = useMeta();

    const parseDescription = (text) => {
        if (!text) return null;

        // Split at {P1}, {P2}, and backtick-wrapped values
        const parts = text.split(/({\w+})|(`[^`]+`)/g);

        return parts.map((part, index) => {
            if (!part) return null;

            // Extract the localized name of parameter
            if (part.match(/{\w+}/)) {
                const paramAttributeName = part.replace(/[{}]/g, ""); // Extract attributeName
                const param = pseudoParameters.item.find(p => p.attributeName === paramAttributeName);

                // Check if the parameter is of CODE_ type and has related pseudoCodeInfo
                let codeInfo = null;
                let typeDisplay = null;
                if (param?.type && pseudoCode[param.type]) {
                    const codeKey = param.type;

                    codeInfo = pseudoCode[codeKey]?.map(codeItem => ({
                        en: codeItem.NAME_EN,
                        ko: codeItem.NAME_KO
                    })) || [];
                } else {
                    // Handle native types (e.g., string, boolean, float)
                    typeDisplay = param?.type;
                }

                return (
                    <Tooltip
                        key={index}
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

    const ruleData = RuleDescription[rule.attributeName]?.[language];

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
