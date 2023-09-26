import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import Button from "../../UI/button";
import { useSelector, useDispatch } from "react-redux"
import { fetchCart } from "../../store/reducer"

export default function ProductDetail() {
  
  const {slug} = useParams()

  const [product, setProduct] = useState({})

  const dispatch = useDispatch()
  const storeCart = useSelector(state => state.data.product)
  
  const sendView = async (slug) => {
    let response = await fetch(`/api/${slug}/${slug}/`)
    let data = await response.json()
    setProduct(data)
  }

  useEffect(() => {
    sendView(slug)
  },[])

  const addToCart = async ()=> {

    var data = {
      'product_id': product.id, 
      'update': false,
      'quantity': 1
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
  };

  console.log(product.image,33333)
  return (
    <>
      <div className="productapp" >
        <img src={product.image} width={1000}/>
        <hr />
        <h1 className="title">{ product.title }</h1>
        <h2 className="subtitle">{ product.price }</h2>
        <p>{ product.description }</p>
        <Button name="Add to cart" click={ addToCart }/>
      </div>
    </>
  )
}