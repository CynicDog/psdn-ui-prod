import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Col, Row } from './component/Grid';
import Container from './component/Container';
import SideLayout from './layout/SideLayout';
import MainLayout from "./layout/MainLayout";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { InteractionStatus } from "@azure/msal-browser";
import { useMenu } from "./context/Menu";
import ProjectTabArea from "./module/project/ProjectTabArea";
import { useProject } from "./context/Project";
import LoadingSpinner from "./component/LoadingSpinner";
import { usePopup } from "./context/Popup";
import ProjectSettingPopup from "./module/project/ProjectSettingPopup";
import { useAuth } from "./context/Auth";
import {ROLES} from "./context/util";

const App = () => {
    const { auth } = useAuth();
    const { isMenuOpen } = useMenu();
    const { isProjectLoading } = useProject();
    const { isProjectPopupOpen } = usePopup();

    const { instance, accounts, inProgress } = useMsal();
    useEffect(() => {
      if (accounts.length === 0 && inProgress === InteractionStatus.None) {
        // Redirect to login only when authentication is idle
        instance.loginRedirect();
      }
    }, [accounts, inProgress, instance]);

    return (
        <>
            {isProjectLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Container fluid>
                        <Row mt="3">
                            <Col width={isMenuOpen ? "2" : "1"} responsive="lg" sticky>
                                <SideLayout />
                            </Col>
                            <Col width={isMenuOpen ? "10" : "11"} responsive="lg">
                                <MainLayout />
                            </Col>
                        </Row>
                    </Container>
                    {/* Project controls are shown only to OWNER role */}
                    {auth.role && [ROLES.APPLICATION, ROLES.OWNER].includes(auth.role) && (
                        <>
                            {isProjectPopupOpen && <ProjectSettingPopup />}
                            <ProjectTabArea />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default App;
