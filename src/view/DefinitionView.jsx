import Area from "../component/Area";
import RuleDefinitionEntry from "../module/definition/RuleDefinitionEntry";
import Button from "../component/Button";
import {useLanguage} from "../context/Language";
import Icon from "../component/Icon";

const DefinitionView = () => {

    const { t } = useLanguage();

    return (
        <>
            <Area fontSize="0.9rem">
                <Area flex justifyContent="end">
                    <Button size="sm" outline variant="primary">
                        {t('components.pseudonymization_guide_download')}
                    </Button>
                </Area>
                <Area>
                    <RuleDefinitionEntry name="suppression"/>
                    <RuleDefinitionEntry name="masking"/>
                    <RuleDefinitionEntry name="outlier_generalization"/>
                    <RuleDefinitionEntry name="data_range"/>
                    <RuleDefinitionEntry name="top_down_coding"/>
                    <RuleDefinitionEntry name="partial_suppression"/>
                    <RuleDefinitionEntry name="top_down_nullification"/>
                    <RuleDefinitionEntry name="group_aggregation"/>
                    <RuleDefinitionEntry name="rounding"/>
                    <RuleDefinitionEntry name="random_rounding"/>
                    <RuleDefinitionEntry name="noise_addition"/>
                    <RuleDefinitionEntry name="permutation"/>
                    <RuleDefinitionEntry name="mapping"/>
                    <RuleDefinitionEntry name="random_selection_replacement"/>
                </Area>
            </Area>
        </>
    )
}

export default DefinitionView;
