import {useQuery} from "react-query";
import {getAllUsers, getAppRoles} from "../data/APIs";
import {useAuth} from "../context/Auth";
import Area from "../component/Area";
import {Col, Row} from "../component/Grid";
import RoleUsersArea from "../module/management/RoleUsersArea";
import RoleAssignmentArea from "../module/management/RoleAssignmentArea";
import LoadingSpinner from "../component/LoadingSpinner";

const RoleManagementView = () => {

    const { auth } = useAuth();

    const {data: users, isUsersLoading} = useQuery(
        ["users", auth.token],
        () => getAllUsers(auth),
        {enabled: !!auth.token}
    );

    const {data: appRoles, isAppRolesLoading} = useQuery(
        ["appRoles", auth.token],
        () => getAppRoles(auth),
        {enabled: !!auth.token}
    );

    if (isAppRolesLoading) return (<LoadingSpinner />);

    return (
        <>
            {appRoles && (
                <Area>
                    <Row>

                        <Col width="9" responsive="lg">
                            <RoleAssignmentArea appRoles={appRoles.value?.[0]?.appRoles} />
                        </Col>
                        <Col width="3" responsive="lg" sticky>
                            <RoleUsersArea users={users.value}/>
                        </Col>
                    </Row>
                </Area>
            )}
        </>
    )
}
export default RoleManagementView;