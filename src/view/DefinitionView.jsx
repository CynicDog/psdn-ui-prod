import Area from "../component/Area";
import DefinitionTable from "../module/definition/DefinitionTable";
import DefinitionTableBody from "../module/definition/DefinitionTableBody";
import DefinitionTableRow from "../module/definition/DefinitionTableRow";
import Button from "../component/Button";

const DefinitionView = () => {

    return (
        <>
            <Area style={{ fontSize: "0.9rem" }}>
                <Area flex justifyContent="end">
                    <Button size="sm" variant="light">
                        가명화 매뉴얼 내려받기
                    </Button>
                </Area>
                <DefinitionTable>
                    <DefinitionTableBody>
                        <DefinitionTableRow ruleId="R1" />
                        <DefinitionTableRow ruleId="R2" />
                        <DefinitionTableRow ruleId="R3" />
                        <DefinitionTableRow ruleId="R4" />
                        <DefinitionTableRow ruleId="R5" />
                        {/*<DefinitionTableRow ruleId="R6" />*/}
                        {/*<DefinitionTableRow ruleId="R7" />*/}
                        {/*<DefinitionTableRow ruleId="R8" />*/}
                        {/*<DefinitionTableRow ruleId="R9" />*/}
                        {/*<DefinitionTableRow ruleId="R10" />*/}
                        {/*<DefinitionTableRow ruleId="R11" />*/}
                        {/*<DefinitionTableRow ruleId="R12" />*/}
                        {/*<DefinitionTableRow ruleId="R13" />*/}
                        {/*<DefinitionTableRow ruleId="R14" />*/}
                    </DefinitionTableBody>
                </DefinitionTable>
            </Area>
        </>
    )
}

export default DefinitionView;
