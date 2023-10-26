import React, { useState, useEffect } from "react";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from "../components/pay/checkoutForm";

export default function Pay() {

  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cart_detail/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStripePromise(loadStripe(data?.pub_key));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[])
  
  useEffect(() => {
      fetch('/api/create_checkout_session/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token
          },
          credentials: 'same-origin',
          body: JSON.stringify({})
        })
        .then((response) => {
          return response.json()
        })
        .then((session) => {
          setClientSecret(session.session.client_secret)
        })
  }, [])

  return (
    <div>
      { stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}