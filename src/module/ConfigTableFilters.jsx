import {useBaseDB} from "../context/BaseDB";
import {useTranslation} from "../context/Translation";
import TableRow from "../component/TableRow";
import TableHeaderCell from "../component/TableHeaderCell";
import Area from "../component/Area";
import Span from "../component/Span";
import CheckBox from "../component/CheckBox";

const ConfigTableFilters = ({ filterNames, filters, setFilters, allSelected, toggleSelectAllRows }) => {

    const { t } = useTranslation();
    const { BaseDB } = useBaseDB()

    // Decides if a column has a filter or not
    const applyFilter = (colKey) => {
        return !['COL_NAME', 'COL_NAME_LGCL', 'VRBLs', 'DESC'].includes(colKey);
    };

    // Get predefined domains from the imported JSON
    const getDomains = (columnKey) => {
        return BaseDB.domains[columnKey] || [...new Set(BaseDB.rows.map((row) => row[columnKey]))];
    };

    const getColumnWidth = (colKey) => {
        const columnStyles = {
            'APPT_YN': { width: '8%' },
            'COL_NAME': { width: '15%' },
            'COL_NAME_LGCL': { width: '15%' },
            'COL_TYPE': { width: '10%' },
            'RULES': { width: '20%' },
            'DESC': { width: '30%' },
        };

        return columnStyles[colKey] || { width: '150px' };
    };

    return (
        <>
            <TableRow>
                <TableHeaderCell width="5%">
                    <Area flex justifyContent="center" mb="3">
                        <Span>
                            {t('components.grid_row_control_check')}
                        </Span>
                    </Area>
                    <Area flex justifyContent="center">
                        <CheckBox
                            id="control_check"
                            checked={allSelected}
                            onChange={(e) => toggleSelectAllRows(e.target.checked)}
                        />
                    </Area>
                </TableHeaderCell>
                {Object.keys(filterNames).map((colKey) => {
                    const shouldApplyFilter = applyFilter(colKey);
                    const domains = shouldApplyFilter ? getDomains(colKey) : null;

                    return (
                        <th key={colKey} style={getColumnWidth(colKey)}>
                            <div>{filterNames[colKey]}</div>
                            {shouldApplyFilter && domains ? (
                                <div>
                                    <select
                                        className="form-select form-select-sm"
                                        value={filters[colKey]}
                                        onChange={(e) =>
                                            setFilters({...filters, [colKey]: e.target.value})
                                        }
                                    >
                                        <option value={"All"}>{t("components.select_option_all")}</option>
                                        {domains.map((domain, index) => (
                                            <option key={index} value={domain.value}>
                                                {domain.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : null}
                        </th>
                    );
                })}
                <th>
                    {/* Placeholder cell for the popup icon column */}
                </th>
            </TableRow>
        </>
    )
}

export default ConfigTableFilters;