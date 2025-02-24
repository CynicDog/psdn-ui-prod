import { useConfig } from "../context/Config";
import { useLanguage } from "../context/Language";
import Area from "../component/Area";
import EmptyChartPlaceholder from "./EmptyChartPlaceholder";
import LoadingSpinner from "../component/LoadingSpinner";
import ChartSummary from "./ChartSummary";
import R4 from "./R4";

import sampleData from "../data/mock-server/data/raw/COLUMN_1.json"

const ChartControl = ({ isDataLoading }) => {
    const { t } = useLanguage();
    const { focusedRow } = useConfig();

    const ruleToChart = {
        "R1": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R2": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R3": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R4": (rule) => <R4 data={sampleData} />, // 시연용 임시 차트
        "R5": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R6": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R7": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R8": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R9": (rule) => <EmptyChartPlaceholder rule={rule} />,
        "R10": (rule) => <EmptyChartPlaceholder rule={rule}/>,
        "R11": (rule) => <EmptyChartPlaceholder rule={rule}/>,
        "R12": (rule) => <EmptyChartPlaceholder rule={rule}/>,
        "R13": (rule) => <EmptyChartPlaceholder rule={rule}/>,
        "R14": (rule) => <EmptyChartPlaceholder rule={rule}/>,
    };

    return (
        <Area>
            {isDataLoading ? (
                <LoadingSpinner message={t('components.loading_message')} />
            ) : (
                focusedRow.RULES.map((rule) => (
                    <Area key={rule.RULE_ID} mb="5" pb="5">
                        <Area>
                            {ruleToChart[rule.RULE_ID](rule)}
                        </Area>
                    </Area>
                ))
            )}
        </Area>
    );
};

export default ChartControl;
