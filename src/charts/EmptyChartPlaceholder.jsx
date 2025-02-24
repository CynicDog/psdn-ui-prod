import Area from "../component/Area";
import ChartSummary from "./ChartSummary";

const EmptyChartPlaceholder = ({ rule }) => {

    return (
        <Area>
            <Area flex justifyContent="center" style={{fontSize: "xxx-large"}}>
                🎨🧑🏻‍💻💭
            </Area>

            {/* TODO: 시연 후 ChartControl로 lift up*/}
            <ChartSummary rule={rule} />
        </Area>
    )
}

export default EmptyChartPlaceholder