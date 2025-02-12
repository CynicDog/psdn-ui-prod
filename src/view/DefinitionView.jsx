import Area from "../component/Area";
import DefinitionTable from "../module/DefinitionTable";
import DefinitionTableBody from "../module/DefinitionTableBody";
import DefinitionTableRow from "../module/DefinitionTableRow";

const DefinitionView = () => {

    return (
        <>
            <Area style={{ fontSize: "smaller" }}>
                <DefinitionTable>
                    <DefinitionTableBody>
                        <DefinitionTableRow name="R1" />
                        <DefinitionTableRow name="R2" />
                        <DefinitionTableRow name="R3" />
                        <DefinitionTableRow name="R4" />
                        <DefinitionTableRow name="R5" />
                        <DefinitionTableRow name="R6" />
                        <DefinitionTableRow name="R7" />
                        <DefinitionTableRow name="R8" />
                        <DefinitionTableRow name="R9" />
                        <DefinitionTableRow name="R10" />
                        <DefinitionTableRow name="R11" />
                        <DefinitionTableRow name="R12" />
                        <DefinitionTableRow name="R13" />
                        <DefinitionTableRow name="R14" />
                    </DefinitionTableBody>
                </DefinitionTable>
            </Area>
        </>
    )
}

export default DefinitionView;
