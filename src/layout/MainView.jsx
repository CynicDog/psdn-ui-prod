import {useMenu} from "../context/Menu";
import Area from "../component/Area";
import MainViewHeader from "../module/MainViewHeader";
import DefinitionView from "../view/DefinitionView";
import ConfigurationView from "../view/ConfigurationView";
import HistoryView from "../view/HistoryView";

const MainView = () => {

    const { menu } = useMenu();
    
    const menuToView = {
      "definition": <DefinitionView />,
      "configuration": <ConfigurationView />,
      "history": <HistoryView />
    };

    return (
        <>
            <Area border rounded="3" shadow p="3">
                <MainViewHeader />
                {menuToView[menu]}
            </Area>
        </>
    )
}

export default MainView; 