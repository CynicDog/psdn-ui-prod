import React from "react";
import Table from "../component/Table";
import ConfigTableRow from "./ConfigTableRow";
import TableBody from "../component/TableBody";
import { useConfig } from "../context/Config";
import {extractColumnNames} from "../context/util";

const ConfigTable = ({ children }) => {

    const { paginatedRows } = useConfig();
    const columnNames = extractColumnNames(children);

    return (
        <Table>
            {/* Config Table Header */}
            {children}

            {/* Config Table Body */}
            <TableBody>
                {paginatedRows.length > 0 &&
                    paginatedRows.map((row) => (
                        <ConfigTableRow key={row.COL_NAME} row={row} columnNames={columnNames} />
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default ConfigTable;
