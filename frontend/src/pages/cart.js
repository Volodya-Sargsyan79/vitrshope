import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"
import reducer, { fetchCart } from "../store/reducer"

import Button from "../UI/button"

export default function Cart({reduceQuantity}) {

  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState()

  const dispatch = useDispatch()
  const storeCart = useSelector(state => state.data.product)
  reduceQuantity(Object.values(storeCart).reduce((a,b) => a+b.quantity,0))


  useEffect(()=> {
    dispatch(fetchCart(storeCart))
  },[product, quantity])

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
      setProduct(product_id)
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
      setProduct(product_id)
      setQuantity(quantity)
    })
    .catch(function (error) {
      console.log('Error 2');
      console.log(error)
    })
  }

  return Object.keys(storeCart).length === 0 ? (
    <div className="table">
      <h1 className="title">Cart</h1>
      <p>Your cart is empty</p>
    </div>
  ):(
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
            Object.values(storeCart)?.map((v,i)=>
              <tr key={i}>
                <td>{v.product.title}</td>
                <td>
                  {v.quantity}
                  <Button click={() => increment(v.id, v.quantity) } name='+' />
                </td>
                <td>$ {v.price.toFixed(2)}</td>
                <td>
                  <Button click={() => removeProduct(v.id) } name='Remove from cart' />
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      
    </div>
  )
}