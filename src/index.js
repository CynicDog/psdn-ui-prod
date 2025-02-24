import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {ThemeProvider} from "./context/Theme";
import {AuthProvider} from "./context/Auth";
import {LanguageProvider} from "./context/Language";
import {BaseDBProvider} from "./context/BaseDB";
import {ConfigProvider} from "./context/Config";
import {QueryClient, QueryClientProvider} from "react-query";

import {PublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {ProjectProvider} from "./context/Project";
import {MetaProvider} from "./context/Meta";
import {MenuProvider} from "./context/Menu";
import {PopupProvider} from "./context/Popup";

// Configuration object constructed
const config = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    },
    cache: {
        cacheLocation: "localStorage",
    },
};

// Create PublicClientApplication instance
const publicClientApplication = new PublicClientApplication(config);

const queryClient = new QueryClient();

const initializeMSAL = async () => {

    await publicClientApplication.initialize();

    ReactDOM.render(
        <MsalProvider instance={publicClientApplication}>
            <LanguageProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <QueryClientProvider client={queryClient}>
                            <ProjectProvider>
                                <PopupProvider>
                                    <MetaProvider>
                                        <MenuProvider>
                                            <BaseDBProvider>
                                                <ConfigProvider>
                                                    <App/>
                                                </ConfigProvider>
                                            </BaseDBProvider>
                                        </MenuProvider>
                                    </MetaProvider>
                                </PopupProvider>
                            </ProjectProvider>
                        </QueryClientProvider>
                    </AuthProvider>
                </ThemeProvider>
            </LanguageProvider>
        </MsalProvider>
        , document.getElementById('root')
    )
}

// Call the async function to initialize MSAL and render the app
initializeMSAL().catch(err => {
    console.error("MSAL initialization failed:", err);
});