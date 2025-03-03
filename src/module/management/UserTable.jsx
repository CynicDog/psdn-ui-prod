import { useState } from "react";
import Table from "../../component/Table";
import TableBody from "../../component/TableBody";
import TableHeader from "../../component/TableHeader";
import TableHeaderCell from "../../component/TableHeaderCell";
import TableRow from "../../component/TableRow";
import Span from "../../component/Span";
import Area from "../../component/Area";
import CheckBox from "../../component/CheckBox";
import TableRowCell from "../../component/TableRowCell";
import {useLanguage} from "../../context/Language";

const UserTable = ({ users, rowsPerPage, currentPage }) => {

    const { t } = useLanguage();

    const [selectedUsers, setSelectedUsers] = useState(new Set());

    // Get users for the current page
    const paginatedUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Check if all users on the current page are selected
    const allSelected = paginatedUsers.every(user => selectedUsers.has(user.id));

    // Select or deselect all users on the current page
    const handleSelectAll = () => {
        setSelectedUsers(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (allSelected) {
                // Deselect all users on the current page
                paginatedUsers.forEach(user => newSelected.delete(user.id));
            } else {
                // Select all users on the current page
                paginatedUsers.forEach(user => newSelected.add(user.id));
            }
            return newSelected;
        });
    };

    // Select or deselect a single user
    const handleUserSelect = (userId) => {
        setSelectedUsers(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(userId)) {
                newSelected.delete(userId);
            } else {
                newSelected.add(userId);
            }
            return newSelected;
        });
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell width="5%">
                        <Area flex justifyContent="center" mb="3">
                            {t('components.grid_row_control_check')}
                        </Area>
                        <Area flex justifyContent="center" my="1">
                            <CheckBox checked={allSelected} onChange={handleSelectAll} />
                        </Area>
                    </TableHeaderCell>
                    <TableHeaderCell>{t('components.user_table_name')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.user_table_email')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.user_table_id')}</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {paginatedUsers.map(user => (
                    <TableRow key={user.id} selected={selectedUsers.has(user.id)} onClick={() => handleUserSelect(user.id)}>
                        <TableRowCell width="5%">
                            <Area flex justifyContent="center">
                                <CheckBox checked={selectedUsers.has(user.id)} onChange={() => handleUserSelect(user.id)} />
                            </Area>
                        </TableRowCell>
                        <TableRowCell>{user.displayName}</TableRowCell>
                        <TableRowCell>{user.mail}</TableRowCell>
                        <TableRowCell>{user.id}</TableRowCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserTable;
