import { useConfig } from "../context/Config"; // Assuming you're using context for config
import { useBaseDB } from "../context/BaseDB"; // Import BaseDB context
import ConfigTableRow from "./ConfigTableRow";
import TableRow from "../component/TableRow";
import TableRowCell from "../component/TableRowCell";
import TableBody from "../component/TableBody";

const FilteredTableBody = () => {
    const { paginatedRows, selectedRow, toggleRowSelection } = useConfig();
    const { BaseDB } = useBaseDB();

    // Get column names from BaseDB.columns
    const columnNames = Object.values(BaseDB.columns);

    return (
        <TableBody>
            {paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
                    <ConfigTableRow key={row.COL_NAME} row={row}
                        columnNames={columnNames}
                        selectedRowNames={selectedRow}
                        toggleRowSelection={toggleRowSelection}
                    />
                ))
            ) : (
                <TableRow>
                    <TableRowCell colSpan={columnNames.length + 1} className="text-center">
                        No records found
                    </TableRowCell>
                </TableRow>
            )}
        </TableBody>
    );
};

export default FilteredTableBody;
