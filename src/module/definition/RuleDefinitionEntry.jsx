import Span from "../../component/Span";
import Area from "../../component/Area";
import DefinitionDescription from "./DefinitionDescription";
import {useLanguage} from "../../context/Language";
import {Col, Row} from "../../component/Grid";
import {useMeta} from "../../context/Meta";

const RuleDefinitionEntry = ({ ruleId }) => {

    const { getLocalizedName } = useLanguage();
    const { pseudoMaster } = useMeta();

    const rule = pseudoMaster.rules.find(r => r.ID === ruleId)

    return (
        <Area m="4" p="3">
            <Row>
                <Col width="2" responsive="lg">
                    <Area>
                        <Span fontSize="4" fontWeight="lighter" underline>
                            {getLocalizedName(rule)}
                        </Span>
                    </Area>
                </Col>
                <Col width="10" responsive="lg">
                    <DefinitionDescription rule={rule}/>
                </Col>
            </Row>
        </Area>
    )
}

export default RuleDefinitionEntry;
