import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column is-4">
          <h2 className="subtit">Saul Gadgets</h2>
        </div>
        <div className="column is-8">
          <Link className="navbar-item" to="contact/">Contact</Link>
          <Link className="navbar-item" to="about/">About</Link>
        </div>
      </div>
    </footer>
)
}