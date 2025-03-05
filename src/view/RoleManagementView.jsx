import {useQuery} from "react-query";
import {getAllUsers, getAppRoles, getUserRoles} from "../data/APIs";
import {useAuth} from "../context/Auth";
import RoleAssignmentGrid from "../module/management/RoleAssignmentGrid";
import LoadingSpinner from "../component/LoadingSpinner";
import {useLanguage} from "../context/Language";

const RoleManagementView = () => {

    const { t } = useLanguage();
    const { auth } = useAuth();

    const {data: users} = useQuery(
        ["users", auth.token],
        () => getAllUsers(auth),
        {enabled: !!auth.token}
    );

    const {data: appRoles} = useQuery(
        ["appRoles", auth.token],
        () => getAppRoles(auth),
        {enabled: !!auth.token}
    );

    const {data: userRoles} = useQuery(
        ["userRoles", auth.token],
        () => getUserRoles(auth),
        {enabled: !!auth.token}
    )

    if (!users || !appRoles || !userRoles) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {appRoles && users && userRoles && (
                <RoleAssignmentGrid
                    users={users.value}
                    appRoles={appRoles.value?.[0]?.appRoles}
                    userRoles={userRoles.data}
                />
            )}
        </>
    )
}
export default RoleManagementView;