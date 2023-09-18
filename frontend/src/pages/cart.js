import React, {useState, useEffect} from "react";

export default function Cart() {

  const [product, setProduct] = useState()

  const sendView = async () => {
    let response = await fetch(`/api/cart_detail/`)
    let data = await response.json()
    setProduct(Object.keys(data).map(key => ({ id: key, ...data[key] })))
  }

  useEffect(() => {
    sendView()
  }, [])
  
  const removeProduct =(product_id)=> {
    console.log(product_id)
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
    <div>
      <h1>Cart</h1>
      {
        product?.map((v,i)=>
          <div key={i}>
            <p>{v.product.title}</p>
            <button onClick={() => removeProduct(v.id) }>Remove from cart</button>
          </div>
        )
      }
    </div>
  )
}