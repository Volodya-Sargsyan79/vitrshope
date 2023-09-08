import React from "react";

export default function Button({ click, name }) {
  return(
    <button onClick={click }>{name}</button>
  )
}