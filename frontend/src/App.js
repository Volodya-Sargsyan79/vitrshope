import React from "react";
import Frontpage from './pages/frontpage'
import Contact from './pages/contact'
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/navBar";

import ProductDetail from "./components/product/product_detail";
import CategoryDetail from "./pages/category_detail";
import Footer from "./components/footer/footer";
import About from "./pages/about";
import Cart from "./pages/cart";
import Success from "./pages/success";

import { useSelector } from "react-redux"

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';





export default function App() {

    // const storeCart = useSelector(state => state.data.product) || {}

    // const stripePromise = loadStripe(storeCart?.pub_key);

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    //   };
    
    return (
        <div  >
            <NavBar />
            
            <div className="section">
                <Routes>
                    <Route path="" element={<Frontpage />} />
                    <Route path="contact/" element={<Contact />} />
                    <Route path="/:category/:slug/" element={<ProductDetail />} />
                    <Route path="/:slug/" element={<CategoryDetail />} />
                    <Route path="cart/" element={<Cart />} />
                    <Route path="cart/success/" element={<Success />} />
                    <Route path="about/" element={<About />} />
                </Routes>
            </div>
            
            <Footer />
        </div>
    )
}
