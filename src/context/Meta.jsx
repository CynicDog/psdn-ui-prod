import { createContext, useContext, useState, useEffect } from "react";
import { fetchPSDNCodes, fetchMetaRules, fetchMetaParameters} from "../data/APIs";
import  ruleParameterDefinition from '../data/config/RuleParameterDefinitions.json';

// Meta Context
const MetaContext = createContext();

export const MetaProvider = ({ children }) => {

    const [pseudoRules, setPseudoRules] = useState(null);
    const [pseudoParameters, setPseudoParameters] = useState(null);
    const [pseudoCode, setPseudoCode] = useState({});

    const [isMetaLoading, setIsMetaLoading] = useState(true);

    const ruleDefinitions = ruleParameterDefinition;

    useEffect(() => {
        async function fetchPseudonymizationMeta() {
            try {
                const pseudoRuleData = await fetchMetaRules();
                const pseudoParameterData = await fetchMetaParameters();

                setPseudoRules(pseudoRuleData || null);
                setPseudoParameters(pseudoParameterData || null)

                const pseudoCodeData = await fetchPSDNCodes();
                setPseudoCode(pseudoCodeData || {});

                setIsMetaLoading(false);
            } catch (error) {
                setIsMetaLoading(false);
            }
        }

        fetchPseudonymizationMeta();
    }, []);

    return (
        <MetaContext.Provider value={{
            pseudoRules, pseudoParameters, pseudoCode, isMetaLoading,
            ruleDefinitions
        }}>
            {children}
        </MetaContext.Provider>
    );
};

export const useMeta = () => useContext(MetaContext);
