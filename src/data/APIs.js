/**
 * Fetches column data from a mock API.
 * TODO: Replace with a backend endpoint in production.
 *
 * @param {string} COL_NAME - The name of the column to fetch data for.
 * @returns {Promise<Object>} - The column data in JSON format.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchColumnData = async (COL_NAME) => {
    const response = await fetch(`https://raw.githubusercontent.com/CynicDog/pseudonymization-parameters-in-action/refs/heads/main/data/${COL_NAME}.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch column data');
    }

    return response.json();
};


/**
 * Fetches rule definitions data from the mock API.
 * TODO: Replace with a backend endpoint in production.
 *
 * @returns {Promise<Object>} - The rule definitions data in JSON format.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchRuleDefinitions = async () => {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/CynicDog/psdn-mock-server/refs/heads/main/data/meta/business/PSDN-definition.json`);

        if (!response.ok) {
            throw new Error('Failed to fetch rule definitions');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching rule definitions:', error);
        throw error;
    }
};


/**
 * Fetches PSDN master data from the mock API.
 * TODO: Replace with a backend endpoint in production.
 *
 * @returns {Promise<Object>} - The PSDN master data in JSON format.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchPSDNMaster = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/CynicDog/psdn-mock-server/refs/heads/main/data/meta/business/PSDN-master.json');

        if (!response.ok) {
            throw new Error('Failed to fetch PSDN master data');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching PSDN master data:', error);
        throw error;
    }
};


/**
 * Fetches PSDN codes data from the mock API.
 * TODO: Replace with a backend endpoint in production.
 *
 * @returns {Promise<Object>} - The PSDN codes data in JSON format.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchPSDNCodes = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/CynicDog/psdn-mock-server/refs/heads/main/data/meta/business/PSDN-code.json');

        if (!response.ok) {
            throw new Error('Failed to fetch PSDN codes data');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching PSDN codes data:', error);
        throw error;
    }
};


/**
 * Fetches project data for a specific user.
 * Simulates retrieving user project data from a local JSON file.
 * TODO: Replace with a backend API call in production.
 *
 * @param {string} username - The username of the user whose projects are being fetched.
 * @returns {Promise<Object|null>} - The user's project data or null if an error occurs.
 */
export const fetchUserProjects = async (username) => {
    try {
        // Simulating fetching JSON from local file
        const response = await fetch(`https://raw.githubusercontent.com/CynicDog/psdn-mock-server/refs/heads/main/data/scenario/${username}/projects.json`);

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return null;
    }
};


/**
 * Fetches table data dynamically based on the given table name.
 * TODO: Replace with a backend API call in production.
 *
 * @param {string} tableName - The table name to fetch.
 * @returns {Promise<Object>} - A promise resolving to an object with the table data.
 */
export const fetchProjectTable = async (tableName) => {
    try {
        // Fetch the data for the given table from the mock server
        const response = await fetch(`https://raw.githubusercontent.com/CynicDog/psdn-mock-server/refs/heads/main/data/meta/table/${tableName}.json`);
        if (!response.ok) throw new Error(`Failed to fetch ${tableName} data`);

        const tableData = await response.json();

        // Return the fetched data in an object with the table name as key
        return { [tableName]: tableData };
    } catch (error) {
        console.error("Error fetching project table:", error);
        return null;
    }
};
