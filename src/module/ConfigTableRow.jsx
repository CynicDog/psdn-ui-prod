import TableRow from "../component/TableRow";
import TableRowCell from "../component/TableRowCell";
import Area from "../component/Area";
import CheckBox from "../component/CheckBox";
import Span from "../component/Span";
import Button from "../component/Button";
import {useConfig} from "../context/Config";

const ConfigTableRow = ({ row, columnNames }) => {

    const { selectedRow, toggleRowSelection, handleDeleteRule } = useConfig();

    return (
        <TableRow
            selected={selectedRow.includes(row.COL_NAME)}
            verticalAlign={row.RULES.length > 0 ? "" : "middle" }
            onClick={() => toggleRowSelection(row, !selectedRow.includes(row.COL_NAME))}
        >
            {/* Control master checkbox */}
            <TableRowCell>
                <Area flex justifyContent="center" >
                    <CheckBox
                        type="checkbox"
                        checked={selectedRow.includes(row.COL_NAME)}
                        onChange={(e) => toggleRowSelection(row, e.target.checked)}
                    />
                </Area>
            </TableRowCell>
            {/* Columns render area */}
            {columnNames.map((colKey) => (
                <TableRowCell key={colKey}>
                    {colKey === "APPT_YN" ? (
                        <Area flex justifyContent="center">
                            <CheckBox
                                type="checkbox"
                                checked={row[colKey] === 1} />
                        </Area>
                    ) : colKey === "RULES" ? (
                        <Area>
                            {row[colKey].map((rule, index) => (
                                <Area key={index} border rounded="2" shadow="sm" my="2" p="2">
                                    <Area flex justifyContent="between">
                                        <Area className="badge-warning">{rule.RULE_ID}</Area>
                                        <Area
                                            className="badge-danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteRule(rule.RULE_ID);
                                            }}
                                        >
                                            Delete
                                        </Area>
                                    </Area>
                                </Area>
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
                    <Button size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                // open up ConfigPopup
                            }}>
                        <i className="bi bi-box-arrow-up-right"></i>
                    </Button>
                </Area>
            </TableRowCell>
        </TableRow>
    );
};

export default ConfigTableRow;
