import React from "react";

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/navBar";

import { routes } from './router/router';

import Footer from './components/footer/footer'

export default function App() {
    return (
        <div>
            <NavBar />
            
            <div className="section">
                <Routes>
                    {
                        routes.map( (v,i) => 
                            <Route key={i} path={v.path} element={v.element} />
                        )
                    }
                </Routes>
            </div>
            
            <Footer />
        </div>
    )
}
