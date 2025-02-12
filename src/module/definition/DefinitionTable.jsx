import Table from "../../component/Table";
import TableHeader from "../../component/TableHeader";
import TableHeaderCell from "../../component/TableHeaderCell";
import {useLanguage} from "../../context/Language";
import TableRow from "../../component/TableRow";
import Area from "../../component/Area";

const DefinitionTable = ({ children }) => {

    const { t } = useLanguage();

    return (
        <Table>
            {/* Definition Table Header */}
            <TableHeader>
                <TableRow>
                    <TableHeaderCell width="15%">
                        {t('components.definition_name')}
                    </TableHeaderCell>
                    <TableHeaderCell>
                        {t('components.definition_description')}
                    </TableHeaderCell>
                </TableRow>
            </TableHeader>

            {/* Definition Table Body */}
            {children}
        </Table>
    )
}
export default DefinitionTable;