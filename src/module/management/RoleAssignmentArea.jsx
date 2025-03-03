import { useState } from "react";
import Area from "../../component/Area";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import { Col, Row } from "../../component/Grid";
import DraggableBadge from "../../component/DraggableBadge";
import { useLanguage } from "../../context/Language";

const RoleAssignmentArea = ({ users, appRoles, userRoles: initialUserRoles }) => {
    const { t } = useLanguage();

    const [draggedUser, setDraggedUser] = useState(null);
    const [hoveredRole, setHoveredRole] = useState(null);
    const [assignedRoles, setAssignedRoles] = useState(initialUserRoles);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [lastSelectedUser, setLastSelectedUser] = useState(null);

    // Handle drag start for a single user
    const handleUserDragStart = (userId) => {
        if (selectedUsers.length === 0) {
            setDraggedUser(userId);
        }
    };

    // Handle multi-select with Shift / Ctrl key
    const handleUserClick = (userId, e) => {
        if (e.shiftKey && lastSelectedUser) {
            // Shift for range selection
            const startIdx = users.findIndex(user => user.id === lastSelectedUser);
            const endIdx = users.findIndex(user => user.id === userId);
            const range = users.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
            setSelectedUsers(range.map(user => user.id));
        } else if (e.ctrlKey || e.metaKey) {
            // Ctrl for non-contiguous selection (dotted selection)
            setSelectedUsers((prevSelectedUsers) => {
                if (prevSelectedUsers.includes(userId)) {
                    // If user is already selected, deselect them
                    return prevSelectedUsers.filter(id => id !== userId);
                } else {
                    // Otherwise, add the user to the selection
                    return [...prevSelectedUsers, userId];
                }
            });
        } else {
            // Single select without Shift or Ctrl
            setSelectedUsers([userId]);
        }
        setLastSelectedUser(userId);
    };

    // Handle role drop (assigning selected users to a role)
    const handleRoleDrop = (roleId) => {
        if (selectedUsers.length === 0) return;

        setAssignedRoles((prevRoles) => {
            return prevRoles.map((role) => {
                const filteredUsers = role.users.filter(user => !selectedUsers.includes(user.id));

                if (role.id === roleId) {
                    // Add the selected users to the new role
                    const newUsers = [...filteredUsers, ...users.filter(user => selectedUsers.includes(user.id))];
                    return { ...role, users: newUsers };
                }

                return { ...role, users: filteredUsers };
            });
        });

        setSelectedUsers([]);
        setLastSelectedUser(null);
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

    // Get the unassigned users
    const assignedUserIds = new Set(
        assignedRoles.flatMap(role => role.users.map(user => user.id))
    );
    const unassignedUsers = users.filter(user => !assignedUserIds.has(user.id));

    return (
        <Row>
            {/* Role Drop Areas */}
            <Col width="9" responsive="lg">
                <Area noSelect fontSize="large">
                    {appRoles.map((role) => {
                        const assignedUsers = assignedRoles.find(r => r.id === role.id)?.users.filter(user => user.id) || [];
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
                                            onDragStart={() => handleUserDragStart(user.id)}
                                            badge="primary" m="1" noSelect
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
                    <Area mb="3">
                        <Span fontSize="3" fontWeight="lighter" underline>
                            {t("components.role_unassigned_users")}
                        </Span>
                    </Area>
                    <Area>
                        {unassignedUsers.map((user) => (
                            <DraggableBadge
                                key={user.id}
                                itemId={user.id}
                                onClick={(e) => handleUserClick(user.id, e)} // Handle click for multi-select
                                onDragStart={() => handleUserDragStart(user.id)}
                                badge={selectedUsers.includes(user.id) ? "primary" : "light"} // Highlight selected users
                                m="1"
                                noSelect
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
