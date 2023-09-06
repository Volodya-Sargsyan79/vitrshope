import React from "react";
import Frontpage from './pages/frontpage'
import Contact from './pages/contact'
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/navBar";

import { store } from "./store/index";
import { Provider } from "react-redux";

export default function App() {
    return (
        <Provider store={store}>
            <NavBar />
            <div className="section">
                <Routes>
                    <Route path="" element={<Frontpage />} />
                    <Route path="contact/" element={<Contact />} />
                </Routes>
            </div>
        </Provider>

    )
}
