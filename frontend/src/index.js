import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";
import { Provider } from "react-redux";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import App from './App';

(async () => {
    const publishableKey = await fetch('/api/cart_detail/').then(res => res.json())
    const stripePromise = loadStripe(publishableKey?.pub_key)

    createRoot(document.getElementById('root'))
    .render(
        <BrowserRouter>
            <Provider store={store}>
                <Elements stripe={stripePromise}>
                    <App /> 
                </Elements>
            </Provider>
        </BrowserRouter>
    );
})()
