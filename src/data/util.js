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
// TODO: merge mock server into Channel API server
const CHANNEL_API_SERVER_URL = process.env.REACT_APP_CHANNEL_API_SERVER_URL || "http://localhost:7999/v1/tenants/KOREA/KUDP/channel"
const MOCK_SERVER_URL =  "http://localhost:8888"


/**
 * @description Fetch data from the specified endpoint.
 *
 * @param {string} endpoint - The API endpoint for fetching data.
 * @returns {Promise<Object>} - The data in JSON format.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const getData = async (endpoint) => {
    try {
        const response = await fetch(`${CHANNEL_API_SERVER_URL}/${endpoint}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint} data`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint} data:`, error);
        throw error;
    }
};


/**
 * @description Sends an authorized request to the specified endpoint.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Object} auth - The authentication object containing the JWT token.
 *
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 *
 * @throws {Error} - Throws an error if the token is missing, invalid, or expired.
 */
export const getAuthorizedData = async (endpoint, auth) => {
    if (!auth?.token) {
        throw new Error("Authentication token is missing");
    }

    const headers = {
        "Authorization": `Bearer ${auth.token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${CHANNEL_API_SERVER_URL}/${endpoint}`, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint} data`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint} data:`, error);
        throw error;
    }
};


/**
 * @description Sends an authorized POST request to the specified endpoint.
 *
 * @param {string} endpoint - The API endpoint to send data to.
 * @param {Object} auth - The authentication object containing the JWT token.
 * @param {Object} data - The payload to be sent in the request body.
 *
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 *
 * @throws {Error} - Throws an error if the token is missing, invalid, or if the request fails.
 */
export const postAuthorizedData = async (endpoint, auth, data) => {
    if (!auth?.token) {
        throw new Error("Authentication token is missing");
    }

    const headers = {
        "Authorization": `Bearer ${auth.token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${CHANNEL_API_SERVER_URL}/${endpoint}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to post data to ${endpoint}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error posting data to ${endpoint}:`, error);
        throw error;
    }
};
