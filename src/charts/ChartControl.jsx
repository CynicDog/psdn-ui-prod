import { useConfig } from "../context/Config";
import { useLanguage } from "../context/Language";
import Area from "../component/Area";
import { useEffect } from "react";
import EmptyPlaceholder from "./EmptyPlaceholder";
import LoadingSpinner from "../component/LoadingSpinner";
import ChartSummary from "./ChartSummary";

const ChartControl = ({ isDataLoading }) => {
    const { t } = useLanguage();
    const { focusedRow } = useConfig();

    const ruleToChart = {
        "R1": <EmptyPlaceholder />,
        "R2": <EmptyPlaceholder />,
        "R3": <EmptyPlaceholder />,
        "R4": <EmptyPlaceholder />,
        "R5": <EmptyPlaceholder />,
        "R6": <EmptyPlaceholder />,
        "R7": <EmptyPlaceholder />,
        "R8": <EmptyPlaceholder />,
        "R9": <EmptyPlaceholder />,
        "R10": <EmptyPlaceholder />,
        "R11": <EmptyPlaceholder />,
        "R12": <EmptyPlaceholder />,
        "R13": <EmptyPlaceholder />,
        "R14": <EmptyPlaceholder />,
    };

    return (
        <Area>
            {focusedRow.RULES.map((rule) => (
                <Area key={rule.RULE_ID} border rounded="4" shadow="sm" mx="3" my="5" px="2" py="3">
                    {isDataLoading ? (
                        <LoadingSpinner message={t('components.loading_message')} />
                    ) : (
                        <Area>
                            {ruleToChart[rule.RULE_ID]}
                            <ChartSummary rule={rule} />
                        </Area>
                    )}
                </Area>
            ))}
        </Area>
    );
};

export default ChartControl;
