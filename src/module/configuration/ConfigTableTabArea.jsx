import { useBaseDB } from "../../context/BaseDB";
import Area from "../../component/Area";
import { useProject } from "../../context/Project";
import LoadingSpinner from "../../component/LoadingSpinner";
import ConfigTableTab from "./ConfigTableTab";

const ConfigTableTabArea = () => {
    const { currentProject, isProjectLoading } = useProject();
    const { BaseDB, currentBaseDB, setCurrentBaseDB } = useBaseDB();

    if (isProjectLoading) {
        return <LoadingSpinner />
    }
    if (currentProject?.TABLES.length === 0) {
        return;
    }

    return (
        <Area width="100%">
            <Area flex borderBottom>
                {currentProject.TABLES.map((table, index) => (
                    <ConfigTableTab
                        key={index}
                        order={table.ORDER}
                        configTable={table}
                        currentBaseDB={currentBaseDB}
                        onSelect={() => setCurrentBaseDB(BaseDB.find(db => db.id === table.ID))}
                    />
                ))}
            </Area>
        </Area>
    );
};

export default ConfigTableTabArea;
