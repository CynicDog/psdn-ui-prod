import Area from "../component/Area";
import Span from "../component/Span";
import { useLanguage } from "../context/Language";
import { useMenu } from "../context/Menu";
import AuthBadge from "./AuthBadge";
import {usePopup} from "../context/Popup";

const CurrentMenuTitle = () => {
    const { t } = useLanguage();
    const { currentMenu } = useMenu();
    const { isProjectPopupOpen } = usePopup();

    return (
        <Area flex justifyContent="between" alignItems="center" mb="3">
            <Span fontSize="3" fontWeight="lighter">
                {t('components.pseudonymization_title')}{' '}
                {t(`menu.${currentMenu.PARENT.NAME}`)}{' '}
                {t(`menu.${currentMenu.CURRENT.NAME}`)}
            </Span>
            {!isProjectPopupOpen && (
                <AuthBadge />
            )}
        </Area>
    );
}

export default CurrentMenuTitle;
