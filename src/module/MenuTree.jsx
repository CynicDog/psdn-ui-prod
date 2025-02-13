import { useLayout } from "../context/Layout";
import { useState } from "react";
import { useLanguage } from "../context/Language";
import Area from "../component/Area";
import Span from "../component/Span";

const MenuItem = ({ index, itemID, itemData, level, parentID, parentName }) => {
    const { t } = useLanguage();
    const { setCurrentMenu } = useLayout();
    const [isOpen, setIsOpen] = useState(true);

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
            {isOpen && itemData.CHILDREN && (
                <Area>
                    {itemData.CHILDREN.map((child) => (
                        <MenuItem
                            key={child.ID}
                            level={level + 1}
                            itemID={child.ID}
                            itemData={child}
                            parentID={itemID}
                            parentName={itemData.NAME}
                        />
                    ))}
                </Area>
            )}
        </Area>
    );
};

const MenuTree = () => {
    const { menu } = useLayout();

    return (
        <Area style={{ fontSize: "smaller" }}>
            {menu.map((menuItem, index) => (
                <MenuItem
                    index={index}
                    key={menuItem.ID}
                    itemID={menuItem.ID}
                    itemData={menuItem}
                    level={0}
                    parentID={null}
                    parentName={""}
                />
            ))}
        </Area>
    );
};

export default MenuTree;
