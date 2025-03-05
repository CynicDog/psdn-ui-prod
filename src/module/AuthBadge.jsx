import {useAuth} from "../context/Auth";
import Area from "../component/Area";
import Span from "../component/Span";
import {getNextUser} from "../context/util";
import Tooltip from "../component/Tooltip";
import {useLanguage} from "../context/Language";
import {useMsal} from "@azure/msal-react";

const AuthBadge = () => {
    const { t } = useLanguage();
    const { auth, setAuth } = useAuth();
    const { instance } = useMsal();

    return (
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

                    // instance.logoutPopup();
                }}
                cursor="pointer">
                {t('auth.greeting', { name: auth.username })}
            </Span>
        </Tooltip>
    )
}

export default AuthBadge