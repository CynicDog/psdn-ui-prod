import TableRow from "../../component/TableRow";
import TableRowCell from "../../component/TableRowCell";
import Span from "../../component/Span";
import Area from "../../component/Area";
import DefinitionDescription from "./DefinitionDescription";
import {useConfig} from "../../context/Config";
import {useLanguage} from "../../context/Language";

const DefinitionTableRow = ({ ruleId }) => {

    const { getLocalizedName } = useLanguage();
    const { pseudoMasterInfo } = useConfig();

    const rule = pseudoMasterInfo.rules.find(r => r.ID === ruleId)

    return (
        <TableRow cursor="auto">
            <TableRowCell>
                <Area my="2">
                    <Span fontSize="4" fontWeight="lighter">
                        {getLocalizedName(rule)}
                    </Span>
                </Area>
            </TableRowCell>
            <TableRowCell>
                <DefinitionDescription rule={rule}/>
            </TableRowCell>
        </TableRow>
    )
}

export default DefinitionTableRow;
