import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {

  const sendView =(e)=> {

    fetch("/api/product_detail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from Django if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }

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
            <Link to="" onClick={() => sendView(product.slug)} className="card-footer-item">View</Link>
          </footer>
        </div>
      </div>
    </>
  )
}
