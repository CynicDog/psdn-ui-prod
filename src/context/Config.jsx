import { createContext, useContext, useState, useEffect } from "react";
import { useBaseDB } from "./BaseDB";
import ruleDefinitions from "../data/RuleDefinitions.json"

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const { BaseDB } = useBaseDB();
    const [configRows, setConfigRows] = useState(BaseDB.rows);

    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);

    // Filter rows
    const filteredRows = configRows.filter((row) =>
        Object.keys(filters).every(
            (key) => filters[key] === "All" || row[key]?.toString().toLowerCase() === filters[key]?.toLowerCase()
        )
    );

    // Reset filters to default values
    const resetFilters = () => {
        setFilters(
            Object.keys(filters).reduce((acc, col) => {
                acc[col] = "All";
                return acc;
            }, {})
        );
    };

    // Paginate rows
    const paginatedRows = filteredRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Row selection
    const toggleRowSelection = (row, isSelecting) => {
        setSelectedRows((prevSelected) => {
            const updatedSelection = prevSelected.filter((name) => name !== row.COL_NAME);
            return isSelecting ? [...updatedSelection, row.COL_NAME] : updatedSelection;
        });
    };

    // Select all rows on the current page
    const toggleSelectAllRows = (isSelecting) => {
        const selectedRow = paginatedRows.map((r) => r.COL_NAME);
        setSelectedRows((prevSelected) =>
            isSelecting ? [...new Set([...prevSelected, ...selectedRow])] : prevSelected.filter((name) => !selectedRow.includes(name))
        );
    };

    // Check if all rows in the current page are selected
    const paginatedRowsAllSelected = paginatedRows.every((row) => selectedRows.includes(row.COL_NAME));

    // Pagination updates
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [filteredRows, currentPage, totalPages]);

    // Handle batch update
    const handleMasterControlUpdate = (newValue) => {
        const updatedRows = configRows.map((row) =>
            selectedRows.includes(row.COL_NAME)
                ? {...row, APPT_YN: newValue}
                : row
        );
        setConfigRows(updatedRows);
    };

    const [selectedRule, setSelectedRule] = useState("");

    // Handle rule application
    const handleApplyRule = () => {
        if (!selectedRule) return;

        const newRule = ruleDefinitions[selectedRule];

        setConfigRows(configRows.map((row) => {
            if (selectedRows.includes(row.COL_NAME)) {
                // if it's already a present rule
                if (row.RULES?.some(rule => rule.RULE_ID === selectedRule)) {
                    return row;
                } else {
                    return {
                        ...row,
                        RULES: row.RULES ? [...row.RULES, newRule] : [newRule]
                    };
                }
            }
            return row;
        }));

        setSelectedRule("");
    };

    useEffect(() => {
        if (selectedRule) {
            handleApplyRule();
        }
    }, [selectedRule]);


    // Handle delete all rules for selected rows
    const handleDeleteAllRules = () => {
        setConfigRows((prevRows) =>
            prevRows.map((row) => {
                if (selectedRows.includes(row.COL_NAME)) {
                    return {
                        ...row,
                        RULES: []
                    };
                }
                return row;
            })
        );
    };

    // Handle delete a single
    const handleDeleteRule = (colName, ruleId) => {
        setConfigRows((prevRows) =>
            prevRows.map((row) => {
                if (row.COL_NAME === colName) {
                    return {
                        ...row,
                        RULES: row.RULES.filter((rule) => rule.RULE_ID !== ruleId)
                    };
                }
                return row;
            })
        );
    };

    return (
        <ConfigContext.Provider
            value={{
                /* User-configurable gadget object */
                configRows, setConfigRows,

                /* Filter rows */
                filters, setFilters, resetFilters,
                filteredRows,

                /* Filter rows */
                paginatedRows,
                paginatedRowsAllSelected,
                currentPage, setCurrentPage,
                rowsPerPage, setRowsPerPage,
                totalPages,

                /* Row selections */
                selectedRows, setSelectedRows,
                toggleRowSelection,
                toggleSelectAllRows,
                selectedRule, setSelectedRule,

                /* Actions on selected rows */
                handleApplyRule,
                handleDeleteRule,
                handleDeleteAllRules,
                handleMasterControlUpdate
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);