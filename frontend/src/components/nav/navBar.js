import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { fetchCart } from "../../store/reducerApi"
import Input from '../../UI/input'
import Button from '../../UI/button'

export default function NavBar() {

  const [category, setCategory] = useState()
  const [menuClass, setMenuClass] = useState(false)

  const dispatch = useDispatch()
  const quantity = useSelector(state => state.data.cart.cart_funct?.total_quantity)

  const sendView = async () => {
    let response = await fetch('/api/categories/')
    let data = await response.json()
    setCategory(data)
  }

  useEffect(() => {
    dispatch(fetchCart(quantity))
    sendView()
  },[])

  const toggleMenu =()=> {
    setMenuClass(!menuClass)
  }

  return (
    <nav className="navbar is-dark" id="navbarapp">
      <div className="navbar-brand">
        <Link className="navbar-item" to="">Saul Gadgets</Link>
        <a onClick={toggleMenu} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="main-navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="main-navbar" className={ !menuClass ? "navbar-menu" : ''} >
        <dic className='navbar-start'>
          <div className="navbar-item">
            <from>
              <div className="field has-addons">
                <div className="control">
                  <Input type='text' classes='input' name='query' placeHold='Search...'/>
                </div>
                <div className="control">
                  <Button classes='button is-success' name='Search' type='submit'/>
                </div>
              </div>
            </from>
          </div>
        </dic>
        <div className="navbar-end">
          {
            category?.map((v,i) =>
            <Link key={i} to={`/${v.slug}/`} className="navbar-item">{v.title}</Link>
            )
          }
          <div className="navbar-item" >
            <Link to="cart/" className="button is-primary">Cart ({quantity})</Link>
          </div>          
        </div>
      </div>
    </nav>
  )
}
