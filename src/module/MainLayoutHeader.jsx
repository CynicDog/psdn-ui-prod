import Area from "../component/Area";
import Span from "../component/Span";
import {useLanguage} from "../context/Language";
import {useAuth} from "../context/Auth";
import {useLayout} from "../context/Layout";
import {useMsal} from "@azure/msal-react";
import Tooltip from "../component/Tooltip";

const MainLayoutHeader = () => {

    const { t } = useLanguage();
    const { instance } = useMsal();
    const { auth, setAuth } = useAuth();
    const { currentMenu } = useLayout();

    return (
        <Area flex justifyContent="between" alignItems="center" mb="3">
            <Span fontSize="3" fontWeight="lighter">
                {t('components.pseudonymization_title')}{' '}
                {t(`menu.${currentMenu.PARENT.NAME}`)}{' '}
                {t(`menu.${currentMenu.CURRENT.NAME}`)}
            </Span>
            <Tooltip
                position="top"
                content={
                    <Area>
                        {t('messages.tooltip_logout')}
                    </Area>
                }
                bg="body" rounded shadow="sm" p="1" px="2" gap="3"
            >
                <Span badge="light" onClick={() => instance.logoutPopup()} cursor="pointer">
                    {t('auth.greeting', { name: auth.username })}
                </Span>
            </Tooltip>
        </Area>
    )
}

export default MainLayoutHeader