import React from "react";

import Frontpage from '../pages/frontpage'
import Contact from '../pages/contact'
import ProductDetail from "../components/product/product_detail";
import CategoryDetail from "../pages/category_detail";
import About from "../pages/about";
import Cart from "../pages/cart";
import Success from "../pages/success";
import Pay from "../pages/pay";


export const routes = [
    { path: '', element: <Frontpage />},
    { path: 'contact/', element: <Contact />},
    { path: '/:category/:slug/', element: <ProductDetail />},
    { path: '/:slug/', element: <CategoryDetail />},
    { path: 'cart/', element: <Cart /> },
    { path: 'cart/pay/', element: <Pay /> },
    { path: 'cart/success/', element: <Success /> },
    { path: 'about/', element: <About /> }
]