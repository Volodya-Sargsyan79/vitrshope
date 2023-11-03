import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router"
import { useLocation } from 'react-router-dom';

import Button from "../../UI/button";
import Items from "../elements/items";

export default function CheckoutForm({couponCode}) {

  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const location = useLocation();
  const couponCart = useSelector(state => state.coupon.coupon)
  

  console.log(location.state,2222)

  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    console.log(222222222)
    fetch('/api/finish_checkout_session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      },
      credentials: 'same-origin',
      body: JSON.stringify({})
    })
    .then((response) => {
      console.log(response,222222244444)
      return response.json()
      
    })
    .then((session) => {
      console.log(session,2222222555555)
    })
    .then((result) => {
      if (result.error) {
        alert(result.error.message)
      }
    })
    .catch(function (error) {
      console.log('Error:', error);
    })
  },[])

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements){
      return;
    }
  

    setIsProcessing(true)

    var data = {
      'first_name': e.target.first_name.value,
      'last_name': e.target.last_name.value,
      'email': e.target.email.value,
      'address': e.target.address.value,
      'zipcode': e.target.zipcode.value,
      'place': e.target.place.value,
      'coupon_code': couponCart.coupon_code,
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
      console.log(session,222222244444)
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
    <form id="payment-form" onSubmit={handleSubmit}>

      <Items type='text' name='first_name' labalName='First name' classes=''/>
      <Items type='text' name='last_name' labalName='Last name' classes=''/>
      <Items type='text' name='email' labalName='Email' classes=''/>
      <Items type='text' name='address' labalName='Address' classes=''/>
      <Items type='text' name='zipcode' labalName='Zipcode' classes=''/>
      <Items type='text' name='place' labalName='Place' classes=''/>

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
  )
}