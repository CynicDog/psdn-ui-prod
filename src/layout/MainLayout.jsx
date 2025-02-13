import Area from "../component/Area";
import MainLayoutHeader from "../module/MainLayoutHeader";
import {useLayout} from "../context/Layout";

const MainLayout = () => {

    const { currentMenu, currentMenuToView } = useLayout();

    return (
        <>
            <Area border rounded="3" shadow p="3">
                <MainLayoutHeader />
                {currentMenuToView[currentMenu]}
            </Area>
        </>
    )
}

export default MainLayout;