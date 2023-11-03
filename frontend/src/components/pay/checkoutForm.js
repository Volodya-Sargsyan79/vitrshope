import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router"

import Button from "../../UI/button";


export default function CheckoutForm() {

  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const storeCart = useSelector(state => state.data.cart)
  
  const [isProcessing, setIsProcessing] = useState(false)




  const handleSubmit = async (e) => {

    e.preventDefault();
    
    setIsProcessing(true)

    if (!stripe || !elements){
      return;
    }

    // var data = {
    //   'first_name': e.target.first_name.value,
    //   'last_name': e.target.last_name.value,
    //   'email': e.target.email.value,
    //   'address': e.target.address.value,
    //   'zipcode': e.target.zipcode.value,
    //   'place': e.target.place.value,
    //   'coupon_code': couponCode,
    // }

    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/cart`
      }
    })
    
    // fetch('/api/finish_checkout_session/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': csrf_token
    //   },
    //   credentials: 'same-origin',
    //   body: JSON.stringify({})
    // })
    // .then((response) => {
    //   return response.json()
    // })
    // .then((session) => {
    //   stripe.confirmPayment({
    //     elements,
    //     confirmParams: {
    //       return_url: `${window.location.origin}/cart`
    //     }
    //   })
    // })
    // .then((result) => {
    //   if (result.error) {
    //     alert(result.error.message)
    //   }
    // })
    // .catch(function (error) {
    //   console.log('Error:', error);
    // })

    setIsProcessing(false)
  }

  return (
    <div className="checkoutForm_container">
      <div>
        <div>
          <h2>Total cost:</h2>
          <h3>$ {storeCart.cart_funct?.total_cost.toFixed(2)}</h3>  
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