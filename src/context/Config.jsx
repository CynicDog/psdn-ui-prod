import { createContext, useContext, useState, useEffect } from "react";
import { useBaseDB } from "./BaseDB";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const { BaseDB } = useBaseDB();
    const [configRows, setConfigRows] = useState(BaseDB.rows);

    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState([]);

    // Filter rows
    const filteredRows = configRows.filter((row) =>
        Object.keys(filters).every(
            (key) => filters[key] === "All" || row[key]?.toString().toLowerCase() === filters[key]?.toLowerCase()
        )
    );

    // Paginate rows
    const paginatedRows = filteredRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Row selection
    const toggleRowSelection = (row, isSelecting) => {
        setSelectedRow((prevSelected) => {
            const updatedSelection = prevSelected.filter((name) => name !== row.COL_NAME);
            return isSelecting ? [...updatedSelection, row.COL_NAME] : updatedSelection;
        });
    };

    const toggleSelectAllRows = (isSelecting) => {
        const selectedRow = paginatedRows.map((r) => r.COL_NAME);
        setSelectedRow((prevSelected) =>
            isSelecting ? [...new Set([...prevSelected, ...selectedRow])] : prevSelected.filter((name) => !selectedRow.includes(name))
        );
    };

    // Check if all rows in the current page are selected
    const allSelected = paginatedRows.every((row) => selectedRow.includes(row.COL_NAME));

    // Pagination updates
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [filteredRows, currentPage, totalPages]);

    const handleDeleteRule = (ruleId) => {
        // Define your deletion logic here
        console.log("Deleted rule with ID:", ruleId);
    };


    return (
        <ConfigContext.Provider
            value={{
                configRows, setConfigRows,
                filters, setFilters,
                currentPage, setCurrentPage,
                rowsPerPage, setRowsPerPage,
                totalPages,
                selectedRow, setSelectedRow,
                filteredRows,
                paginatedRows,
                toggleRowSelection,
                toggleSelectAllRows,
                allSelected,
                handleDeleteRule
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
