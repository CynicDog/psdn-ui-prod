import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Col, Row } from './component/Grid';
import Container from './component/Container';
import SideMenu from './layout/SideMenu';
import MainView from "./layout/MainView";
import { useLayout } from "./context/Layout";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { InteractionStatus } from "@azure/msal-browser";

const App = () => {
  const { instance, accounts, inProgress } = useMsal();
  const { isMenuOpen } = useLayout();

  useEffect(() => {
    if (accounts.length === 0 && inProgress === InteractionStatus.None) {
      // Redirect to login only when authentication is idle
      instance.loginRedirect();
    }
  }, [accounts, inProgress, instance]);

  return (
      <Container fluid p="3">
        <Row>
          <Col width={isMenuOpen ? "2" : "1"} responsive="lg" sticky>
            <SideMenu />
          </Col>
          <Col width={isMenuOpen ? "10" : "11"} responsive="lg">
            <MainView />
          </Col>
        </Row>
      </Container>
  );
};

export default App;
