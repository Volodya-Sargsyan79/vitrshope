import React from "react";

export default function Button({ click, type, name, classes }) {
  return(
    <button onClick={click} type={type} className={classes}>{name}</button>
  )
}