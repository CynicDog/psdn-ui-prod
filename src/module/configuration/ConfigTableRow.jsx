import TableRow from "../../component/TableRow";
import TableRowCell from "../../component/TableRowCell";
import Area from "../../component/Area";
import CheckBox from "../../component/CheckBox";
import Span from "../../component/Span";
import Button from "../../component/Button";
import ConfigRuleCard from "./ConfigRuleCard";
import Icon from "../../component/Icon";
import { useConfig } from "../../context/Config";
import {usePopup} from "../../context/Popup";



const ConfigTableRow = ({ row, columnNames }) => {
    const { setIsConfigPopupOpen } = usePopup();
    const { selectedRows, toggleRowSelection, setFocusedRow } = useConfig();

    return (
        <TableRow
            selected={selectedRows.includes(row.COL_NAME)}
            verticalAlign={row.RULES.length > 0 ? "" : "middle"}
            onClick={() => toggleRowSelection(row, !selectedRows.includes(row.COL_NAME))}
        >
            {/* Control master checkbox */}
            <TableRowCell>
                <Area flex justifyContent="center">
                    <CheckBox
                        type="checkbox"
                        checked={selectedRows.includes(row.COL_NAME)}
                        onChange={(e) => toggleRowSelection(row, e.target.checked)}
                    />
                </Area>
            </TableRowCell>

            {/* Columns render area */}
            {columnNames.map((colKey) => (
                <TableRowCell key={colKey}>
                    {colKey === "APPT_YN" ? (
                        <Area flex justifyContent="center">
                            <CheckBox type="checkbox" checked={row[colKey] === 1} disabled />
                        </Area>
                    ) : colKey === "RULES" ? (
                        <Area>
                            {(Array.isArray(row[colKey]) ? row[colKey] : []).map((rule, index) => (
                                <ConfigRuleCard
                                    key={rule?.RULE_ID || index}
                                    row={row}
                                    rule={rule}
                                    order={index}
                                />
                            ))}
                        </Area>
                    ) : (
                        <Span>{row[colKey] ?? "N/A"}</Span>
                    )}
                </TableRowCell>
            ))}

            {/* Popup icon column */}
            <TableRowCell>
                <Area flex justifyContent="center">
                    <Button
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsConfigPopupOpen(true);
                            setFocusedRow(row);
                        }}
                    >
                        <Icon name="box-arrow-up-right" />
                    </Button>
                </Area>
            </TableRowCell>
        </TableRow>
    );
};

export default ConfigTableRow;
