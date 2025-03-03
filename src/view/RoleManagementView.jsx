import {useQuery} from "react-query";
import {getAllUsers, getAppRoles, getUserRoles} from "../data/APIs";
import {useAuth} from "../context/Auth";
import Area from "../component/Area";
import RoleAssignmentArea from "../module/management/RoleAssignmentArea";
import LoadingSpinner from "../component/LoadingSpinner";
import {useLanguage} from "../context/Language";

const RoleManagementView = () => {

    const { t } = useLanguage();
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

    const {data: userRoles, isUserRolesLoading} = useQuery(
        ["userRoles", auth.token],
        () => getUserRoles(auth),
        {enabled: !!auth.token}
    )

    if (isAppRolesLoading) return (<LoadingSpinner />);

    return (
        <>
            {appRoles && users && userRoles && (
                <Area>
                    <RoleAssignmentArea
                        users={users.value}
                        appRoles={appRoles.value?.[0]?.appRoles}
                        userRoles={userRoles.data}
                    />
                </Area>
            )}
        </>
    )
}
export default RoleManagementView;