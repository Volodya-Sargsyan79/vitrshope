import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import Button from "../../UI/button";

export default function ProductDetail() {
  const {slug} = useParams()

  const [product, setProduct] = useState({})

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
    })
    .catch(function (error) {
      console.log('Error 2');
      console.log(error)
    })
  };

  return (
    <>
      <div className="column is-2" >
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <h1 className="title">{ product.title }</h1>
                <h2 className="subtitle">{ product.price }</h2>
                <p>{ product.description }</p>
                <Button name="Add to cart" click={ addToCart }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}