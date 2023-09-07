import React, { useState, useEffect } from "react";
import Product from "../components/product/product";

export default function Frontpage() {

  const [product, setProduct] = useState()

  const sendView = async () => {
    let response = await fetch('/api/product/')
    let data = await response.json()
    setProduct(data)
  }

  useEffect(() => {
    sendView()
  },[])

  return (
    <div className="columns is-multiline">
      {
        product?.map((v,i) =>
          <Product key={i} product={v} />
        )
      }
    </div>
  )
}
