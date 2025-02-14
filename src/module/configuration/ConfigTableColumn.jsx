import TableHeaderCell from "../../component/TableHeaderCell";
import Area from "../../component/Area";
import Dropdown from "../../component/Dropdown";
import { useBaseDB } from "../../context/BaseDB";
import { useConfig } from "../../context/Config";
import { useMeta } from "../../context/Meta";
import { useLanguage } from "../../context/Language";

const ConfigTableColumn = ({ name, applyFilter, width }) => {
    const { businessMeta } = useMeta();
    const { t, getLocalizedName } = useLanguage();
    const { BaseDB } = useBaseDB();
    const { filters, setFilters } = useConfig();

    // Determine the options based on column name
    const getOptions = () => {
        return [
            { value: "", label: t("components.select_option_all") },
            ...BaseDB.domains[name].map(option => ({
                value: option.value,
                label: name === "RULES"
                    ? getLocalizedName(businessMeta.pseudoMasterInfo.rules.find(rule => rule.ID === option.value))
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
