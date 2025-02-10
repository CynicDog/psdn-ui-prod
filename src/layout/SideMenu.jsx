import Area from "../component/Area";
import Span from "../component/Span";
import Anchor from "../component/Anchor";
import Icon from "../component/Icon";
import OrderedList from "../component/OrderedList";
import DarkMode from "../module/DarkMode";
import Language from "../module/Language";
import {useLayout} from "../context/Layout";
import { useTranslation } from "../context/Translation";

const SideMenu = () => {

    const { t } = useTranslation();
    const { setMenu, isMenuOpen, toggleMenu } = useLayout();

    return (
        <>
            <Area border rounded="3" shadow p="3" mb="3">
                {isMenuOpen ? (
                    <>
                        <Area flex justifyContent="between" mb="2" p="3">
                            <Span fontSize="5" fontWeight="lighter">{t('components.menu_title')}</Span>
                            <Area flex alignItems="center" gap="2">
                                <Language/>
                                <DarkMode/>
                            </Area>
                        </Area>
                        <Area>
                            <OrderedList
                                listItems={[
                                    <Anchor key="1" label={t('components.menu_link_1')} onClick={() => setMenu("definition")}/>,
                                    <Anchor key="2" label={t('components.menu_link_2')} onClick={() => setMenu("configuration")}/>,
                                    <Anchor key="3" label={t('components.menu_link_3')} onClick={() => setMenu("history")}/>
                                ]}
                            />
                        </Area>
                        <Area flex justifyContent="end">
                            <Icon name="chevron-double-left" onClick={toggleMenu} />
                        </Area>
                    </>
                ) : (
                    <Icon name="list" onClick={toggleMenu} />
                )}
            </Area>
        </>
    );
};

export default SideMenu;
