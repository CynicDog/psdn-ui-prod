import Area from "../component/Area";
import Span from "../component/Span";
import {useTranslation} from "../context/Translation";
import {useAuth} from "../context/Auth";
import {useLayout} from "../context/Layout";

const MainViewHeader = () => {

    const { t } = useTranslation();
    const { auth, setAuth } = useAuth();
    const { menu } = useLayout();

    return (
        <Area flex justifyContent="between" mb="3">
            <Span fontSize="3" fontWeight="lighter">
                {t('components.pseudonymization_title')}{' '}
                {t(`components.pseudonymization_${menu}_view_title`)}
            </Span>
            <Span>
                {t('auth.greeting', { name: auth.username })}
            </Span>
        </Area>
    )
}

export default MainViewHeader