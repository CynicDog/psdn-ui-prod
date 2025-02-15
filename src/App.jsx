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
import LoadingSpinner from "./module/LoadingSpinner";
import {usePopup} from "./context/Popup";
import ProjectSettingPopup from "./module/project/ProjectSettingPopup";

const App = () => {
    const { isMenuOpen } = useMenu();
    const { isProjectLoading } = useProject();
    const { isProjectPopupOpen } = usePopup();

    // const { instance, accounts, inProgress } = useMsal();
    // useEffect(() => {
    //   if (accounts.length === 0 && inProgress === InteractionStatus.None) {
    //     // Redirect to login only when authentication is idle
    //     instance.loginRedirect();
    //   }
    // }, [accounts, inProgress, instance]);

    return (
        <>
            {isProjectLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Row pb="2">
                        <Col width="12">
                            <ProjectTabArea />
                        </Col>
                    </Row>
                    <Container fluid>
                        <Row>
                            <Col width={isMenuOpen ? "2" : "1"} responsive="lg" sticky>
                                <SideLayout />
                            </Col>
                            <Col width={isMenuOpen ? "10" : "11"} responsive="lg">
                                <MainLayout />
                            </Col>
                        </Row>
                    </Container>

                    {isProjectPopupOpen && (
                        <ProjectSettingPopup />
                    )}
                </>
            )}
        </>
    );
};

export default App;
