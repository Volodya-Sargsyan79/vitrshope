import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router"


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Items from '../components/elements/items'
import Button from "../UI/button";
import CheckoutForm from "../components/pay/checkoutForm";

import '../styles/checkoutForm.scss'

export default function Pay() {

  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")
  const [couponValue, setCouponValue] = useState(0)
  const [couponCode, setCouponCode] = useState("")
  const storeCart = useSelector(state => state.data.cart)
  const location = useLocation()

  console.log(!location.state, 222222)

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    var data = {
      'first_name': e.target.first_name.value,
      'last_name': e.target.last_name.value,
      'email': e.target.email.value,
      'address': e.target.address.value,
      'zipcode': e.target.zipcode.value,
      'place': e.target.place.value,
      'coupon_code': couponCode,
    }

    fetch('/api/create_checkout_session/', {
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
        setClientSecret(session.session.client_secret)
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
  }

  const applyCoupon =(e)=> {
    e.preventDefault();
    if (e.target.coupon_code.value !== ""){
      fetch('/api/can_use/?coupon_code=' + e.target.coupon_code.value, {
        method: 'GET'
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.amount) {
          setCouponValue(parseInt(data.amount))
          setCouponCode(data.coupon)
        } else {
          setCouponValue(0)
          setCouponCode('')
        }
      })
    }
  }

  return (
    <div>
    <div>
      {location.state 
        ? <div className="checkoutForm_container"> 
            <div>
              <div>
                  {
                        couponValue > 0
                        ? <div>
                            <h2 colSpan="2">Total cost with coupon:</h2>
                            <h3>$ {(storeCart.cart_funct?.total_cost * (couponValue / 100)).toFixed(2)}</h3>
                          </div>
                        : <div>
                            <h2>Total cost:</h2>
                            <h3>$ {storeCart.cart_funct?.total_cost.toFixed(2)}</h3>
                        </div>
                      }
              </div>
              <form onSubmit={applyCoupon}>
                <Items type='text' name='coupon_code' labalName='Code:' classes=''/>
                <Button type='submit' classes='button is-primary' name='Apply' />
              </form>
            </div>
            <div>
              <form id="payment-form" onSubmit={handleSubmit}>

                <Items type='text' name='first_name' labalName='First name' classes=''/>
                <Items type='text' name='last_name' labalName='Last name' classes=''/>
                <Items type='text' name='email' labalName='Email' classes=''/>
                <Items type='text' name='address' labalName='Address' classes=''/>
                <Items type='text' name='zipcode' labalName='Zipcode' classes=''/>
                <Items type='text' name='place' labalName='Place' classes=''/>

                <Button 
                  type='submit' 
                  classes='button is-primary' 
                  name='Pay now'
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
        : <div>
            <h1>Error 404</h1>
          </div>
      }
      
    </div>
      {/* { stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm />
        </Elements>
      )} */}
    </div>
  )
}