import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/reducer";
import Product from "../components/product/product";

export default function Frontpage() {

  const product = useSelector((state) => state.data.product)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchProduct())
  }, [])

  return (
    <div className="columns is-multiline">
      {
        product.map((v,i) =>
          <Product key={i} title={v.title} price={v.price}/>
        )
      }
    </div>
  )
}
