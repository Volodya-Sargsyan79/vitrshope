import React from "react";

export default function Button({ click, name, classes }) {
  return(
    <button onClick={click} className={classes}>{name}</button>
  )
}