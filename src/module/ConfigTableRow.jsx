import TableRow from "../component/TableRow";
import TableRowCell from "../component/TableRowCell";
import Area from "../component/Area";
import CheckBox from "../component/CheckBox";
import Span from "../component/Span";
import Button from "../component/Button";
import { useConfig } from "../context/Config";
import {useTranslation} from "../context/Translation";
import RuleCard from "./RuleCard";

const ConfigTableRow = ({ row, columnNames }) => {
    const { t } = useTranslation();
    const { selectedRows, toggleRowSelection, handleDeleteRule } = useConfig();

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
                            {row[colKey].map((rule, index) => (
                                <RuleCard
                                    key={rule.RULE_ID}
                                    row={row}
                                    rule={rule}
                                    index={index} />
                            ))}
                        </Area>
                    ) : (
                        <Span>{row[colKey] || ""}</Span>
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
                            // open up ConfigPopup
                        }}
                    >
                        <i className="bi bi-box-arrow-up-right"></i>
                    </Button>
                </Area>
            </TableRowCell>
        </TableRow>
    );
};

export default ConfigTableRow;
