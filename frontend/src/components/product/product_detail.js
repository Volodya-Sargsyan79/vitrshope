import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"

export default function ProductDetail() {
  const {slug} = useParams()

  const [product, setProduct] = useState({})

  const sendView = async (slug) => {
    let response = await fetch(`/api/${slug}`)
    let data = await response.json()
    setProduct(data)
  }

  useEffect(() => {
    sendView(slug)
  },[])

 
  return (
    <>
      <div className="column is-2" >
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{ product.title }</p>
                <p className="subtitle is-6">{ product.price }</p>
                <p className="subtitle is-6">{ product.description }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}