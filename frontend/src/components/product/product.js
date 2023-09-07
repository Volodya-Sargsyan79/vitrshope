import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {

  return (
    <>
      <div className="column is-2" >
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{ product.title }</p>
                <p className="subtitle is-6">{ product.price }</p>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <Link to={product.slug} className="card-footer-item">View</Link>
          </footer>
        </div>
      </div>
    </>
  )
}
