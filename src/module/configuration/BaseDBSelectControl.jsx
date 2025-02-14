import { useBaseDB } from "../../context/BaseDB";
import Area from "../../component/Area";
import { useProject } from "../../context/Project";

const BaseDBSelectControl = () => {
    const { currentProject } = useProject();
    const { BaseDB, isBaseDBLoading, currentBaseDB, setCurrentBaseDB } = useBaseDB();

    // Render a loading spinner if BaseDB is loading
    if (isBaseDBLoading) {
        return (
            <Area style={{ textAlign: "center" }}>
                Loading BaseDB...
            </Area>
        );
    }

    // No BaseDB or no tables to display
    if (BaseDB.length === 0 || currentProject?.TABLES.length === 0) {
        return (
            <Area style={{ textAlign: "center" }}>
                No tables available for the current project.
            </Area>
        );
    }

    return (
        <>
            <Area style={{ width: "100%" }} >
                <Area flex borderBottom>
                    {BaseDB.map((table, index) => (
                        <Area
                            key={index}
                            bg={currentBaseDB?.name === table.name ? "primary-subtle" : "body"}
                            onClick={() => setCurrentBaseDB(table)}
                            style={{
                                cursor: "pointer",
                                borderRadius: "5px 5px 0 0"
                            }}
                            textPosition="center"
                            px="3"
                        >
                            {table.name}
                        </Area>
                    ))}
                </Area>
            </Area>
        </>
    );
};

export default BaseDBSelectControl;
