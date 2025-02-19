import TableRow from "../../component/TableRow";
import TableHeaderCell from "../../component/TableHeaderCell";
import TableHeader from "../../component/TableHeader";
import Area from "../../component/Area";
import Span from "../../component/Span";
import CheckBox from "../../component/CheckBox";
import { useLanguage } from "../../context/Language";
import { useConfig } from "../../context/Config";
import Icon from "../../component/Icon";
import Tooltip from "../../component/Tooltip";

const ConfigTableHeader = ({ children }) => {

    const { t } = useLanguage();
    const { paginatedRowsAllSelected, toggleSelectAllRows, resetFilters } = useConfig();

    return (
        <TableHeader>
            <TableRow>
                {/* Config Table Select Control */}
                <TableHeaderCell width="5%">
                    <Area flex justifyContent="center" mb="3">
                        <Span>
                            {t('components.grid_row_control_check')}
                        </Span>
                    </Area>
                    <Area flex justifyContent="center">
                        <CheckBox
                            id="control_check"
                            checked={paginatedRowsAllSelected}
                            onChange={(e) => toggleSelectAllRows(e.target.checked)}
                        />
                    </Area>
                </TableHeaderCell>

                {/* BaseDB Columns Area  */}
                {children}

                <TableHeaderCell>
                    {/* Filter Reset Button */}
                    <Area flex justifyContent="center" alignItems="center" fontSize="large">
                        <Tooltip
                            position="top"
                            content={
                                <Area>
                                    {t('components.reset_filters')}
                                </Area>
                            }
                            bg="body" rounded shadow="sm" p="1" px="2" gap="3"
                        >
                            <Icon name="arrow-clockwise" onClick={resetFilters} />
                        </Tooltip>
                    </Area>
                </TableHeaderCell>
            </TableRow>
        </TableHeader>
    );
};

export default ConfigTableHeader
