import {useState} from "react";
import {useAuth} from "../context/Auth";
import {getAllUsers} from "../data/APIs";
import {useQuery} from "react-query";
import LoadingSpinner from "../component/LoadingSpinner";
import Area from "../component/Area";
import UserTable from "../module/management/UserTable";
import ManageItemsPaginationControl from "../module/management/ManageItemsPaginationControl";

const UserManagementView = () => {

    const {auth} = useAuth();

    const {data: users, isUsersLoading} = useQuery(
        ["users", auth.token],
        () => getAllUsers(auth),
        {enabled: !!auth.token}
    );

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    if (isUsersLoading) return <LoadingSpinner/>;

    return (
        <>
            {users && (
                <Area rounded shadow="sm" fontSize="smaller">
                    <Area className="control-panel" bg="body" borderBottom>
                        {/* User Pagination Control */}
                        <ManageItemsPaginationControl
                            totalItems={users.value.length}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Area>

                    {/* User Table with pagination props */}
                    <UserTable
                        users={users.value}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                    />
                </Area>
            )}
        </>
    );
};

export default UserManagementView;
