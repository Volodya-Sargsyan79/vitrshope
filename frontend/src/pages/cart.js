import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchCart } from "../store/reducerApi"
import { useCoupon } from "../store/reducer"
import { useNavigate } from "react-router"

import Button from "../UI/button"
import Items from "../components/elements/items";

import '../styles/styles.scss'

export default function Cart() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const storeCart = useSelector(state => state.data.cart)
  const couponCart = useSelector(state => state.coupon.coupon)
  const [couponValue, setCouponValue] = useState(0)
  const [couponCode, setCouponCode] = useState("")


  useEffect(() => {
    dispatch(fetchCart(storeCart))
  },[])

  const removeProduct =(product_id)=> {
    var data = {
      'product_id': product_id
    }
    fetch('/api/remove_from_cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => {
      console.log(response)
      dispatch(fetchCart(storeCart))
    })
    .catch(function (error) {
      console.log('Error 2');
      console.log(error)
    })
  }

  const increment =(product_id, quantity)=> {

    var data = {
      'product_id': product_id, 
      'update': true,
      'quantity': quantity + 1
    }

    fetch('/api/add_to_cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => {
      console.log(response)
      dispatch(fetchCart(storeCart))
    })
    .catch(function (error) {
      console.log('Error 2');
      console.log(error)
    })
  }

  const decrement =(product_id, quantity)=> {

    if (quantity > 1){
      var data = {
        'product_id': product_id, 
        'update': true,
        'quantity': quantity - 1
      }
  
      fetch('/api/add_to_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf_token
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      })
      .then((response) => {
        console.log(response)
        dispatch(fetchCart(storeCart))
      })
      .catch(function (error) {
        console.log('Error 2');
        console.log(error)
      })
    }
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
          dispatch(useCoupon({
            coupon_code: data.coupon,
            coupon_value: data.amount
          }))
        } else {
          setCouponValue(0)
          setCouponCode('')
        }
      })
    }
  }

  // const payInCart =()=> {
  //   navigate('checkout', {state: data})
    // var data = {
    //   'coupon_code':  couponCode,
    //   'coupon_value': couponValue
    // }

    // fetch('/api/create_checkout_session/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': csrf_token
    //   },
    //   credentials: 'same-origin',
    //   body: JSON.stringify(data)
    // })
    // .then((response) => {
    //   console.log(response)
    //   navigate('checkout', {state: data})
    // })
    // .catch(function (error) {
    //   console.log('Error 2');
    //   console.log(error)
    // })
  // }

  return (
    <div className="table">
      {
        storeCart?.cart && Object.values(storeCart.cart)?.length === 0 
        ? <div>
            <h1 className="title">Cart</h1>
            <p>Your cart is empty</p>
          </div>
        : <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  storeCart?.cart && Object.values(storeCart.cart)?.map((v,i)=>
                    <tr key={i}>
                      <td>{v.product.title}</td>
                      <td>
                        <Button click={() => decrement(v.id, v.quantity) } classes='' name='-' />
                        {v.quantity}
                        <Button click={() => increment(v.id, v.quantity) } classes='' name='+' />
                      </td>
                      <td>$ {v.total_price.toFixed(2)}</td>
                      <td>
                        <Button click={() => removeProduct(v.id) } classes='' name='Remove from cart' />
                      </td>
                    </tr>
                  )
                }
              </tbody>
              <tfoot>
                <tr>
                  <td>Total cost:</td>
                  <td>{storeCart.cart_funct?.total_quantity}</td>
                  <td>$ {storeCart.cart_funct?.total_cost.toFixed(2)}</td>
                </tr>
                {
                  couponValue > 0
                  ? <tr>
                      <td colSpan="2">Total cost with coupon:</td>
                      <td>$ {(storeCart.cart_funct?.total_cost * (couponValue / 100)).toFixed(2)}</td>
                    </tr>
                  : ''
                }
              </tfoot>
            </table>
            <hr/>
            <form onSubmit={applyCoupon}>
              <Items type='text' name='coupon_code' labalName='Code:' classes=''/>
              <Button type='submit' classes='button is-primary' name='Apply' />
            </form>
            <Button click={()=>navigate('checkout', {state: {'coupon_value':couponValue,'coupon_code':couponCode}})} type='button' classes='button is-primary' name='Pay' />
          </div>
      }
    </div>
  )
}