import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router"

import Button from "../../UI/button";


export default function CheckoutForm() {

  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    setIsProcessing(true)

    if (!stripe || !elements){
      return;
    }

    var data = {
      'payment_intent': location.state.sessionId,
      'coupon_code': location.state.couponCode
    }

    fetch('/api/finish_checkout_session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => {
      return response.json()
    })
    .then((session) => {
      stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/cart`
        }
      })
    })
    .then((result) => {
      if (result.error) {
        alert(result.error.message)
      }
    })
    .catch(function (error) {
      console.log('Error:', error);
    })

    setIsProcessing(false)
  }

  return (
    <div className="checkoutForm_container">
      <div>
        <div>
          <h2>Total cost:</h2>
          <h3>$ {location.state.amount / 100}</h3>  
        </div>
      </div>
      <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
        <Button 
          disable={isProcessing} 
          type='submit' 
          classes='button is-primary' 
          name={isProcessing ? 'Processing ...' : 'Pay now'} 
        />
        <Button 
          click={()=>navigate('/cart')}
          type='button' 
          classes='button is-primary' 
          name='Censle'
        />
      </form>
      </div>
      
    </div>

  )
}