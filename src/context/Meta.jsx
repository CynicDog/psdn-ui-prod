import { createContext, useContext, useState, useEffect } from "react";
import { fetchPSDNMaster, fetchPSDNCodes } from "../data/APIs";
import  ruleParameterDefinition from '../data/config/RuleParameterDefinitions.json';

// Meta Context
const MetaContext = createContext();

export const MetaProvider = ({ children }) => {

    const [pseudoMaster, setPseudoMaster] = useState({});
    const [pseudoCode, setPseudoCode] = useState({});
    const ruleDefinitions = ruleParameterDefinition;
    const [isMetaLoading, setIsMetaLoading] = useState(true);

    useEffect(() => {
        async function fetchBusinessMetaData() {
            try {
                const pseudoMasterData = await fetchPSDNMaster();
                const pseudoCodeData = await fetchPSDNCodes();

                // Set each state variable individually
                setPseudoMaster(pseudoMasterData || {});
                setPseudoCode(pseudoCodeData || {});

                setIsMetaLoading(false);
            } catch (error) {
                setIsMetaLoading(false);
            }
        }

        fetchBusinessMetaData();
    }, []);

    return (
        <MetaContext.Provider value={{ pseudoMaster, pseudoCode, ruleDefinitions, isMetaLoading }}>
            {children}
        </MetaContext.Provider>
    );
};

export const useMeta = () => useContext(MetaContext);
