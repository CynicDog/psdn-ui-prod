import { useState } from "react";
import Area from "../component/Area";
import Span from "../component/Span";
import { useLanguage } from "../context/Language";
import { useAuth } from "../context/Auth";
import { useMenu } from "../context/Menu";

const MenuItem = ({ index, itemID, itemData, level, parentID, parentName, userRole }) => {
    const { t } = useLanguage();
    const { setCurrentMenu } = useMenu();
    const [isOpen, setIsOpen] = useState(true);

    // Filter children based on user's role
    const visibleChildren = itemData.CHILDREN?.filter(child =>
        child.SHOWN_TO.includes(userRole)
    );

    const handleClick = () => {
        if (itemData.CHILDREN) {
            setIsOpen(!isOpen);
        } else {
            setCurrentMenu({
                CURRENT: {
                    ID: itemID,
                    NAME: itemData.NAME
                },
                PARENT: {
                    ID: parentID,
                    NAME: parentName || ""
                },
            });
        }
    };

    return (
        <Area ms={`${level + 1}`} mb={level === 0 && "2"}>
            {level === 0 && <Span variant="secondary">{index + 1}. </Span>}
            <Span
                noSelect
                cursor={level > 0 && "pointer"}
                link="secondary"
                onClick={handleClick}>
                {t(`menu.${itemData.NAME}`)}
            </Span>
            {isOpen && visibleChildren && (
                <Area>
                    {visibleChildren.map((child) => (
                        <MenuItem
                            key={child.ID}
                            level={level + 1}
                            itemID={child.ID}
                            itemData={child}
                            parentID={itemID}
                            parentName={itemData.NAME}
                            userRole={userRole}
                        />
                    ))}
                </Area>
            )}
        </Area>
    );
};

const MenuTree = () => {
    const { menu } = useMenu();
    const { auth } = useAuth();

    // Filter top-level menu items based on user's role
    const visibleMenuItems = menu.filter(item =>
        item.CHILDREN.some(child => child.SHOWN_TO.includes(auth.role))
    );

    return (
        <Area style={{ fontSize: "smaller" }}>
            {visibleMenuItems.map((menuItem, index) => (
                <MenuItem
                    index={index}
                    key={menuItem.ID}
                    itemID={menuItem.ID}
                    itemData={menuItem}
                    level={0}
                    parentID={null}
                    parentName={""}
                    userRole={auth.role}
                />
            ))}
        </Area>
    );
};

export default MenuTree;