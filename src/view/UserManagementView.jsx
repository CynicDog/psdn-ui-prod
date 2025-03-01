import {useAuth} from "../context/Auth";
import {getAllUsers} from "../data/APIs";
import {useQuery} from "react-query";
import LoadingSpinner from "../component/LoadingSpinner";
import {useMsal} from "@azure/msal-react";
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

    if (isUsersLoading) return (<LoadingSpinner/>)

    return (
        <>
            <UsersArea users={users} />
        </>
    );
};

export default UserManagementView;
