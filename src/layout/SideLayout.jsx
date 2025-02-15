import Area from "../component/Area";
import Span from "../component/Span";
import Icon from "../component/Icon";
import ThemeSelector from "../module/ThemeSelector";
import LanguageSelector from "../module/LanguageSelector";
import MenuTree from "../module/MenuTree";
import { useLanguage } from "../context/Language";
import { useMenu } from "../context/Menu";
import {usePopup} from "../context/Popup";

const SideLayout = () => {

    const { t } = useLanguage();
    const { isMenuOpen, toggleMenu } = useMenu();
    const { isProjectPopupOpen } = usePopup();

    return (
        <>
            <Area rounded="3" shadow p="2" mb="3">
                {isMenuOpen ? (
                    <>
                        <Area flex justifyContent="between" mb="2" p="2">
                            <Span fontSize="5" fontWeight="lighter">{t('menu.title')}</Span>
                            {!isProjectPopupOpen && (
                                <Area flex alignItems="center" gap="2">
                                    <LanguageSelector/>
                                    <ThemeSelector/>
                                </Area>
                            )}
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
