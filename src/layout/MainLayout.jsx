import Area from "../component/Area";
import LoadingSpinner from "../component/LoadingSpinner";
import CurrentMenuTitle from "../module/CurrentMenuTitle";
import { useMeta } from "../context/Meta";
import { useMenu } from "../context/Menu";
import React from "react";

const MainLayout = () => {

    const { currentMenu, currentMenuToView } = useMenu();
    const { isMetaLoading } = useMeta();

    return (
        <>
            <Area rounded="3" shadow p="3" mb="3">
                <CurrentMenuTitle />
                { isMetaLoading ? (
                    <LoadingSpinner/>
                ) : (
                    currentMenuToView[currentMenu.CURRENT.ID]
                )}
            </Area>
        </>
    )
}

export default MainLayout;