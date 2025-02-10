import { useConfig } from "../context/Config";
import { useLanguage } from "../context/Language";
import Area from "../component/Area";
import EmptyChartPlaceholder from "./EmptyChartPlaceholder";
import LoadingSpinner from "../component/LoadingSpinner";
import ChartSummary from "./ChartSummary";

const ChartControl = ({ isDataLoading }) => {
    const { t } = useLanguage();
    const { focusedRow } = useConfig();

    const ruleToChart = {
        "R1": <EmptyChartPlaceholder />,
        "R2": <EmptyChartPlaceholder />,
        "R3": <EmptyChartPlaceholder />,
        "R4": <EmptyChartPlaceholder />,
        "R5": <EmptyChartPlaceholder />,
        "R6": <EmptyChartPlaceholder />,
        "R7": <EmptyChartPlaceholder />,
        "R8": <EmptyChartPlaceholder />,
        "R9": <EmptyChartPlaceholder />,
        "R10": <EmptyChartPlaceholder />,
        "R11": <EmptyChartPlaceholder />,
        "R12": <EmptyChartPlaceholder />,
        "R13": <EmptyChartPlaceholder />,
        "R14": <EmptyChartPlaceholder />,
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
