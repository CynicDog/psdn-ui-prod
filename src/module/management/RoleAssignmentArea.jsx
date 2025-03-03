import Area from "../../component/Area";
import Span from "../../component/Span";

const RoleAssignmentArea = ({ appRoles }) => {

    return (
        <Area>
            {appRoles.map(role => (
                <Area border rounded shadow="sm" p="3" my="3">
                    <Span fontSize="3" fontWeight="lighter" underline>
                        {role.displayName}
                    </Span>
                    <Area  p="5">

                    </Area>
                </Area>
            ))}
        </Area>
    );
}
export default RoleAssignmentArea