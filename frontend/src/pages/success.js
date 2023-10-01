import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

export default function Success() {
    return (
        <div className="container">
            {/* <CardElement  /> */}
            <h1 className="title">
                Thank you
            </h1>
            <p>
                Thank you the order. It will be processed as soon as possible!
            </p>
        </div>
    )
}