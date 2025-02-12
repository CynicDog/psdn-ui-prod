import {useLanguage} from "../../context/Language";

const DefinitionParametersTooltip = ({ parameter }) => {

    const { getLocalizedName } = useLanguage();

    return (
        <>
            {getLocalizedName(parameter)}
        </>
    )
}

export default DefinitionParametersTooltip;