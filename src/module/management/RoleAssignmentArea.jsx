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

    const handleUserDragStart = (userId) => {
        setDraggedUser(userId);
    };

    const handleRoleDragOver = (e, roleId) => {
        e.preventDefault(); // Allow dropping
        setHoveredRole(roleId);
    };

    const handleDragLeave = () => {
        setHoveredRole(null);
    };

    const handleRoleDrop = (roleId) => {
        if (!draggedUser) return;

        setAssignedRoles((prevRoles) => {
            return prevRoles.map((role) => {
                if (role.id === roleId) {
                    // Avoid duplicate users in the same role
                    if (!role.users.some(user => user.id === draggedUser)) {
                        return { ...role, users: [...role.users, users.find(user => user.id === draggedUser)] };
                    }
                }
                return role;
            });
        });

        setDraggedUser(null);
        setHoveredRole(null);
    };

    const assignedUserIds = new Set(
        assignedRoles.flatMap(role => role.users.map(user => user.id))
    );
    const unassignedUsers = users.filter(user => !assignedUserIds.has(user.id));

    return (
        <Row>
            {/* Role Drop Areas */}
            <Col width="9" responsive="lg">
                <Area>
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
                                <Span fontSize="3" fontWeight="lighter" underline>
                                    {role.displayName}
                                </Span>
                                <Area p="5">
                                    {assignedUsers.map((user) => (
                                        <DraggableBadge
                                            key={user.id}
                                            itemId={user.id}
                                            onDragStart={() => handleUserDragStart(user.id)}
                                            badge="primary"
                                            m="1"
                                            noSelect
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
                <Area border rounded shadow="sm" p="3" my="3">
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
                                onDragStart={() => handleUserDragStart(user.id)}
                                badge="light"
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
