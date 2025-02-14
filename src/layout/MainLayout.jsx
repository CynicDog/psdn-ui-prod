import Area from "../component/Area";
import MainLayoutHeader from "../module/MainLayoutHeader";
import {useLayout} from "../context/Layout";
import {useMeta} from "../context/Meta";
import LoadingSpinner from "../component/LoadingSpinner";

const MainLayout = () => {

    const { currentMenu, currentMenuToView } = useLayout();
    const { businessMeta, isMetaLoading } = useMeta();

    return (
        <>
            <Area border rounded="3" shadow p="3">
                <MainLayoutHeader />
                {(!businessMeta || isMetaLoading) ? (
                    <LoadingSpinner />
                ) : (
                    currentMenuToView[currentMenu.CURRENT.ID]
                )}
            </Area>
        </>
    )
}

export default MainLayout;