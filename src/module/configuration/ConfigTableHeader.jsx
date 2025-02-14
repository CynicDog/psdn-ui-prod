import TableRow from "../../component/TableRow";
import TableHeaderCell from "../../component/TableHeaderCell";
import TableHeader from "../../component/TableHeader";
import Area from "../../component/Area";
import Span from "../../component/Span";
import CheckBox from "../../component/CheckBox";
import { useLanguage } from "../../context/Language";
import { useConfig } from "../../context/Config";

const ConfigTableHeader = ({ children }) => {

    const { t } = useLanguage();
    const { paginatedRowsAllSelected, toggleSelectAllRows } = useConfig();

    return (
        <TableHeader>
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
                            checked={paginatedRowsAllSelected}
                            onChange={(e) => toggleSelectAllRows(e.target.checked)}
                        />
                    </Area>
                </TableHeaderCell>
                {children}
                <TableHeaderCell>{/* Placeholder for popup icon */}</TableHeaderCell>
            </TableRow>
        </TableHeader>
    );
};

export default ConfigTableHeader
