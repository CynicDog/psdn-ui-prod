import React from "react";
import { useEffect, useState } from "react";
import ConfigTableHeader from "../module/configuration/ConfigTableHeader";
/**
 * @description Custom hook to debounce a value over a specified delay.
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
 * @description Extracts column names from `ConfigTableHeader`'s children (`ConfigTableColumn` components)
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
 * @description Enum-like object to represent roles within the application.
 */
export const ROLES = Object.freeze({
    APPLICATION: "Role.Application",         // Application role
    ADMIN: "Role.Admin",                     // Administrator role
    OWNER: "Role.Owner",                     // User role
    UTILIZER: "Role.Utilizer",               // Consumer role
    VERIFIER: "Role.Verifier",               // Verifier role
});

/**
 * @description Enum-like object to represent usernames. FOR DEVELOPMENT ONLY
 */
export const DEV_USERS = Object.freeze({
    JohnDoe: {
        username: "JohnDoe",
        email: "JohnDoe@gmail.com",
        role: ROLES.APPLICATION
    },
    JaneSmith: {
        username: "JaneSmith",
        email: "JaneSmith@gmail.com",
        role: ROLES.OWNER
    },
    AlexBrown: {
        username: "AlexBrown",
        email: "AlexBrown@gmail.com",
        role: ROLES.UTILIZER
    },
    EmmaWilson: {
        username: "EmmaWilson",
        email: "EmmaWilson@gmail.com",
        role: ROLES.ADMIN
    },
    MaxDavis: {
        username: "MaxDavis",
        email: "MaxDavis@gmail.com",
        role: ROLES.VERIFIER
    }
});

export const getNextUser = (currentUsername) => {
    const users = Object.values(DEV_USERS);
    const currentIndex = users.findIndex(user => user.username === currentUsername);
    const nextIndex = (currentIndex + 1) % users.length;
    return users[nextIndex];
};