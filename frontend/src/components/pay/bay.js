import React, { useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router"

import Items from '../elements/items'
import Button from "../../UI/button";

import '../../styles/checkoutForm.scss'

export default function Bay() {

  const [couponValue, setCouponValue] = useState(0)
  const [couponCode, setCouponCode] = useState("")
  const storeCart = useSelector(state => state.data.cart)
  const navigate = useNavigate()
  const location = useLocation()

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
        navigate('/cart/pay', 
          {  
            state: {
              'clientSecret': session.session.client_secret, 
              'sessionId': session.session.id,
              'amount': session.session.amount,
              'couponCode': couponCode,
            }
          })
      })
      
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
  )
}