import { useLanguage } from "../context/Language";
import TableHeaderCell from "../component/TableHeaderCell";
import Area from "../component/Area";
import { useBaseDB } from "../context/BaseDB";
import { useConfig } from "../context/Config";
import Dropdown from "../component/Dropdown";

const ConfigTableColumn = ({ name, applyFilter, width }) => {

    const { t, getLocalizedName } = useLanguage();
    const { BaseDB } = useBaseDB();
    const { pseudoMasterInfo, filters, setFilters } = useConfig();

    // Determine the options based on column name
    const getOptions = () => {
        return [
            { value: "", label: t("components.select_option_all") },
            ...BaseDB.domains[name].map(option => ({
                value: option.value,
                label: name === "RULES"
                    ? getLocalizedName(pseudoMasterInfo.rules.find(rule => rule.ID === option.value))
                    : option.label
            }))
        ];
    };

    return (
        <TableHeaderCell width={width}>
            <Area>{name}</Area>
            {applyFilter && (
                <Area>
                    <Dropdown
                        value={filters[name]}
                        onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}
                        options={getOptions()}
                    />
                </Area>
            )}
        </TableHeaderCell>
    );
};

export default ConfigTableColumn;
