import Area from "../component/Area";
import Span from "../component/Span";
import { useLanguage } from "../context/Language";
import { useAuth } from "../context/Auth";
import { useLayout } from "../context/Layout";
import Tooltip from "../component/Tooltip";
import { ROLES } from "../context/util";

const MainLayoutHeader = () => {
    const { t } = useLanguage();
    const { auth, setAuth } = useAuth();
    const { currentMenu } = useLayout();

    // Check if we are in a development environment
    const isDev = process.env.REACT_APP_ENV === "development";

    // Function to cycle to the next role (for dev only)
    const getNextRole = (currentRole) => {
        const roles = Object.values(ROLES);
        const currentIndex = roles.indexOf(currentRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        return roles[nextIndex];
    };

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
                        if (isDev) {
                            // Development-specific logic
                            const nextRole = getNextRole(auth.role);
                            console.log(nextRole);
                            // Update the authentication context with the next role
                            setAuth({
                                ...auth,
                                role: nextRole
                            });
                            alert(`(개발용) 현재 역할: ${nextRole}`);
                        }

                        // production-specific logic
                        // if (!isDev) {
                        //     instance.logoutPopup();
                        // }
                    }}
                    cursor="pointer">
                    {t('auth.greeting', { name: auth.username })}
                </Span>
            </Tooltip>
        </Area>
    );
}

export default MainLayoutHeader;