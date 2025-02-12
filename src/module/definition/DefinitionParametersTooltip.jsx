import React from "react";
import { useLanguage } from "../../context/Language";
import Area from "../../component/Area";
import Span from "../../component/Span";

const DefinitionParametersTooltip = ({ parameter, codeInfo, typeDisplay }) => {
    const { getLocalizedName } = useLanguage();

    return (
        <Area>
            <Span fontWeight="bold">{getLocalizedName(parameter)}: </Span>
            {typeDisplay ? (
                <Span>{typeDisplay}</Span>
            ) : (
                codeInfo && codeInfo.length > 0 && (
                    <Area mt="2">
                        {codeInfo.map((codeItem, index) => (
                            <Area key={index}>
                                <Span badge="primary" mb="1">
                                    {getLocalizedName({ NAME_EN: codeItem.en, NAME_KO: codeItem.ko })}
                                </Span>
                            </Area>
                        ))}
                    </Area>
                )
            )}
        </Area>
    );
};

export default DefinitionParametersTooltip;
