import { createContext, useContext, useState, useEffect } from "react";
import { fetchPSDNMaster, fetchPSDNCodes, fetchRuleDefinitions } from "../data/APIs";

{/* Meta Context */}
const MetaContext = createContext();

export const MetaProvider = ({ children }) => {

    // Pseudonymization Business Meta information
    const [businessMeta, setBusinessMeta] = useState({
        pseudoMasterInfo: null,
        pseudoCodeInfo: null,
        rules: null,
        isLoading: true,
    });

    useEffect(() => {
        async function fetchBusinessMetaData() {
            try {
                const pseudoMasterInfo = await fetchPSDNMaster();
                const pseudoCodeInfo = await fetchPSDNCodes();
                const rules = await fetchRuleDefinitions();

                setBusinessMeta({
                    pseudoMasterInfo,
                    pseudoCodeInfo,
                    rules,
                    isLoading: false,
                });
            } catch (error) {
                console.error("Error loading business metadata:", error);
                setBusinessMeta(prev => ({
                    ...prev,
                    isLoading: false,
                }));
            }
        }
        fetchBusinessMetaData();
    }, []);

    return (
        <MetaContext.Provider value={businessMeta}>
            {children}
        </MetaContext.Provider>
    );
};

export const useMeta = () => useContext(MetaContext);
