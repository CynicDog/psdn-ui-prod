import {useAuth} from "../context/Auth";
import {getAllUsers, getAppRoles} from "../data/APIs";
import {useQuery} from "react-query";
import LoadingSpinner from "../component/LoadingSpinner";
import UsersArea from "../module/management/UsersArea";

const UserManagementView = () => {

    const {auth} = useAuth();

    const {data: users, isUsersLoading} = useQuery(
        ["users", auth.token],
        () => getAllUsers(auth),
        {
            enabled: !!auth.token,
        }
    );

    const {data: appRoles, isAppRolesLoading} = useQuery(
        ["appRoles", auth.token],
        () => getAppRoles(auth),
        {
            enabled: !!auth.token,
        }
    );

    if (isUsersLoading) return (<LoadingSpinner/>)

    return (
        <>
            <UsersArea users={users} />
        </>
    );
};

export default UserManagementView;
