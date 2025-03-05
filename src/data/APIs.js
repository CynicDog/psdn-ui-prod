import {fetchAuthorizedData, fetchData} from "./util";

/**
 * @description Define the backend server URL based on the environment. Default to the local mock server url.
 * @example
 *      For Production, run:
 *          REACT_APP_CHANNEL_API_SERVER_URL=https://pseudo-backend-server npm run start
 *
 *      For Development, run the below commands in separate terminals:
 *          - node ./src/data/mock-server/server.js         # starts up a mock server process at `localhost:8888`
 *          - npm run start
 */
// TODO: merge mock server into Channel API server. Delete after merge.
const CHANNEL_API_SERVER_URL = process.env.REACT_APP_CHANNEL_API_SERVER_URL || "http://localhost:7999/v1/tenants/KOREA/KUDP/channel"
const MOCK_SERVER_URL =  "http://localhost:8888"

// TODO: code type propagation
/**
 * @description Fetches PSDN codes data.
 *
 * @returns {Promise<Object>} - The PSDN codes data in JSON format.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchPSDNCodes = async () => {
    try {
        const response = await fetch(`${MOCK_SERVER_URL}/meta/business/PSDN-code`);
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
 * @description Fetch Pseudonymization Rule data.
 *
 * @returns {Promise<Object>} - The Pseudonymization Rule data in JSON format.
 */
export const fetchMetaRules = () => fetchData("meta/rules");


/**
 * @description Fetch Pseudonymization Parameter data.
 *
 * @returns {Promise<Object>} - The Pseudonymization Parameter data in JSON format.
 */
export const fetchMetaParameters = () => fetchData("meta/parameters");


/**
 * @description Fetches project data for the authenticated user.
 *
 * @param {Object} auth - The authentication object containing the JWT token and username.
 * @returns {Promise<Object|null>} - The user's project data or null if an error occurs.
 */
export const fetchUserProjects = (auth) => fetchAuthorizedData(`user/${auth.username}/projects`, auth);


/**
 * @description Fetches table data dynamically based on the given table name.
 *
 * @param {string} tableId - The table id to fetch.
 * @returns {Promise<Object>} - A promise resolving to the table data directly, without the table name key.
 */
export const fetchProjectTable = async (tableId) => {
    try {
        const response = await fetch(`${MOCK_SERVER_URL}/configTables/${tableId}`);
        if (!response.ok) throw new Error(`Failed to fetch ${tableId} data`);

        return await response.json();
    } catch (error) {
        console.error("Error fetching project table:", error);
        return null;
    }
};


// /**
//  * @description Fetches table data that are given permission to a user.
//  *
//  * @param {string} username - The username of the user whose permission-given tables are being fetched.
//  * @returns {Promise<Object>} - A promise resolving to the table data directly.
//  */
// export const fetchUserPermissionGivenTable = async (username) => {
//     try {
//         const response = await fetch(`${BACKEND_URL}/user/${username}/grantedTables`);
//         if (!response.ok) throw new Error(`Failed to fetch ${username} data`);
//
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching project table:", error);
//         return null;
//     }
// };


/**
 * @description Sends a request to the Channel API to greet as an application.
 *
 * @param {Object} auth - The authentication object containing the JWT token.
 *
 * @returns {Promise<string>} - A promise that resolves to the response from the Channel API
 *                              as plain text (e.g., "true" or "false").
 *
 * @throws {Error} - Throws an error if the token is missing, invalid, or expired.
 */
export const greetAsApplication = async (auth) => {
    const token = auth.token;

    // Ensure that the token is available
    if (!token) {
        throw new Error('Authentication token is missing');
    }

    // Set the Authorization header with the Bearer token
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        // Send a GET request to the greetAsApplication endpoint
        const response = await fetch(`${CHANNEL_API_SERVER_URL}/user/greetAsApplication`, {
            method: "GET",
            headers: headers
        });

        // Handle invalid token or session expiration
        if (response.status === 401) {
            console.warn("Token expired or invalid.");
            throw new Error("Session expired. Please log in again.");
        }

        // Return the response as plain text
        return await response.text();
    } catch (error) {
        // Log and rethrow any errors that occur during the fetch
        console.error("Error fetching from Channel API:", error);
        throw error;
    }
};


/**
 * @description Sends a request to the Channel API to retrieve all users.
 *
 * @param {Object} auth - The authentication object containing the JWT token.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response from the Channel API
 *                              as json format.
 *
 * @throws {Error} - Throws an error if the token is missing, invalid, or expired.
 */
export const getAllUsers = async (auth) => {

    const token = auth.token;
    if (!token) {
        throw new Error('Authentication token is missing');
    }
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${CHANNEL_API_SERVER_URL}/user/getUsers`, {
            method: "GET",
            headers: headers
        });

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getAppRoles = async (auth) => {

    const token = auth.token;
    if (!token) {
        throw new Error('Authentication token is missing');
    }
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${CHANNEL_API_SERVER_URL}/user/getAppRoles`, {
            method: "GET",
            headers: headers
        });

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getUserRoles = async (auth) => {

    const token = auth.token;
    if (!token) {
        throw new Error('Authentication token is missing');
    }
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${MOCK_SERVER_URL}/management/userRoles`);

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getAllProjects = async (auth) => {

    const token = auth.token;
    if (!token) {
        throw new Error('Authentication token is missing');
    }
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${MOCK_SERVER_URL}/management/projects`);

        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * @description Fetches column data.
 *
 * @param {string} COL_NAME - The name of the column to fetch data for.
 * @returns {Promise<Object>} - The column data in JSON format.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchColumnData = async (COL_NAME) => {

    const response = await fetch(`${MOCK_SERVER_URL}/raw/${COL_NAME}`);

    if (!response.ok) {
        throw new Error('Failed to fetch column data');
    }

    return response.json();
};