import {useTranslation} from "../context/Translation";
import {useMenu} from "../context/Menu";
import Area from "../component/Area";
import Span from "../component/Span";
import Anchor from "../component/Anchor";
import OrderedList from "../component/OrderedList";
import DarkMode from "../module/DarkMode";
import Language from "../module/Language";

const SideMenu = () => {

    const { t } = useTranslation();
    const { setMenu } = useMenu();

    const menuItems = [
        {
            label: `${t('components.menu_link_1')}`,
            action: () => setMenu("definition"),
        },
        {
            label: `${t('components.menu_link_2')}`,
            action: () => setMenu("configuration"),
        },
        {
            label: `${t('components.menu_link_3')}`,
            action: () => setMenu("history"),
        }
    ];

    return (
        <>
            <Area border rounded="3" shadow p="3" mb="3">
                <Area flex justifyContent="between" mb="2">
                    <Span fontSize="5" fontWeight="lighter">{t('components.menu_title')}</Span>
                    <Area flex gap="2">
                        <Language />
                        <DarkMode />
                    </Area>
                </Area>
                <Area>
                    <OrderedList
                        className="my-3"
                        listItems={menuItems.map((item, index) => (
                            <Anchor label={item.label} onClick={item.action} />
                        ))}
                    />
                </Area>
            </Area>
        </>
    );
};

export default SideMenu;
