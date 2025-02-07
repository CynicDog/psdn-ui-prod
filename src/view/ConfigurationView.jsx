import React, { useState, useEffect } from "react";
import Area from "../component/Area";
import { Col, Row } from "../component/Grid";
import Table from "../component/Table";
import FilteredTableHeader from "../module/FilteredTableHeader";
import ConfigPopup from "../layout/ConfigPopup";
import FilteredTableBody from "../module/FilteredTableBody";
import PaginationControl from "../module/PaginationControl";
import {useTranslation} from "../context/Translation";
import {useBaseDB} from "../context/BaseDB";
import ConfigTableFilters from "../module/ConfigTableFilters";

const ConfigurationView = () => {

    const { t } = useTranslation();

    const { BaseDB } = useBaseDB();
    const [rows, setRows] = useState(BaseDB.rows);
    const columnNames = BaseDB.columns;

    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedRow, setSelectedRow] = useState([]);

    // Filter rows based on filter criteria
    const filteredRows = rows.filter((row) =>
        Object.keys(filters).every(
            (key) => filters[key] === 'All' || row[key].toString().toLowerCase() === filters[key].toLowerCase()
        )
    );

    // Paginate rows based on the current page and rows per page
    const paginatedRows = filteredRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Selection logic for individual rows
    const toggleRowSelection = (row, isSelecting) => {
        setSelectedRow((prevSelected) => {
            const updatedSelection = prevSelected.filter((name) => name !== row.COL_NAME);
            return isSelecting ? [...updatedSelection, row.COL_NAME] : updatedSelection;
        });
    };

    // Select or deselect all rows
    const toggleSelectAllRows = (isSelecting) => {
        const selectedRow = paginatedRows.map((r) => r.COL_NAME);
        setSelectedRow((prevSelected) =>
            isSelecting ? [...new Set([...prevSelected, ...selectedRow])] : prevSelected.filter((name) => !selectedRow.includes(name))
        );
    };

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    // Adjust current page if total pages change
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [filteredRows, currentPage, totalPages]);

    // Update master checkbox state for partial selection
    const allSelected = paginatedRows.every((row) => selectedRow.includes(row.COL_NAME));

    return (
        <>
            <Area style={{ fontSize: "smaller" }}>
                {/* Control Panel */}
                <Area className="control-panel" bg="body">
                    <Row p="2">
                        <Col width="5" responsive="lg">
                            <PaginationControl
                                currentPage={currentPage}
                                totalPages={totalPages}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                handlePageChange={setCurrentPage}
                            />
                        </Col>
                        <Col width="7" responsive="lg">
                            <Area flex justifyContent="end">
                                Search Input
                            </Area>
                        </Col>
                    </Row>
                </Area>

                {/* Data Table */}
                <Table>
                    <FilteredTableHeader>
                        <ConfigTableFilters
                            filterNames={columnNames}
                            filters={filters}
                            setFilters={setFilters}
                            allSelected={allSelected}
                            toggleSelectAllRows={toggleSelectAllRows}
                        />
                    </FilteredTableHeader>
                    {/*<FilteredTableBody*/}
                    {/*    columnNames={Object.keys(rows[0] || {})}*/}
                    {/*    selectedRow={selectedRow}*/}
                    {/*    toggleRowSelection={toggleRowSelection}*/}
                    {/*/>*/}
                </Table>
            </Area>

            {/* Configuration Popup */}
            <ConfigPopup />
        </>
    );
};

export default ConfigurationView;
