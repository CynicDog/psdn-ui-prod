import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {ThemeProvider} from "./context/Theme";
import {AuthProvider} from "./context/Auth";
import {LanguageProvider} from "./context/Language";
import {BaseDBProvider} from "./context/BaseDB";
import {ConfigProvider} from "./context/Config";
import {LayoutProvider} from "./context/Layout";
import {QueryClient, QueryClientProvider} from "react-query";

import {PublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";

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
            <ThemeProvider>
                <AuthProvider>
                    <LanguageProvider>
                        <LayoutProvider>
                            <BaseDBProvider>
                                <ConfigProvider>
                                    <QueryClientProvider client={queryClient}>
                                        <App/>
                                    </QueryClientProvider>
                                </ConfigProvider>
                            </BaseDBProvider>
                        </LayoutProvider>
                    </LanguageProvider>
                </AuthProvider>
            </ThemeProvider>
        </MsalProvider>,
        document.getElementById('root')
    )
}

// Call the async function to initialize MSAL and render the app
initializeMSAL().catch(err => {
    console.error("MSAL initialization failed:", err);
});