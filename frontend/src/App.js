import React from "react";
import Frontpage from './pages/frontpage'
import Contact from './pages/contact'
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/navBar";

import { store } from "./store/index";
import { Provider } from "react-redux";
import ProductDetail from "./components/product/product_detail";
import CategoryDetail from "./pages/category_detail";
import Footer from "./components/footer/footer";
import About from "./pages/about";

export default function App() {
    return (
        <Provider store={store}>
            <NavBar />
            <div className="section">
                <Routes>
                    <Route path="" element={<Frontpage />} />
                    <Route path="contact/" element={<Contact />} />
                    <Route path="/:category/:slug/" element={<ProductDetail />} />
                    <Route path="/:slug/" element={<CategoryDetail />} />
                    <Route path="about/" element={<About />} />
                </Routes>
            </div>
            <Footer />
        </Provider>

    )
}
