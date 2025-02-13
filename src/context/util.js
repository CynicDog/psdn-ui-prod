import React from "react";
import { useEffect, useState } from "react";
import ConfigTableHeader from "../module/configuration/ConfigTableHeader";
/**
 * Custom hook to debounce a value over a specified delay.
 * Useful for optimizing expensive operations like API calls, filtering, or searching.
 *
 * @param {any} value - The input value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {any} - The debounced value.
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timeout to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear timeout if value or delay changes before the timeout completes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
export default useDebounce;

/**
 * Extracts column names from `ConfigTableHeader`'s children (`ConfigTableColumn` components)
 * Uses direct component reference comparison.
 * @param {React.ReactNode} children - The children of ConfigTable
 * @returns {string[]} - Array of column names
 */
export const extractColumnNames = (children) => {

    // Find ConfigTableHeader in children
    const headerChild = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === ConfigTableHeader
    );

    // Extract column names from ConfigTableColumn inside ConfigTableHeader
    return headerChild
        ? React.Children.toArray(headerChild.props.children)
            .filter((col) => React.isValidElement(col) && col.props.name)
            .map((col) => col.props.name)
        : [];
};

/**
 * Enum-like object to represent roles within the application.
 * This is a JavaScript equivalent of an enum, which helps ensure consistency and prevent typos when handling roles.
 */
export const ROLES = Object.freeze({
    DEV: "DEV",             // Developer role
    CONSUMER: "CONSUMER",   // Consumer role
    ADMIN: "ADMIN",         // Administrator role
    VERIFIER: "VERIFIER",   // Verifier role
});