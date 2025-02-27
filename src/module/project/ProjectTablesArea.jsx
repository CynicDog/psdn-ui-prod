import Area from "../../component/Area";

const ProjectTablesArea = ({ tables }) => {
    return (
        <Area>
            {tables && tables.map(table => (
                <Area key={table.ID}>
                    {table.ID}
                </Area>
            ))}
        </Area>
    );
};

export default ProjectTablesArea;
