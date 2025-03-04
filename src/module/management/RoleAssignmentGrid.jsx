import { useState } from "react";
import Area from "../../component/Area";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import { Col, Row } from "../../component/Grid";
import DraggableBadge from "../../component/DraggableBadge";
import { useLanguage } from "../../context/Language";

const RoleAssignmentGrid = ({ users, appRoles, userRoles: initialUserRoles }) => {
    const { t } = useLanguage();

    const [draggedUser, setDraggedUser] = useState(null);
    const [sourceRole, setSourceRole] = useState(null);
    const [hoveredRole, setHoveredRole] = useState(null);

    const [assignedRoles, setAssignedRoles] = useState(initialUserRoles);
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Handle selecting a user (clicking to add/remove from selection)
    const handleUserClick = (userId) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter(id => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    // Handle drag start for single or multiple selected users
    const handleUserDragStart = (userId, roleId, e) => {
        setDraggedUser(selectedUsers.length > 0 ? selectedUsers : [userId]);
        setSourceRole(roleId); // Remember where the user came from
    };

    // Handle role drop (assigning dragged users to a new role)
    const handleRoleDrop = (targetRoleId) => {
        if (!draggedUser?.length) return;
        if (sourceRole === targetRoleId) {
            setSelectedUsers([]);
            setDraggedUser([]);
            setHoveredRole(null);
            setSourceRole(null);
            return;
        }

        setAssignedRoles((prevRoles) =>
            prevRoles.map((role) => {
                if (role.id === sourceRole) {
                    // Remove users from the original role
                    return { ...role, users: role.users.filter(user => !draggedUser.includes(user.id)) };
                }
                if (role.id === targetRoleId) {
                    const existingUsers = new Set(role.users.map((user) => user.id));
                    const newUsers = users
                        .filter((user) => draggedUser.includes(user.id) && !existingUsers.has(user.id));

                    return { ...role, users: [...role.users, ...newUsers] };
                }
                return role;
            })
        );

        // Clear selections after moving users
        setSelectedUsers([]);
        setDraggedUser([]);
        setHoveredRole(null);
        setSourceRole(null);
    };

    // Handle removing a user from a role (double-click)
    const handleRemoveFromRole = (userId, roleId) => {
        setAssignedRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === roleId
                    ? { ...role, users: role.users.filter(user => user.id !== userId) }
                    : role
            )
        );
    };

    // Handle dragging over a role
    const handleRoleDragOver = (e, roleId) => {
        e.preventDefault(); // Allow dropping
        setHoveredRole(roleId);
    };

    // Get assigned users per role
    const getUsersInRole = (roleId) => {
        return assignedRoles.find((role) => role.id === roleId)?.users || [];
    };

    return (
        <Row>
            {/* Role Drop Areas */}
            <Col width="9" responsive="lg">
                <Area noSelect fontSize="large">
                    {appRoles.map((role) => (
                        <DraggableArea
                            key={role.id}
                            sectionId={role.id}
                            draggable={false}
                            isOver={hoveredRole === role.id}
                            onDragOver={(e) => handleRoleDragOver(e, role.id)}
                            onDrop={() => handleRoleDrop(role.id)}
                            onDragLeave={() => setHoveredRole(null)}
                            border rounded shadow="sm" p="3" my="3"
                        >
                            <Area flex justifyContent="between" alignItems="center">
                                <Span fontSize="3" fontWeight="lighter" underline>
                                    {role.displayName}
                                </Span>
                                <Span badge="warning" mx="2">
                                    {getUsersInRole(role.id).length}
                                </Span>
                            </Area>

                            <Area p="3">
                                {getUsersInRole(role.id).map((user) => (
                                    <DraggableBadge
                                        key={user.id}
                                        itemId={user.id}
                                        onClick={() => handleUserClick(user.id)}
                                        onDragStart={(e) => handleUserDragStart(user.id, role.id, e)}
                                        onDoubleClick={() => handleRemoveFromRole(user.id, role.id)}
                                        badge={selectedUsers.includes(user.id) ? "primary" : "light"}
                                        m="1" noSelect
                                    >
                                        {user.displayName}
                                    </DraggableBadge>
                                ))}
                            </Area>
                        </DraggableArea>
                    ))}
                </Area>
            </Col>

            {/* All Users Area */}
            <Col width="3" responsive="lg">
                <Area border rounded shadow="sm" noSelect fontSize="large" p="3" my="3">
                    <Area>
                        <Span fontSize="3" fontWeight="lighter" underline>
                            {t("components.role_all_users")}
                        </Span>
                    </Area>
                    <Area fontSize="small" mb="3">
                        <Span variant="secondary">
                            {t("messages.role_all_users_help")}
                        </Span>
                    </Area>
                    <Area>
                        {users.map((user) => (
                            <DraggableBadge
                                key={user.id}
                                itemId={user.id}
                                onClick={() => handleUserClick(user.id)}
                                onDragStart={(e) => handleUserDragStart(user.id, null, e)}
                                badge={selectedUsers.includes(user.id) ? "primary" : "light"}
                                m="1" noSelect
                            >
                                {user.displayName}
                            </DraggableBadge>
                        ))}
                    </Area>
                </Area>
            </Col>
        </Row>
    );
};

export default RoleAssignmentGrid;
