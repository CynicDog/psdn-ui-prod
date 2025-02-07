import Area from "../component/Area";
import DefinitionView from "../view/DefinitionView";
import ConfigurationView from "../view/ConfigurationView";
import HistoryView from "../view/HistoryView";
import {useMenu} from "../Context";

const MainView = () => {

    const { menu } = useMenu();
    
    const menuToView = {
      "definition": <DefinitionView />,
      "configuration": <ConfigurationView />,
      "history": <HistoryView />
    };

    return (
        <>
            <Area rounded roundedSize="3" shadow p="3">
                {/* Header Placeholder */}
                {menuToView[menu]}
            </Area>
        </>
    )
}

export default MainView; 