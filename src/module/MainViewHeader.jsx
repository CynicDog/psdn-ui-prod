import {useTranslation} from "../context/Translation";
import {useAuth} from "../context/Auth";
import {useMenu} from "../context/Menu";
import Area from "../component/Area";
import Span from "../component/Span";

const MainViewHeader = () => {

    const { t } = useTranslation();
    const { auth, setAuth } = useAuth();
    const { menu } = useMenu();

    return (
        <>
            <Area flex justifyContent="between" mb="3">
                <Span fontSize="3" fontWeight="lighter">
                    {t('components.pseudonymization_title')}{' '}
                    {t(`components.pseudonymization_${menu}_view_title`)}
                </Span>
                <Span>
                    {t('auth.greeting', { name: auth.username })}
                </Span>
            </Area>
        </>
    )
}

export default MainViewHeader