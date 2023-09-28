import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { fetchCart } from "../../store/reducer"

export default function NavBar() {

  const [category, setCategory] = useState()

  const dispatch = useDispatch()
  const quantity = useSelector(state => state.data.product.cart_funct?.total_quantity)

  const sendView = async () => {
    let response = await fetch('/api/categories/')
    let data = await response.json()
    setCategory(data)
  }

  useEffect(() => {
    dispatch(fetchCart(quantity))
    sendView()
  },[])

  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <Link className="navbar-item" to="">Saul Gadgets</Link>
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="main-navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="main-navbar" className="navbar-menu">
        <div className="navbar-end">
          {
            category?.map((v,i) =>
            <Link key={i} to={`/${v.slug}/`}className="navbar-item">{v.title}</Link>
            )
          }
          <div className="navbar-item" id="navbarapp">
            <Link to="cart/" className="button is-primary">Cart ({quantity})</Link>
          </div>          
        </div>
      </div>
    </nav>
  )
}
