import {useTranslation} from "../context/Translation";
import TableHeaderCell from "../component/TableHeaderCell";
import Area from "../component/Area";
import {useBaseDB} from "../context/BaseDB";
import {useConfig} from "../context/Config";
import Dropdown from "../component/Dropdown";

const ConfigTableColumn = ({ name, applyFilter, width }) => {

    const { t } = useTranslation();
    const { BaseDB } = useBaseDB();
    const { filters, setFilters } = useConfig();

    return (
        <TableHeaderCell width={width}>
            <Area>{name}</Area>
            {applyFilter ? (
                <Area>
                    <Dropdown
                        value={filters[name]}
                        onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}
                        options={[
                            { value: "All", label: t("components.select_option_all") },
                            ...(BaseDB.domains[name] || []).map((domain) => ({
                                value: domain.value,
                                label: domain.label,
                            })),
                        ]}
                    />
                </Area>
            ) : null}
        </TableHeaderCell>
    );
};

export default ConfigTableColumn;