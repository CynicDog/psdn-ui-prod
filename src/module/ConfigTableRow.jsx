import TableRow from "../component/TableRow";
import TableRowCell from "../component/TableRowCell";
import Area from "../component/Area";
import CheckBox from "../component/CheckBox";
import Span from "../component/Span";
import Button from "../component/Button";
import { useConfig } from "../context/Config";
import ParametersGroup from "./ParametersGroup";
import {useTranslation} from "../context/Translation";

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
                                <Area key={index} border rounded="2" shadow="sm" my="2" p="2">
                                    <Area flex justifyContent="between" className="mb-2">
                                        <Span className="">{rule.RULE_ID}</Span>
                                        <Span
                                            badge="danger"
                                            size="sm"
                                            outline
                                            variant="danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteRule(row.COL_NAME, rule.RULE_ID);
                                            }}
                                        >
                                            {t('components.delete')}
                                        </Span>
                                    </Area>
                                    <ParametersGroup parameters={rule.VRBLs} />
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
