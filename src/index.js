import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {AuthProvider, MenuProvider, ThemeProvider, TranslationProvider} from './Context.jsx'
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
    <ThemeProvider>
        <AuthProvider>
            <TranslationProvider>
                <MenuProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </MenuProvider>
            </TranslationProvider>
        </AuthProvider>
    </ThemeProvider>,
    document.getElementById('root')
)
