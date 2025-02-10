import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {ThemeProvider} from "./context/Theme";
import {AuthProvider} from "./context/Auth";
import {TranslationProvider} from "./context/Translation";
import {BaseDBProvider} from "./context/BaseDB";
import {ConfigProvider} from "./context/Config";
import {LayoutProvider} from "./context/Layout";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
    <ThemeProvider>
        <AuthProvider>
            <TranslationProvider>
                <LayoutProvider>
                    <BaseDBProvider>
                        <ConfigProvider>
                            <QueryClientProvider client={queryClient}>
                                <App/>
                            </QueryClientProvider>
                        </ConfigProvider>
                    </BaseDBProvider>
                </LayoutProvider>
            </TranslationProvider>
        </AuthProvider>
    </ThemeProvider>,
    document.getElementById('root')
)
