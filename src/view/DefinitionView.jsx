import Area from "../component/Area";
import RuleDefinitionEntry from "../module/definition/RuleDefinitionEntry";
import Button from "../component/Button";
import {useLanguage} from "../context/Language";
import Icon from "../component/Icon";

const DefinitionView = () => {

    const { t } = useLanguage();

    return (
        <>
            <Area style={{fontSize: "0.9rem"}}>
                <Area flex justifyContent="end">
                    <Button size="sm" outline variant="primary">
                        {t('components.pseudonymization_guide_download')}
                    </Button>
                </Area>
                <Area>
                    <RuleDefinitionEntry ruleId="R1"/>
                    <RuleDefinitionEntry ruleId="R2"/>
                    <RuleDefinitionEntry ruleId="R3"/>
                    <RuleDefinitionEntry ruleId="R4"/>
                    <RuleDefinitionEntry ruleId="R5"/>
                    <RuleDefinitionEntry ruleId="R6"/>
                    <RuleDefinitionEntry ruleId="R7"/>
                    <RuleDefinitionEntry ruleId="R8"/>
                    <RuleDefinitionEntry ruleId="R9"/>
                    <RuleDefinitionEntry ruleId="R10"/>
                    <RuleDefinitionEntry ruleId="R11"/>
                    <RuleDefinitionEntry ruleId="R12"/>
                    <RuleDefinitionEntry ruleId="R13"/>
                    <RuleDefinitionEntry ruleId="R14"/>
                </Area>
            </Area>
        </>
    )
}

export default DefinitionView;
