import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/reducer";
import { Link } from "react-router-dom";

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
          <div className="column is-2" key={i}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{ v.title }</p>
                    <p className="subtitle is-6">{ v.price }</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link to="" className="card-footer-item">View</Link>
              </footer>
            </div>
          </div>
        )
      }
    </div>
  )
}
