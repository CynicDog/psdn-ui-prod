import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {useTheme} from "../context/Theme";
import {useConfig} from "../context/Config";

/* 시연용 hardcoded chart */
const R4 = ({ data, defaultBinningValue = 1000}) => {

    const { theme } = useTheme();

    const svgRef = useRef(null);
    const tableBodyRef = useRef(null);

    const [binningValue, setBinningValue] = useState(defaultBinningValue);
    const [standard, setStandard] = useState("frequency");
    const [threshold, setThreshold] = useState(null);
    const [focusedBinFrequencyYPosition, setFocusedBinFrequencyYPosition] = useState(null);

    const [tableData, setTableData] = useState([]);
    const [focusedTableRow, setFocusedTableRow] = useState(null);

    useEffect(() => {
        if (!binningValue || binningValue === 0) return;

        const incomeData = data.data;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous chart

        const margin = {top: 10, right: 40, bottom: 65, left: 40};
        const width = svgRef.current.clientWidth - margin.left - margin.right;
        const height = svgRef.current.clientHeight - margin.top - margin.bottom;

        const totalDataFrequency = incomeData.length;

        const x = d3
            .scaleLinear()
            .domain([d3.min(incomeData), d3.max(incomeData)])
            .range([0, width]);

        const bins = d3
            .bin()
            .thresholds(x.ticks(Math.ceil(d3.max(incomeData) / binningValue)))(incomeData);

        setFocusedTableRow(null);

        const newTableData = bins
            .map((bin) => {
                const frequency = bin.length;
                const percentage = ((frequency / totalDataFrequency) * 100);
                const valueRange = `${bin.x0}-${bin.x1}`;
                return {valueRange, frequency, percentage};
            })
            // Exclude zero-frequency bins
            .filter((row) => row.frequency > 0)
            // De-duplicate entries of the same frequencies
            .reduce((unique, item) => {
                const exists = unique.some(
                    (u) => u.frequency === item.frequency && u.percentage === item.percentage
                );
                if (!exists) unique.push(item);
                return unique;
            }, []);

        setTableData(newTableData.sort((a, b) => b.frequency - a.frequency));

        const yMax =
            standard === "frequency"
                ? d3.max(bins, (d) => d.length)
                : d3.max(bins, (d) => (d.length / totalDataFrequency) * 100);

        const y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

        if (focusedTableRow) {
            setFocusedBinFrequencyYPosition(
                y(standard === "frequency" ? focusedTableRow.frequency : focusedTableRow.percentage)
            );

            const newThreshold = standard === "frequency" ? focusedTableRow.frequency : parseFloat(focusedTableRow.percentage);
            setThreshold(newThreshold);
        }

        let tickValues = x.ticks();
        if (tickValues[0] > 10000) {
            tickValues = [10000, ...tickValues];
        }
        svg.append("g")
            .attr("transform", `translate(0 ,${height})`)
            .call(d3.axisBottom(x).tickValues(tickValues));

        const yAxis = svg.append("g").call(
            d3.axisLeft(y).ticks(10).tickFormat((d) => (standard === "percentage" ? `${d}%` : d))
        );

        svg
            .append("text")
            .attr("class", "x-axis-label")
            .attr("x", 35)
            .attr("y", 22)
            .style("font-size", "22px")
            .style("font-weight", "lighter")
            .style("fill", theme === "dark" ? "white" : "black")
            .text(
                `임계값: ${
                    threshold !== null
                        ? standard === "percentage"
                            ? threshold.toFixed(4)
                            : threshold
                        : 0
                }`
            );

        if (threshold === null || threshold === 0) {
            svg
                .append("text")
                .attr("x", 35)
                .attr("y", 55)
                .attr("dy", -10)
                .attr("text-anchor", "start")
                .style("font-size", "15px")
                .style("font-weight", "lighter")
                .style("fill", theme === "dark" ? "white" : "black")
                .text("임계값을 설정하려면 히스토그램의 막대 또는 y축의 눈금값을 클릭하세요.");
        }

        svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left - 17)
            .attr("x", 0 - height / 2)
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("fill", theme === "dark" ? "white" : "black")
            .text(standard === "frequency" ? "건수" : "비율");

        svg
            .selectAll(".bar")
            .data(bins)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.x0) + 1)
            .attr("y", (d) =>
                y(standard === "frequency" ? d.length : (d.length / totalDataFrequency) * 100)
            )
            .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("height", (d) =>
                height - y(standard === "frequency" ? d.length : (d.length / totalDataFrequency) * 100)
            )
            .style("fill", (d) =>
                threshold !== null &&
                (standard === "frequency" ? d.length : (d.length / totalDataFrequency) * 100) <= threshold
                    ? "#D55E00" // Orange for outliers
                    : "#0072B2" // Blue for normal bins
            )
            .style("cursor", "pointer")
            .on("click", (event, d) => {
                setThreshold(
                    standard === "frequency" ? d.length : (d.length / totalDataFrequency) * 100
                );
            })
            .on("mouseenter", function (event, d) {
                setFocusedBinFrequencyYPosition(
                    y(standard === "frequency" ? d.length : (d.length / totalDataFrequency) * 100)
                );
            })
            .on("mouseleave", () => {
                setFocusedBinFrequencyYPosition(null);
            });

        yAxis
            .selectAll(".tick")
            .on("mouseenter", function (event, d) {
                setFocusedBinFrequencyYPosition(y(d));
            })
            .on("mouseleave", function () {
                setFocusedBinFrequencyYPosition(null);
            })
            .on("click", function (event, d) {
                setThreshold(d);
            })
            .style("cursor", "pointer")
            .style("font-size", "14px");

        if (focusedBinFrequencyYPosition !== null) {
            svg.selectAll(".dashed-line").remove();
            svg
                .append("line")
                .attr("class", "dashed-line")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", focusedBinFrequencyYPosition)
                .attr("y2", focusedBinFrequencyYPosition)
                .attr("stroke", "gray")
                .attr("stroke-dasharray", "5,7");
        } else {
            svg.selectAll(".dashed-line").remove();
        }
    }, [data, binningValue, threshold, standard, focusedBinFrequencyYPosition, focusedTableRow]);

    useEffect(() => {
        if (tableBodyRef.current) {
            const rows = tableBodyRef.current.querySelectorAll("tr");
            const firstColoredRow = Array.from(rows).find(
                (row) => row.classList.contains("table-warning")
            );
            if (firstColoredRow) {
                firstColoredRow.scrollIntoView({behavior: "smooth", block: "start"});
            }
        }
    }, [threshold, standard]); // Scroll when threshold or standard changes

    useEffect(() => {
        setBinningValue(defaultBinningValue);
    }, [defaultBinningValue]);

    const handleBinningChange = (event) => {
        setBinningValue(parseInt(event.target.value, 10));
        setThreshold(0);
    };

    const handleStandardChange = (event) => {
        setStandard(event.target.value);
        setThreshold(null);
    };

    return (
        <div className="container">

            <div className="row">
                <div className="col-12">
                    <div className="ps-5">
                        <span className="fs-5 fw-lighter">가명화 규칙: <strong>특이치범주화</strong></span>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                {/* Frequency Histogram */}
                <div className="col-11">
                    <div className="d-flex mt-3">
                        <div className="ms-auto" style={{width: "25%"}}>
                            <div className="d-flex">
                                <p className="fs-5 fw-lighter me-3">임계기준</p>
                                <select
                                    className="form-select form-select-sm"
                                    value={standard}
                                    onChange={handleStandardChange}
                                    style={{height: "30px", width: "120px"}}
                                >
                                    <option value="frequency">건수</option>
                                    <option value="percentage">비율</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: "30px", width: "100%"}}>
                        <svg ref={svgRef} width="100%" height="400" viewBox="0 0 1040 400"></svg>
                    </div>
                    <div className="d-flex">
                        <div className="ms-auto" style={{width: "30%"}}>
                            <div className="d-flex align-content-center">
                                <p className="fw-lighter me-3">카운트구간길이</p>
                                <div>
                                    <input
                                        type="range"
                                        className="form-range"
                                        id="input-range"
                                        min={defaultBinningValue}
                                        max="20000"
                                        step={defaultBinningValue}
                                        value={binningValue}
                                        onChange={handleBinningChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col px-5">
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <span
                            className="badge bg-light-subtle border border-light-subtle text-light-emphasis rounded-pill mx-1">COLUMN_1</span>
                        데이터를 파라미터 (
                        {standard !== null && (
                            <>
                                <span className="badge-primary-filled mx-1">임계기준</span>
                                <span
                                    className="badge-secondary-filled">{standard === 'frequency' ? "건수" : "비율"} </span>
                                ,
                            </>
                        )}
                        {threshold !== null && (
                            <>
                                <span className="badge-primary-filled mx-1">임계값</span>
                                <span
                                    className="badge-secondary-filled">{parseFloat(threshold).toFixed(4)}</span>
                                ,
                            </>
                        )}
                        {binningValue !== null && (
                            <>
                                <span className="badge-primary-filled mx-1">카운트구간길이</span>
                                <span
                                    className="badge-secondary-filled">{binningValue}</span>
                            </>
                        )}
                        ) 를 활용하여
                        <span
                            className="badge-warning mx-1">특이치범주화</span>
                        를 적용합니다.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default R4;
