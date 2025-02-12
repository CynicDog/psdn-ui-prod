import Area from "../../component/Area";
import Span from "../../component/Span";
import Code from "../../component/Code";
import RuleDescription from "../../data/RuleDescription.json";
import {useAuth} from "../../context/Auth";
import {useConfig} from "../../context/Config";
import {useLanguage} from "../../context/Language";
import Tooltip from "../../component/Tooltip";
import DefinitionParametersTooltip from "./DefinitionParametersTooltip";

const DefinitionDescription = ({ rule }) => {
    const { getLocalizedName } = useLanguage();
    const { auth } = useAuth();
    const { pseudoMasterInfo } = useConfig();

    const parseDescription = (text) => {
        if (!text) return null;

        // Split at {P1}, {P2}, and backtick-wrapped values
        const parts = text.split(/({P\d+})|(`[^`]+`)/g);

        return parts.map((part, index) => {
            if (!part) return null;

            // Extract the localized name of parameter
            if (part.match(/{P\d+}/)) {
                const param = pseudoMasterInfo.parameters.find(p => p.ID === part.replace(/[{}]/g, ""));
                return (
                    <Tooltip
                        position="top"
                        content={
                            <DefinitionParametersTooltip parameter={param} />
                        }
                        bg="body" rounded shadow="sm" p="1" px="2" gap="3"
                    >
                        <Span key={index} badge="primary-filled" >
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
        <Area>
            <Area mb="4">
                <Span >
                    {parseDescription(ruleData.main_description)}
                </Span>
            </Area>
            <Area>
                <Span>
                    {parseDescription(ruleData.detailed_description)}
                </Span>
            </Area>
        </Area>
    );
};

export default DefinitionDescription;
