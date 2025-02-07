import { useConfig } from "../context/Config";
import { useBaseDB } from "../context/BaseDB";
import ConfigTableRow from "./ConfigTableRow";
import TableBody from "../component/TableBody";

const FilteredTableBody = () => {
    const { paginatedRows } = useConfig();
    const { BaseDB } = useBaseDB();

    // Get column names from BaseDB.columns
    const columnNames = Object.values(BaseDB.columns);

    return (
        <TableBody>
            {paginatedRows.length > 0 && (
                paginatedRows.map((row) => (
                    <ConfigTableRow key={row.COL_NAME} row={row} columnNames={columnNames}/>
                ))
            )}
        </TableBody>
    );
};

export default FilteredTableBody;
