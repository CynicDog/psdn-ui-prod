import Area from "../component/Area";
import Span from "../component/Span";
import Anchor from "../component/Anchor";
import Icon from "../component/Icon";
import OrderedList from "../component/OrderedList";
import DarkMode from "../module/DarkMode";
import LanguageSelector from "../module/LanguageSelector";
import {useLayout} from "../context/Layout";
import { useLanguage } from "../context/Language";
import MenuTree from "../module/MenuTree";

const SideLayout = () => {

    const { t } = useLanguage();
    const { setMenu, isMenuOpen, toggleMenu } = useLayout();

    return (
        <>
            <Area border rounded="3" shadow p="2" mb="3">
                {isMenuOpen ? (
                    <>
                        <Area flex justifyContent="between" mb="2" p="2">
                            <Span fontSize="5" fontWeight="lighter">{t('menu.title')}</Span>
                            <Area flex alignItems="center" gap="2">
                                <LanguageSelector/>
                                <DarkMode/>
                            </Area>
                        </Area>
                        <Area px="3">
                            <MenuTree />
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

export default SideLayout;
