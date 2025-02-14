import { createContext, useContext, useState, useEffect } from "react";
import { fetchPSDNMaster, fetchPSDNCodes, fetchRuleDefinitions } from "../data/APIs";

// Meta Context
const MetaContext = createContext();

export const MetaProvider = ({ children }) => {
    // Separate state for the business meta data and loading status
    const [businessMeta, setBusinessMeta] = useState({
        pseudoMasterInfo: null,
        pseudoCodeInfo: null,
        rules: null,
    });

    const [isMetaLoading, setIsMetaLoading] = useState(true); // Separate loading state

    useEffect(() => {
        async function fetchBusinessMetaData() {
            try {
                const pseudoMasterInfo = await fetchPSDNMaster();
                const pseudoCodeInfo = await fetchPSDNCodes();
                const rules = await fetchRuleDefinitions();

                // Update business meta data
                setBusinessMeta({
                    pseudoMasterInfo,
                    pseudoCodeInfo,
                    rules,
                });

                // Set loading to false after the data is fetched
                setIsMetaLoading(false);
            } catch (error) {
                console.error("Error loading business metadata:", error);

                // In case of error, set loading to false
                setIsMetaLoading(false);
            }
        }

        fetchBusinessMetaData();
    }, []);

    return (
        <MetaContext.Provider value={{ businessMeta, isMetaLoading }}>
            {children}
        </MetaContext.Provider>
    );
};

export const useMeta = () => useContext(MetaContext);
