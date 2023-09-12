import React, {useState, useEffect} from "react";
import Button from "../UI/button";

export default function Cart() {

  const [product, setProduct] = useState()
  const [incrementQuantity, setIncrementQuantity] = useState(0)
  const [title, setTitle] = useState(['Product', 'Quantity', 'Price'])

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
    })
    .catch(function (error) {
      console.log('Error 2');
      console.log(error)
    })

  }

  
  useEffect( () => {
    const sendView = async () => {
      let response = await fetch(`/api/cart_detail/`)
      let data = await response.json()
      setProduct(Object.keys(data).map(key => ({ id: key, ...data[key] })))
    }
    sendView()
  },[])


  return (
    <div className="table">
      <table className="table">
            <thead>
                <tr>
                    {
                        title.map((v,i)=>
                            <th key={i}>{v}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    product?.map((v,i)=>
                        <tr key={i}>
                            <td>{v.product.title}</td>
                            <td>
                              {v.quantity}
                              <Button click={ () => increment(v.product.id, v.quantity) } name='+'/>
                            </td>
                            <td>${v.price}</td>
                            <td ><Button click={ ()=> removeProduct(v.product.id) } name='Remove from cart'/></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}