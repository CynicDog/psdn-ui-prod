import Area from "../component/Area";
import Span from "../component/Span";
import { useLanguage } from "../context/Language";
import { useAuth } from "../context/Auth";
import Tooltip from "../component/Tooltip";
import {getNextUser, ROLES} from "../context/util";
import { useMenu } from "../context/Menu";

const MainLayoutHeader = () => {
    const { t } = useLanguage();
    const { auth, setAuth } = useAuth();
    const { currentMenu } = useMenu();

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
                <Span
                    badge="light"
                    onClick={() => {
                        const nextUser = getNextUser(auth.username);
                        setAuth(nextUser);

                        // production only
                        // instance.logoutPopup();
                    }}
                    cursor="pointer">
                    {t('auth.greeting', { name: auth.username })}
                </Span>
            </Tooltip>
        </Area>
    );
}

export default MainLayoutHeader;
