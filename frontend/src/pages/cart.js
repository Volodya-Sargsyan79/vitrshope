import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchCart } from "../store/reducer"
import { useNavigate } from "react-router"

import Button from "../UI/button"

import '../styles/styles.scss'

export default function Cart() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const storeCart = useSelector(state => state.data.product) || {}

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
      <Button click={()=>navigate('checkout')} type='button' classes='button is-primary' name='Pay' />
    </div>
  )
}