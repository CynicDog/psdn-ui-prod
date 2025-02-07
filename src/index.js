import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import {ThemeProvider} from "./context/Theme";
import {AuthProvider} from "./context/Auth";
import {TranslationProvider} from "./context/Translation";
import {MenuProvider} from "./context/Menu";

import {QueryClient, QueryClientProvider} from "react-query";
import {BaseDBProvider} from "./context/BaseDB";
import {ConfigProvider} from "./context/Config";

const queryClient = new QueryClient();

ReactDOM.render(
    <ThemeProvider>
        <AuthProvider>
            <TranslationProvider>
                <MenuProvider>
                    <BaseDBProvider>
                        <ConfigProvider>
                            <QueryClientProvider client={queryClient}>
                                <App/>
                            </QueryClientProvider>
                        </ConfigProvider>
                    </BaseDBProvider>
                </MenuProvider>
            </TranslationProvider>
        </AuthProvider>
    </ThemeProvider>,
    document.getElementById('root')
)
