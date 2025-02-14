import Area from "../component/Area";
import LoadingSpinner from "../component/LoadingSpinner";
import MainLayoutHeader from "../module/MainLayoutHeader";
import { useMeta } from "../context/Meta";
import { useMenu } from "../context/Menu";

const MainLayout = () => {

    const { currentMenu, currentMenuToView } = useMenu();
    const { isMetaLoading } = useMeta();

    return (
        <>
            <Area border rounded="3" shadow p="3">
                <MainLayoutHeader />
                { isMetaLoading ? (
                    <LoadingSpinner />
                ) : (
                    currentMenuToView[currentMenu.CURRENT.ID]
                )}
            </Area>
        </>
    )
}

export default MainLayout;