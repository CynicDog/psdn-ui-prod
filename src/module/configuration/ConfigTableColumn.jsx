import TableHeaderCell from "../../component/TableHeaderCell";
import Area from "../../component/Area";
import Dropdown from "../../component/Dropdown";
import {useBaseDB} from "../../context/BaseDB";
import {useConfig} from "../../context/Config";
import {useMeta} from "../../context/Meta";
import {useLanguage} from "../../context/Language";
import Span from "../../component/Span";
import Icon from "../../component/Icon";
import Tooltip from "../../component/Tooltip";

const ConfigTableColumn = ({name, applyFilter, width}) => {
    const {pseudoMaster} = useMeta();
    const {t, getLocalizedName} = useLanguage();
    const {currentBaseDB} = useBaseDB();
    const {filters, setFilters} = useConfig();

    // Determine the options based on column name
    const getOptions = () => {
        return [
            {value: "", label: t("components.select_option_all")},
            ...currentBaseDB.domains[name].map(option => ({
                value: option,
                label: name === "RULES"
                    ? getLocalizedName(pseudoMaster.rules.find(rule => rule.ID === option))
                    : option
            }))
        ];
    };

    // TODO: implement sort & filter behavior
    return (
        <TableHeaderCell width={width}>
            <Area flex alignItems="center" gap="1">
                <Span>
                    {name}
                </Span>
                <Span variant="secondary" fontSize="6">
                    <Icon name="sort-alpha-down"/>
                </Span>
                {applyFilter && (
                <Tooltip
                    shownWhen="click"
                    position="right"
                    content={
                        <Area>
                            SOME BODY CONTENT..
                        </Area>
                    }
                    bg="body" border rounded shadow="sm" p="1" px="2" gap={8}
                >
                    <Span variant="secondary" fontSize="6">
                        <Icon name="filter"/>
                    </Span>
                </Tooltip>
                )}
            </Area>

            {/*{applyFilter && (*/}
            {/*    <Area>*/}
            {/*        <Dropdown*/}
            {/*            value={filters[name]}*/}
            {/*            onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}*/}
            {/*            options={getOptions()}*/}
            {/*        />*/}
            {/*    </Area>*/}
            {/*)}*/}

        </TableHeaderCell>
    );
};

export default ConfigTableColumn;
