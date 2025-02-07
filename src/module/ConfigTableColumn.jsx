import {useTranslation} from "../context/Translation";
import TableHeaderCell from "../component/TableHeaderCell";
import Area from "../component/Area";
import {useBaseDB} from "../context/BaseDB";
import {useConfig} from "../context/Config";

const ConfigTableColumn = ({ name, applyFilter, width }) => {

    const { t } = useTranslation();
    const { BaseDB } = useBaseDB();
    const { filters, setFilters, configRows } = useConfig();

    // Get predefined domains from the imported JSON
    const getDomains = (columnName) => {
        return BaseDB.domains[columnName] || [...new Set(BaseDB.rows.map((row) => row[columnName]))];
    };
    const domains = getDomains(name);

    return (
        <TableHeaderCell width={width}>
            <Area>{name}</Area>
            {applyFilter && domains ? (
                <Area>
                    <select
                        className="form-select form-select-sm"
                        value={filters[name]}
                        onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}
                    >
                        <option value="All">{t("components.select_option_all")}</option>
                        {domains.map((domain, index) => (
                            <option key={index} value={domain.value}>
                                {domain.label}
                            </option>
                        ))}
                    </select>
                </Area>
            ) : null}
        </TableHeaderCell>
    );
};

export default ConfigTableColumn;