import { createContext, useContext, useState, useEffect } from "react";
import { useBaseDB } from "./BaseDB";
import {useMeta} from "./Meta";

{/* Config Context */}
const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {

    const { ruleDefinitions } = useMeta();
    const { currentBaseDB, isCurrentBaseDBLoading } = useBaseDB();
    const [configRows, setConfigRows] = useState([]);

    const [filters, setFilters] = useState({});

    const [currentPage, setCurrentPage] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(null);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRule, setSelectedRule] = useState("");

    // DND states for dragging rules
    const [sourceRuleDraggable, setSourceRuleDraggable] = useState(null);
    const [targetRuleDraggable, setTargetRuleDraggable] = useState(null);

    const [focusedRow, setFocusedRow] = useState(null);

    // Update `configRows` only when current BaseDB is loaded
    useEffect(() => {
        if (!isCurrentBaseDBLoading && currentBaseDB) {
            setConfigRows(currentBaseDB.rows ?? []);
            setCurrentPage(1);
            setRowsPerPage(10);
            setFilters({});
            setSelectedRows([]);
        } else {
            setConfigRows([]);
        }
    }, [currentBaseDB, isCurrentBaseDBLoading]);


    // TODO: Filter fallback to 'All' returns no matching rows
    // Filter rows
    const filteredRows = configRows.filter((row) =>
        Object.keys(filters).every((key) => {
            if (filters[key] === 'All') return true;

            // Special handling for RULES filter
            if (key === 'RULES') {
                return filters[key].length === 0 || row.RULES?.some(rule => filters[key].includes(rule.RULE_ID));
            }

            // General filtering for other columns
            return row[key]?.toString().toLowerCase() === filters[key]?.toLowerCase();
        })
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

    // Update the current page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

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

    // // Handle batch update
    // const handleAPPT_YN_Update = (newValue) => {
    //     const updatedRows = configRows.map((row) =>
    //         selectedRows.includes(row.COL_NAME)
    //             ? {...row, APPT_YN: newValue}
    //             : row
    //     );
    //     setConfigRows(updatedRows);
    // };

    // Handle rule application with ORDER logic
    const handleAssignRule = () => {
        if (!selectedRule) return;

        const newRule = ruleDefinitions[selectedRule];

        setConfigRows(configRows.map((row) => {
            if (selectedRows.includes(row.COL_NAME)) {
                // if it's already a present rule
                if (row.RULES?.some(rule => rule.RULE_ID === selectedRule)) {
                    return row;
                } else {
                    // Insert new rule
                    const updatedRules = row.RULES ? [...row.RULES, newRule] : [newRule];
                    updatedRules.forEach((rule, index) => {
                        rule.ORDER = index;  // Set ORDER value based on the index
                    });

                    // Sort the rules by ORDER value
                    updatedRules.sort((a, b) => a.ORDER - b.ORDER);

                    return { ...row, RULES: updatedRules };
                }
            }
            return row;
        }));

        setSelectedRule("");
    };

    useEffect(() => {
        if (selectedRule) {
            handleAssignRule();
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

    // Handle delete a single rule
    const handleDeleteRule = (colName, ruleId) => {
        setConfigRows((prevRows) =>
            prevRows.map((row) => {
                if (row.COL_NAME === colName) {
                    const updatedRules = row.RULES.filter((rule) => rule.RULE_ID !== ruleId);

                    // Update ORDER for remaining rules
                    updatedRules.forEach((rule, index) => {
                        rule.ORDER = index;  // Reassign the ORDER to maintain sequence
                    });

                    return {
                        ...row,
                        RULES: updatedRules
                    };
                }
                return row;
            })
        );
    };

    // Handle the DND behavior of ordering rules over a column
    const handleMoveRule = (sourceColName, sourceIndex, targetColName, targetIndex) => {
        setConfigRows((prevRows) =>
            prevRows.map((row) => {
                if (row.COL_NAME === sourceColName) {
                    const updatedRules = [...row.RULES];
                    const [movedRule] = updatedRules.splice(sourceIndex, 1);

                    updatedRules.splice(targetIndex, 0, movedRule);
                    updatedRules.forEach((rule, index) => {
                        rule.ORDER = index;
                    });

                    return { ...row, RULES: updatedRules };
                }
                return row;
            })
        );
    };

    // Inline Editing State (No need for commit, applied immediately)
    const updateParameterValue = (rowName, ruleId, paramId, newValue) => {
        // Update the specific row's rules
        setConfigRows((prevRows) =>
            prevRows.map((row) => {
                if (row.COL_NAME === rowName) {
                    // Find the rule by RULE_ID
                    const updatedRules = row.RULES.map((rule) => {
                        if (rule.RULE_ID === ruleId) {
                            // Update the specific VRBL (parameter) inside the rule
                            const updatedVrbls = rule.VRBLs.map((vrbl) => {
                                if (vrbl.id === paramId) {
                                    return { ...vrbl, value: newValue };
                                }
                                return vrbl;
                            });

                            // Return the updated rule with the modified VRBLs
                            return { ...rule, VRBLs: updatedVrbls };
                        }
                        return rule;
                    });

                    // Return the updated row with modified rules
                    return { ...row, RULES: updatedRules };
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

                /* Paginate rows */
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

                /* Focused Row on ConfigPopup */
                focusedRow, setFocusedRow,

                /* Drag-and-drop state management */
                sourceRuleDraggable, setSourceRuleDraggable,
                targetRuleDraggable, setTargetRuleDraggable,

                /* Actions on selected rows */
                handleAssignRule,
                handleDeleteRule,
                handleDeleteAllRules,
                // handleAPPT_YN_Update,
                handleMoveRule,

                /* Inline editing */
                updateParameterValue,
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);