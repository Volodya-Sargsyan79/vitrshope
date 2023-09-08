import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {


  const [category, setCategory] = useState()

  const sendView = async () => {
    let response = await fetch('/api/categories/')
    let data = await response.json()
    setCategory(data)
  }

  useEffect(() => {
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
          {/* <div class="navbar-item" id="navbarapp">
            <a href="{% url 'cart' %}" class="button is-primary">Cart ([[ numItems ]])</a>
          </div> */}            
        </div>
      </div>
    </nav>
  )
}
