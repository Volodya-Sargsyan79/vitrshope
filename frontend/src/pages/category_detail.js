import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import Product from "../components/product/product";

export default function CategoryDetail() {
  const {slug} = useParams()

  const [product, setProduct] = useState()

  const sendView = async (slug) => {
    let response = await fetch(`/api/${slug}/`)
    let data = await response.json()
    setProduct(data)
  }
  useEffect(() => {
    sendView(slug)
  },[slug])

    return (
      <div className="columns is-multiline">
        {
          product?.map((v,i) =>
            <Product key={i} product={v} category={slug}/>
          )
        }
      </div>
    )
}