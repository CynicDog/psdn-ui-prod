import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { useMenu } from './Context';

import { Col, Row } from './component/Grid';
import Container from './component/Container';

import ConfigurationView from './view/ConfigurationView';
import DefinitionView from './view/DefinitionView';
import HistoryView from './view/HistoryView';
import SideMenu from './layout/SideMenu';
import MainView from "./layout/MainView";

const App = () => {

  const { menu } = useMenu();

  const menuToView = {
    "definition": <DefinitionView />,
    "configuration": <ConfigurationView />,
    "history": <HistoryView />
  };

  return (
    <Container fluid p="3">
      <Row>
        <Col width="2" responsive="lg">
          <SideMenu />
        </Col>
        <Col width="10" responsive="lg">
          <MainView />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
