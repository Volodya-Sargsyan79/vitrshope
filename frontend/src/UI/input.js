import React from "react";

export default function Input({type, name, classes}) {
  return (
    <input type={type} name={name} className={classes} required/>
  )
}