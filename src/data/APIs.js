export const fetchColumnData = async (COL_NAME) => {
    // TODO: replace with a backend endpoint
    const response = await fetch(`https://raw.githubusercontent.com/CynicDog/pseudonymization-parameters-in-action/refs/heads/main/data/${COL_NAME}.json`)
    if (!response.ok) {
        throw new Error('Failed to fetch column data');
    }
    return response.json();
}