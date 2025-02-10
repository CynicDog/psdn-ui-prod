import {useLanguage} from "../context/Language";
import TableHeaderCell from "../component/TableHeaderCell";
import Area from "../component/Area";
import {useBaseDB} from "../context/BaseDB";
import {useConfig} from "../context/Config";
import Dropdown from "../component/Dropdown";

const ConfigTableColumn = ({ name, applyFilter, width }) => {

    const { t, getLocalizedName } = useLanguage();
    const { pseudoMasterInfo, filters, setFilters } = useConfig();

    return (
        <TableHeaderCell width={width}>
            <Area>{name}</Area>
            {applyFilter ? (
                <Area>
                    <Dropdown
                        value={filters[name]}
                        onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}
                        options={[
                            { value: "", label: t("components.select_option_all") },
                            ...pseudoMasterInfo.rules.map(rule => ({
                                value: rule.ID,
                                label: getLocalizedName(rule)
                            }))
                        ]}
                    />
                </Area>
            ) : null}
        </TableHeaderCell>
    );
};

export default ConfigTableColumn;