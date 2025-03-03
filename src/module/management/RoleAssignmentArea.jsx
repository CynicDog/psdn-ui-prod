import { useState } from "react";
import Area from "../../component/Area";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import { Col, Row } from "../../component/Grid";
import DraggableBadge from "../../component/DraggableBadge";
import { useLanguage } from "../../context/Language";

const RoleAssignmentArea = ({ users, appRoles, userRoles }) => {
    const { t } = useLanguage();

    const [draggedUser, setDraggedUser] = useState(null);
    const [hoveredRole, setHoveredRole] = useState(null);

    const handleUserDragStart = (userId) => {
        setDraggedUser(userId);
    };

    const handleRoleDragOver = (e, roleId) => {
        e.preventDefault(); // Allow dropping
        setHoveredRole(roleId);
    };

    const handleRoleDrop = (roleId) => {
        if (draggedUser) {
            // onAssignUser(draggedUser, roleId);
        }
        setDraggedUser(null);
        setHoveredRole(null);
    };

    const roleUserMap = userRoles.reduce((acc, role) => {
        acc[role.id] = role.users.filter(user => user.id);
        return acc;
    }, {});

    const assignedUserIds = new Set(
        userRoles.flatMap(role => role.users.map(user => user.id))
    );
    const unassignedUsers = users.filter(user => !assignedUserIds.has(user.id));

    return (
        <Row>
            {/* Role Drop Areas */}
            <Col width="9" responsive="lg">
                <Area>
                    {appRoles.map((role) => (
                        <DraggableArea
                            key={role.id}
                            sectionId={role.id}
                            draggable={false}
                            isOver={hoveredRole === role.id}
                            onDragOver={(e) => handleRoleDragOver(e, role.id)}
                            onDrop={() => handleRoleDrop(role.id)}
                            border rounded shadow="sm" p="3" my="3"
                        >
                            <Span fontSize="3" fontWeight="lighter" underline>
                                {role.displayName}
                            </Span>
                            <Area p="5">
                                {/* Render users assigned to this role */}
                                {roleUserMap[role.id]?.map((user) => (
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
                    ))}
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
