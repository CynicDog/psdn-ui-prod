import { useState } from "react";
import Area from "../../component/Area";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import { Col, Row } from "../../component/Grid";
import DraggableBadge from "../../component/DraggableBadge";
import { useLanguage } from "../../context/Language";
import Icon from "../../component/Icon";
import Tooltip from "../../component/Tooltip";

const RoleAssignmentArea = ({ users, appRoles, userRoles: initialUserRoles }) => {
    const { t } = useLanguage();

    const [draggedUser, setDraggedUser] = useState(null);  // Stores the user(s) being dragged
    const [hoveredRole, setHoveredRole] = useState(null);  // Role currently being hovered
    const [assignedRoles, setAssignedRoles] = useState(initialUserRoles);  // Assigned roles for users
    const [selectedUsers, setSelectedUsers] = useState([]);  // Selected users for multiple selection

    // Get the unassigned users
    const assignedUserIds = new Set(
        assignedRoles.flatMap(role => role.users.map(user => user.id))
    );
    const unassignedUsers = users.filter(user => !assignedUserIds.has(user.id));

    // Handle selecting a user (clicking to add/remove from selection)
    const handleUserClick = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                // If user is already selected, deselect them
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                // Otherwise, add the user to the selection
                return [...prevSelectedUsers, userId];
            }
        });
    };

    // Handle drag start for single or multiple selected users
    const handleUserDragStart = (userId, e) => {
        if (selectedUsers.length > 0) {
            // If users are selected, drag all selected users
            setDraggedUser(selectedUsers);
        } else {
            // If no users are selected, drag only the clicked user
            setDraggedUser([userId]);
        }
    };

    // Handle role drop (assigning dragged users to a role)
    const handleRoleDrop = (roleId) => {
        if (draggedUser.length === 0) return; // No user to drop

        setAssignedRoles((prevRoles) => {
            return prevRoles.map((role) => {
                const filteredUsers = role.users.filter(user => !draggedUser.includes(user.id));

                if (role.id === roleId) {
                    // Add the dragged users to the new role
                    const newUsers = [...filteredUsers, ...users.filter(user => draggedUser.includes(user.id))];
                    return { ...role, users: newUsers };
                }

                return { ...role, users: filteredUsers };
            });
        });

        // Clear the dragged user selection after assignment
        setSelectedUsers([]);
        setDraggedUser([]);
        setHoveredRole(null);
    };

    // Handle dragging over a role
    const handleRoleDragOver = (e, roleId) => {
        e.preventDefault(); // Allow dropping
        setHoveredRole(roleId);
    };

    // Handle drag leave event
    const handleDragLeave = () => {
        setHoveredRole(null);
    };

    return (
        <Row>
            {/* Role Drop Areas */}
            <Col width="9" responsive="lg">
                <Area noSelect fontSize="large">
                    {appRoles.map((role) => {
                        const assignedUsers = assignedRoles.find(r => r.id === role.id)?.users || [];
                        return (
                            <DraggableArea
                                key={role.id}
                                sectionId={role.id}
                                draggable={false}
                                isOver={hoveredRole === role.id}
                                onDragOver={(e) => handleRoleDragOver(e, role.id)}
                                onDrop={() => handleRoleDrop(role.id)}
                                onDragLeave={handleDragLeave}
                                border rounded shadow="sm" p="3" my="3"
                            >
                                <Area flex justifyContent="between" alignItems="center">
                                    <Span fontSize="3" fontWeight="lighter" underline>
                                        {role.displayName}
                                    </Span>
                                    <Span badge="warning" mx="2">
                                        {assignedUsers.length}
                                    </Span>
                                </Area>

                                <Area p="3">
                                    {assignedUsers.map((user) => (
                                        <DraggableBadge
                                            key={user.id}
                                            itemId={user.id}
                                            onClick={() => handleUserClick(user.id)}
                                            onDragStart={(e) => handleUserDragStart(user.id, e)}
                                            badge={selectedUsers.includes(user.id) ? "primary" : "light"}
                                            m="1" noSelect
                                        >
                                            {user.displayName}
                                        </DraggableBadge>
                                    ))}
                                </Area>
                            </DraggableArea>
                        );
                    })}
                </Area>
            </Col>

            {/* Users to Drag (Unassigned Users) */}
            <Col width="3" responsive="lg" sticky>
                <Area border rounded shadow="sm" noSelect fontSize="large" p="3" my="3">
                    <Area>
                        <Span fontSize="3" fontWeight="lighter" underline>
                            {t("components.role_unassigned_users")}
                        </Span>
                    </Area>
                    <Area fontSize="smaller" mb="3">
                        <Span variant="secondary">
                            {t("messages.role_unassigned_users_help")}
                        </Span>
                    </Area>
                    <Area>
                        {unassignedUsers.map((user) => (
                            <DraggableBadge
                                key={user.id}
                                itemId={user.id}
                                onClick={() => handleUserClick(user.id)}
                                onDragStart={(e) => handleUserDragStart(user.id, e)}
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

export default RoleAssignmentArea;
