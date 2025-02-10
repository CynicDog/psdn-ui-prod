import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Col, Row } from './component/Grid';
import Container from './component/Container';
import SideMenu from './layout/SideMenu';
import MainView from "./layout/MainView";
import {useState} from "react";

const App = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Container fluid p="3">
      <Row>
        <Col width={ isMenuOpen ? "2" : "1" } responsive="lg">
          <SideMenu
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu} />
        </Col>
        <Col width={ isMenuOpen ? "10": "11" } responsive="lg">
          <MainView />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
