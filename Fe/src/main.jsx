import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { AuthContextProvider } from './contexts/AuthContex.jsx'
import GlobalStyles from "../src/components/GlobalStyles"
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./app/store.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    // <AuthContextProvider>
    <Provider store={store}>
        <GlobalStyles>
            <Router>
                <App />
            </Router>
        </GlobalStyles>
    </Provider>
    //</AuthContextProvider>
)
