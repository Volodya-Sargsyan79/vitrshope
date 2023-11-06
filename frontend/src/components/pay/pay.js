import React, { useState, useEffect} from "react";

import { useLocation } from "react-router"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./checkoutForm";

export default function Pay() {

  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cart_detail/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStripePromise(loadStripe(data?.pub_key));
        setClientSecret(location.state.clientSecret)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[])

  console.log(stripePromise, clientSecret)

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