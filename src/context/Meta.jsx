import { createContext, useContext, useState, useEffect } from "react";
import { fetchPSDNMaster, fetchPSDNCodes, fetchRuleDefinitions } from "../data/APIs";

// Meta Context
const MetaContext = createContext();

export const MetaProvider = ({ children }) => {
    const [businessMeta, setBusinessMeta] = useState({
        pseudoMasterInfo: {},
        pseudoCodeInfo: {},
        ruleDefinitions: {},
    });

    const [isMetaLoading, setIsMetaLoading] = useState(true);

    useEffect(() => {
        async function fetchBusinessMetaData() {
            try {
                const pseudoMasterInfo = await fetchPSDNMaster();
                const pseudoCodeInfo = await fetchPSDNCodes();
                const ruleDefinitions = await fetchRuleDefinitions();

                setBusinessMeta({
                    pseudoMasterInfo: pseudoMasterInfo || {},
                    pseudoCodeInfo: pseudoCodeInfo || {},
                    ruleDefinitions: ruleDefinitions || {},
                });

                setIsMetaLoading(false);
            } catch (error) {
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
