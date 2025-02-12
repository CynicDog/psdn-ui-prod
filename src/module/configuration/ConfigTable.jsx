import React from "react";
import Table from "../../component/Table";
import ConfigTableRow from "./ConfigTableRow";
import TableBody from "../../component/TableBody";
import {useConfig} from "../../context/Config";
import {extractColumnNames} from "../../context/util";
import {useLanguage} from "../../context/Language";
import TableRow from "../../component/TableRow";
import TableRowCell from "../../component/TableRowCell";

const ConfigTable = ({children}) => {

    const { t } = useLanguage();
    const {paginatedRows} = useConfig();
    const columnNames = extractColumnNames(children);

    return (
        <Table>
            {/* Config Table Header */}
            {children}

            {/* Config Table Body */}
            <TableBody>
                {paginatedRows.length > 0 ? (
                    paginatedRows.map((row) => (
                        <ConfigTableRow key={row.COL_NAME} row={row} columnNames={columnNames}/>
                    ))
                ) : (
                    <TableRow>
                        <TableRowCell colSpan={Object.keys(columnNames).length + 1} className="text-center">
                            {t('messages.found_no_record_matching_filters')}
                        </TableRowCell>
                        <TableRowCell>
                            {/* Placeholder cell for the popup icon column */}
                        </TableRowCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ConfigTable;
