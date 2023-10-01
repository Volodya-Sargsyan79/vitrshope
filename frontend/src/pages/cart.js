import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchCart } from "../store/reducer"

import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

import '../styles/styles.scss'
import Button from "../UI/button"
import Input from "../UI/input";

export default function Cart() {

  const dispatch = useDispatch()
  const storeCart = useSelector(state => state.data.product) || {}

  const stripe = useStripe();
  const elements = useElements();

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

  const addClient =(e)=> {
    
    var data = {
      'first_name': e.target.first_name.value,
      'last_name': e.target.last_name.value,
      'email': e.target.email.value,
      'address': e.target.address.value,
      'zipcode': e.target.zipcode.value,
      'place': e.target.place.value,
    }
    
    fetch('/api/api_checkout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => {
      console.log('Success')
      console.log(response)
      window.location.href = '/'
    })
    .catch(function (error) {
      console.log('Error 2');
      console.log(error)
    })
    e.preventDefault();
  }

  const bay = () => {

    if (!stripe || !elements){
      return;
    }

    fetch('/api/create_checkout_session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      },
      credentials: 'same-origin',
    })
    .then((response) => {
      return response.json()
    })
    .then((session) => {
      window.location.href = session.session.url
    })
    .then((result) => {
      if (result.error) {
        alert(result.error.message)
      }
    })
    .catch(function (error) {
      console.log('Error:', error);
    })

  }

  return (
    <div className="table">
      <h1 className="title">Cart</h1>
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
            storeCart.productsstring && Object.values(storeCart.productsstring)?.map((v,i)=>
              <tr key={i}>
                <td>{v.title}</td>
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
        </tfoot>
      </table>
      <form onSubmit={addClient}>
        <div className="field">
          <div className="control">
            <label>First name </label>
            <Input type='text' name='first_name' classes=''/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label>Last name </label>
            <Input type='text' name='last_name' classes=''/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label>E-mail </label>
            <Input type='text' name='email' classes=''/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label>Address </label>
            <Input type='text' name='address' classes=''/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label>Zip code </label>
            <Input type='text' name='zipcode' classes=''/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label>Place </label>
            <Input type='text' name='place' classes=''/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <Button classes='button is-primary' name='Check out'/>
          </div>
        </div>
      </form>
      <Button click={bay} classes='button is-primary' name='Check out' />
    </div>
  )
}