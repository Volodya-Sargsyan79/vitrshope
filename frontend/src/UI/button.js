import React from "react";

export default function Button({ click, type, name, classes, disable }) {
  return(
    <button onClick={click} type={type} className={classes} disabled={disable}>{name}</button>
  )
}